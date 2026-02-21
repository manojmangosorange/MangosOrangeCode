<?php
require __DIR__ . '/bootstrap.php';

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
  json_response(['error' => 'Method not allowed'], 405);
}

$body = get_request_body();

// Sanitize input
$name = htmlspecialchars(trim($body['name'] ?? ''), ENT_QUOTES, 'UTF-8');
$phone = htmlspecialchars(trim($body['phone'] ?? ''), ENT_QUOTES, 'UTF-8');
$email = filter_var(trim($body['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$subject = htmlspecialchars(trim($body['subject'] ?? 'Contact Form'), ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars(trim($body['message'] ?? ''), ENT_QUOTES, 'UTF-8');

if (!$name || !$email || !$message) {
  json_response(['error' => 'Missing fields'], 400);
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  json_response(['error' => 'Invalid email format'], 400);
}

$mailSubject = "Contact Form - $subject (MangosOrange)";

$bodyText = "You received a new message from the website contact form:\n\n";
$bodyText .= "Name: $name\n";
$bodyText .= "Email: $email\n";
$bodyText .= "Phone: $phone\n";
$bodyText .= "Message:\n$message\n";

$mailSent = send_plain_mail($mailSubject, $bodyText, $email);

json_response(['success' => true, 'mail_sent' => $mailSent]);
