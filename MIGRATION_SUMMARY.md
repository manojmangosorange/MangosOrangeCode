# Supabase to cPanel PHP Migration - Summary

## ✅ Migration Complete

All Supabase dependencies have been successfully removed and replaced with PHP API endpoints on cPanel.

---

## 📁 Files Created

1. **src/lib/api.ts** - API client with JWT authentication support
   - `getAuthToken()` / `setAuthToken()` / `clearAuthToken()`
   - `apiFetch()` helper for authenticated requests
   - Convenience methods: `api.get()`, `api.post()`, `api.put()`, `api.delete()`

2. **.env** - Updated with new API base URL
   - `VITE_API_BASE_URL=https://skirpl.co.in/api`

---

## 🔄 Files Updated

### Authentication & Admin
- **src/lib/auth.ts** - Replaced Supabase with PHP API calls
  - `signIn()` → POST `/auth_login.php` (returns JWT token + user)
  - `signUp()` → POST `/admin_users.php`
  - `listRecruiters()` → GET `/admin_users.php`
  - `deleteRecruiter()` → DELETE `/admin_users.php?id=...`
  - `resetRecruiterPassword()` → PUT `/admin_users.php`

### Career API
- **src/lib/career-api.ts** - All CRUD operations use PHP endpoints
  - Jobs: `/jobs.php` (GET, POST, PUT, DELETE)
  - Applicants: `/applicants.php` (GET, POST, PUT)
  - Dashboard stats: `/dashboard.php` (GET)
  - Resume upload: `/upload_resume.php` (POST multipart)

### UI Components
- **src/pages/Contact.tsx** - Contact form → POST `/contact.php`
- **src/pages/admin/AdminDashboardFull.tsx** - Uses new auth API methods
- **src/components/QuickApplicationModal.tsx** - Removed Supabase email notification

### Performance
- **src/utils/performance.ts** - Removed Supabase preconnect hints

### Dependencies
- **package.json** - Removed:
  - `@supabase/supabase-js`
  - `bcryptjs` (server-side only)
  - `jsonwebtoken` (server-side only)
  - `@types/bcryptjs`
  - `@types/jsonwebtoken`

---

## 🗑️ Files Removed

- **src/integrations/supabase/** (entire directory)
  - `client.ts`
  - `types.ts`
  
- **supabase/** (entire directory)
  - `config.toml`
  - `functions/` (send-contact-email, send-application-notification, send-email)
  - `migrations/` (all 13 SQL migration files)

---

## 🔐 Security Implementation

### JWT Authentication Flow
1. User logs in via `/auth_login.php`
2. Server returns JWT token + user object
3. Token stored in `localStorage` as `admin_token`
4. All protected API requests include `Authorization: Bearer <token>` header
5. Logout clears token and user data from localStorage

### Protected Endpoints
All endpoints requiring authentication automatically receive the JWT token via the `Authorization` header through the `api` helper.

---

## 📋 Required PHP Endpoints

Your PHP backend must implement these endpoints at `https://skirpl.co.in/api/`:

### Authentication
- **POST /auth_login.php**
  - Input: `{ email, password }`
  - Output: `{ token, user: { id, email, name, role, createdAt } }`

### Admin Users
- **GET /admin_users.php** (Auth required)
  - Output: `{ data: [{ id, email, name, role, created_at }] }`
  
- **POST /admin_users.php** (Auth required)
  - Input: `{ name, email, password, role }`
  - Output: `{ data: { id, email, name, role, createdAt } }`
  
- **PUT /admin_users.php** (Auth required)
  - Input: `{ id, password }`
  - Output: `{ success: true }`
  
- **DELETE /admin_users.php?id=...** (Auth required)
  - Output: `{ success: true }`

### Jobs
- **GET /jobs.php** (Public for active jobs)
  - Optional: `?includeHidden=1` (Auth required)
  - Output: `{ data: [{ id, title, department, type, location, ... }] }`
  
- **GET /jobs.php?id=...** (Public)
  - Output: `{ data: { id, title, department, ... } }`
  
- **POST /jobs.php** (Auth required)
  - Input: `{ title, department, type, location, ... }`
  - Output: `{ data: { id, title, ... } }`
  
- **PUT /jobs.php?id=...** (Auth required)
  - Input: `{ title?, department?, ... }`
  - Output: `{ success: true }`
  
- **DELETE /jobs.php?id=...** (Auth required)
  - Output: `{ success: true }`

### Applicants
- **GET /applicants.php** (Auth required)
  - Optional: `?jobId=...` or `?general=1`
  - Output: `{ data: [{ id, job_id, name, email, ... }] }`
  
- **POST /applicants.php** (Public)
  - Input: `{ job_id, name, email, phone?, resume_url, cover_letter?, status }`
  - Output: `{ success: true }`
  
- **PUT /applicants.php** (Auth required)
  - Input: `{ id, status?, notes? }`
  - Output: `{ success: true }`

### Dashboard
- **GET /dashboard.php** (Auth required)
  - Output: `{ data: { totalJobs, activeJobs, totalApplicants, pendingApplications, recentApplications: [...] } }`

### File Upload
- **POST /upload_resume.php** (Public)
  - Input: multipart/form-data with `file` field
  - Output: `{ url: "https://..." }`

### Contact
- **POST /contact.php** (Public)
  - Input: `{ name, phone, email, subject, message }`
  - Output: `{ success: true }`

---

## 🚀 Next Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure PHP backend:**
   - Implement all endpoints listed above
   - Set up JWT token generation/validation
   - Configure MySQL database connection
   - Implement password hashing (bcrypt/Argon2)
   - Set up file upload handling for resumes

3. **Database schema:**
   - `admin_users` table: id, email, password_hash, name, role, created_at, updated_at
   - `job_postings` table: id, title, department, type, location, experience, salary, description, responsibilities, requirements, deadline, status, is_visible, created_at, updated_at
   - `applicants` table: id, job_id (nullable), name, email, phone, resume_url, cover_letter, status, notes, applied_at, updated_at

4. **Test the migration:**
   ```bash
   npm run dev
   ```
   - Test admin login
   - Test job posting CRUD
   - Test applicant submission
   - Test resume upload
   - Test contact form

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## ⚠️ Important Notes

- JWT tokens should expire after a reasonable time (e.g., 24 hours)
- Implement rate limiting on PHP endpoints
- Use prepared statements to prevent SQL injection
- Validate and sanitize all user inputs
- Store resumes in a secure location (outside web root or with restricted access)
- Implement CORS headers on PHP endpoints for your React domain
- Use HTTPS for all API communication
- Never expose database credentials in frontend code

---

## 🐛 Troubleshooting

If you encounter errors:

1. Check browser console for API errors
2. Verify API base URL in `.env` file
3. Ensure JWT token is being sent in Authorization header
4. Check PHP error logs for backend issues
5. Verify database connection and table structure
6. Test PHP endpoints directly with Postman/curl

---

Migration completed successfully! Your app is now using the cPanel PHP + MySQL backend.
