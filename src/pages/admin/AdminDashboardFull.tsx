import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import AdminLayout from '@/components/admin/AdminLayout';
import { Link } from 'react-router-dom';
import { authService } from '@/lib/auth';
import { toast } from 'sonner';
import { 
  UserPlus, 
  Users, 
  Trash2, 
  Key, 
  Shield, 
  Eye, 
  EyeOff, 
  Briefcase, 
  Clock, 
  TrendingUp,
  MessageSquare,
  Calendar,
  Mail,
  Phone
} from 'lucide-react';
import { Admin, Applicant, ContactLead, DashboardStats, JobPosting } from '@/types/career';
import { careerAPI } from '@/lib/career-api';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
const createRecruiterSchema = z.object({
  name: z.string().min(1, 'Please enter the name'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});
type CreateRecruiterFormData = z.infer<typeof createRecruiterSchema>;
interface RecruiterInfo {
  id: string;
  email: string;
  name: string;
  role: string;
  created_at: string;
  plain_password?: string; // For newly created users only
}
const AdminDashboardFull = () => {
  const [currentUser, setCurrentUser] = useState<Admin | null>(null);
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
  const [recruiters, setRecruiters] = useState<RecruiterInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [newlyCreatedPasswords, setNewlyCreatedPasswords] = useState<Record<string, string>>({});
  const [recruiterSearch, setRecruiterSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'Admin' | 'Recruiter'>('all');
  const [roleEdits, setRoleEdits] = useState<Record<string, 'Admin' | 'Recruiter'>>({});
  const [roleSavingId, setRoleSavingId] = useState<string | null>(null);
  const [jobApplicants, setJobApplicants] = useState<Applicant[]>([]);
  const [generalApplicants, setGeneralApplicants] = useState<Applicant[]>([]);
  const [contactLeads, setContactLeads] = useState<ContactLead[]>([]);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const createForm = useForm<CreateRecruiterFormData>({
    resolver: zodResolver(createRecruiterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });
  useEffect(() => {
    const stored = localStorage.getItem('admin_user');
    setCurrentUser(stored ? JSON.parse(stored) : null);
    loadRecruiters();
    loadStats();
    loadRecentJobs();
    loadAnalytics();
  }, []);
  useEffect(() => {
    if (currentUser && currentUser.role !== 'Admin') {
      window.location.href = '/admin';
    }
  }, [currentUser]);

  const loadStats = async () => {
    try {
      const dashboardStats = await careerAPI.getDashboardStats();
      setStats(dashboardStats);
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    } finally {
      setStatsLoading(false);
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
  const loadAnalytics = async () => {
    setAnalyticsLoading(true);
    try {
      const [jobApps, generalApps, leadsResponse] = await Promise.all([
        careerAPI.getApplicants(),
        careerAPI.getGeneralApplications(),
        careerAPI.getContactLeads(200),
      ]);
      setJobApplicants(jobApps);
      setGeneralApplicants(generalApps);
      setContactLeads(leadsResponse.items || []);
    } catch (error) {
      console.error('Error loading analytics:', error);
      toast.error('Failed to load analytics');
    } finally {
      setAnalyticsLoading(false);
    }
  };
  const loadRecruiters = async () => {
    try {
      const data = await authService.listRecruiters();
      setRecruiters(data || []);
    } catch (error) {
      console.error('Error loading recruiters:', error);
      toast.error('Failed to load recruiters');
    }
  };
  const createRecruiter = async (data: CreateRecruiterFormData) => {
    setLoading(true);
    try {
      const newUser = await authService.signUp(data.email, data.password, 'Recruiter', data.name);
      if (newUser) {
        // Store the plain password temporarily for display
        setNewlyCreatedPasswords(prev => ({
          ...prev,
          [newUser.id]: data.password
        }));
        toast.success('Recruiter account created successfully!');
        setCreateDialogOpen(false);
        createForm.reset();
        loadRecruiters();
      } else {
        toast.error('Failed to create recruiter account');
      }
    } catch (error) {
      console.error('Error creating recruiter:', error);
      toast.error('Failed to create recruiter account');
    } finally {
      setLoading(false);
    }
  };
  const deleteRecruiter = async (recruiterId: string, email: string) => {
    if (!confirm(`Are you sure you want to delete the recruiter account for ${email}?`)) {
      return;
    }
    try {
      const success = await authService.deleteRecruiter(recruiterId);
      if (!success) throw new Error('Delete failed');
      toast.success('Recruiter account deleted successfully');
      loadRecruiters();
    } catch (error) {
      console.error('Error deleting recruiter:', error);
      toast.error('Failed to delete recruiter account');
    }
  };
  const resetRecruiterPassword = async (recruiterId: string, email: string) => {
    const newPassword = prompt(`Enter new password for ${email}:`);
    if (!newPassword || newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    try {
      const success = await authService.resetRecruiterPassword(recruiterId, newPassword);
      if (!success) throw new Error('Reset failed');

      // Store the new password temporarily for display
      setNewlyCreatedPasswords(prev => ({
        ...prev,
        [recruiterId]: newPassword
      }));
      toast.success('Password reset successfully!');
      loadRecruiters();
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error('Failed to reset password');
    }
  };
  const togglePasswordVisibility = (recruiterId: string) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [recruiterId]: !prev[recruiterId]
    }));
  };
  const filteredRecruiters = recruiters.filter(r => {
    const matchesSearch = r.name?.toLowerCase().includes(recruiterSearch.toLowerCase()) ||
      r.email?.toLowerCase().includes(recruiterSearch.toLowerCase());
    const matchesRole = roleFilter === 'all' || r.role === roleFilter;
    return matchesSearch && matchesRole;
  });
  const handleRoleEdit = (recruiterId: string, role: 'Admin' | 'Recruiter') => {
    setRoleEdits(prev => ({
      ...prev,
      [recruiterId]: role
    }));
  };
  const saveRoleChange = async (recruiterId: string) => {
    const role = roleEdits[recruiterId];
    if (!role) return;
    setRoleSavingId(recruiterId);
    try {
      const success = await authService.updateRecruiterRole(recruiterId, role);
      if (!success) throw new Error('Role update failed');
      toast.success('Role updated successfully');
      loadRecruiters();
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Failed to update role');
    } finally {
      setRoleSavingId(null);
    }
  };

  const allApplicants = useMemo(() => [...jobApplicants, ...generalApplicants], [jobApplicants, generalApplicants]);

  const applicantStatusChart = useMemo(() => {
    const statusOrder: Applicant['status'][] = ['Applied', 'Shortlisted', 'Interviewed', 'Hired', 'Rejected'];
    const colorMap: Record<Applicant['status'], string> = {
      Applied: '#2563eb',
      Shortlisted: '#f59e0b',
      Interviewed: '#7c3aed',
      Hired: '#16a34a',
      Rejected: '#ef4444',
    };

    return statusOrder.map((status) => ({
      name: status,
      value: allApplicants.filter((applicant) => applicant.status === status).length,
      color: colorMap[status],
    }));
  }, [allApplicants]);

  const sourceChart = useMemo(
    () => [
      { name: 'Job Applications', value: jobApplicants.length, color: '#1d4ed8' },
      { name: 'Resume Drop', value: generalApplicants.length, color: '#d97706' },
    ],
    [jobApplicants.length, generalApplicants.length]
  );

  const contactLeadStatusChart = useMemo(() => {
    const rows: ContactLead['status'][] = ['New', 'In Progress', 'Closed'];
    const colorMap: Record<ContactLead['status'], string> = {
      New: '#0891b2',
      'In Progress': '#7c3aed',
      Closed: '#16a34a',
    };

    return rows.map((status) => ({
      name: status,
      value: contactLeads.filter((lead) => lead.status === status).length,
      color: colorMap[status],
    }));
  }, [contactLeads]);

  const monthlyTrend = useMemo(() => {
    const now = new Date();
    const buckets = Array.from({ length: 6 }).map((_, offset) => {
      const date = new Date(now.getFullYear(), now.getMonth() - (5 - offset), 1);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const label = date.toLocaleString('default', { month: 'short' });
      return { key, month: label, job: 0, general: 0 };
    });

    const byKey = new Map(buckets.map((bucket) => [bucket.key, bucket]));

    jobApplicants.forEach((applicant) => {
      const appliedAt = new Date(applicant.appliedAt);
      if (Number.isNaN(appliedAt.getTime())) return;
      const key = `${appliedAt.getFullYear()}-${String(appliedAt.getMonth() + 1).padStart(2, '0')}`;
      const bucket = byKey.get(key);
      if (bucket) bucket.job += 1;
    });

    generalApplicants.forEach((applicant) => {
      const appliedAt = new Date(applicant.appliedAt);
      if (Number.isNaN(appliedAt.getTime())) return;
      const key = `${appliedAt.getFullYear()}-${String(appliedAt.getMonth() + 1).padStart(2, '0')}`;
      const bucket = byKey.get(key);
      if (bucket) bucket.general += 1;
    });

    return buckets.map((bucket) => ({
      month: bucket.month,
      Job: bucket.job,
      General: bucket.general,
      Total: bucket.job + bucket.general,
    }));
  }, [jobApplicants, generalApplicants]);

  const leadResponseRate = useMemo(() => {
    const total = contactLeads.length;
    if (total === 0) return 0;
    const closed = contactLeads.filter((lead) => lead.status === 'Closed').length;
    return Math.round((closed / total) * 100);
  }, [contactLeads]);

  return <AdminLayout>
      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 via-white to-cyan-50 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Admin Dashboard</h1>
              <p className="text-slate-600">
                Manage recruiters, monitor hiring performance, and track lead quality in real time.
              </p>
            </div>
            <Badge className="text-sm bg-slate-900 hover:bg-slate-900 text-white border-slate-900 w-fit">
              <Shield className="w-4 h-4 mr-1" />
              Administrator
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Dashboard Overview</TabsTrigger>
            <TabsTrigger value="recruiters">Recruiter Management</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch">
              {statsLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <Card key={index} className="h-full hover:shadow-md transition-shadow">
                    <CardContent className="h-full p-6">
                      <div className="animate-pulse">
                        <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                        <div className="h-8 bg-muted rounded w-1/3"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                [
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
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <Link key={stat.title} to={stat.href} className="group block h-full">
                      <Card className={`h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${stat.cardClass}`}>
                        <CardContent className="h-full p-6">
                          <div className="h-full flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-muted-foreground leading-5 min-h-10">
                                {stat.title}
                              </p>
                              <p className="text-2xl font-bold text-foreground">
                                {stat.value}
                              </p>
                            </div>
                            <div className={`w-12 h-12 ${stat.iconBgClass} rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform`}>
                              <Icon className={`w-6 h-6 ${stat.iconClass}`} />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })
              )}
            </div>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-xl">Analytics Overview</CardTitle>
                <CardDescription>
                  Live analytics from job applications, resume drop pipeline, and contact lead follow-up.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {analyticsLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="rounded-xl border p-4">
                        <div className="animate-pulse space-y-2">
                          <div className="h-4 bg-muted rounded w-1/2"></div>
                          <div className="h-8 bg-muted rounded w-1/3"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                        <p className="text-sm text-blue-700 font-medium">Job Applications</p>
                        <p className="text-3xl font-bold text-blue-900">{jobApplicants.length}</p>
                      </div>
                      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                        <p className="text-sm text-amber-700 font-medium">Resume Drop</p>
                        <p className="text-3xl font-bold text-amber-900">{generalApplicants.length}</p>
                      </div>
                      <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-4">
                        <p className="text-sm text-cyan-700 font-medium">Contact Leads</p>
                        <p className="text-3xl font-bold text-cyan-900">{contactLeads.length}</p>
                      </div>
                      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                        <p className="text-sm text-emerald-700 font-medium">Lead Closure Rate</p>
                        <p className="text-3xl font-bold text-emerald-900">{leadResponseRate}%</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                      <div className="rounded-xl border border-slate-200 p-4">
                        <h3 className="font-semibold text-slate-900 mb-3">Applications Trend (Last 6 Months)</h3>
                        <div className="h-72">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyTrend}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} />
                              <XAxis dataKey="month" />
                              <YAxis allowDecimals={false} />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="Job" fill="#1d4ed8" radius={[4, 4, 0, 0]} />
                              <Bar dataKey="General" fill="#d97706" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div className="rounded-xl border border-slate-200 p-4">
                        <h3 className="font-semibold text-slate-900 mb-3">Applicant Status Distribution</h3>
                        <div className="h-72">
                          {applicantStatusChart.every((row) => row.value === 0) ? (
                            <div className="h-full flex items-center justify-center text-sm text-slate-500">
                              No applicant data available
                            </div>
                          ) : (
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={applicantStatusChart}
                                  dataKey="value"
                                  nameKey="name"
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={55}
                                  outerRadius={92}
                                  paddingAngle={2}
                                >
                                  {applicantStatusChart.map((entry) => (
                                    <Cell key={entry.name} fill={entry.color} />
                                  ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                              </PieChart>
                            </ResponsiveContainer>
                          )}
                        </div>
                      </div>

                      <div className="rounded-xl border border-slate-200 p-4">
                        <h3 className="font-semibold text-slate-900 mb-3">Application Source Mix</h3>
                        <div className="h-72">
                          {sourceChart.every((row) => row.value === 0) ? (
                            <div className="h-full flex items-center justify-center text-sm text-slate-500">
                              No source data available
                            </div>
                          ) : (
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={sourceChart}
                                  dataKey="value"
                                  nameKey="name"
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={50}
                                  outerRadius={90}
                                  paddingAngle={2}
                                >
                                  {sourceChart.map((entry) => (
                                    <Cell key={entry.name} fill={entry.color} />
                                  ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                              </PieChart>
                            </ResponsiveContainer>
                          )}
                        </div>
                      </div>

                      <div className="rounded-xl border border-slate-200 p-4">
                        <h3 className="font-semibold text-slate-900 mb-3">Contact Lead Status</h3>
                        <div className="h-72">
                          {contactLeadStatusChart.every((row) => row.value === 0) ? (
                            <div className="h-full flex items-center justify-center text-sm text-slate-500">
                              No contact lead data available
                            </div>
                          ) : (
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={contactLeadStatusChart}
                                  dataKey="value"
                                  nameKey="name"
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={50}
                                  outerRadius={90}
                                  paddingAngle={2}
                                >
                                  {contactLeadStatusChart.map((entry) => (
                                    <Cell key={entry.name} fill={entry.color} />
                                  ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                              </PieChart>
                            </ResponsiveContainer>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Recent Applications */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Latest job applications in the system</CardDescription>
              </CardHeader>
              <CardContent>
                {statsLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="p-4 border border-border rounded-lg">
                        <div className="animate-pulse">
                          <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
                          <div className="h-3 bg-muted rounded w-1/2 mb-1"></div>
                          <div className="h-3 bg-muted rounded w-2/3"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : stats.recentApplications.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
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

                          {/* Application ID */}
                          <p className="text-sm text-foreground mb-2">
                            Application ID:{" "}
                            <span className="font-medium">{applicant.id.slice(0, 8)}</span>
                          </p>

                          {/* Contact + Date */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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

            <Card>
              <CardHeader>
                <CardTitle>Recent Contact Leads</CardTitle>
                <CardDescription>Latest website contact form submissions</CardDescription>
              </CardHeader>
              <CardContent>
                {statsLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="p-4 border border-border rounded-lg">
                        <div className="animate-pulse">
                          <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
                          <div className="h-3 bg-muted rounded w-2/3 mb-1"></div>
                          <div className="h-3 bg-muted rounded w-full"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : stats.recentContactLeads.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No recent contact leads
                  </div>
                ) : (
                  <div className="space-y-4">
                    {stats.recentContactLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-3 mb-1">
                          <h3 className="font-medium text-foreground">{lead.name}</h3>
                          <Badge variant="outline">{lead.status}</Badge>
                        </div>
                        <p className="text-sm text-foreground mb-2">{lead.subject}</p>
                        <p className="text-sm text-muted-foreground mb-3">
                          {lead.message.length > 160 ? `${lead.message.slice(0, 160)}...` : lead.message}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {lead.email}
                          </div>
                          {lead.phone && (
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {lead.phone}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Job Postings</CardTitle>
                  <CardDescription>Latest jobs created in the system</CardDescription>
                </CardHeader>
                <CardContent>
                  {recentJobs.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">No jobs found</div>
                  ) : (
                    <div className="space-y-3">
                      {recentJobs.map(job => (
                        <div key={job.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                          <div>
                            <p className="font-medium text-foreground">{job.title}</p>
                            <p className="text-sm text-muted-foreground">{job.department} | {job.location}</p>
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
              <Card>
                <CardHeader>
                  <CardTitle>Recent Recruiters</CardTitle>
                  <CardDescription>Most recently created recruiter accounts</CardDescription>
                </CardHeader>
                <CardContent>
                  {recruiters.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">No recruiters found</div>
                  ) : (
                    <div className="space-y-3">
                      {recruiters.slice(0, 5).map(r => (
                        <div key={r.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                          <div>
                            <p className="font-medium text-foreground">{r.name || 'No Name'}</p>
                            <p className="text-sm text-muted-foreground">{r.email}</p>
                          </div>
                          <Badge variant={r.role === 'Admin' ? 'default' : 'secondary'}>{r.role}</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recruiters" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recruiter Accounts</h2>
              <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    Create Recruiter
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Recruiter Account</DialogTitle>
                    <DialogDescription>
                      Create a new recruiter account with limited permissions
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...createForm}>
                    <form onSubmit={createForm.handleSubmit(createRecruiter)} className="space-y-4">
                      <FormField control={createForm.control} name="name" render={({
                      field
                    }) => <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />
                      <FormField control={createForm.control} name="email" render={({
                      field
                    }) => <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter email address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />
                      <FormField control={createForm.control} name="password" render={({
                      field
                    }) => <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input type={showPassword ? "text" : "password"} placeholder="Enter password" {...field} />
                                <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>
                                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />
                      <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setCreateDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                          {loading ? 'Creating...' : 'Create Account'}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Recruiter Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search recruiters by name or email..."
                      value={recruiterSearch}
                      onChange={(e) => setRecruiterSearch(e.target.value)}
                    />
                  </div>
                  <Select value={roleFilter} onValueChange={(v) => setRoleFilter(v as typeof roleFilter)}>
                    <SelectTrigger className="w-full lg:w-52">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Recruiter">Recruiter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {filteredRecruiters.map(recruiter => <Card key={recruiter.id}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{recruiter.name || 'No Name'}</p>
                        <p className="text-sm text-muted-foreground">{recruiter.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={recruiter.role === 'Admin' ? 'default' : 'secondary'}>
                            {recruiter.role}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            Created {new Date(recruiter.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        {currentUser?.id !== recruiter.id && (
                          <div className="mt-3 flex flex-col gap-2">
                            <Label className="text-xs text-muted-foreground">Role</Label>
                            <div className="flex items-center gap-2">
                              <Select
                                value={roleEdits[recruiter.id] || (recruiter.role as 'Admin' | 'Recruiter')}
                                onValueChange={(v) => handleRoleEdit(recruiter.id, v as 'Admin' | 'Recruiter')}
                              >
                                <SelectTrigger className="w-40">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Admin">Admin</SelectItem>
                                  <SelectItem value="Recruiter">Recruiter</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={!roleEdits[recruiter.id] || roleSavingId === recruiter.id}
                                onClick={() => saveRoleChange(recruiter.id)}
                              >
                                {roleSavingId === recruiter.id ? 'Saving...' : 'Save Role'}
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      
                      <Button variant="outline" size="sm" onClick={() => resetRecruiterPassword(recruiter.id, recruiter.email)} className="flex items-center gap-1">
                        <Key className="w-4 h-4" />
                        Reset Password
                      </Button>
                      {recruiter.role !== 'Admin' && <Button variant="destructive" size="sm" onClick={() => deleteRecruiter(recruiter.id, recruiter.email)} className="flex items-center gap-1">
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </Button>}
                    </div>
                  </CardContent>
                  
                  {/* Show password if toggled */}
                  {visiblePasswords[recruiter.id] && <CardContent className="pt-0">
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Current Password:
                        </p>
                        <p className="text-sm font-mono bg-background px-2 py-1 rounded border">
                          {newlyCreatedPasswords[recruiter.id] || 'Password is encrypted - use Reset Password to set a new one'}
                        </p>
                        {newlyCreatedPasswords[recruiter.id] && <p className="text-xs text-green-600 mt-1">
                            ✓ This password was recently set and is temporarily visible
                          </p>}
                      </div>
                    </CardContent>}
                </Card>)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>;
};
export default AdminDashboardFull;
