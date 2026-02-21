import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Seo from '@/components/SEO';
import { Link } from 'react-router-dom';
import { FileText, Cloud, Users, Wrench, BookOpen, Briefcase } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const sections = [
  {
    title: 'Main Pages',
    icon: FileText,
    routes: [
      { path: '/', label: 'Home' },
      { path: '/about', label: 'About Us' },
      { path: '/contact', label: 'Contact' },
      { path: '/careers', label: 'Careers' },
      { path: '/blog', label: 'Blog' },
    ],
  },
  {
    title: 'IT Services',
    icon: Wrench,
    routes: [
      { path: '/it-services', label: 'IT Services Overview' },
      { path: '/web-development', label: 'Web Development' },
      { path: '/app-development', label: 'App Development' },
      { path: '/custom-software', label: 'Custom Software' },
      { path: '/ecommerce', label: 'E-commerce Solutions' },
      { path: '/open-source', label: 'Open Source' },
      { path: '/hmis', label: 'HMIS' },
      { path: '/hardware-services', label: 'Hardware Services' },
      { path: '/it-consulting', label: 'IT Consulting' },
      { path: '/system-integration', label: 'System Integration' },
      { path: '/technical-support', label: 'Technical Support' },
    ],
  },
  {
    title: 'Cloud Services',
    icon: Cloud,
    routes: [
      { path: '/cloud-strategy', label: 'Cloud Strategy' },
      { path: '/data-migration', label: 'Data Migration' },
      { path: '/managed-services', label: 'Managed Services' },
      { path: '/cloud/aws', label: 'Amazon Web Services (AWS)' },
      { path: '/cloud/azure', label: 'Microsoft Azure' },
      { path: '/cloud/gcp', label: 'Google Cloud Platform (GCP)' },
      { path: '/cloud/multi-cloud', label: 'Multi-Cloud Solutions' },
      { path: '/cloud/infrastructure-assessment', label: 'Infrastructure Assessment' },
      { path: '/cloud/legacy-modernization', label: 'Legacy Modernization' },
      { path: '/cloud/security', label: 'Cloud Security' },
      { path: '/cloud/backup', label: 'Backup Solutions' },
      { path: '/cloud/disaster-recovery', label: 'Disaster Recovery' },
      { path: '/cloud/compliance', label: 'Compliance Management' },
      { path: '/cloud/cicd-pipelines', label: 'CI/CD Pipelines' },
      { path: '/cloud/infrastructure-as-code', label: 'Infrastructure as Code' },
      { path: '/cloud/24-7-support', label: '24/7 Support' },
    ],
  },
  {
    title: 'Staffing Solutions',
    icon: Users,
    routes: [
      { path: '/staffing', label: 'Staffing Solutions Overview' },
      { path: '/staffing/offshore-staffing', label: 'Offshore Staffing' },
      { path: '/staffing/on-premise-staffing', label: 'On-Premise Staffing' },
      { path: '/staffing/contract-solutions', label: 'Contract Solutions' },
      { path: '/staffing/payroll-outsourcing', label: 'Payroll Outsourcing' },
      { path: '/staffing/management-consulting', label: 'Management Consulting' },
      { path: '/staffing/staffing-solutions', label: 'Staffing Solutions Detail' },
    ],
  },
  {
    title: 'Legal & Other',
    icon: BookOpen,
    routes: [
      { path: '/terms-and-conditions', label: 'Terms and Conditions' },
    ],
  },
];

const SiteMap = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Sitemap - MangosOrange Services"
        description="Browse all pages on MangosOrange website. Find IT services, cloud solutions, staffing services, and more."
        keywords="sitemap, site map, navigation, MangosOrange pages"
      />
      <Header />
      <main className="container mx-auto max-w-7xl px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Site Map</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-4">
            Browse all public pages on MangosOrange. Find the information you need quickly.
          </p>
          <div className="flex gap-4 justify-center items-center">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              View XML Sitemap
            </a>
            <span className="text-muted-foreground">|</span>
            <span className="text-sm text-muted-foreground">
              {sections.reduce((acc, section) => acc + section.routes.length, 0)} Pages
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="bg-primary/5">
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    {section.title}
                  </CardTitle>
                  <CardDescription>{section.routes.length} pages</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-2">
                    {section.routes.map((route) => (
                      <li key={route.path}>
                        <Link
                          to={route.path}
                          className="text-foreground hover:text-primary hover:translate-x-1 transform transition-all inline-flex items-center gap-2 py-1"
                        >
                          <span className="text-primary">→</span>
                          {route.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 p-6 bg-muted rounded-lg text-center">
          <p className="text-muted-foreground">
            Can't find what you're looking for?{' '}
            <Link to="/contact" className="text-primary hover:underline font-medium">
              Contact us
            </Link>{' '}
            for assistance.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SiteMap;
