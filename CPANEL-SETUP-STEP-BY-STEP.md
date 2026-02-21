# cPanel Setup (Frontend + API + DB)

Use this for a clean deployment on cPanel.

## 1) Upload package

1. In cPanel `File Manager`, open `public_html/`.
2. Upload `cpanel-deploy-package.zip`.
3. Extract it in `public_html/`.
4. Ensure this structure exists:
   - `public_html/index.html`
   - `public_html/.htaccess`
   - `public_html/sitemap.xml`
   - `public_html/robots.txt`
   - `public_html/api/*.php` (including `sendmail.php`)

## 2) Create DB and user

1. cPanel -> `MySQL Databases`.
2. Create DB and DB user.
3. Add user to DB with `ALL PRIVILEGES`.

## 3) Import schema

1. cPanel -> `phpMyAdmin`.
2. Select your DB.
3. Import `database-setup.sql`.

Notes:
- `applicants.job_id` is nullable (required for general resume drops).
- `admin_users` includes `updated_at` (required by API update logic).

## 4) Configure API

Edit `public_html/api/config.php`:

```php
<?php
return [
  'db' => [
    'host' => 'localhost',
    'name' => 'YOUR_DB_NAME',
    'user' => 'YOUR_DB_USER',
    'pass' => 'YOUR_DB_PASSWORD',
    'charset' => 'utf8mb4',
  ],
  'jwt_secret' => 'REPLACE_WITH_LONG_RANDOM_SECRET',
  'jwt_ttl' => 60 * 60 * 24 * 7,
  'base_url' => 'https://mangosorange.com',
  'uploads_dir' => __DIR__ . '/../uploads/resumes',
  'uploads_url' => 'https://mangosorange.com/uploads/resumes',
  'mail_to' => 'info@mangosorange.com',
  'mail_from' => 'no-reply@mangosorange.com',
  'allowed_origins' => [
    'https://mangosorange.com',
    'https://www.mangosorange.com'
  ],
];
```

## 5) Create upload directory

Create folder:
- `public_html/uploads/resumes`

Permissions:
- `uploads` and `resumes`: `755`

## 6) Verify

Open these URLs:

1. `https://mangosorange.com/`
2. `https://mangosorange.com/sitemap.xml`
3. `https://mangosorange.com/robots.txt`
4. `https://mangosorange.com/api/jobs.php`
5. `https://mangosorange.com/admin/login`

## 7) Default admin

From imported SQL:
- Email: `admin@mangosorange.com`
- Password: `password`

Change this password immediately after first login.
