<?php
require __DIR__ . '/bootstrap.php';

$method = $_SERVER['REQUEST_METHOD'];

function applicants_get_column_meta($columnName) {
  static $cache = [];
  if (array_key_exists($columnName, $cache)) {
    return $cache[$columnName];
  }

  $stmt = db()->prepare('SHOW COLUMNS FROM applicants LIKE ?');
  $stmt->execute([$columnName]);
  $row = $stmt->fetch(PDO::FETCH_ASSOC);
  $cache[$columnName] = $row ?: null;
  return $cache[$columnName];
}

function applicants_generate_uuid_v4() {
  $bytes = random_bytes(16);
  $bytes[6] = chr((ord($bytes[6]) & 0x0f) | 0x40);
  $bytes[8] = chr((ord($bytes[8]) & 0x3f) | 0x80);
  $hex = bin2hex($bytes);
  return sprintf(
    '%s-%s-%s-%s-%s',
    substr($hex, 0, 8),
    substr($hex, 8, 4),
    substr($hex, 12, 4),
    substr($hex, 16, 4),
    substr($hex, 20, 12)
  );
}

function applicants_next_numeric_id() {
  $stmt = db()->query('SELECT COALESCE(MAX(id), 0) + 1 AS next_id FROM applicants');
  $row = $stmt->fetch(PDO::FETCH_ASSOC);
  return (int)($row['next_id'] ?? 1);
}

function applicants_requires_explicit_id() {
  $idMeta = applicants_get_column_meta('id');
  if (!$idMeta) return false;

  $extra = strtolower((string)($idMeta['Extra'] ?? ''));
  if (strpos($extra, 'auto_increment') !== false) {
    return false;
  }

  $default = $idMeta['Default'] ?? null;
  if ($default !== null && $default !== '') {
    return false;
  }

  $nullable = strtoupper((string)($idMeta['Null'] ?? 'NO')) === 'YES';
  return !$nullable;
}

function applicants_build_explicit_id() {
  $idMeta = applicants_get_column_meta('id');
  $type = strtolower((string)($idMeta['Type'] ?? ''));
  if (strpos($type, 'int') !== false) {
    return applicants_next_numeric_id();
  }
  return applicants_generate_uuid_v4();
}

function applicants_fits_integer_string($value, $max) {
  $normalizedValue = ltrim((string)$value, '0');
  $normalizedMax = ltrim((string)$max, '0');
  if ($normalizedValue === '') $normalizedValue = '0';
  if ($normalizedMax === '') $normalizedMax = '0';
  if (strlen($normalizedValue) < strlen($normalizedMax)) return true;
  if (strlen($normalizedValue) > strlen($normalizedMax)) return false;
  return strcmp($normalizedValue, $normalizedMax) <= 0;
}

function applicants_normalize_phone($phoneRaw) {
  $phone = trim((string)$phoneRaw);
  if ($phone === '') return '';

  $meta = applicants_get_column_meta('phone');
  if (!$meta) return $phone;

  $type = strtolower((string)($meta['Type'] ?? ''));
  if (strpos($type, 'int') === false) {
    return $phone;
  }

  $digits = preg_replace('/\D+/', '', $phone);
  if ($digits === '') {
    return null;
  }

  $unsigned = strpos($type, 'unsigned') !== false;
  if (strpos($type, 'tinyint') !== false) {
    $max = $unsigned ? '255' : '127';
  } elseif (strpos($type, 'smallint') !== false) {
    $max = $unsigned ? '65535' : '32767';
  } elseif (strpos($type, 'mediumint') !== false) {
    $max = $unsigned ? '16777215' : '8388607';
  } elseif (strpos($type, 'bigint') !== false) {
    $max = $unsigned ? '18446744073709551615' : '9223372036854775807';
  } else {
    $max = $unsigned ? '4294967295' : '2147483647';
  }

  if (!applicants_fits_integer_string($digits, $max)) {
    return null;
  }

  return $digits;
}

function applicants_insert_row($payload, $forceExplicitId = false) {
  $useExplicitId = $forceExplicitId || applicants_requires_explicit_id();

  $columns = ['job_id', 'name', 'email', 'phone', 'resume_url', 'cover_letter', 'status'];
  $values = [
    $payload['job_id'],
    $payload['name'],
    $payload['email'],
    $payload['phone'],
    $payload['resume_url'],
    $payload['cover_letter'],
    $payload['status'],
  ];

  if ($useExplicitId) {
    array_unshift($columns, 'id');
    array_unshift($values, applicants_build_explicit_id());
  }

  $placeholders = implode(', ', array_fill(0, count($columns), '?'));
  $sql = 'INSERT INTO applicants (' . implode(', ', $columns) . ') VALUES (' . $placeholders . ')';

  $stmt = db()->prepare($sql);
  $stmt->execute($values);
}

if ($method === 'GET') {
  require_auth();
  $jobId = $_GET['job_id'] ?? ($_GET['jobId'] ?? null);
  $general = $_GET['general'] ?? null;

  $sql = 'SELECT a.*, j.title AS job_title FROM applicants a LEFT JOIN job_postings j ON a.job_id = j.id';
  $params = [];

  if ($general === '1') {
    $sql .= ' WHERE a.job_id IS NULL';
  } elseif ($general === '0') {
    $sql .= ' WHERE a.job_id IS NOT NULL';
  } elseif ($jobId) {
    $sql .= ' WHERE a.job_id = ?';
    $params[] = $jobId;
  }

  $sql .= ' ORDER BY a.applied_at DESC';

  $stmt = db()->prepare($sql);
  $stmt->execute($params);
  json_response($stmt->fetchAll(PDO::FETCH_ASSOC));
}

