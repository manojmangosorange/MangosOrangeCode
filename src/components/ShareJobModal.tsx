import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { JobPosting } from '@/types/career';
import { generateJobSlug } from '@/utils/slugs';
import { Share2, MessageCircle, Linkedin, Mail, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobPosting | null;
}

const ShareJobModal = ({ isOpen, onClose, job }: ShareJobModalProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);

  if (!job) return null;

  // Generate unique job URL with SEO-friendly slug
  const jobSlug = generateJobSlug(job);
  const jobUrl = `${window.location.origin}/careers/${jobSlug}`;
  const jobTitle = encodeURIComponent(`${job.title} at MangosOrange`);
  const jobDescription = encodeURIComponent(`Check out this ${job.type} position: ${job.title} in ${job.location}. Apply now!`);

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-500 hover:bg-green-600',
      action: () => {
        const whatsappUrl = `https://wa.me/?text=${jobDescription}%20${encodeURIComponent(jobUrl)}`;
        window.open(whatsappUrl, '_blank');
      }
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => {
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(jobUrl)}`;
        window.open(linkedinUrl, '_blank');
      }
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-gray-600 hover:bg-gray-700',
      action: () => {
        const subject = encodeURIComponent(`Job Opportunity: ${job.title}`);
        const body = encodeURIComponent(`Hi,\n\nI wanted to share this job opportunity with you:\n\n${job.title}\n${job.department} • ${job.location}\n\n${job.description.replace(/<[^>]*>/g, '').substring(0, 200)}...\n\nView full details and apply: ${jobUrl}\n\nBest regards`);
        const emailUrl = `mailto:?subject=${subject}&body=${body}`;
        window.location.href = emailUrl;
      }
    },
    {
      name: 'Copy Link',
      icon: copied ? Check : Copy,
      color: 'bg-primary hover:bg-primary/90',
      action: async () => {
        try {
          await navigator.clipboard.writeText(jobUrl);
          setCopied(true);
          toast({
            title: "Link copied!",
            description: "Job link has been copied to your clipboard.",
          });
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = jobUrl;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          setCopied(true);
          toast({
            title: "Link copied!",
            description: "Job link has been copied to your clipboard.",
          });
          setTimeout(() => setCopied(false), 2000);
        }
      }
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Share Job
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-semibold text-sm mb-1">{job.title}</h3>
            <p className="text-xs text-muted-foreground">{job.department} • {job.location}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {shareOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Button
                  key={option.name}
                  variant="outline"
                  onClick={option.action}
                  className={`flex flex-col items-center gap-2 h-auto py-4 hover:scale-105 transition-all duration-200 ${
                    option.name === 'WhatsApp' ? 'bg-green-500 text-white hover:bg-green-600 border-green-500 hover:border-green-600' :
                    option.name === 'LinkedIn' ? 'bg-blue-600 text-white hover:bg-blue-700 border-blue-600 hover:border-blue-700' :
                    option.name === 'Email' ? 'bg-gray-600 text-white hover:bg-gray-700 border-gray-600 hover:border-gray-700' :
                    ''
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{option.name}</span>
                </Button>
              );
            })}
          </div>

          <div className="text-center pt-2">
            <p className="text-xs text-muted-foreground">
              Share this job opportunity with your network
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareJobModal;