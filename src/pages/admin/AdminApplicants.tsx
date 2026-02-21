import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminLayout from '@/components/admin/AdminLayout';
import ApplicantCard from '@/components/admin/ApplicantCard';
import { careerAPI } from '@/lib/career-api';
import { Applicant, JobPosting } from '@/types/career';
import { toast } from 'sonner';
import { Search, Users, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminApplicants = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [jobFilter, setJobFilter] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkStatus, setBulkStatus] = useState<Applicant['status']>('Applied');
  const [bulkUpdating, setBulkUpdating] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [applicantsData, jobsData] = await Promise.all([
        careerAPI.getApplicants(),
        careerAPI.getJobPostings(true)
      ]);
      setApplicants(applicantsData);
      setJobs(jobsData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load applicants');
    } finally {
      setLoading(false);
    }
  };

  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch = applicant.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         applicant.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || applicant.status === statusFilter;
    const matchesJob = jobFilter === 'all' || applicant.jobId === jobFilter;
    return matchesSearch && matchesStatus && matchesJob;
  });

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredApplicants.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredApplicants.map(a => a.id));
    }
  };

  const applyBulkStatus = async () => {
    if (selectedIds.length === 0) return;
    setBulkUpdating(true);
    try {
      await Promise.all(
        selectedIds.map(id => careerAPI.updateApplicantStatus(id, bulkStatus))
      );
      toast.success(`Updated ${selectedIds.length} applicants`);
      setSelectedIds([]);
      loadData();
    } catch (error) {
      console.error('Bulk update error:', error);
      toast.error('Failed to update applicants');
    } finally {
      setBulkUpdating(false);
    }
  };

  const generateCSV = () => {
    const headers = [
      'Name',
      'Email', 
      'Phone',
      'Status',
      'Job Applied For',
      'Application Date',
      'Resume URL',
      'Cover Letter',
      'Notes'
    ];

    const csvData = filteredApplicants.map(applicant => {
      const job = jobs.find(j => j.id === applicant.jobId);
      return [
        applicant.name || '',
        applicant.email || '',
        applicant.phone || '',
        applicant.status || '',
        job?.title || 'Unknown Position',
        new Date(applicant.appliedAt).toLocaleDateString() || '',
        applicant.resumeUrl || '',
        applicant.coverLetter || '',
        applicant.notes || ''
      ];
    });

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field.replace(/"/g, '""')}"`).join(','))
      .join('\n');

    return csvContent;
  };

  const getFileName = () => {
    const today = new Date().toISOString().split('T')[0];
    const selectedJob = jobs.find(j => j.id === jobFilter);
    
    let filterName = 'All';
    
    if (statusFilter !== 'all' && jobFilter !== 'all') {
      filterName = `${statusFilter}_${selectedJob?.title?.replace(/\s+/g, '') || 'Unknown'}`;
    } else if (statusFilter !== 'all') {
      filterName = statusFilter;
    } else if (jobFilter !== 'all') {
      filterName = selectedJob?.title?.replace(/\s+/g, '') || 'Unknown';
    } else if (searchTerm) {
      filterName = 'Filtered';
    }
    
    return `Applicants_${filterName}_${today}.csv`;
  };

  const downloadCSV = () => {
    if (filteredApplicants.length === 0) {
      toast.error('No applicants to export');
      return;
    }

    const csvContent = generateCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', getFileName());
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success(`Exported ${filteredApplicants.length} applicants to CSV`);
    }
  };

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
        <div>
          <h1 className="text-3xl font-bold text-foreground">Applicants</h1>
          <p className="text-gray-800">
            Manage job applications and candidate pipeline
          </p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-800" />
                <Input
                  placeholder="Search applicants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Applied">Applied</SelectItem>
                  <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                  <SelectItem value="Interviewed">Interviewed</SelectItem>
                  <SelectItem value="Hired">Hired</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Select value={jobFilter} onValueChange={setJobFilter}>
                <SelectTrigger className="w-full lg:w-64">
                  <SelectValue placeholder="Filter by job" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Jobs</SelectItem>
                  {jobs.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Download CSV Button */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={selectedIds.length > 0 && selectedIds.length === filteredApplicants.length}
              onCheckedChange={toggleSelectAll}
            />
            <span className="text-sm text-gray-800">
              Select all ({selectedIds.length}/{filteredApplicants.length})
            </span>
            {selectedIds.length > 0 && (
              <>
                <Select value={bulkStatus} onValueChange={(v) => setBulkStatus(v as Applicant['status'])}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Applied">Applied</SelectItem>
                    <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="Interviewed">Interviewed</SelectItem>
                    <SelectItem value="Hired">Hired</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={applyBulkStatus} disabled={bulkUpdating}>
                  {bulkUpdating ? 'Updating...' : 'Apply Status'}
                </Button>
              </>
            )}
          </div>
          <Button
            onClick={downloadCSV}
            variant="outline"
            className="gap-2"
            disabled={filteredApplicants.length === 0}
          >
            <Download className="w-4 h-4" />
            Download CSV ({filteredApplicants.length})
          </Button>
        </div>

        {/* Applicants List */}
        {filteredApplicants.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="w-12 h-12 text-gray-800 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                No applicants found
              </h3>
              <p className="text-gray-800">
                {searchTerm || statusFilter !== 'all' || jobFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Applications will appear here when candidates apply for your job postings'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredApplicants.map((applicant) => {
              const job = jobs.find(j => j.id === applicant.jobId);
              return (
                <ApplicantCard
                  key={applicant.id}
                  applicant={applicant}
                  onUpdate={loadData}
                  jobTitle={job?.title}
                  selectable={true}
                  selected={selectedIds.includes(applicant.id)}
                  onToggleSelect={toggleSelect}
                />
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminApplicants;
