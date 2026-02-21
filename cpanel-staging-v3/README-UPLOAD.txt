╔══════════════════════════════════════════════════════════════════════╗
║         🚀 CPANEL UPLOAD - SIMPLE 3-STEP PROCESS                    ║
╚══════════════════════════════════════════════════════════════════════╝

⚡ QUICK START - DO THIS NOW:
═══════════════════════════════════════════════════════════════════════

STEP 1: DATABASE (In cPanel) - 5 minutes
────────────────────────────────────────────────────────────────────────
1. cPanel → MySQL Databases → Create Database
   Name: mangosorange_careers

2. Create User → Set strong password

3. Add user to database with ALL PRIVILEGES

4. cPanel → phpMyAdmin → Select database → SQL tab
   → Copy entire contents of: database-setup.sql
   → Paste and click "Go"

✅ DONE! You now have 3 tables and a default admin user


STEP 2: CONFIGURE API (On your computer) - 2 minutes
────────────────────────────────────────────────────────────────────────
1. Open file: api/config.php

2. Change these lines:
   'name' => 'mangosorange_careers',     ← Your DB name from Step 1
   'user' => 'your_mysql_username',       ← From Step 1
   'pass' => 'your_mysql_password',       ← From Step 1
   'jwt_secret' => 'make-this-32-random-chars',

3. Save file

✅ DONE! API is configured


STEP 3: UPLOAD FILES (Using cPanel File Manager) - 10 minutes
────────────────────────────────────────────────────────────────────────

3A. Upload Frontend:
   1. Login to cPanel → File Manager
   2. Go to: public_html/
   3. Delete old files (if updating)
   4. Click "Upload"
   5. Drag ENTIRE dist/ folder contents:
      → All files in root (index.html, .htaccess, sitemap.xml, robots.txt)
      → All folders (js/, css/, images/, assets/, upload-image/, etc.)
   6. Wait for upload (shows progress)

3B. Upload Backend:
   1. In public_html/, create folder: api
   2. Open api/ folder
   3. Click "Upload"
   4. Upload ALL files from your local api/ folder

3C. Create Upload Folder:
   1. In public_html/, create folder: resumes
   2. Right-click resumes → Permissions → Set to 755

✅ DONE! Everything is uploaded!


🧪 TEST IMMEDIATELY (Open these URLs):
═══════════════════════════════════════════════════════════════════════

1. https://yourdomain.com/
   → Should show homepage ✓

2. https://yourdomain.com/about
   → Should show about page (NOT 404) ✓

3. https://yourdomain.com/sitemap.xml
   → Should show XML with 42 URLs ✓

4. https://yourdomain.com/api/jobs.php
   → Should show: [] or job JSON ✓

5. https://yourdomain.com/admin/login
   → Login with: admin@mangosorange.com / password ✓


═══════════════════════════════════════════════════════════════════════

📦 WHAT'S IN YOUR dist/ FOLDER (Ready to upload):
═══════════════════════════════════════════════════════════════════════

✅ index.html                  Main app
✅ .htaccess                   Routing (CRITICAL!)  ⭐
✅ sitemap.xml                 SEO sitemap  ⭐
✅ robots.txt                  Search engines  ⭐
✅ js/ folder                  ~40 JavaScript files
✅ css/ folder                 ~5 stylesheets
✅ images/ folder              ~60+ optimized images
✅ assets/ folder              Fonts, icons
✅ upload-image/ folder        Logo files
✅ Empanelment/ folder         Client logos
✅ Other folders/files         Videos, resources

Total: ~163 files, 5.4 MB


📦 WHAT'S IN YOUR api/ FOLDER:
═══════════════════════════════════════════════════════════════════════

✅ bootstrap.php              Core API functions
✅ config.php                 DB configuration ⭐ (EDIT THIS!)
✅ auth_login.php             Login API
✅ jobs.php                   Job management
✅ applicants.php             Application management
✅ admin_users.php            User management
✅ sendmail.php               Shared email notification script
✅ contact.php                Contact form handler
✅ upload_resume.php          File upload handler