if ($method === 'POST') {
  $body = get_request_body();
  $jobIdRaw = $body['job_id'] ?? ($body['jobId'] ?? null);
  $jobId = ($jobIdRaw === '' || $jobIdRaw === null) ? null : $jobIdRaw;

  $nameRaw = trim((string)($body['name'] ?? ''));
  $emailRaw = trim((string)($body['email'] ?? ''));
  $phoneRaw = applicants_normalize_phone((string)($body['phone'] ?? ''));
  $resumeRaw = trim((string)($body['resume_url'] ?? ($body['resumeUrl'] ?? '')));
  $coverLetterRaw = trim((string)($body['cover_letter'] ?? ($body['coverLetter'] ?? '')));
  $status = $body['status'] ?? 'Applied';

  if ($nameRaw === '' || $emailRaw === '' || $resumeRaw === '') {
    json_response(['error' => 'Name, email, and resume URL are required'], 400);
  }

  $email = filter_var($emailRaw, FILTER_SANITIZE_EMAIL);
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(['error' => 'Invalid email format'], 400);
  }

  $jobTitle = '';
  if ($jobId !== null) {
    $jobStmt = db()->prepare('SELECT title FROM job_postings WHERE id = ?');
    $jobStmt->execute([$jobId]);
    $jobRow = $jobStmt->fetch(PDO::FETCH_ASSOC);
    if (!$jobRow) {
      json_response(['error' => 'Invalid job id'], 400);
    }
    $jobTitle = $jobRow['title'] ?? '';
  }

  try {
    applicants_insert_row([
      'job_id' => $jobId,
      'name' => $nameRaw,
      'email' => $email,
      'phone' => $phoneRaw,
      'resume_url' => $resumeRaw,
      'cover_letter' => $coverLetterRaw,
      'status' => $status,
    ]);
  } catch (Throwable $insertError) {
    // Retry with explicit ID for schemas where id has no default/auto-increment.
    $message = strtolower((string)$insertError->getMessage());
    $isIdDefaultError =
      strpos($message, "field 'id' doesn't have a default value") !== false ||
      strpos($message, "column 'id' cannot be null") !== false;

    if ($isIdDefaultError) {
      try {
        applicants_insert_row([
          'job_id' => $jobId,
          'name' => $nameRaw,
          'email' => $email,
          'phone' => $phoneRaw,
          'resume_url' => $resumeRaw,
          'cover_letter' => $coverLetterRaw,
          'status' => $status,
        ], true);
      } catch (Throwable $retryError) {
        error_log('Applicant insert retry failed: ' . $retryError->getMessage());
        json_response(['error' => 'Unable to submit application right now. Please try again later.'], 500);
      }
    } else {
      error_log('Applicant insert failed: ' . $insertError->getMessage());
      json_response(['error' => 'Unable to submit application right now. Please try again later.'], 500);
    }
  }

  // Sanitize dynamic values for email
  $name = htmlspecialchars($nameRaw, ENT_QUOTES, 'UTF-8');
  $phone = htmlspecialchars((string)$phoneRaw, ENT_QUOTES, 'UTF-8');
  $resume = htmlspecialchars($resumeRaw, ENT_QUOTES, 'UTF-8');
  $coverLetter = htmlspecialchars($coverLetterRaw, ENT_QUOTES, 'UTF-8');
  $isGeneral = $jobId === null;
  $jobTitle = htmlspecialchars($jobTitle, ENT_QUOTES, 'UTF-8');

  $subject = $isGeneral
    ? 'Resume Drop - New Candidate Application (MangosOrange)'
    : 'Job Application - New Candidate (MangosOrange)';

  $message = "You received a new application on MangosOrange:\n\n";
  $message .= "Name: $name\n";
  $message .= "Email: $email\n";
  $message .= "Phone: $phone\n";
  $message .= "Resume: $resume\n";
  if (!$isGeneral && $jobTitle) {
    $message .= "Job Title: $jobTitle\n";
  }
  if ($coverLetter) {
    $message .= "\nCover Letter:\n$coverLetter\n";
  }
  $message .= "\nApplication Type: " . ($isGeneral ? 'General Interest / Resume Drop' : 'Job Application') . "\n";

  $mailSent = send_plain_mail($subject, $message, $email);

  json_response(['success' => true, 'mail_sent' => $mailSent]);
}

if ($method === 'PUT') {
  require_auth();
  $body = get_json_body();
  $id = $body['id'] ?? null;
  if (!$id) json_response(['error' => 'ID required'], 400);

  $stmt = db()->prepare('UPDATE applicants SET status = ?, notes = ?, updated_at = NOW() WHERE id = ?');
  $stmt->execute([
    $body['status'] ?? 'Applied',
    $body['notes'] ?? '',
    $id,
  ]);

  json_response(['success' => true]);
}

json_response(['error' => 'Method not allowed'], 405);
