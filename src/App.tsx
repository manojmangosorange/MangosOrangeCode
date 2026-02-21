import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import SEOHead from "@/components/SEOHead";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// Critical pages loaded immediately
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

// Lazy load non-critical pages for better performance
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const CloudStrategy = lazy(() => import("./pages/CloudStrategy"));
const DataMigration = lazy(() => import("./pages/DataMigration"));
const ManagedServices = lazy(() => import("./pages/ManagedServices"));
const ITServices = lazy(() => import("./pages/ITServices"));
const StaffingSolutions = lazy(() => import("./pages/StaffingSolutions"));
const HMIS = lazy(() => import("./pages/HMIS"));
const WebDevelopment = lazy(() => import("./pages/WebDevelopment"));
const AppDevelopment = lazy(() => import("./pages/AppDevelopment"));
const OpenSource = lazy(() => import("./pages/OpenSource"));
const CustomSoftware = lazy(() => import("./pages/CustomSoftware"));
const Ecommerce = lazy(() => import("./pages/Ecommerce"));
const Blog = lazy(() => import("./pages/Blog"));
const Careers = lazy(() => import("./pages/Careers"));
const HardwareServices = lazy(() => import("./pages/HardwareServices"));
const ITConsulting = lazy(() => import("./pages/ITConsulting"));
const SystemIntegration = lazy(() => import("./pages/SystemIntegration"));
const TechnicalSupport = lazy(() => import("./pages/TechnicalSupport"));
const SiteMap = lazy(() => import("./pages/SiteMap"));
 

// Lazy load staffing pages
const OffshoreStaffing = lazy(() => import("./pages/staffing/OffshoreStaffing"));
const OnPremiseStaffing = lazy(() => import("./pages/staffing/OnPremiseStaffing"));
const ContractSolutions = lazy(() => import("./pages/staffing/ContractSolutions"));
const PayrollOutsourcing = lazy(() => import("./pages/staffing/PayrollOutsourcing"));
const ManagementConsulting = lazy(() => import("./pages/staffing/ManagementConsulting"));
const StaffingSolutionsDetail = lazy(() => import("./pages/staffing/StaffingSolutionsDetail"));

