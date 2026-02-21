import { JobPosting, Applicant, DashboardStats } from '@/types/career';
import { api } from '@/lib/api';

const unwrapArray = (payload: any): any[] => {
  if (Array.isArray(payload)) return payload;
  if (payload?.data && Array.isArray(payload.data)) return payload.data;
  if (payload?.items && Array.isArray(payload.items)) return payload.items;
  return [];
};

const unwrapObject = (payload: any): any | null => {
  if (!payload) return null;
  if (Array.isArray(payload)) return payload[0] || null;
  if (payload?.data && !Array.isArray(payload.data)) return payload.data;
  return payload;
};

const readJson = async (response: Response): Promise<any | null> => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== 'string') {
        reject(new Error('Failed to read file'));
        return;
      }
      const commaIdx = result.indexOf(',');
      resolve(commaIdx >= 0 ? result.slice(commaIdx + 1) : result);
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });

export const careerAPI = {
  // ------------------------------
  // Job Postings
  // ------------------------------
  async getJobPostings(includeHidden = false): Promise<JobPosting[]> {
    try {
      const endpoint = includeHidden ? 'jobs.php?includeHidden=1' : 'jobs.php';
      const response = await api.get<any>(endpoint);
      const rows = unwrapArray(response);

      return rows.map((job: any) => ({
        id: String(job.id),
        title: job.title,
        department: job.department,
        type: job.type as JobPosting['type'],
        location: job.location,
        experience: job.experience,
        salary: job.salary,
        description: job.description,
        responsibilities: job.responsibilities,
        requirements: job.requirements,
        deadline: job.deadline,
        status: job.status as JobPosting['status'],
        isVisible: Boolean(job.is_visible),
        createdAt: job.created_at,
        updatedAt: job.updated_at,
        applicantCount: Number(job.applicant_count || 0),
      }));
    } catch (error) {
      console.error('Error fetching job postings:', error);
      return [];
    }
  },

  async getJobPosting(id: string): Promise<JobPosting | null> {
    try {
      const response = await api.get<any>(`jobs.php?id=${encodeURIComponent(id)}`);
      const data = unwrapObject(response);
      if (!data) return null;

      return {
        id: String(data.id),
        title: data.title,
        department: data.department,
        type: data.type as JobPosting['type'],
        location: data.location,
        experience: data.experience,
        salary: data.salary,
        description: data.description,
        responsibilities: data.responsibilities,
        requirements: data.requirements,
        deadline: data.deadline,
        status: data.status as JobPosting['status'],
        isVisible: Boolean(data.is_visible),
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };
    } catch (error) {
      console.error('Error fetching job posting:', error);
      return null;
    }
  },

  async createJobPosting(
    job: Omit<JobPosting, 'id' | 'createdAt' | 'updatedAt' | 'applicantCount'>
  ): Promise<JobPosting | null> {
    try {
      console.log('Creating job posting with data:', job);

      const response = await api.post<any>('jobs.php', {
        title: job.title,
        department: job.department,
        type: job.type,
        location: job.location,
        experience: job.experience,
        salary: job.salary,
        description: job.description,
        responsibilities: job.responsibilities,
        requirements: job.requirements,
        deadline: job.deadline,
        status: job.status,
        is_visible: job.isVisible,
      });

      const data = unwrapObject(response) || {};
      const id = data.id ? String(data.id) : 'new';

      return {
        id,
        title: data.title ?? job.title,
        department: data.department ?? job.department,
        type: (data.type ?? job.type) as JobPosting['type'],
        location: data.location ?? job.location,
        experience: data.experience ?? job.experience,
        salary: data.salary ?? job.salary,
        description: data.description ?? job.description,
        responsibilities: data.responsibilities ?? job.responsibilities,
        requirements: data.requirements ?? job.requirements,
        deadline: data.deadline ?? job.deadline,
        status: (data.status ?? job.status) as JobPosting['status'],
        isVisible: Boolean(data.is_visible ?? job.isVisible),
        createdAt: data.created_at ?? new Date().toISOString(),
        updatedAt: data.updated_at ?? new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error creating job posting:', error);
      return null;
    }
  },

  async updateJobPosting(id: string, updates: Partial<JobPosting>): Promise<boolean> {
    try {
      const updateData: any = {};

      if (updates.title !== undefined) updateData.title = updates.title;
      if (updates.department !== undefined) updateData.department = updates.department;
      if (updates.type !== undefined) updateData.type = updates.type;
      if (updates.location !== undefined) updateData.location = updates.location;
      if (updates.experience !== undefined) updateData.experience = updates.experience;
      if (updates.salary !== undefined) updateData.salary = updates.salary;
      if (updates.description !== undefined) updateData.description = updates.description;
      if (updates.responsibilities !== undefined) updateData.responsibilities = updates.responsibilities;
      if (updates.requirements !== undefined) updateData.requirements = updates.requirements;
      if (updates.deadline !== undefined) updateData.deadline = updates.deadline;
      if (updates.status !== undefined) updateData.status = updates.status;
      if (updates.isVisible !== undefined) updateData.is_visible = updates.isVisible;

      await api.put<{ success: boolean }>(`jobs.php?id=${encodeURIComponent(id)}`, {
        id,
        ...updateData,
      });
      return true;
    } catch (error) {
      console.error('Error updating job posting:', error);
      return false;
    }
  },

  async deleteJobPosting(id: string): Promise<boolean> {
    try {
      await api.delete<{ success: boolean }>(`jobs.php?id=${encodeURIComponent(id)}`);
      return true;
    } catch (error) {
      console.error('Error deleting job posting:', error);
      return false;
    }
  },

  // ------------------------------
  // Applicants
  // ------------------------------
  async getApplicants(jobId?: string): Promise<Applicant[]> {
    try {
      const endpoint = jobId ? `applicants.php?job_id=${encodeURIComponent(jobId)}` : 'applicants.php';
      const response = await api.get<any>(endpoint);
      const rows = unwrapArray(response);

      return rows.map((applicant: any) => ({
        id: String(applicant.id),
        jobId: applicant.job_id ? String(applicant.job_id) : '',
        name: applicant.name || '',
        email: applicant.email || '',
        phone: applicant.phone || '',
        resumeUrl: applicant.resume_url || '',
        coverLetter: applicant.cover_letter || '',
        status: applicant.status || 'Applied',
        notes: applicant.notes || '',
        appliedAt: applicant.applied_at,
        updatedAt: applicant.updated_at,
        jobTitle: applicant.job_title || '',
      }));
    } catch (error) {
      console.error('Error fetching applicants:', error);
      return [];
    }
  },

  async updateApplicantStatus(
    id: string,
    status: Applicant['status'],
    notes?: string
  ): Promise<boolean> {
    try {
      await api.put<{ success: boolean }>('applicants.php', {
        id,
        status,
        notes,
      });
      return true;
    } catch (error) {
      console.error('Error updating applicant status:', error);
      return false;
    }
  },

  async submitApplication(application: {
    jobId: string;
    name: string;
    email: string;
    phone?: string;
    resumeUrl: string;
    coverLetter?: string;
  }): Promise<boolean> {
    const body = new URLSearchParams();
    if (application.jobId) body.append('jobId', application.jobId);
    body.append('name', application.name);
    body.append('email', application.email);
    if (application.phone) body.append('phone', application.phone);
    body.append('resumeUrl', application.resumeUrl);
    if (application.coverLetter) body.append('coverLetter', application.coverLetter);

    try {
      const response = await fetch('/applicants.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: body.toString(),
      });

      const data = await readJson(response);
      return Boolean(response.ok && data?.success);
    } catch (error) {
      console.error('Error submitting application:', error);
      return false;
    }
  },

  async getGeneralApplications(): Promise<Applicant[]> {
    try {
      const response = await api.get<any>('applicants.php?general=1');
      const rows = unwrapArray(response);

      return rows.map((applicant: any) => ({
        id: String(applicant.id),
        jobId: '',
        name: applicant.name || '',
        email: applicant.email || '',
        phone: applicant.phone || '',
        resumeUrl: applicant.resume_url || '',
        coverLetter: applicant.cover_letter || '',
        status: applicant.status || 'Applied',
        notes: applicant.notes || '',
        appliedAt: applicant.applied_at,
        updatedAt: applicant.updated_at,
      }));
    } catch (error) {
      console.error('Error fetching general applications:', error);
      return [];
    }
  },

  // ------------------------------
  // Dashboard Stats
  // ------------------------------
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const [jobsResponse, applicantsResponse] = await Promise.all([
        api.get<any>('jobs.php?includeHidden=1'),
        api.get<any>('applicants.php'),
      ]);

      const jobs = unwrapArray(jobsResponse);
      const applicants = unwrapArray(applicantsResponse);

      const totalJobs = jobs.length;
      const activeJobs = jobs.filter((j: any) => j.status === 'Active').length;
      const totalApplicants = applicants.length;
      const pendingApplications = applicants.filter((a: any) => (a.status || 'Applied') === 'Applied').length;

      const recentApplications = applicants
        .slice()
        .sort((a: any, b: any) => {
          const aTime = new Date(a.applied_at || 0).getTime();
          const bTime = new Date(b.applied_at || 0).getTime();
          return bTime - aTime;
        })
        .slice(0, 5)
        .map((applicant: any) => ({
          id: String(applicant.id),
          jobId: applicant.job_id ? String(applicant.job_id) : '',
          name: applicant.name || '',
          email: applicant.email || '',
          phone: applicant.phone || '',
          resumeUrl: applicant.resume_url || '',
          coverLetter: applicant.cover_letter || '',
          status: applicant.status || 'Applied',
          notes: applicant.notes || '',
          appliedAt: applicant.applied_at,
          updatedAt: applicant.updated_at,
          jobTitle: applicant.job_title || '',
        }));

      return {
        totalJobs,
        activeJobs,
        totalApplicants,
        pendingApplications,
        recentApplications,
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return {
        totalJobs: 0,
        activeJobs: 0,
        totalApplicants: 0,
        pendingApplications: 0,
        recentApplications: [],
      };
    }
  },

  // ------------------------------
  // File Upload
  // ------------------------------
  async uploadResume(file: File): Promise<string | null> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('/upload_resume.php', {
        method: 'POST',
        body: formData,
      });
      const data = await readJson(response);
      if (response.ok && data?.url) {
        return data.url as string;
      }
    } catch (error) {
      console.error('Primary upload failed:', error);
    }

    try {
      // Fallback for hosts where multipart/form-data is blocked by WAF/mod_security.
      const base64 = await fileToBase64(file);
      const response = await fetch('/upload_resume.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: file.name,
          file_base64: base64,
        }),
      });
      const data = await readJson(response);
      if (response.ok && data?.url) {
        return data.url as string;
      }
    } catch (error) {
      console.error('Fallback upload failed:', error);
    }

    return null;
  },
};