Total: 8 PHP files


═══════════════════════════════════════════════════════════════════════
⚠️  COMMON MISTAKES - AVOID THESE:
═══════════════════════════════════════════════════════════════════════

❌ Forgot to upload .htaccess
   → Result: All pages show 404 except homepage
   → Fix: Upload .htaccess from dist/ to public_html/

❌ Didn't configure config.php
   → Result: API errors, can't login
   → Fix: Edit api/config.php with correct DB credentials

❌ Didn't create resumes/ folder
   → Result: Resume upload fails
   → Fix: Create resumes/ folder with 755 permissions

❌ Uploaded to wrong folder
   → Result: Shows cPanel default page
   → Fix: Upload to public_html/, not public_html/dist/

❌ Didn't run database-setup.sql
   → Result: Can't login, tables don't exist
   → Fix: Run SQL script in phpMyAdmin


═══════════════════════════════════════════════════════════════════════
📚 REFERENCE DOCUMENTS CREATED:
═══════════════════════════════════════════════════════════════════════

DEPLOYMENT:
├── CPANEL-DEPLOYMENT.txt          ← Full detailed guide
├── UPLOAD-GUIDE-VISUAL.txt        ← Step-by-step with troubleshooting
├── UPLOAD-CHECKLIST.txt           ← Quick file list
└── This file (README)             ← Quick start

DATABASE:
└── database-setup.sql             ← Run this in phpMyAdmin

SITEMAP:
├── SITEMAP-TESTING.md             ← How to test sitemap
├── SITEMAP-QUICKSTART.txt         ← Sitemap quick reference
└── validate-sitemap.js            ← Validation script


═══════════════════════════════════════════════════════════════════════
🎯 PRIORITY CHECKLIST (Print and follow):
═══════════════════════════════════════════════════════════════════════

□ 1. Create MySQL database in cPanel
□ 2. Run database-setup.sql in phpMyAdmin
□ 3. Edit api/config.php with DB credentials
□ 4. Upload all dist/ contents to public_html/
□ 5. Upload all api/ files to public_html/api/
□ 6. Create public_html/resumes/ folder (755 permissions)
□ 7. Test: Homepage loads
□ 8. Test: About page loads (not 404)
□ 9. Test: sitemap.xml accessible
□ 10. Test: Admin login works (admin@mangosorange.com / password)
□ 11. Change default admin password!
□ 12. Test resume upload
□ 13. Submit sitemap to Google Search Console


═══════════════════════════════════════════════════════════════════════
💡 PRO TIPS:
═══════════════════════════════════════════════════════════════════════

✓ Use FileZilla if cPanel upload is slow
✓ Keep a backup of your config.php
✓ Check cPanel error logs if something breaks
✓ Change admin password immediately after first login
✓ Test on mobile after deployment
✓ Submit sitemap to search engines within 24 hours


═══════════════════════════════════════════════════════════════════════
⏱️  ESTIMATED TIME:
═══════════════════════════════════════════════════════════════════════

Database Setup:     5 minutes
Config API:         2 minutes  
Upload Files:      10 minutes
Testing:            5 minutes
─────────────────────────────
TOTAL:            ~22 minutes


═══════════════════════════════════════════════════════════════════════
❓ NEED HELP?
═══════════════════════════════════════════════════════════════════════

If something doesn't work:
1. Check cPanel → Error Log (shows PHP errors)
2. Check browser Console (F12) for JavaScript errors
3. Verify .htaccess is in public_html/ root
4. Verify config.php has correct DB credentials
5. Check file permissions (755 for folders, 644 for files)


═══════════════════════════════════════════════════════════════════════

🎉 YOU'RE READY TO DEPLOY!

Your files are prepared and organized.
Follow the 3 steps above, test, and you're live!

Good luck! 🚀

═══════════════════════════════════════════════════════════════════════
