<?php
require __DIR__ . '/bootstrap.php';

$auth = require_auth();
if (($auth['role'] ?? '') !== 'Admin') {
  json_response(['error' => 'Forbidden'], 403);
}
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
  $stmt = db()->query('SELECT id, email, name, role, created_at FROM admin_users ORDER BY created_at DESC');
  json_response($stmt->fetchAll(PDO::FETCH_ASSOC));
}

if ($method === 'POST') {
  $body = get_json_body();
  $name = trim($body['name'] ?? '');
  $email = strtolower(trim($body['email'] ?? ''));
  $password = $body['password'] ?? '';
  $role = $body['role'] ?? 'Recruiter';

  if (!$email || !$password) {
    json_response(['error' => 'Email and password required'], 400);
  }

  $hash = password_hash($password, PASSWORD_BCRYPT);
  $stmt = db()->prepare('INSERT INTO admin_users (email, password_hash, name, role) VALUES (?, ?, ?, ?)');
  $stmt->execute([$email, $hash, $name, $role]);

  json_response(['success' => true, 'id' => db()->lastInsertId()]);
}

if ($method === 'PUT') {
  $body = get_json_body();
  $id = $body['id'] ?? null;
  $newPassword = $body['password'] ?? null;
  $newRole = $body['role'] ?? null;

  if (!$id) {
    json_response(['error' => 'ID required'], 400);
  }
  if (!$newPassword && !$newRole) {
    json_response(['error' => 'Password or role required'], 400);
  }

  $fields = [];
  $values = [];
  if ($newPassword) {
    $hash = password_hash($newPassword, PASSWORD_BCRYPT);
    $fields[] = 'password_hash = ?';
    $values[] = $hash;
  }
  if ($newRole) {
    $fields[] = 'role = ?';
    $values[] = $newRole;
  }
  $fields[] = 'updated_at = NOW()';
  $values[] = $id;

  $sql = 'UPDATE admin_users SET ' . implode(', ', $fields) . ' WHERE id = ?';
  $stmt = db()->prepare($sql);
  $stmt->execute($values);

  json_response(['success' => true]);
}

if ($method === 'DELETE') {
  $id = $_GET['id'] ?? null;
  if (!$id) json_response(['error' => 'ID required'], 400);

  $stmt = db()->prepare('DELETE FROM admin_users WHERE id = ?');
  $stmt->execute([$id]);

  json_response(['success' => true]);
}

json_response(['error' => 'Method not allowed'], 405);
