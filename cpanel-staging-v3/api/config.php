<?php
return [
  'db' => [
    'host' => 'localhost',
    'name' => 'ehardco1_career_db_demo_pulkit',
    'user' => 'ehardco1_demo_user_pulkit',
    'pass' => 'CHANGE_ME',
    'charset' => 'utf8mb4',
  ],
  'jwt_secret' => 'CHANGE_ME_TO_A_LONG_RANDOM_SECRET',
  'jwt_ttl' => 60 * 60 * 24 * 7,
  'base_url' => 'https://mangosorange.com',
  'uploads_dir' => __DIR__ . '/../uploads/resumes',
  'uploads_url' => 'https://mangosorange.com/uploads/resumes',
  'mail_to' => 'pulkit@mangosorange.com',
  // RECOMMENDED: Specify an authenticated email address from your domain
  // Leave blank to auto-use no-reply@mangosorange.com
  // If emails aren't arriving, try setting this to an existing mailbox like:
  // 'mail_from' => 'noreply@mangosorange.com',
  'mail_from' => 'noreply@mangosorange.com',
  'allowed_origins' => [
    'https://mangosorange.com',
    'https://www.mangosorange.com'
  ],
];
