-- ============================================================================
-- MangosOrange Database Setup Script
-- Run this in cPanel phpMyAdmin after creating your database
-- ============================================================================

-- 1. ADMIN USERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` enum('Admin','Recruiter') DEFAULT 'Recruiter',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. JOB POSTINGS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS `job_postings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `department` varchar(100) DEFAULT NULL,
  `type` varchar(50) DEFAULT 'Full-time',
  `location` varchar(100) DEFAULT NULL,
  `experience` varchar(100) DEFAULT NULL,
  `salary` varchar(100) DEFAULT NULL,
  `description` text,
  `responsibilities` text,
  `requirements` text,
  `deadline` date DEFAULT NULL,
  `status` enum('Active','Draft','Closed') DEFAULT 'Active',
  `is_visible` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `status` (`status`),
  KEY `is_visible` (`is_visible`),
  KEY `created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. APPLICANTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS `applicants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `resume_url` varchar(500) DEFAULT NULL,
  `cover_letter` text,
  `status` enum('Applied','Shortlisted','Rejected','Interviewed','Hired') DEFAULT 'Applied',
  `notes` text,
  `applied_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `job_id` (`job_id`),
  KEY `status` (`status`),
  KEY `applied_at` (`applied_at`),
  CONSTRAINT `applicants_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `job_postings` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- CREATE DEFAULT ADMIN USER
-- ============================================================================
-- Email: admin@mangosorange.com
-- Password: password
-- ⚠️  CHANGE THIS PASSWORD IMMEDIATELY AFTER FIRST LOGIN!
-- ============================================================================

INSERT INTO `admin_users` (`email`, `password_hash`, `name`, `role`) 
VALUES (
  'admin@mangosorange.com', 
  '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 
  'System Administrator', 
  'Admin'
);

-- ============================================================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================================================

-- Sample Job Posting
INSERT INTO `job_postings` 
  (`title`, `department`, `type`, `location`, `experience`, `salary`, `description`, `responsibilities`, `requirements`, `deadline`, `status`, `is_visible`) 
VALUES (
  'Senior Full Stack Developer',
  'Technology',
  'Full-time',
  'Noida, India',
  '3-5 years',
  '8-12 LPA',
  'We are looking for an experienced Full Stack Developer to join our growing team.',
  '• Develop and maintain web applications\n• Write clean, maintainable code\n• Collaborate with cross-functional teams\n• Participate in code reviews',
  '• 3+ years of experience in React and Node.js\n• Strong knowledge of JavaScript/TypeScript\n• Experience with MySQL/PostgreSQL\n• Good communication skills',
  DATE_ADD(CURDATE(), INTERVAL 30 DAY),
  'Active',
  1
);

-- ============================================================================
-- VERIFY TABLES CREATED
-- ============================================================================
-- Run this query to check if all tables exist:
-- SHOW TABLES;

-- ============================================================================
-- GRANT PERMISSIONS (if needed)
-- ============================================================================
-- If using a specific database user, grant permissions:
-- GRANT ALL PRIVILEGES ON your_database.* TO 'your_user'@'localhost';
-- FLUSH PRIVILEGES;

-- ============================================================================
-- DATABASE SETUP COMPLETE!
-- ============================================================================
-- Next Steps:
-- 1. Configure api/config.php with your database credentials
-- 2. Upload API files to public_html/api/
-- 3. Test by visiting: https://yourdomain.com/api/jobs.php
-- 4. Login to admin panel: https://yourdomain.com/admin/login
--    Use: admin@mangosorange.com / password
-- 5. CHANGE THE DEFAULT PASSWORD IMMEDIATELY!
-- ============================================================================
