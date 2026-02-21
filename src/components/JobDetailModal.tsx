import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { JobPosting } from '@/types/career';
import { hasAppliedToJob } from '@/utils/applicationStatus';
import { 
  MapPin, 
  Briefcase, 
  Calendar,
  Clock,
  DollarSign,
  Send,
  CheckCircle
} from 'lucide-react';

interface JobDetailModalProps {
  job: JobPosting | null;
  open: boolean;
  onClose: () => void;
  onApply?: (job: JobPosting) => void;
}

const JobDetailModal = ({ job, open, onClose, onApply }: JobDetailModalProps) => {
  if (!job) return null;

  const hasApplied = hasAppliedToJob(job.id);

  const handleApply = () => {
    if (onApply && !hasApplied) {
      onApply(job);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <DialogTitle className="text-2xl mb-2">
                  {job.title}
                </DialogTitle>
                <div className="flex items-center gap-4 text-sm text-gray-800">
                  <span className="font-medium">{job.department}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {job.location}
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    {job.experience}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{job.type}</Badge>
                {job.salary && (
                  <Badge className="bg-primary/10 text-primary">
                    {job.salary}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-800 pt-2 border-t border-border">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Apply by {new Date(job.deadline).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Posted {new Date(job.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Job Description
            </h3>
            <div 
              className="text-gray-800 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: job.description }}
            />
          </section>

          <section>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Key Responsibilities
            </h3>
            <div 
              className="text-gray-800 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: job.responsibilities }}
            />
          </section>

          <section>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Requirements & Qualifications
            </h3>
            <div 
              className="text-gray-800 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: job.requirements }}
            />
          </section>

          {/* Apply Button Section */}
          <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm p-6 -mx-6 -mb-6 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-800 mb-1">
                  Ready to join our team?
                </p>
                <p className="text-xs text-gray-800">
                  Application deadline: {new Date(job.deadline).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {hasApplied ? (
                  <Button disabled className="px-8 py-6 text-base cursor-not-allowed">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Applied
                  </Button>
                ) : (
                  <Button 
                    onClick={handleApply}
                    size="lg"
                    className="px-8 py-6 text-base font-medium bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Apply for this Position
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailModal;