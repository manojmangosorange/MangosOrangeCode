import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/components/admin/AdminLayout';
import { careerAPI } from '@/lib/career-api';
import { Applicant, DashboardStats, JobPosting } from '@/types/career';
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Clock,
  Mail,
  MessageSquare,
  Phone,
  PlusCircle,
  TrendingUp,
  Users,
} from 'lucide-react';

type ApplicantStatus = Applicant['status'];

const emptyStatusCounts: Record<ApplicantStatus, number> = {
  Applied: 0,
  Shortlisted: 0,
  Interviewed: 0,
  Hired: 0,
  Rejected: 0,
};

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalJobs: 0,
    activeJobs: 0,
    totalApplicants: 0,
    pendingApplications: 0,
    totalContactLeads: 0,
    recentApplications: [],
    recentContactLeads: [],
  });
  const [recentJobs, setRecentJobs] = useState<JobPosting[]>([]);
  const [statusCounts, setStatusCounts] = useState<Record<ApplicantStatus, number>>(emptyStatusCounts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [dashboardStats, jobs, applicants] = await Promise.all([
          careerAPI.getDashboardStats(),
          careerAPI.getJobPostings(true),
          careerAPI.getApplicants(),
        ]);

        const nextCounts: Record<ApplicantStatus, number> = { ...emptyStatusCounts };
        applicants.forEach((applicant) => {
          const status = applicant.status as ApplicantStatus;
          if (nextCounts[status] !== undefined) {
            nextCounts[status] += 1;
          }
        });

        setStats(dashboardStats);
        setRecentJobs(jobs.slice(0, 5));
        setStatusCounts(nextCounts);
      } catch (error) {
        console.error('Error loading recruiter dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const statCards = [
    {
      title: 'Total Jobs',
      value: stats.totalJobs,
      icon: Briefcase,
      href: '/admin/jobs',
      iconClass: 'text-blue-700',
      iconBgClass: 'bg-blue-100',
      cardClass: 'border-blue-200 bg-gradient-to-br from-blue-50 to-white',
    },
    {
      title: 'Active Jobs',
      value: stats.activeJobs,
      icon: TrendingUp,
      href: '/admin/jobs?status=Active',
      iconClass: 'text-emerald-700',
      iconBgClass: 'bg-emerald-100',
      cardClass: 'border-emerald-200 bg-gradient-to-br from-emerald-50 to-white',
    },
    {
      title: 'Total Applicants',
      value: stats.totalApplicants,
      icon: Users,
      href: '/admin/applicants',
      iconClass: 'text-violet-700',
      iconBgClass: 'bg-violet-100',
      cardClass: 'border-violet-200 bg-gradient-to-br from-violet-50 to-white',
    },
    {
      title: 'Pending Applications',
      value: stats.pendingApplications,
      icon: Clock,
      href: '/admin/applicants?status=Applied',
      iconClass: 'text-orange-700',
      iconBgClass: 'bg-orange-100',
      cardClass: 'border-orange-200 bg-gradient-to-br from-orange-50 to-white',
    },
    {
      title: 'Contact Leads',
      value: stats.totalContactLeads,
      icon: MessageSquare,
      href: '/admin/contact-leads',
      iconClass: 'text-cyan-700',
      iconBgClass: 'bg-cyan-100',
      cardClass: 'border-cyan-200 bg-gradient-to-br from-cyan-50 to-white',
    },
  ];

  const pipelineItems = useMemo(() => {
    const total = Object.values(statusCounts).reduce((sum, count) => sum + count, 0);
    const items: Array<{ label: ApplicantStatus; count: number; barClass: string }> = [
      { label: 'Applied', count: statusCounts.Applied, barClass: 'bg-blue-500' },
      { label: 'Shortlisted', count: statusCounts.Shortlisted, barClass: 'bg-amber-500' },
      { label: 'Interviewed', count: statusCounts.Interviewed, barClass: 'bg-violet-500' },
      { label: 'Hired', count: statusCounts.Hired, barClass: 'bg-emerald-500' },
      { label: 'Rejected', count: statusCounts.Rejected, barClass: 'bg-rose-500' },
    ];

    return items.map((item) => ({
      ...item,
      percentage: total > 0 ? Math.round((item.count / total) * 100) : 0,
    }));
  }, [statusCounts]);

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
      <div className="space-y-8">
        <section className="rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 via-white to-blue-50 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Recruiter Dashboard</h1>
              <p className="text-slate-600 mt-1">Track hiring activity, applications, and lead flow from one place.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Operational</Badge>
              <Button asChild className="gap-2">
                <Link to="/admin/jobs">
                  <PlusCircle className="w-4 h-4" />
                  Create Job
                </Link>
              </Button>
              <Button variant="outline" asChild className="gap-2">
                <Link to="/admin/applicants">
                  View Pipeline
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 items-stretch">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link key={stat.title} to={stat.href} className="group block h-full">
                <Card className={`h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${stat.cardClass}`}>
                  <CardContent className="h-full p-5">
                    <div className="h-full flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-700 leading-5 min-h-10">{stat.title}</p>
                        <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                      </div>
                      <div className={`w-12 h-12 ${stat.iconBgClass} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform`}>
                        <Icon className={`w-6 h-6 ${stat.iconClass}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Card className="xl:col-span-1">
            <CardHeader>
              <CardTitle className="text-xl">Pipeline Snapshot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pipelineItems.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700">{item.label}</span>
                    <span className="text-slate-600">
                      {item.count} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full ${item.barClass} transition-all duration-500`}
                      style={{ width: `${Math.max(item.percentage, item.count > 0 ? 4 : 0)}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Recent Applications</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin/applicants" className="gap-1">
                  View all
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {stats.recentApplications.length === 0 ? (
                <div className="text-center py-8 text-slate-500">No recent applications</div>
              ) : (
                <div className="space-y-3">
                  {stats.recentApplications.map((applicant) => (
                    <div
                      key={applicant.id}
                      className="rounded-lg border border-slate-200 p-4 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <p className="font-semibold text-slate-900">{applicant.name}</p>
                        <Badge variant="outline">{applicant.status}</Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {applicant.email}
                        </span>
                        {applicant.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {applicant.phone}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(applicant.appliedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Recent Contact Leads</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin/contact-leads" className="gap-1">
                  View all
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {stats.recentContactLeads.length === 0 ? (
                <div className="text-center py-8 text-slate-500">No recent contact leads</div>
              ) : (
                <div className="space-y-3">
                  {stats.recentContactLeads.map((lead) => (
                    <div key={lead.id} className="rounded-lg border border-slate-200 p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-slate-900">{lead.name}</p>
                        <Badge variant="outline">{lead.status}</Badge>
                      </div>
                      <p className="text-sm font-medium text-slate-700 mb-1">{lead.subject}</p>
                      <p className="text-sm text-slate-600 line-clamp-2">{lead.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Recent Job Posts</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin/jobs" className="gap-1">
                  Manage jobs
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {recentJobs.length === 0 ? (
                <div className="text-center py-8 text-slate-500">No recent jobs</div>
              ) : (
                <div className="space-y-3">
                  {recentJobs.map((job) => (
                    <div key={job.id} className="rounded-lg border border-slate-200 p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold text-slate-900">{job.title}</p>
                          <p className="text-sm text-slate-600">
                            {job.department} | {job.location}
                          </p>
                        </div>
                        <Badge variant={job.status === 'Active' ? 'default' : 'secondary'}>{job.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
