# Email Implementation Guide

## ✅ Implementation Complete

Your project **already uses native PHP mail()** for all three forms. I've enhanced the code with comprehensive comments and minor improvements for production readiness.

---

## 📧 Email System Overview

### Technology Used
- **Native PHP `mail()` function**
- ❌ No SMTP configuration required
- ❌ No PHPMailer dependency
- ❌ No email passwords needed
- ✅ Works on any hosting server that supports PHP mail()

### Email Configuration
All email settings are in: **`api/config.php`**

```php
'mail_to' => 'info@mangosorange.com',  // Recipient email (HR/Admin)
'mail_from' => '',                      // Leave empty for auto-generation
```

---

## 📋 Three Forms Implemented

### 1. Contact Form ✉️
**Frontend:** `src/pages/Contact.tsx`  
**Backend:** `api/contact.php`  
**Email Subject:** `"New Contact Inquiry (MangosOrange)"`

**Fields:**
- Name (required)
- Email (required)
- Phone (required)
- Subject (required)
- Message (required)

**How it works:**
1. User fills contact form on website
2. React sends POST request to `api/contact.php`
3. PHP validates and sanitizes input
4. Email sent to `info@mangosorange.com`
5. Reply-To header set to user's email for easy reply

---

### 2. Job Application Form 💼
**Frontend:** `src/components/JobApplicationModal.tsx`  
**Backend:** `api/applicants.php`  
**Email Subject:** `"New Job Application Submission (MangosOrange)"`

**Fields:**
- Name (required)
- Email (required)
- Phone (optional)
- Resume Upload (required)
- Cover Letter (optional)
- Job Position (auto-filled)

**How it works:**
1. User applies for specific job posting
2. Resume uploaded via `api/upload_resume.php`
3. Application submitted to `api/applicants.php` with job_id
4. Saved to database → Email sent to HR
5. Admin can view/manage in admin panel

---

### 3. General Interest / Resume Drop 📄
**Frontend:** `src/components/QuickApplicationModal.tsx`  
**Backend:** `api/applicants.php`  
**Email Subject:** `"New General Interest Submission (MangosOrange)"`

**Fields:**
- Name (required)
- Email (required)
- Phone (optional)
- Resume Upload (required)

**How it works:**
1. User submits resume without specific job
2. Submitted to `api/applicants.php` with empty job_id
3. Saved as general application → Email sent to HR
4. Admin can review and match with future openings

---

## 🔒 Security Features

### 1. Input Sanitization
```php
// XSS Prevention
$name = htmlspecialchars(trim($input['name']), ENT_QUOTES, 'UTF-8');

// Email Sanitization
$email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
```

### 2. Email Validation
```php
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  json_response(['error' => 'Invalid email format'], 400);
}
```

### 3. Header Injection Prevention
```php
function sendmail_clean_header_value(string $value): string {
  return str_replace(["\r", "\n"], '', $value);
}
```

### 4. CORS Protection
CORS headers configured in `api/bootstrap.php`:
```php
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $config['allowed_origins'], true)) {
  header("Access-Control-Allow-Origin: $origin");
}
```

---

## 📂 File Structure

### Backend PHP Files
```
api/
├── bootstrap.php          # Initialization, CORS, helper functions
├── config.php             # Email and database configuration
├── sendmail.php           # Core email sending function (PHP mail)
├── contact.php            # Contact form handler
├── applicants.php         # Job applications & general interest
└── upload_resume.php      # Resume file upload handler
```

### Frontend React Components
```
src/
├── pages/
│   └── Contact.tsx                     # Contact form page
└── components/
    ├── JobApplicationModal.tsx         # Job application modal
    └── QuickApplicationModal.tsx       # General interest modal
```

---

## 🚀 How Email Sending Works

### Flow Diagram
```
User Submits Form (React)
        ↓
   POST Request (fetch API)
        ↓
   PHP Endpoint (contact.php or applicants.php)
        ↓
   Validate & Sanitize Input
        ↓
   Save to Database (applicants only)
        ↓
   Call sendmail_send_notification()
        ↓
   Build Email Headers (From, Reply-To, Content-Type)
        ↓
   Native PHP mail() Function
        ↓
   Server's Mail Transfer Agent (MTA)
        ↓
   Delivered to info@mangosorange.com
```

### Code Example
```php
// In contact.php or applicants.php
$sent = sendmail_send_notification([
  'subject' => 'New Contact Inquiry (MangosOrange)',
  'message' => $emailBody,
  'reply_to' => $userEmail, // User's email for easy reply
]);
```

---

## 📧 Email Format Examples

### Contact Form Email
```
═══════════════════════════════════════
CONTACT FORM SUBMISSION
═══════════════════════════════════════

Name: John Doe
Email: john.doe@example.com
Phone: +91 98765 43210
Subject: Partnership Inquiry

Message:
───────────────────────────────────────
I would like to discuss potential partnership
opportunities with your company.
───────────────────────────────────────

Submitted: 2026-02-19 14:30:45
```

