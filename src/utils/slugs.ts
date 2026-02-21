export const generateJobSlug = (job: { id: string; title: string }): string => {
  // Create a slug from the job title
  const titleSlug = job.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/-+/g, '-') // Replace multiple dashes with single dash
    .trim();
  
  // Take first 6 characters of ID for uniqueness
  const shortId = job.id.substring(0, 6);
  
  return `${titleSlug}-${shortId}`;
};

export const extractJobIdFromSlug = (slug: string): string => {
  // Extract the last part after the final dash (should be the short ID)
  const parts = slug.split('-');
  return parts[parts.length - 1];
};

export const findJobBySlug = (jobs: Array<{ id: string; title: string }>, slug: string) => {
  const shortId = extractJobIdFromSlug(slug);
  return jobs.find(job => job.id.startsWith(shortId));
};