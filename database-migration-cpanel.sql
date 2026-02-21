-- Run this only if you already have existing tables in production.
-- It aligns schema with current API behavior.

ALTER TABLE `admin_users`
  ADD COLUMN `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

ALTER TABLE `applicants`
  MODIFY COLUMN `job_id` int(11) DEFAULT NULL;
