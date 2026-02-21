import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Seo from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import JobApplicationModal from '@/components/JobApplicationModal';
import JobDetailModal from '@/components/JobDetailModal';
import QuickApplicationModal from '@/components/QuickApplicationModal';
import ShareJobModal from '@/components/ShareJobModal';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { careerAPI } from '@/lib/career-api';
import { JobPosting } from '@/types/career';
import { hasAppliedToJob, markJobAsApplied } from '@/utils/applicationStatus';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { generateJobSlug, findJobBySlug } from '@/utils/slugs';
import { CalendarClock, MapPin, Briefcase, Clock, Search, Users, Award, Heart, Coffee, Zap, Shield, Globe, Eye, Send, Share2 } from 'lucide-react';
const Careers = () => {
  const { jobSlug } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showJobDetailModal, setShowJobDetailModal] = useState(false);
  const [showQuickApplicationModal, setShowQuickApplicationModal] = useState(false);
  const [viewingJob, setViewingJob] = useState<JobPosting | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [sharingJob, setSharingJob] = useState<JobPosting | null>(null);
  const {
    ref: heroRef,
    isVisible: heroVisible
  } = useScrollAnimation();
  const {
    ref: jobsRef,
    isVisible: jobsVisible
  } = useScrollAnimation();
  const {
    ref: cultureRef,
    isVisible: cultureVisible
  } = useScrollAnimation();
  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    if (jobs.length > 0) {
      let job = null;
      
      // Check for slug in URL params first
      if (jobSlug) {
        job = findJobBySlug(jobs, jobSlug);
      }
      
      // Fallback to query param for backward compatibility
      if (!job) {
        const jobIdFromQuery = searchParams.get('job');
        if (jobIdFromQuery) {
          job = jobs.find(j => j.id === jobIdFromQuery);
        }
      }
      
      if (job) {
        setViewingJob(job);
        setShowJobDetailModal(true);
      }
    }
  }, [jobSlug, jobs, searchParams]);

  const loadJobs = async () => {
    try {
      const jobPostings = await careerAPI.getJobPostings();
      setJobs(jobPostings);
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleApply = (job: JobPosting) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
  };
  const handleView = (job: JobPosting) => {
    const slug = generateJobSlug(job);
    navigate(`/careers/${slug}`);
    setViewingJob(job);
    setShowJobDetailModal(true);
  };

  const handleShare = (job: JobPosting) => {
    setSharingJob(job);
    setShowShareModal(true);
  };
  const handleApplicationSuccess = () => {
    if (selectedJob) {
      markJobAsApplied(selectedJob.id);
    }
    setShowApplicationModal(false);
    setSelectedJob(null);
  };
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || job.type === typeFilter;
    const matchesLocation = locationFilter === 'all' || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesSearch && matchesType && matchesLocation;
  });
  const uniqueLocations = Array.from(new Set(jobs.map(job => job.location)));
  const uniqueTypes = Array.from(new Set(jobs.map(job => job.type)));
  const benefits = [{
    icon: Heart,
    title: "Work-Life Balance",
    description: "Flexible working hours and remote work options"
  }, {
    icon: Award,
    title: "Growth Opportunities",
    description: "Continuous learning and career advancement programs"
  }, {
    icon: Users,
    title: "Collaborative Culture",
    description: "Work with talented teams on exciting projects"
  }, {
    icon: Coffee,
    title: "Great Perks",
    description: "Competitive salary, health benefits, and more"
  }];
  const description = 'Careers at MangosOrange: We will post job openings soon. Join our talent network and stay updated.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Careers at MangosOrange',
    description
  };
  return <div className="min-h-screen bg-background">
      <Seo title="Careers at MangosOrange | Jobs Coming Soon" description={description} jsonLd={jsonLd} />
      <Header />
      
      <main className="page-top-spacing">
        {/* Hero Section */}
        <section ref={heroRef} className={`py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5 fade-up ${heroVisible ? 'visible' : ''}`}>
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              Join Our
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Amazing Team</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-800 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Build the future of technology with us. We're looking for passionate individuals 
              who want to make a real impact in the world of IT services and staffing solutions.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto px-4">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-primary">50+</div>
                <div className="text-xs sm:text-sm text-gray-800">Team Members</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-primary">10+</div>
                <div className="text-xs sm:text-sm text-gray-800">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-primary">500+</div>
                <div className="text-xs sm:text-sm text-gray-800">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-primary">500+</div>
                <div className="text-xs sm:text-sm text-gray-800">Happy Clients</div>
              </div>
            </div>

            {/* Call to Action Section */}
            <div className="mt-8 sm:mt-12 text-center bg-stone-100 mx-0 px-0 my-[29px] py-[10px] rounded-3xl">
              <p className="text-base sm:text-lg text-gray-800 mb-4 max-w-md mx-auto">
                Submit your resume and our HR team will contact you for suitable opportunities.
              </p>
              <Button onClick={() => setShowQuickApplicationModal(true)} size="lg" className="px-8 py-3 text-base font-medium">
                Apply Now
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Job Openings Section */}
        <section className="py-12 sm:py-16 lg:py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Current Openings
              </h2>
              <p className="text-base sm:text-lg text-gray-800 max-w-2xl mx-auto px-4">
                Explore exciting opportunities to grow your career with us
              </p>
            </div>

            {/* Filters */}
            {jobs.length > 0 && <Card className="mb-6 sm:mb-8">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col gap-3 sm:gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-800" />
                      <Input placeholder="Search jobs..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 text-sm sm:text-base" />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Job Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          {uniqueTypes.map(type => <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>)}
                        </SelectContent>
                      </Select>

                      <Select value={locationFilter} onValueChange={setLocationFilter}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Locations</SelectItem>
                          {uniqueLocations.map(location => <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>}

            {/* Jobs List */}
            <div ref={jobsRef} className={`fade-up ${jobsVisible ? 'visible' : ''}`}>
              {loading ? <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div> : filteredJobs.length === 0 ? <Card>
                  <CardContent className="p-12 text-center">
                    <CalendarClock className="w-12 h-12 text-gray-800 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      {jobs.length === 0 ? 'No openings right now' : 'No jobs match your filters'}
                    </h3>
                    <p className="text-gray-800">
                      {jobs.length === 0 ? 'Check back soon—we update this page regularly when new positions go live.' : 'Try adjusting your search or filters to find more opportunities.'}
                    </p>
                  </CardContent>
                </Card> : <div className="grid gap-4 sm:gap-6">
                  {filteredJobs.map((job, index) => <Card key={job.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1" style={{
                animationDelay: `${index * 100}ms`
              }}>
                      <CardHeader className="pb-3 sm:pb-4">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                              <CardTitle className="text-lg sm:text-xl group-hover:text-primary transition-colors break-words">
                                {job.title}
                              </CardTitle>
                              <Badge variant="outline" className="self-start">
                                {job.type}
                              </Badge>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-800">
                              <span className="font-medium">{job.department}</span>
                              <span className="hidden sm:inline">•</span>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 flex-shrink-0" />
                                <span className="truncate">{job.location}</span>
                              </div>
                              <span className="hidden sm:inline">•</span>
                              <div className="flex items-center gap-1">
                                <Briefcase className="w-3 h-3 flex-shrink-0" />
                                <span className="truncate">{job.experience}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {job.salary && <Badge className="bg-primary/10 text-primary whitespace-nowrap">
                                {job.salary}
                              </Badge>}
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div className="text-sm text-gray-800 line-clamp-3" dangerouslySetInnerHTML={{
                    __html: job.description
                  }} />
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-border">
                          <div className="flex items-center gap-1 text-sm text-gray-800 order-2 sm:order-1">
                            <Clock className="w-3 h-3 flex-shrink-0" />
                            <span className="text-xs sm:text-sm">Apply by {new Date(job.deadline).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2 order-1 sm:order-2">
                            <Button variant="outline" onClick={() => handleView(job)} className="group flex-1 sm:flex-none" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                            <Button variant="outline" onClick={() => handleShare(job)} className="group flex-1 sm:flex-none" size="sm">
                              <Share2 className="w-4 h-4 mr-2" />
                              Share
                            </Button>
                            {hasAppliedToJob(job.id) ? <Button disabled className="group cursor-not-allowed flex-1 sm:flex-none" size="sm">
                                Applied
                                <Users className="w-4 h-4 ml-2" />
                              </Button> : <Button onClick={() => handleApply(job)} className="group flex-1 sm:flex-none" size="sm">
                                Apply Now
                                <Users className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                              </Button>}
                          </div>
                        </div>
                      </CardContent>
                    </Card>)}
                </div>}
            </div>
          </div>
        </section>

        {/* Company Culture Section */}
        <section ref={cultureRef} className={`py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5 fade-up ${cultureVisible ? 'visible' : ''}`}>
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Why Work With Us?
              </h2>
              <p className="text-base sm:text-lg text-gray-800 max-w-2xl mx-auto px-4">
                We build reliable, human-centered software and cloud solutions in a supportive environment
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return <Card key={index} className="group text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2" style={{
                animationDelay: `${index * 100}ms`
              }}>
                    <CardContent className="p-4 sm:p-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-gray-800">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>;
            })}
            </div>

            {/* What We Look For */}
            <div className="mt-12 sm:mt-16 grid lg:grid-cols-2 gap-8 sm:gap-12">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">What We Look For</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-800">Strong fundamentals in your craft (engineering, design, product, or operations)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-800">Clear communication and a collaborative mindset</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-800">Pragmatism, curiosity, and a focus on outcomes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-800">Passion for technology and continuous learning</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Our Hiring Process</h3>
                <ol className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-medium flex-shrink-0">1</div>
                    <span className="text-sm sm:text-base text-gray-800">Application review and initial screening</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-medium flex-shrink-0">2</div>
                    <span className="text-sm sm:text-base text-gray-800">Intro chat about your goals and experience</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-medium flex-shrink-0">3</div>
                    <span className="text-sm sm:text-base text-gray-800">Technical/role-focused conversation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-medium flex-shrink-0">4</div>
                    <span className="text-sm sm:text-base text-gray-800">Final culture fit and team conversation</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Application Modal */}
      <JobApplicationModal job={selectedJob} open={showApplicationModal} onClose={() => {
      setShowApplicationModal(false);
      setSelectedJob(null);
    }} onSuccess={handleApplicationSuccess} />

      {/* Job Detail Modal */}
      <JobDetailModal 
        job={viewingJob} 
        open={showJobDetailModal} 
        onClose={() => {
          setShowJobDetailModal(false);
          setViewingJob(null);
          navigate('/careers');
        }}
        onApply={handleApply}
      />

      {/* Quick Application Modal */}
      <QuickApplicationModal open={showQuickApplicationModal} onClose={() => setShowQuickApplicationModal(false)} onSuccess={() => setShowQuickApplicationModal(false)} />

      {/* Share Job Modal */}
      <ShareJobModal 
        isOpen={showShareModal} 
        onClose={() => {
          setShowShareModal(false);
          setSharingJob(null);
        }} 
        job={sharingJob} 
      />
      
      <Footer />
    </div>;
};
export default Careers;