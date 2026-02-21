import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X, Upload, Send } from 'lucide-react';
import { careerAPI } from '@/lib/career-api';
import { toast } from 'sonner';
interface QuickApplicationModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}
const QuickApplicationModal = ({
  open,
  onClose,
  onSuccess
}: QuickApplicationModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleInputChange = (field: keyof typeof formData, value: string | File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      // Validate file type and size
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload a PDF or Word document');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error('File size must be less than 5MB');
        return;
      }
    }
    handleInputChange('resume', file);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.resume) {
      toast.error('Please fill in all required fields and upload your resume');
      return;
    }
    setIsSubmitting(true);
    try {
      // Upload resume first
      const resumeUrl = await careerAPI.uploadResume(formData.resume);
      if (!resumeUrl) {
        toast.error('Failed to upload resume. Please try again.');
        return;
      }

      // Submit application
      const success = await careerAPI.submitApplication({
        jobId: '',
        // General interest application
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        resumeUrl: resumeUrl,
        coverLetter: 'General interest application submitted via careers page'
      });
      if (success) {
        toast.success('Thank you for applying! Our HR team will contact you soon.');
        onSuccess();
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          resume: null
        });
      } else {
        toast.error('Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        resume: null
      });
    }
  };
  return <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Submit Your Resume
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="quick-name">
              Full Name *
            </label>
            <Input id="quick-name" type="text" placeholder="Enter your full name" value={formData.name} onChange={e => handleInputChange('name', e.target.value)} required disabled={isSubmitting} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="quick-email">
              Email Address *
            </label>
            <Input id="quick-email" type="email" placeholder="your.email@example.com" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} required disabled={isSubmitting} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="quick-phone">
              Phone Number
            </label>
            <Input id="quick-phone" type="tel" placeholder="Your phone number" value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} disabled={isSubmitting} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="quick-resume">
              Upload Resume *
            </label>
            <div className="flex items-center gap-3">
              <Input id="quick-resume" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} required disabled={isSubmitting} className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 h-10 p-0" />
              <Upload className="w-5 h-5 text-gray-500" />
            </div>
            {formData.resume && <p className="text-sm text-green-600">
                Selected: {formData.resume.name}
              </p>}
            <p className="text-xs text-gray-500">
              Supported formats: PDF, DOC, DOCX (Max 5MB)
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
              {isSubmitting ? <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Submitting...
                </> : <>
                  Submit
                  <Send className="w-4 h-4 ml-2" />
                </>}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>;
};
export default QuickApplicationModal;