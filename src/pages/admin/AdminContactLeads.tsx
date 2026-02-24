import { useEffect, useMemo, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { careerAPI } from '@/lib/career-api';
import { ContactLead } from '@/types/career';
import { Search, Mail, Phone, Calendar, RefreshCw, MessageSquare } from 'lucide-react';

const statusOptions: Array<ContactLead['status']> = ['New', 'In Progress', 'Closed'];

const statusBadgeClass: Record<ContactLead['status'], string> = {
  'New': 'bg-amber-100 text-amber-800 border-amber-200',
  'In Progress': 'bg-blue-100 text-blue-800 border-blue-200',
  'Closed': 'bg-green-100 text-green-800 border-green-200',
};

const AdminContactLeads = () => {
  const [leads, setLeads] = useState<ContactLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ContactLead['status']>('all');
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  const loadLeads = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const response = await careerAPI.getContactLeads(200);
      setLeads(response.items);
    } catch (error) {
      console.error('Error loading contact leads:', error);
      toast.error('Failed to load contact leads');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const query = searchTerm.toLowerCase();
      const matchesSearch =
        lead.name.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        lead.subject.toLowerCase().includes(query) ||
        lead.message.toLowerCase().includes(query);
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [leads, searchTerm, statusFilter]);

  const stats = useMemo(() => {
    const total = leads.length;
    const newCount = leads.filter((l) => l.status === 'New').length;
    const inProgress = leads.filter((l) => l.status === 'In Progress').length;
    const closed = leads.filter((l) => l.status === 'Closed').length;
    return { total, newCount, inProgress, closed };
  }, [leads]);

  const updateStatus = async (lead: ContactLead, newStatus: ContactLead['status']) => {
    if (newStatus === lead.status) return;
    setUpdatingId(lead.id);
    try {
      const ok = await careerAPI.updateContactLeadStatus(lead.id, newStatus);
      if (!ok) {
        toast.error('Failed to update lead status');
        return;
      }
      setLeads((prev) =>
        prev.map((item) =>
          item.id === lead.id
            ? { ...item, status: newStatus, updatedAt: new Date().toISOString() }
            : item
        )
      );
      toast.success('Lead status updated');
    } catch (error) {
      console.error('Error updating lead status:', error);
      toast.error('Failed to update lead status');
    } finally {
      setUpdatingId(null);
    }
  };

  const selectedLead = useMemo(
    () => (selectedLeadId ? leads.find((lead) => lead.id === selectedLeadId) || null : null),
    [selectedLeadId, leads]
  );

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
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Contact Leads</h1>
            <p className="text-gray-800">Manage messages submitted from the Contact Us page</p>
          </div>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => loadLeads(true)}
            disabled={refreshing}
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className="text-left"
          >
            <Card className={`border-slate-200 bg-slate-50 hover:shadow-md transition-shadow ${statusFilter === 'all' ? 'ring-2 ring-slate-300' : ''}`}>
              <CardContent className="p-5">
                <p className="text-sm text-slate-600">Total Leads</p>
                <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
              </CardContent>
            </Card>
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('New')}
            className="text-left"
          >
            <Card className={`border-amber-200 bg-amber-50 hover:shadow-md transition-shadow ${statusFilter === 'New' ? 'ring-2 ring-amber-300' : ''}`}>
              <CardContent className="p-5">
                <p className="text-sm text-amber-700">New</p>
                <p className="text-3xl font-bold text-amber-900">{stats.newCount}</p>
              </CardContent>
            </Card>
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('In Progress')}
            className="text-left"
          >
            <Card className={`border-blue-200 bg-blue-50 hover:shadow-md transition-shadow ${statusFilter === 'In Progress' ? 'ring-2 ring-blue-300' : ''}`}>
              <CardContent className="p-5">
                <p className="text-sm text-blue-700">In Progress</p>
                <p className="text-3xl font-bold text-blue-900">{stats.inProgress}</p>
              </CardContent>
            </Card>
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('Closed')}
            className="text-left"
          >
            <Card className={`border-green-200 bg-green-50 hover:shadow-md transition-shadow ${statusFilter === 'Closed' ? 'ring-2 ring-green-300' : ''}`}>
              <CardContent className="p-5">
                <p className="text-sm text-green-700">Closed</p>
                <p className="text-3xl font-bold text-green-900">{stats.closed}</p>
              </CardContent>
            </Card>
          </button>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-800" />
                <Input
                  placeholder="Search by name, email, subject, message..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value as 'all' | ContactLead['status'])}
              >
                <SelectTrigger className="w-full lg:w-52">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {filteredLeads.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <MessageSquare className="w-12 h-12 text-gray-800 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No contact leads found</h3>
              <p className="text-gray-800">
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your filters.'
                  : 'New contact form submissions will appear here.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredLeads.map((lead) => (
              <Card key={lead.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <CardTitle className="text-lg">{lead.name}</CardTitle>
                      <p className="text-sm text-gray-800 mt-1">{lead.subject || 'Contact Form'}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={statusBadgeClass[lead.status]}>{lead.status}</Badge>
                      <Select
                        value={lead.status}
                        onValueChange={(value) => updateStatus(lead, value as ContactLead['status'])}
                        disabled={updatingId === lead.id}
                      >
                        <SelectTrigger className="w-[150px]" onClick={(e) => e.stopPropagation()}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent
                  className="space-y-4 cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedLeadId(lead.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setSelectedLeadId(lead.id);
                    }
                  }}
                >
                  <p className="text-sm text-gray-900 whitespace-pre-wrap break-words">
                    {lead.message.length > 180 ? `${lead.message.slice(0, 180)}...` : lead.message}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
                    <a className="flex items-center gap-1 hover:text-primary" href={`mailto:${lead.email}`}>
                      <Mail className="w-4 h-4" />
                      {lead.email}
                    </a>
                    {lead.phone && (
                      <a className="flex items-center gap-1 hover:text-primary" href={`tel:${lead.phone}`}>
                        <Phone className="w-4 h-4" />
                        {lead.phone}
                      </a>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(lead.createdAt).toLocaleString()}
                    </div>
                    <span className="text-primary font-medium">Click to view full message</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={Boolean(selectedLead)} onOpenChange={(open) => !open && setSelectedLeadId(null)}>
          <DialogContent className="sm:max-w-2xl">
            {!selectedLead ? null : (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedLead.name}</DialogTitle>
                  <DialogDescription>{selectedLead.subject || 'Contact Form'}</DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className={statusBadgeClass[selectedLead.status]}>{selectedLead.status}</Badge>
                    <Select
                      value={selectedLead.status}
                      onValueChange={(value) => updateStatus(selectedLead, value as ContactLead['status'])}
                      disabled={updatingId === selectedLead.id}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 whitespace-pre-wrap break-words">
                    {selectedLead.message}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
                    <a className="flex items-center gap-2 hover:text-primary" href={`mailto:${selectedLead.email}`}>
                      <Mail className="w-4 h-4" />
                      {selectedLead.email}
                    </a>
                    {selectedLead.phone ? (
                      <a className="flex items-center gap-2 hover:text-primary" href={`tel:${selectedLead.phone}`}>
                        <Phone className="w-4 h-4" />
                        {selectedLead.phone}
                      </a>
                    ) : (
                      <span className="flex items-center gap-2 text-slate-500">
                        <Phone className="w-4 h-4" />
                        No phone provided
                      </span>
                    )}
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Created: {new Date(selectedLead.createdAt).toLocaleString()}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Updated: {new Date(selectedLead.updatedAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminContactLeads;
