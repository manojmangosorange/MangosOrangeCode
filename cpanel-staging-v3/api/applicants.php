<?php
require __DIR__ . '/bootstrap.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
  require_auth();
  $jobId = $_GET['job_id'] ?? ($_GET['jobId'] ?? null);
  $general = $_GET['general'] ?? null;

  $sql = 'SELECT a.*, j.title AS job_title FROM applicants a LEFT JOIN job_postings j ON a.job_id = j.id';
  $params = [];

  if ($general === '1') {
    $sql .= ' WHERE a.job_id IS NULL';
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

  $nameRaw = trim($body['name'] ?? '');
  $emailRaw = trim($body['email'] ?? '');
  $phoneRaw = trim($body['phone'] ?? '');
  $resumeRaw = trim($body['resume_url'] ?? ($body['resumeUrl'] ?? ''));
  $coverLetterRaw = trim($body['cover_letter'] ?? ($body['coverLetter'] ?? ''));
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

  $stmt = db()->prepare('INSERT INTO applicants (job_id, name, email, phone, resume_url, cover_letter, status) VALUES (?, ?, ?, ?, ?, ?, ?)');
  $stmt->execute([
    $jobId,
    $nameRaw,
    $email,
    $phoneRaw,
    $resumeRaw,
    $coverLetterRaw,
    $status,
  ]);

  // Sanitize dynamic values for email
  $name = htmlspecialchars($nameRaw, ENT_QUOTES, 'UTF-8');
  $phone = htmlspecialchars($phoneRaw, ENT_QUOTES, 'UTF-8');
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
