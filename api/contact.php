<?php
require __DIR__ . '/bootstrap.php';

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
  json_response(['error' => 'Method not allowed'], 405);
}

$body = get_request_body();

$name = trim((string)($body['name'] ?? ''));
$phone = trim((string)($body['phone'] ?? ''));
$email = strtolower(trim((string)($body['email'] ?? '')));
$subject = trim((string)($body['subject'] ?? 'Contact Form'));
$message = trim((string)($body['message'] ?? ''));

if ($subject === '') {
  $subject = 'Contact Form';
}

if ($name === '' || $email === '' || $message === '') {
  json_response(['error' => 'Missing fields'], 400);
}

if (
  strlen($name) > 120 ||
  strlen($phone) > 32 ||
  strlen($email) > 190 ||
  strlen($subject) > 190 ||
  strlen($message) > 5000
) {
  json_response(['error' => 'One or more fields are too long'], 400);
}

$email = filter_var($email, FILTER_SANITIZE_EMAIL);
if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  json_response(['error' => 'Invalid email format'], 400);
}

if ($phone !== '' && !preg_match('/^[0-9+\-\s().]{7,32}$/', $phone)) {
  json_response(['error' => 'Invalid phone number format'], 400);
}

function is_missing_table_error($error) {
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

function ensure_contact_leads_table() {
  db()->exec(
    "CREATE TABLE IF NOT EXISTS contact_leads (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(190) NOT NULL,
      phone VARCHAR(32) NULL,
      subject VARCHAR(190) NOT NULL,
      message TEXT NOT NULL,
      status VARCHAR(20) NOT NULL DEFAULT 'New',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      KEY idx_contact_leads_created_at (created_at),
      KEY idx_contact_leads_email (email),
      KEY idx_contact_leads_status (status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4"
  );
}

function insert_contact_lead($name, $email, $phone, $subject, $message) {
  $stmt = db()->prepare(
    'INSERT INTO contact_leads (name, email, phone, subject, message, status) VALUES (?, ?, ?, ?, ?, ?)'
  );
  $stmt->execute([$name, $email, $phone ?: null, $subject, $message, 'New']);
  return (int)db()->lastInsertId();
}

$leadId = null;
try {
  $leadId = insert_contact_lead($name, $email, $phone, $subject, $message);
} catch (Throwable $error) {
  if (is_missing_table_error($error)) {
    try {
      ensure_contact_leads_table();
      $leadId = insert_contact_lead($name, $email, $phone, $subject, $message);
    } catch (Throwable $createOrInsertError) {
      error_log('Contact save failed after table recovery attempt: ' . $createOrInsertError->getMessage());
      json_response(['error' => 'Unable to save your message right now. Please try again later.'], 500);
    }
  } else {
    error_log('Contact save failed: ' . $error->getMessage());
    json_response(['error' => 'Unable to save your message right now. Please try again later.'], 500);
  }
}

$mailSubject = "Contact Form - $subject (MangosOrange)";

$bodyText = "You received a new message from the website contact form:\n\n";
$bodyText .= "Name: $name\n";
$bodyText .= "Email: $email\n";
$bodyText .= "Phone: $phone\n";
$bodyText .= "Message:\n$message\n";

$mailSent = send_plain_mail($mailSubject, $bodyText, $email);

json_response([
  'success' => true,
  'id' => $leadId,
  'mail_sent' => $mailSent,
]);
