import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  FileText,
  MessageSquare
} from 'lucide-react';
import { authService } from '@/lib/auth';
import { Admin } from '@/types/career';
import { toast } from 'sonner';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [user, setUser] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem('admin_sidebar_collapsed');
    if (stored === '1') {
      setSidebarCollapsed(true);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [location.pathname]);

  const checkAuth = async () => {
    const currentUser = await authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    } else {
      navigate('/admin/login');
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await authService.signOut();
    setUser(null);
    navigate('/admin/login');
    toast.success('Signed out successfully');
  };

  const toggleSidebarCollapsed = () => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('admin_sidebar_collapsed', next ? '1' : '0');
      return next;
    });
  };

  // Navigation based on user role
  const getNavigation = () => {
    const baseNavigation = [
      { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      { name: 'Job Postings', href: '/admin/jobs', icon: Briefcase },
      { name: 'Applicants', href: '/admin/applicants', icon: Users },
      { name: 'Resume Drop', href: '/admin/resume-drop', icon: FileText },
      { name: 'Contact Leads', href: '/admin/contact-leads', icon: MessageSquare },
      { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    if (user?.role === 'Admin') {
      return [
        { name: 'Admin Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        ...baseNavigation.slice(1), // Skip regular dashboard for admins
      ];
    }

    return baseNavigation;
  };

  const navigation = getNavigation();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'} bg-card border-r border-border transform transition-[width,transform] duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className={`flex items-center justify-between h-16 border-b border-border transition-all duration-300 ${sidebarCollapsed ? 'px-3 lg:px-2' : 'px-6'}`}>
            <Link to="/admin" className={`font-bold text-primary transition-all duration-300 ${sidebarCollapsed ? 'text-lg lg:text-base' : 'text-xl'}`}>
              <span className={sidebarCollapsed ? 'lg:hidden' : ''}>MangosOrange Admin</span>
              <span className={sidebarCollapsed ? 'hidden lg:inline' : 'hidden'}>MO</span>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="hidden lg:inline-flex"
              onClick={toggleSidebarCollapsed}
              title={sidebarCollapsed ? 'Expand sidebar' : 'Compact sidebar'}
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className={`flex-1 py-6 space-y-2 transition-all duration-300 ${sidebarCollapsed ? 'px-2 lg:px-2' : 'px-4'}`}>
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  title={item.name}
                  className={`flex items-center gap-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    sidebarCollapsed ? 'lg:justify-center lg:px-2' : 'px-3'
                  } py-2 ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-gray-800 hover:text-foreground hover:bg-accent'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="w-4 h-4" />
                  <span className={`transition-all duration-200 ${sidebarCollapsed ? 'lg:w-0 lg:opacity-0 lg:overflow-hidden' : 'lg:w-auto lg:opacity-100'}`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* User info */}
          <div className={`border-t border-border transition-all duration-300 ${sidebarCollapsed ? 'p-2 lg:p-2' : 'p-4'}`}>
            <div className={`flex items-center mb-3 ${sidebarCollapsed ? 'gap-0 lg:justify-center' : 'gap-3'}`}>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className={`flex-1 min-w-0 ${sidebarCollapsed ? 'lg:hidden' : ''}`}>
                <div className="text-sm font-medium text-foreground truncate">
                  {user.name}
                </div>
                <div className="text-xs text-gray-800 truncate">
                  {user.role}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              title="Sign Out"
              className={`w-full text-gray-800 hover:text-foreground transition-all duration-200 ${
                sidebarCollapsed ? 'lg:justify-center lg:px-2' : 'justify-start'
              }`}
              onClick={handleSignOut}
            >
              <LogOut className={`w-4 h-4 ${sidebarCollapsed ? 'lg:mr-0' : 'mr-2'}`} />
              <span className={sidebarCollapsed ? 'lg:hidden' : ''}>Sign Out</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`transition-[padding] duration-300 ease-in-out ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        {/* Top bar */}
        <div className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-4 h-4" />
          </Button>
          
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-foreground">
              Career Management
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-800">
              Welcome, {user.name}
            </span>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
