<?php
require __DIR__ . '/bootstrap.php';

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
  json_response(['error' => 'Method not allowed'], 405);
}

$maxBytes = 5 * 1024 * 1024;
$allowedExtensions = ['pdf', 'doc', 'docx'];

function upload_error_message(int $code): string {
  switch ($code) {
    case UPLOAD_ERR_OK:
      return 'OK';
    case UPLOAD_ERR_INI_SIZE:
    case UPLOAD_ERR_FORM_SIZE:
      return 'File too large';
    case UPLOAD_ERR_PARTIAL:
      return 'File upload interrupted';
    case UPLOAD_ERR_NO_FILE:
      return 'No file uploaded';
    case UPLOAD_ERR_NO_TMP_DIR:
      return 'Server temp directory missing';
    case UPLOAD_ERR_CANT_WRITE:
      return 'Cannot write uploaded file';
    case UPLOAD_ERR_EXTENSION:
      return 'Upload blocked by server extension';
    default:
      return 'Upload failed';
  }
}

function upload_build_destination(string $uploadsDir, string $ext): array {
  if (!is_dir($uploadsDir) && !mkdir($uploadsDir, 0755, true) && !is_dir($uploadsDir)) {
    json_response(['error' => 'Unable to create upload directory'], 500);
  }
  $filename = time() . '_' . bin2hex(random_bytes(6)) . '.' . $ext;
  $dest = rtrim($uploadsDir, '/') . '/' . $filename;
  return [$filename, $dest];
}

function upload_extension_from_name(string $name, array $allowed): string {
  $ext = strtolower((string)pathinfo($name, PATHINFO_EXTENSION));
  if ($ext === '' || !in_array($ext, $allowed, true)) {
    json_response(['error' => 'Invalid file type'], 400);
  }
  return $ext;
}

// Primary path: multipart/form-data upload
$uploadedFile = $_FILES['file'] ?? ($_FILES['resume'] ?? ($_FILES['resume_file'] ?? null));
if ($uploadedFile !== null) {
  $file = $uploadedFile;
  $errorCode = (int)($file['error'] ?? UPLOAD_ERR_NO_FILE);
  if ($errorCode !== UPLOAD_ERR_OK) {
    json_response(['error' => upload_error_message($errorCode)], 400);
  }

  $size = (int)($file['size'] ?? 0);
  if ($size <= 0) {
    json_response(['error' => 'No file uploaded'], 400);
  }
  if ($size > $maxBytes) {
    json_response(['error' => 'File too large'], 400);
  }

  $ext = upload_extension_from_name((string)($file['name'] ?? ''), $allowedExtensions);
  [$filename, $dest] = upload_build_destination($config['uploads_dir'], $ext);

  if (!move_uploaded_file((string)$file['tmp_name'], $dest)) {
    json_response(['error' => 'Upload failed'], 500);
  }

  $url = rtrim($config['uploads_url'], '/') . '/' . $filename;
  json_response(['url' => $url]);
}

// Fallback path: JSON/base64 upload (for hosts that block multipart requests)
$body = get_request_body();
$fileBase64 = trim((string)($body['file_base64'] ?? ($body['fileBase64'] ?? '')));
$originalName = trim((string)($body['filename'] ?? ($body['file_name'] ?? ($body['fileName'] ?? 'resume.pdf'))));

if ($fileBase64 === '') {
  json_response(['error' => 'No file uploaded'], 400);
}

$base64MarkerPos = strpos($fileBase64, 'base64,');
if ($base64MarkerPos !== false) {
  $fileBase64 = substr($fileBase64, $base64MarkerPos + 7);
}

$binary = base64_decode($fileBase64, true);
if ($binary === false) {
  json_response(['error' => 'Invalid file payload'], 400);
}

$size = strlen($binary);
if ($size <= 0) {
  json_response(['error' => 'No file uploaded'], 400);
}
if ($size > $maxBytes) {
  json_response(['error' => 'File too large'], 400);
}

$ext = upload_extension_from_name($originalName, $allowedExtensions);
[$filename, $dest] = upload_build_destination($config['uploads_dir'], $ext);

$written = file_put_contents($dest, $binary, LOCK_EX);
if ($written === false) {
  json_response(['error' => 'Upload failed'], 500);
}

$url = rtrim($config['uploads_url'], '/') . '/' . $filename;
json_response(['url' => $url]);
