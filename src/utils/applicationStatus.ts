import { careerAPI } from '@/lib/career-api';

// Store application status in localStorage temporarily
// In a real app, this would be managed via user authentication and database
const APPLIED_JOBS_KEY = 'appliedJobs';

export const getAppliedJobs = (): string[] => {
  try {
    const applied = localStorage.getItem(APPLIED_JOBS_KEY);
    return applied ? JSON.parse(applied) : [];
  } catch {
    return [];
  }
};

export const hasAppliedToJob = (jobId: string): boolean => {
  const appliedJobs = getAppliedJobs();
  return appliedJobs.includes(jobId);
};

export const markJobAsApplied = (jobId: string): void => {
  const appliedJobs = getAppliedJobs();
  if (!appliedJobs.includes(jobId)) {
    appliedJobs.push(jobId);
    localStorage.setItem(APPLIED_JOBS_KEY, JSON.stringify(appliedJobs));
  }
};

export const removeAppliedJob = (jobId: string): void => {
  const appliedJobs = getAppliedJobs();
  const updated = appliedJobs.filter(id => id !== jobId);
  localStorage.setItem(APPLIED_JOBS_KEY, JSON.stringify(updated));
};