// Lazy load admin pages
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminDashboardFull = lazy(() => import("./pages/admin/AdminDashboardFull"));
const AdminJobs = lazy(() => import("./pages/admin/AdminJobs"));
const AdminApplicants = lazy(() => import("./pages/admin/AdminApplicants"));
const AdminResumeDrop = lazy(() => import("./pages/admin/AdminResumeDrop"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminOnlyRoute from "./components/admin/AdminOnlyRoute";
import ScrollToTopOnRouteChange from "./components/ScrollToTopOnRouteChange";
import SupportChatbot from "@/components/SupportChatbot";

// Lazy load cloud infrastructure pages
const AmazonWebServices = lazy(() => import('@/pages/cloud/AmazonWebServices'));
const MicrosoftAzure = lazy(() => import('@/pages/cloud/MicrosoftAzure'));
const GoogleCloudPlatform = lazy(() => import('@/pages/cloud/GoogleCloudPlatform'));
const MultiCloudSolutions = lazy(() => import('@/pages/cloud/MultiCloudSolutions'));
const InfrastructureAssessment = lazy(() => import('@/pages/cloud/InfrastructureAssessment'));
const LegacyModernization = lazy(() => import('@/pages/cloud/LegacyModernization'));
const CloudSecurity = lazy(() => import('@/pages/cloud/CloudSecurity'));
const BackupSolutions = lazy(() => import('@/pages/cloud/BackupSolutions'));
const DisasterRecovery = lazy(() => import('@/pages/cloud/DisasterRecovery'));
const ComplianceManagement = lazy(() => import('@/pages/cloud/ComplianceManagement'));
const CICDPipelines = lazy(() => import('@/pages/cloud/CICDPipelines'));
const InfrastructureAsCode = lazy(() => import('@/pages/cloud/InfrastructureAsCode'));
const TwentyFourSevenSupport = lazy(() => import('@/pages/cloud/TwentyFourSevenSupport'));

// Optimized QueryClient configuration for better performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Loading component for lazy routes
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SEOHead />
        <ScrollToTopOnRouteChange />
        <Routes>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/" element={<Index />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms-and-conditions" element={
            <Suspense fallback={<PageLoader />}>
              <TermsAndConditions />
            </Suspense>
          } />
          <Route path="/cloud-strategy" element={
            <Suspense fallback={<PageLoader />}>
              <CloudStrategy />
            </Suspense>
          } />
          <Route path="/data-migration" element={
            <Suspense fallback={<PageLoader />}>
              <DataMigration />
            </Suspense>
          } />
          <Route path="/managed-services" element={
            <Suspense fallback={<PageLoader />}>
              <ManagedServices />
            </Suspense>
          } />
          <Route path="/it-services" element={
            <Suspense fallback={<PageLoader />}>
              <ITServices />
            </Suspense>
          } />

          {/* Staffing Hub & Services */}
          <Route path="/staffing" element={
            <Suspense fallback={<PageLoader />}>
              <StaffingSolutions />
            </Suspense>
          } />
          
          <Route path="/staffing/offshore-staffing" element={
            <Suspense fallback={<PageLoader />}>
              <OffshoreStaffing />
            </Suspense>
          } />
          <Route path="/staffing/on-premise-staffing" element={
            <Suspense fallback={<PageLoader />}>
              <OnPremiseStaffing />
            </Suspense>
          } />
          <Route path="/staffing/contract-solutions" element={
            <Suspense fallback={<PageLoader />}>
              <ContractSolutions />
            </Suspense>
          } />
          <Route path="/staffing/payroll-outsourcing" element={
            <Suspense fallback={<PageLoader />}>
              <PayrollOutsourcing />
            </Suspense>
          } />
          <Route path="/staffing/management-consulting" element={
            <Suspense fallback={<PageLoader />}>
              <ManagementConsulting />
            </Suspense>
          } />
          <Route path="/staffing/staffing-solutions" element={
            <Suspense fallback={<PageLoader />}>
              <StaffingSolutionsDetail />
            </Suspense>
          } />
          <Route path="/staffing-solutions" element={<Navigate to="/staffing" replace />} />

          <Route path="/hmis" element={
            <Suspense fallback={<PageLoader />}>
              <HMIS />
            </Suspense>
          } />
          <Route path="/web-development" element={
            <Suspense fallback={<PageLoader />}>
              <WebDevelopment />
            </Suspense>
          } />
          <Route path="/app-development" element={
            <Suspense fallback={<PageLoader />}>
              <AppDevelopment />
            </Suspense>
          } />
          <Route path="/open-source" element={
            <Suspense fallback={<PageLoader />}>
              <OpenSource />
            </Suspense>
          } />
          <Route path="/custom-software" element={
            <Suspense fallback={<PageLoader />}>
              <CustomSoftware />
            </Suspense>
          } />
          <Route path="/ecommerce" element={
            <Suspense fallback={<PageLoader />}>
              <Ecommerce />
            </Suspense>
          } />
          <Route path="/hardware-services" element={
            <Suspense fallback={<PageLoader />}>
              <HardwareServices />
            </Suspense>
          } />
          <Route path="/it-consulting" element={
            <Suspense fallback={<PageLoader />}>
              <ITConsulting />
            </Suspense>
          } />
          <Route path="/system-integration" element={
            <Suspense fallback={<PageLoader />}>
              <SystemIntegration />
            </Suspense>
          } />
          <Route path="/technical-support" element={
            <Suspense fallback={<PageLoader />}>
              <TechnicalSupport />
            </Suspense>
          } />
          <Route path="/sitemap" element={
            <Suspense fallback={<PageLoader />}>
              <SiteMap />
            </Suspense>
          } />
          <Route path="/blog" element={
            <Suspense fallback={<PageLoader />}>
              <Blog />
            </Suspense>
          } />
          <Route path="/careers" element={
            <Suspense fallback={<PageLoader />}>
              <Careers />
            </Suspense>
          } />
          <Route path="/careers/:jobSlug" element={
            <Suspense fallback={<PageLoader />}>
              <Careers />
            </Suspense>
          } />
          <Route path="/career" element={<Navigate to="/careers" replace />} />
          
          {/* Cloud Infrastructure Routes */}
          <Route path="/cloud/aws" element={
            <Suspense fallback={<PageLoader />}>
              <AmazonWebServices />
            </Suspense>
          } />
          <Route path="/cloud/azure" element={
            <Suspense fallback={<PageLoader />}>
              <MicrosoftAzure />
            </Suspense>
          } />
          <Route path="/cloud/gcp" element={
            <Suspense fallback={<PageLoader />}>
              <GoogleCloudPlatform />
            </Suspense>
          } />
          <Route path="/cloud/multi-cloud" element={
            <Suspense fallback={<PageLoader />}>
              <MultiCloudSolutions />
            </Suspense>
          } />
          <Route path="/cloud/infrastructure-assessment" element={
            <Suspense fallback={<PageLoader />}>
              <InfrastructureAssessment />
            </Suspense>
          } />
          <Route path="/cloud/legacy-modernization" element={
            <Suspense fallback={<PageLoader />}>
              <LegacyModernization />
            </Suspense>
          } />
          <Route path="/cloud/security" element={
            <Suspense fallback={<PageLoader />}>
              <CloudSecurity />
            </Suspense>
          } />
          <Route path="/cloud/backup" element={
            <Suspense fallback={<PageLoader />}>
              <BackupSolutions />
            </Suspense>
          } />
          <Route path="/cloud/disaster-recovery" element={
            <Suspense fallback={<PageLoader />}>
              <DisasterRecovery />
            </Suspense>
          } />
          <Route path="/cloud/compliance" element={
            <Suspense fallback={<PageLoader />}>
              <ComplianceManagement />
            </Suspense>
          } />
          <Route path="/cloud/cicd-pipelines" element={
            <Suspense fallback={<PageLoader />}>
              <CICDPipelines />
            </Suspense>
          } />
          <Route path="/cloud/infrastructure-as-code" element={
            <Suspense fallback={<PageLoader />}>
              <InfrastructureAsCode />
            </Suspense>
          } />
          <Route path="/cloud/24-7-support" element={
            <Suspense fallback={<PageLoader />}>
              <TwentyFourSevenSupport />
            </Suspense>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={
            <Suspense fallback={<PageLoader />}>
              <AdminLogin />
            </Suspense>
          } />
          <Route path="/admin/dashboard" element={
            <Suspense fallback={<PageLoader />}>
              <AdminOnlyRoute>
                <AdminDashboardFull />
              </AdminOnlyRoute>
            </Suspense>
          } />
          <Route path="/admin" element={
            <Suspense fallback={<PageLoader />}>
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            </Suspense>
          } />
          <Route path="/admin/jobs" element={
            <Suspense fallback={<PageLoader />}>
              <ProtectedRoute>
                <AdminJobs />
              </ProtectedRoute>
            </Suspense>
          } />
          <Route path="/admin/applicants" element={
            <Suspense fallback={<PageLoader />}>
              <ProtectedRoute>
                <AdminApplicants />
              </ProtectedRoute>
            </Suspense>
          } />
          <Route path="/admin/resume-drop" element={
            <Suspense fallback={<PageLoader />}>
              <ProtectedRoute>
                <AdminResumeDrop />
              </ProtectedRoute>
            </Suspense>
          } />
          <Route path="/admin/settings" element={
            <Suspense fallback={<PageLoader />}>
              <ProtectedRoute>
                <AdminSettings />
              </ProtectedRoute>
            </Suspense>
          } />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <SupportChatbot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
