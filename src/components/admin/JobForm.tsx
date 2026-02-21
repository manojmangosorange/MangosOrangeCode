import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { JobPosting } from '@/types/career';
import { careerAPI } from '@/lib/career-api';
import { parseJobDescriptionFile } from '@/utils/fileParser';
import { toast } from 'sonner';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Upload, FileText } from 'lucide-react';

const jobSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  department: z.string().min(1, 'Department is required'),
  type: z.enum(['Full-time', 'Part-time', 'Internship', 'Freelance']),
  location: z.string().min(1, 'Location is required'),
  experience: z.string().min(1, 'Experience requirement is required'),
  salary: z.string().optional(),
  description: z.string().min(1, 'Job description is required'),
  responsibilities: z.string().min(1, 'Responsibilities are required'),
  requirements: z.string().min(1, 'Requirements are required'),
  deadline: z.string().min(1, 'Application deadline is required'),
  status: z.enum(['Active', 'Draft', 'Closed']),
  isVisible: z.boolean(),
});

type JobFormData = z.infer<typeof jobSchema>;

interface JobFormProps {
  job?: JobPosting;
  onSuccess: () => void;
  onCancel: () => void;
}

const JobForm = ({ job, onSuccess, onCancel }: JobFormProps) => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  const form = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: job?.title || '',
      department: job?.department || '',
      type: job?.type || 'Full-time',
      location: job?.location || '',
      experience: job?.experience || '',
      salary: job?.salary || '',
      description: job?.description || '',
      responsibilities: job?.responsibilities || '',
      requirements: job?.requirements || '',
      deadline: job?.deadline || '',
      status: job?.status || 'Active',
      isVisible: job?.isVisible ?? true,
    },
  });

  const onSubmit = async (data: JobFormData) => {
    setLoading(true);
    try {
      console.log('Submitting job form data:', data);
      
      let success = false;
      
      if (job) {
        console.log('Updating existing job:', job.id);
        success = await careerAPI.updateJobPosting(job.id, data);
        if (success) {
          toast.success('Job posting updated successfully');
        } else {
          toast.error('Failed to update job posting');
        }
      } else {
        console.log('Creating new job posting');
        const newJob = await careerAPI.createJobPosting(data);
        success = !!newJob;
        if (success) {
          toast.success('Job posting created successfully');
        } else {
          toast.error('Failed to create job posting');
        }
      }

      if (success) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error saving job:', error);
      toast.error('An error occurred while saving');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a PDF or Word document');
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    setUploading(true);
    setUploadedFile(file);

    try {
      toast.info('Parsing job description file...');
      const parsedData = await parseJobDescriptionFile(file);
      
      // Auto-fill form fields with parsed data
      if (parsedData.title) form.setValue('title', parsedData.title);
      if (parsedData.department) form.setValue('department', parsedData.department);
      if (parsedData.location) form.setValue('location', parsedData.location);
      if (parsedData.experience) form.setValue('experience', parsedData.experience);
      if (parsedData.salary) form.setValue('salary', parsedData.salary);
      if (parsedData.description) form.setValue('description', parsedData.description);
      if (parsedData.responsibilities) form.setValue('responsibilities', parsedData.responsibilities);
      if (parsedData.requirements) form.setValue('requirements', parsedData.requirements);

      toast.success('Job description parsed successfully! Please review and adjust the fields as needed.');
    } catch (error) {
      console.error('Error parsing file:', error);
      toast.error('Failed to parse job description file. Please fill the form manually.');
    } finally {
      setUploading(false);
    }
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>
          {job ? 'Edit Job Posting' : 'Create New Job Posting'}
        </CardTitle>
        {!job && (
          <div className="text-sm text-gray-800">
            You can upload a job description file (PDF/DOCX) to auto-fill the form fields, or fill them manually.
          </div>
        )}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* File Upload Section - Only show for new jobs */}
            {!job && (
              <div className="space-y-2 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <label className="text-sm font-medium text-foreground">
                  Upload Job Description File (Optional)
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="jd-upload"
                    disabled={uploading}
                  />
                  <label
                    htmlFor="jd-upload"
                    className={`cursor-pointer flex flex-col items-center gap-2 ${uploading ? 'opacity-50' : ''}`}
                  >
                    {uploadedFile ? (
                      <>
                        <FileText className="w-8 h-8 text-primary" />
                        <div className="text-sm font-medium text-foreground">
                          {uploadedFile.name}
                        </div>
                        <div className="text-xs text-gray-800">
                          {uploading ? 'Parsing...' : 'Click to change file'}
                        </div>
                      </>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-gray-800" />
                        <div className="text-sm font-medium text-foreground">
                          {uploading ? 'Parsing file...' : 'Upload Job Description'}
                        </div>
                        <div className="text-xs text-gray-800">
                          PDF, DOC, or DOCX (max 10MB)
                        </div>
                      </>
                    )}
                  </label>
                </div>
                <div className="text-xs text-gray-800">
                  The system will automatically extract job details and fill the form fields below.
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Senior Software Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Engineering" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                        <SelectItem value="Freelance">Freelance</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Noida / Remote / Hybrid" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience Required *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 3-5 years" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. ₹8-12 LPA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application Deadline *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description *</FormLabel>
                  <FormControl>
                    <div className="min-h-[200px]">
                      <ReactQuill
                        theme="snow"
                        value={field.value}
                        onChange={field.onChange}
                        modules={quillModules}
                        placeholder="Describe the role, company, and what makes this opportunity exciting..."
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="responsibilities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Responsibilities *</FormLabel>
                  <FormControl>
                    <div className="min-h-[150px]">
                      <ReactQuill
                        theme="snow"
                        value={field.value}
                        onChange={field.onChange}
                        modules={quillModules}
                        placeholder="List the main responsibilities and duties..."
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requirements & Qualifications *</FormLabel>
                  <FormControl>
                    <div className="min-h-[150px]">
                      <ReactQuill
                        theme="snow"
                        value={field.value}
                        onChange={field.onChange}
                        modules={quillModules}
                        placeholder="List required skills, qualifications, and experience..."
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isVisible"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Visible on Career Page
                    </FormLabel>
                    <div className="text-sm text-gray-800">
                      Make this job posting visible to candidates on the public career page
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex gap-4 pt-6">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? 'Saving...' : job ? 'Update Job' : 'Create Job'}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default JobForm;