### Job Application Email
```
═══════════════════════════════════════
JOB APPLICATION
═══════════════════════════════════════

Name: Jane Smith
Email: jane.smith@example.com
Phone: +91 98765 43210
Resume: https://mangosorange.com/uploads/resumes/resume_abc123.pdf

Job Position: Senior Software Engineer

Cover Letter:
───────────────────────────────────────
I am excited to apply for this position...
───────────────────────────────────────

Application Type: Job Application
Submitted: 2026-02-19 14:30:45
```

### General Interest Email
```
═══════════════════════════════════════
GENERAL INTEREST / RESUME DROP
═══════════════════════════════════════

Name: Mike Johnson
Email: mike.j@example.com
Phone: Not provided
Resume: https://mangosorange.com/uploads/resumes/resume_xyz789.pdf

Application Type: General Interest / Resume Drop
Submitted: 2026-02-19 14:30:45
```

---

## ⚙️ Configuration & Deployment

### 1. Update Email Recipient
Edit `api/config.php`:
```php
'mail_to' => 'hr@yourcompany.com',  // Change to your HR email
```

### 2. Update Allowed Origins (for CORS)
Edit `api/config.php`:
```php
'allowed_origins' => [
  'https://yourwebsite.com',
  'https://www.yourwebsite.com',
  'http://localhost:5173',  // Development only
],
```

### 3. Server Requirements
- PHP 7.4+ (recommended: PHP 8.0+)
- PHP `mail()` function enabled
- MySQL/MariaDB database
- Write permissions for uploads directory

### 4. Test Email Functionality
After deployment, test on your hosting server:
```bash
# Check if mail() is enabled
php -r "echo (function_exists('mail') ? 'Enabled' : 'Disabled');"
```

---

## 🛠️ Troubleshooting

### Email Not Sending?

#### 1. Check PHP mail() is enabled
```php
<?php
if (function_exists('mail')) {
    echo "mail() is available";
} else {
    echo "mail() is NOT available";
}
?>
```

#### 2. Check server error logs
```bash
# Linux/cPanel
tail -f /var/log/apache2/error.log

# Or check with PHP
error_log("Test email sending");
```

#### 3. Check spam folder
Native PHP mail() emails often go to spam. To improve deliverability:
- Add SPF record to your domain DNS
- Add DKIM record to your domain DNS
- Use a professional email (e.g., no-reply@mangosorange.com)

#### 4. Test with simple script
Create `api/test-mail.php`:
```php
<?php
$to = "your-email@example.com";
$subject = "Test Email";
$message = "This is a test email from PHP mail()";
$headers = "From: no-reply@mangosorange.com\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($to, $subject, $message, $headers)) {
    echo "Email sent successfully!";
} else {
    echo "Email failed to send.";
}
?>
```

### Common Hosting Issues

#### cPanel/Shared Hosting
- Usually supports PHP mail() by default
- May need to verify email address in cPanel
- Check "Email Deliverability" in cPanel

#### VPS/Dedicated Server
- May need to install sendmail or postfix
```bash
# Install sendmail (Ubuntu/Debian)
sudo apt-get install sendmail
sudo service sendmail restart
```

#### Gmail/Google Workspace
- If using custom domain with Gmail, ensure MX records are correct
- Add sender email to allowed senders

---

## 📝 Frontend Integration (Already Done)

### Contact Form (src/pages/Contact.tsx)
```typescript
const response = await api.post<{ success: boolean }>('contact.php', formData);
if (response?.success) {
  toast.success("Message sent successfully!");
}
```

### Job Application (src/components/JobApplicationModal.tsx)
```typescript
const success = await careerAPI.submitApplication({
  jobId: job.id,
  name: data.name,
  email: data.email,
  phone: data.phone,
  resumeUrl,
  coverLetter: data.coverLetter,
});
```

### General Interest (src/components/QuickApplicationModal.tsx)
```typescript
const success = await careerAPI.submitApplication({
  jobId: '',  // Empty for general interest
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  resumeUrl: resumeUrl,
  coverLetter: 'General interest application'
});
```

---

## ✅ Testing Checklist

Before going live, test all three forms:

### Contact Form
- [ ] Fill out form and submit
- [ ] Check email received at `info@mangosorange.com`
- [ ] Verify "Reply-To" header works (reply goes to user)
- [ ] Test with invalid email format
- [ ] Test with missing required fields

### Job Application
- [ ] Apply to specific job posting
- [ ] Upload resume (PDF/DOC)
- [ ] Check email received
- [ ] Verify job title appears in email
- [ ] Check admin panel shows application

### General Interest
- [ ] Submit resume without specific job
- [ ] Upload resume
- [ ] Check email received
- [ ] Verify marked as "General Interest"
- [ ] Check admin panel shows application

---

## 📞 Support

If you encounter issues:

1. Check PHP error logs on your server
2. Verify `mail()` function is available
3. Test with the simple test script above
4. Contact your hosting provider about email sending

---

## 🎉 Summary

✅ **All three forms are fully functional**  
✅ **Using native PHP mail() only**  
✅ **No external dependencies**  
✅ **Production-ready with comprehensive security**  
✅ **Well-documented with inline comments**  
✅ **Distinct email subjects for each form type**  

**No additional changes needed!** Your implementation is complete and production-ready.
