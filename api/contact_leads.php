<?php
require __DIR__ . '/bootstrap.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

function is_contact_leads_table_missing($error) {
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

if ($method === 'GET') {
  require_auth();

  $limit = (int)($_GET['limit'] ?? 50);
  $offset = (int)($_GET['offset'] ?? 0);
  $status = trim((string)($_GET['status'] ?? ''));

  $limit = max(1, min(200, $limit));
  $offset = max(0, $offset);

  try {
    $where = '';
    $params = [];

    if ($status !== '') {
      $where = ' WHERE status = ?';
      $params[] = $status;
    }

    $countStmt = db()->prepare('SELECT COUNT(*) FROM contact_leads' . $where);
    $countStmt->execute($params);
    $total = (int)$countStmt->fetchColumn();

    $sql = 'SELECT id, name, email, phone, subject, message, status, created_at, updated_at
            FROM contact_leads' . $where . ' ORDER BY created_at DESC LIMIT ? OFFSET ?';

    $stmt = db()->prepare($sql);
    $index = 1;
    foreach ($params as $value) {
      $stmt->bindValue($index++, $value, PDO::PARAM_STR);
    }
    $stmt->bindValue($index++, $limit, PDO::PARAM_INT);
    $stmt->bindValue($index, $offset, PDO::PARAM_INT);
    $stmt->execute();

    json_response([
      'total' => $total,
      'items' => $stmt->fetchAll(PDO::FETCH_ASSOC),
    ]);
  } catch (Throwable $error) {
    if (is_contact_leads_table_missing($error)) {
      json_response(['total' => 0, 'items' => []]);
    }

    error_log('Failed to fetch contact leads: ' . $error->getMessage());
    json_response(['error' => 'Failed to load contact leads'], 500);
  }
}

if ($method === 'PUT') {
  require_auth();
  $body = get_json_body();

  $id = (int)($body['id'] ?? 0);
  $status = trim((string)($body['status'] ?? ''));
  $allowedStatuses = ['New', 'In Progress', 'Closed'];

  if ($id <= 0) {
    json_response(['error' => 'ID is required'], 400);
  }
  if (!in_array($status, $allowedStatuses, true)) {
    json_response(['error' => 'Invalid status'], 400);
  }

  try {
    $stmt = db()->prepare('UPDATE contact_leads SET status = ?, updated_at = NOW() WHERE id = ?');
    $stmt->execute([$status, $id]);
    json_response(['success' => true]);
  } catch (Throwable $error) {
    error_log('Failed to update contact lead: ' . $error->getMessage());
    json_response(['error' => 'Failed to update contact lead'], 500);
  }
}

json_response(['error' => 'Method not allowed'], 405);
