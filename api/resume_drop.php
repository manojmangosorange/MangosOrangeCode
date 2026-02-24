<?php
require __DIR__ . '/bootstrap.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

function is_resume_drop_table_missing($error) {
  if (!($error instanceof Throwable)) {
    return false;
  }

  $code = (string)$error->getCode();
  if ($code === '42S02') {
    return true;
  }

  $message = strtolower((string)$error->getMessage());
  return strpos($message, "doesn't exist") !== false ||
         strpos($message, 'does not exist') !== false ||
         strpos($message, 'unknown table') !== false;
}

function ensure_resume_drops_table() {
  db()->exec(
    "CREATE TABLE IF NOT EXISTS resume_drops (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      name VARCHAR(150) NOT NULL,
      email VARCHAR(190) NOT NULL,
      phone VARCHAR(32) NULL,
      resume_url VARCHAR(1024) NOT NULL,
      cover_letter TEXT NULL,
      status VARCHAR(20) NOT NULL DEFAULT 'Applied',
      notes TEXT NULL,
      applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      KEY idx_resume_drops_status (status),
      KEY idx_resume_drops_email (email),
      KEY idx_resume_drops_applied_at (applied_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4"
  );
}

function validate_resume_drop_status($status) {
  $allowed = ['Applied', 'Shortlisted', 'Interviewed', 'Hired', 'Rejected'];
  return in_array($status, $allowed, true);
}

if ($method === 'GET') {
  require_auth();

  $status = trim((string)($_GET['status'] ?? ''));
  $limit = (int)($_GET['limit'] ?? 1000);
  $offset = (int)($_GET['offset'] ?? 0);
  $limit = max(1, min(5000, $limit));
  $offset = max(0, $offset);

  try {
    $params = [];
    $where = '';
    if ($status !== '' && validate_resume_drop_status($status)) {
      $where = ' WHERE status = ?';
      $params[] = $status;
    }

    $sql = 'SELECT id, NULL AS job_id, name, email, phone, resume_url, cover_letter, status, notes, applied_at, updated_at
            FROM resume_drops' . $where . ' ORDER BY applied_at DESC LIMIT ? OFFSET ?';
    $stmt = db()->prepare($sql);

    $index = 1;
    foreach ($params as $value) {
      $stmt->bindValue($index++, $value, PDO::PARAM_STR);
    }
    $stmt->bindValue($index++, $limit, PDO::PARAM_INT);
    $stmt->bindValue($index, $offset, PDO::PARAM_INT);
    $stmt->execute();

    json_response($stmt->fetchAll(PDO::FETCH_ASSOC));
  } catch (Throwable $error) {
    if (is_resume_drop_table_missing($error)) {
      try {
        ensure_resume_drops_table();
        json_response([]);
      } catch (Throwable $createError) {
        error_log('Failed to create resume_drops table during GET: ' . $createError->getMessage());
      }
    }

    error_log('Failed to fetch resume drops: ' . $error->getMessage());
    json_response(['error' => 'Failed to load resume drop applications'], 500);
  }
}

if ($method === 'POST') {
  $body = get_request_body();

  $nameRaw = trim((string)($body['name'] ?? ''));
  $emailRaw = trim((string)($body['email'] ?? ''));
  $phoneRaw = trim((string)($body['phone'] ?? ''));
  $resumeRaw = trim((string)($body['resume_url'] ?? ($body['resumeUrl'] ?? '')));
  $coverLetterRaw = trim((string)($body['cover_letter'] ?? ($body['coverLetter'] ?? '')));
  $statusRaw = trim((string)($body['status'] ?? 'Applied'));
  $status = validate_resume_drop_status($statusRaw) ? $statusRaw : 'Applied';

  if ($nameRaw === '' || $emailRaw === '' || $resumeRaw === '') {
    json_response(['error' => 'Name, email, and resume URL are required'], 400);
  }

  if (
    strlen($nameRaw) > 150 ||
    strlen($emailRaw) > 190 ||
    strlen($phoneRaw) > 32 ||
    strlen($resumeRaw) > 1024 ||
    strlen($coverLetterRaw) > 20000
  ) {
    json_response(['error' => 'One or more fields are too long'], 400);
  }

  if ($phoneRaw !== '' && !preg_match('/^[0-9+\-\s().]{7,32}$/', $phoneRaw)) {
    json_response(['error' => 'Invalid phone number format'], 400);
  }

  $email = filter_var($emailRaw, FILTER_SANITIZE_EMAIL);
  if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(['error' => 'Invalid email format'], 400);
  }

  $insertedId = null;
  try {
    $stmt = db()->prepare(
      'INSERT INTO resume_drops (name, email, phone, resume_url, cover_letter, status) VALUES (?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute([
      $nameRaw,
      $email,
      $phoneRaw !== '' ? $phoneRaw : null,
      $resumeRaw,
      $coverLetterRaw !== '' ? $coverLetterRaw : null,
      $status,
    ]);
    $insertedId = (int)db()->lastInsertId();
  } catch (Throwable $error) {
    if (is_resume_drop_table_missing($error)) {
      try {
        ensure_resume_drops_table();
        $stmt = db()->prepare(
          'INSERT INTO resume_drops (name, email, phone, resume_url, cover_letter, status) VALUES (?, ?, ?, ?, ?, ?)'
        );
        $stmt->execute([
          $nameRaw,
          $email,
          $phoneRaw !== '' ? $phoneRaw : null,
          $resumeRaw,
          $coverLetterRaw !== '' ? $coverLetterRaw : null,
          $status,
        ]);
        $insertedId = (int)db()->lastInsertId();
      } catch (Throwable $retryError) {
        error_log('Resume drop insert failed after table recovery: ' . $retryError->getMessage());
        json_response(['error' => 'Unable to submit application right now. Please try again later.'], 500);
      }
    } else {
      error_log('Resume drop insert failed: ' . $error->getMessage());
      json_response(['error' => 'Unable to submit application right now. Please try again later.'], 500);
    }
  }

  $name = htmlspecialchars($nameRaw, ENT_QUOTES, 'UTF-8');
  $phone = htmlspecialchars($phoneRaw, ENT_QUOTES, 'UTF-8');
  $resume = htmlspecialchars($resumeRaw, ENT_QUOTES, 'UTF-8');
  $coverLetter = htmlspecialchars($coverLetterRaw, ENT_QUOTES, 'UTF-8');

  $subject = 'Resume Drop - New Candidate Application (MangosOrange)';
  $message = "You received a new resume drop application on MangosOrange:\n\n";
  $message .= "Name: $name\n";
  $message .= "Email: $email\n";
  $message .= "Phone: $phone\n";
  $message .= "Resume: $resume\n";
  if ($coverLetter !== '') {
    $message .= "\nCover Letter:\n$coverLetter\n";
  }
  $message .= "\nApplication Type: General Interest / Resume Drop\n";

  $mailSent = send_plain_mail($subject, $message, $email);
  json_response(['success' => true, 'id' => $insertedId, 'mail_sent' => $mailSent]);
}

if ($method === 'PUT') {
  require_auth();
  $body = get_json_body();

  $id = trim((string)($body['id'] ?? ''));
  $status = trim((string)($body['status'] ?? ''));
  $notes = (string)($body['notes'] ?? '');

  if ($id === '') {
    json_response(['error' => 'ID required'], 400);
  }
  if (!validate_resume_drop_status($status)) {
    json_response(['error' => 'Invalid status'], 400);
  }

  try {
    $stmt = db()->prepare('UPDATE resume_drops SET status = ?, notes = ?, updated_at = NOW() WHERE id = ?');
    $stmt->execute([$status, $notes, $id]);
    json_response(['success' => true]);
  } catch (Throwable $error) {
    if (is_resume_drop_table_missing($error)) {
      try {
        ensure_resume_drops_table();
        json_response(['success' => false, 'error' => 'No resume drop entries found'], 404);
      } catch (Throwable $createError) {
        error_log('Failed to create resume_drops table during PUT: ' . $createError->getMessage());
      }
    }

    error_log('Resume drop update failed: ' . $error->getMessage());
    json_response(['error' => 'Failed to update resume drop status'], 500);
  }
}

json_response(['error' => 'Method not allowed'], 405);
