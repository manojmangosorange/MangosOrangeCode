<?php
$config = require __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $config['allowed_origins'], true)) {
  header("Access-Control-Allow-Origin: $origin");
}
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  exit;
}

function json_response($data, $status = 200) {
  http_response_code($status);
  echo json_encode($data);
  exit;
}

function get_json_body() {
  $raw = file_get_contents('php://input');
  if (!$raw) return [];
  $decoded = json_decode($raw, true);
  return is_array($decoded) ? $decoded : [];
}

function get_request_body() {
  $body = get_json_body();
  if (!empty($_POST)) {
    // Allow regular form submissions in addition to JSON payloads.
    return array_merge($body, $_POST);
  }
  return $body;
}

function sanitize_header_value($value) {
  return trim(str_replace(["\r", "\n"], '', (string)$value));
}

function get_current_mail_domain() {
  $host = strtolower(trim((string)($_SERVER['HTTP_HOST'] ?? 'localhost')));
  $host = preg_replace('/:\d+$/', '', $host);
  $host = preg_replace('/^www\./', '', $host);
  return $host !== '' ? $host : 'localhost';
}

function resolve_mail_to() {
  global $config;
  $to = trim((string)($config['mail_to'] ?? ''));
  if ($to !== '' && filter_var($to, FILTER_VALIDATE_EMAIL)) {
    return $to;
  }

  $fallback = 'info@' . get_current_mail_domain();
  return filter_var($fallback, FILTER_VALIDATE_EMAIL) ? $fallback : '';
}

function resolve_mail_from() {
  global $config;
  $from = trim((string)($config['mail_from'] ?? ''));
  if ($from !== '' && filter_var($from, FILTER_VALIDATE_EMAIL)) {
    return $from;
  }

  $fallback = 'no-reply@' . get_current_mail_domain();
  if (filter_var($fallback, FILTER_VALIDATE_EMAIL)) {
    return $fallback;
  }

  return 'no-reply@localhost';
}

function send_plain_mail($subject, $message, $replyTo = '') {
  $to = resolve_mail_to();
  if ($to === '') {
    error_log('Mail send failed: no valid mail_to configured');
    return false;
  }

  $from = resolve_mail_from();
  $safeSubject = sanitize_header_value($subject);
  $safeFrom = sanitize_header_value($from);

  // Build email headers
  $headers = [];
  $headers[] = "From: MangosOrange <$safeFrom>";
  $headers[] = 'MIME-Version: 1.0';
  $headers[] = 'Content-Type: text/plain; charset=UTF-8';
  
  // Add Reply-To if provided
  $safeReplyTo = sanitize_header_value($replyTo);
  if ($safeReplyTo !== '' && filter_var($safeReplyTo, FILTER_VALIDATE_EMAIL)) {
    $headers[] = "Reply-To: $safeReplyTo";
  }

  $headersString = implode("\r\n", $headers);
  
  // Try to send with -f parameter first, fallback without it if not allowed
  $sent = false;
  $additionalParams = filter_var($safeFrom, FILTER_VALIDATE_EMAIL) ? "-f $safeFrom" : '';

  if ($additionalParams !== '') {
    // Try with -f parameter (some hosts restrict this)
    $sent = @mail($to, $safeSubject, (string)$message, $headersString, $additionalParams);
  }
  
  // If failed or -f not available, try without it
  if (!$sent) {
    $sent = @mail($to, $safeSubject, (string)$message, $headersString);
  }

  if (!$sent) {
    error_log('Mail send failed for subject: ' . $safeSubject . ' to: ' . $to);
  } else {
    error_log('Mail sent successfully: ' . $safeSubject . ' to: ' . $to);
  }

  return $sent;
}

function db() {
  global $config;
  static $pdo = null;
  if ($pdo) return $pdo;

  $dsn = "mysql:host={$config['db']['host']};dbname={$config['db']['name']};charset={$config['db']['charset']}";
  $pdo = new PDO($dsn, $config['db']['user'], $config['db']['pass'], [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
  ]);
  return $pdo;
}

function base64url_encode($data) {
  return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64url_decode($data) {
  return base64_decode(strtr($data, '-_', '+/'));
}

function jwt_encode($payload, $secret) {
  $header = ['alg' => 'HS256', 'typ' => 'JWT'];
  $segments = [
    base64url_encode(json_encode($header)),
    base64url_encode(json_encode($payload)),
  ];
  $signing_input = implode('.', $segments);
  $signature = hash_hmac('sha256', $signing_input, $secret, true);
  $segments[] = base64url_encode($signature);
  return implode('.', $segments);
}

function jwt_decode($token, $secret) {
  $parts = explode('.', $token);
  if (count($parts) !== 3) return null;

  [$h, $p, $s] = $parts;
  $signature = base64url_decode($s);
  $valid = hash_hmac('sha256', "$h.$p", $secret, true);

  if (!hash_equals($valid, $signature)) return null;

  $payload = json_decode(base64url_decode($p), true);
  if (!$payload) return null;

  if (isset($payload['exp']) && time() > $payload['exp']) return null;
  return $payload;
}

function get_bearer_token() {
  $auth = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
  if (preg_match('/Bearer\s(\S+)/', $auth, $matches)) {
    return $matches[1];
  }
  return null;
}

function require_auth() {
  global $config;
  $token = get_bearer_token();
  if (!$token) json_response(['error' => 'Unauthorized'], 401);

  $payload = jwt_decode($token, $config['jwt_secret']);
  if (!$payload) json_response(['error' => 'Invalid token'], 401);

  return $payload;
}
