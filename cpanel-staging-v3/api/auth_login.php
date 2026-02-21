<?php
require __DIR__ . '/bootstrap.php';

$body = get_json_body();
$email = strtolower(trim($body['email'] ?? ''));
$password = $body['password'] ?? '';

if (!$email || !$password) {
  json_response(['error' => 'Email and password required'], 400);
}

$stmt = db()->prepare('SELECT * FROM admin_users WHERE email = ?');
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user || !password_verify($password, $user['password_hash'])) {
  json_response(['error' => 'Invalid credentials'], 401);
}

$payload = [
  'sub' => $user['id'],
  'email' => $user['email'],
  'role' => $user['role'],
  'exp' => time() + $config['jwt_ttl'],
];

$token = jwt_encode($payload, $config['jwt_secret']);

json_response([
  'token' => $token,
  'user' => [
    'id' => (string)$user['id'],
    'email' => $user['email'],
    'name' => $user['name'],
    'role' => $user['role'],
    'createdAt' => $user['created_at'],
  ],
]);
