import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/components/admin/AdminLayout';
import { careerAPI } from '@/lib/career-api';
import { DashboardStats, JobPosting } from '@/types/career';
import { 
  Briefcase, 
  Users, 
  Clock, 
  TrendingUp,
  Calendar,
  Mail,
  Phone,
  PlusCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalJobs: 0,
    activeJobs: 0,
    totalApplicants: 0,
    pendingApplications: 0,
    recentApplications: [],
  });
  const [recentJobs, setRecentJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
    loadRecentJobs();
  }, []);

  const loadStats = async () => {
    try {
      const dashboardStats = await careerAPI.getDashboardStats();
      setStats(dashboardStats);
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };
  const loadRecentJobs = async () => {
    try {
      const jobs = await careerAPI.getJobPostings(true);
      setRecentJobs(jobs.slice(0, 5));
    } catch (error) {
      console.error('Error loading recent jobs:', error);
    }
  };

  const statCards = [
    {
      title: 'Total Jobs',
      value: stats.totalJobs,
      icon: Briefcase,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Active Jobs',
      value: stats.activeJobs,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Total Applicants',
      value: stats.totalApplicants,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Pending Applications',
      value: stats.pendingApplications,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-gray-800">
            Overview of your career management system
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/admin/jobs" className="gap-2">
                  <PlusCircle className="w-4 h-4" />
                  Create Job
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/admin/applicants">View Applicants</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/admin/resume-drop">Resume Drop</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.recentApplications.length === 0 ? (
              <div className="text-center py-8 text-gray-800">
                No recent applications
              </div>
            ) : (
              <div className="space-y-4">
                {stats.recentApplications.map((applicant) => (
                  <div
                    key={applicant.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1">
                      {/* Name + Status */}
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-medium text-foreground">
                          {applicant.name}
                        </h3>
                        <Badge variant="outline">
                          {applicant.status}
                        </Badge>
                      </div>

                      {/* Application Date */}
                      <p className="text-sm text-foreground mb-2">
                        Application ID:{" "}
                        <span className="font-medium">{applicant.id.slice(0, 8)}</span>
                      </p>

                      {/* Contact + Date */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-800">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {applicant.email}
                        </div>
                        {applicant.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {applicant.phone}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(applicant.appliedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Jobs */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Job Postings</CardTitle>
          </CardHeader>
          <CardContent>
            {recentJobs.length === 0 ? (
              <div className="text-center py-8 text-gray-800">
                No recent jobs
              </div>
            ) : (
              <div className="space-y-3">
                {recentJobs.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center justify-between p-3 border border-border rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-foreground">{job.title}</p>
                      <p className="text-sm text-gray-800">
                        {job.department} • {job.location}
                      </p>
                    </div>
                    <Badge variant={job.status === 'Active' ? 'default' : 'secondary'}>
                      {job.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
