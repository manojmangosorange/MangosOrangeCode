<?php
require __DIR__ . '/bootstrap.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
  $includeHidden = ($_GET['includeHidden'] ?? '0') === '1';
  $id = $_GET['id'] ?? null;

  if ($includeHidden) {
    require_auth();
  }

  if ($id) {
    $stmt = db()->prepare('SELECT * FROM job_postings WHERE id = ?');
    $stmt->execute([$id]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    json_response($row ?: null);
  }

  $sql = 'SELECT * FROM job_postings';
  if (!$includeHidden) {
    $sql .= " WHERE is_visible = 1 AND status = 'Active'";
  }
  $sql .= ' ORDER BY created_at DESC';

  $stmt = db()->query($sql);
  json_response($stmt->fetchAll(PDO::FETCH_ASSOC));
}

require_auth();

if ($method === 'POST') {
  $body = get_json_body();
  $stmt = db()->prepare(
    'INSERT INTO job_postings (title, department, type, location, experience, salary, description, responsibilities, requirements, deadline, status, is_visible) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  );
  $stmt->execute([
    $body['title'] ?? '',
    $body['department'] ?? '',
    $body['type'] ?? '',
    $body['location'] ?? '',
    $body['experience'] ?? '',
    $body['salary'] ?? '',
    $body['description'] ?? '',
    $body['responsibilities'] ?? '',
    $body['requirements'] ?? '',
    $body['deadline'] ?? null,
    $body['status'] ?? 'Active',
    !empty($body['is_visible']) ? 1 : 0,
  ]);

  json_response(['success' => true, 'id' => db()->lastInsertId()]);
}

if ($method === 'PUT') {
  $body = get_json_body();
  $id = $body['id'] ?? ($_GET['id'] ?? null);
  if (!$id) json_response(['error' => 'ID required'], 400);

  $fields = [
    'title','department','type','location','experience','salary','description',
    'responsibilities','requirements','deadline','status','is_visible'
  ];
  $set = [];
  $values = [];
  foreach ($fields as $f) {
    if (array_key_exists($f, $body)) {
      $set[] = "$f = ?";
      $values[] = $body[$f];
    }
  }
  $set[] = 'updated_at = NOW()';
  $values[] = $id;

  $sql = 'UPDATE job_postings SET ' . implode(', ', $set) . ' WHERE id = ?';
  $stmt = db()->prepare($sql);
  $stmt->execute($values);

  json_response(['success' => true]);
}

if ($method === 'DELETE') {
  $id = $_GET['id'] ?? null;
  if (!$id) json_response(['error' => 'ID required'], 400);

  $stmt = db()->prepare('DELETE FROM job_postings WHERE id = ?');
  $stmt->execute([$id]);
  json_response(['success' => true]);
}

json_response(['error' => 'Method not allowed'], 405);
