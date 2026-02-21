import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { careerAPI } from '@/lib/career-api';
import { toast } from 'sonner';
import { Upload, Send, Heart, Users } from 'lucide-react';

interface WorkWithUsFormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  resume: File | null;
  coverLetter: string;
}

const WorkWithUsSection = () => {
  const [formData, setFormData] = useState<WorkWithUsFormData>({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    resume: null,
    coverLetter: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    ref: sectionRef,
    isVisible: sectionVisible
  } = useScrollAnimation();

  const handleInputChange = (field: keyof WorkWithUsFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload a PDF or Word document');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
    }

    setFormData(prev => ({
      ...prev,
      resume: file
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.position || !formData.resume) {
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

      // Create a general interest application
      const success = await careerAPI.submitApplication({
        jobId: '', // General interest, not for a specific job
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        resumeUrl: resumeUrl,
        coverLetter: formData.coverLetter || undefined,
      });

      if (!success) {
        toast.error('Failed to submit application. Please try again.');
        return;
      }

      toast.success('Application submitted successfully! We\'ll be in touch soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        resume: null,
        coverLetter: ''
      });
      
      // Reset file input
      const fileInput = document.getElementById('resume-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className={`py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-br from-secondary/5 via-background to-primary/5 fade-up ${sectionVisible ? 'visible' : ''}`}
    >
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-primary" />
            <Users className="w-6 h-6 text-secondary" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Interested in Working With Us?
          </h2>
          <p className="text-base sm:text-lg text-gray-800 max-w-2xl mx-auto px-4">
            Don't see the perfect role? We're always looking for talented individuals to join our team. 
            Share your details and we'll reach out when opportunities align with your skills.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-center text-foreground">
              Submit Your Interest
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground" htmlFor="name">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground" htmlFor="email">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground" htmlFor="phone">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground" htmlFor="position">
                    Area of Interest *
                  </label>
                  <Select value={formData.position} onValueChange={(value) => handleInputChange('position', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your area of interest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Software Development">Software Development</SelectItem>
                      <SelectItem value="Cloud Engineering">Cloud Engineering</SelectItem>
                      <SelectItem value="DevOps">DevOps</SelectItem>
                      <SelectItem value="IT Consulting">IT Consulting</SelectItem>
                      <SelectItem value="Project Management">Project Management</SelectItem>
                      <SelectItem value="Business Analysis">Business Analysis</SelectItem>
                      <SelectItem value="Quality Assurance">Quality Assurance</SelectItem>
                      <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                      <SelectItem value="Sales & Marketing">Sales & Marketing</SelectItem>
                      <SelectItem value="Human Resources">Human Resources</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground" htmlFor="experience">
                  Experience Level
                </label>
                <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fresh Graduate">Fresh Graduate (0-1 years)</SelectItem>
                    <SelectItem value="Junior">Junior (1-3 years)</SelectItem>
                    <SelectItem value="Mid-level">Mid-level (3-5 years)</SelectItem>
                    <SelectItem value="Senior">Senior (5-8 years)</SelectItem>
                    <SelectItem value="Lead">Lead (8+ years)</SelectItem>
                    <SelectItem value="Executive">Executive/Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground" htmlFor="resume-upload">
                  Resume/CV *
                </label>
                <div className="flex items-center gap-3">
                  <Input
                    id="resume-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    required
                  />
                  <Upload className="w-5 h-5 text-gray-500" />
                </div>
                {formData.resume && (
                  <p className="text-sm text-green-600">
                    Selected: {formData.resume.name}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Supported formats: PDF, DOC, DOCX (Max 5MB)
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground" htmlFor="cover-letter">
                  Tell us about yourself
                </label>
                <Textarea
                  id="cover-letter"
                  placeholder="Share your background, interests, and what excites you about working with MangosOrange..."
                  value={formData.coverLetter}
                  onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="flex justify-center pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 text-base font-medium"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            By submitting this form, you agree to our privacy policy and consent to being contacted by our team.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WorkWithUsSection;
