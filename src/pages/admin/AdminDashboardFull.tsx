import { useState, useEffect } from 'react';
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
  Calendar,
  Mail,
  Phone
} from 'lucide-react';
import { Admin, DashboardStats, JobPosting } from '@/types/career';
import { careerAPI } from '@/lib/career-api';
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
    recentApplications: [],
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
  return <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage recruiter accounts and oversee the career system
            </p>
          </div>
          <Badge variant="secondary" className="text-sm">
            <Shield className="w-4 h-4 mr-1" />
            Administrator
          </Badge>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Dashboard Overview</TabsTrigger>
            <TabsTrigger value="recruiters">Recruiter Management</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsLoading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
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
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <Card key={stat.title} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
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
                })
              )}
            </div>

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
                            <p className="text-sm text-muted-foreground">{job.department} • {job.location}</p>
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
