import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useScrollToSection } from '@/utils/navigation';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import navLogo from '@/assets/c6935172-f978-4b7f-a28c-db62025bfe9b.webp';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isITServicesOpen, setIsITServicesOpen] = useState(false);
  const [isCloudOpen, setIsCloudOpen] = useState(false);
  const {
    scrollToSection
  } = useScrollToSection();
  const location = useLocation();
  const navigate = useNavigate();
  const isITActive = ['/it-services', '/web-development', '/app-development', '/open-source', '/custom-software', '/ecommerce'].some(p => location.pathname.startsWith(p));
  const isCloudActive = ['/cloud-strategy', '/data-migration', '/managed-services'].some(p => location.pathname.startsWith(p));
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleSectionClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsITServicesOpen(false);
    setIsCloudOpen(false);
  };
  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/85 backdrop-blur-lg border-b border-border shadow-lg' : 'bg-background/80 backdrop-blur-md shadow-md'}`}>
      <div className="w-full px-4 lg:px-6">
        <nav className="flex items-center justify-between h-16 lg:h-20 max-w-7xl mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="p-1 rounded-xl transition-transform duration-300 group-hover:scale-105">
              <img src={navLogo} alt="MangosOrange Logo" className="h-8 sm:h-10 w-auto" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavLink to="/" className={({
            isActive
          }) => `px-4 py-2 text-foreground hover:text-primary transition-all duration-300 font-medium relative group rounded-lg hover:bg-primary/5 ${isActive ? 'text-primary' : ''}`}>
              Home
              <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-primary transition-all duration-300 ${location.pathname === '/' ? 'opacity-100' : 'opacity-0'}`}></span>
            </NavLink>
            
            <NavLink to="/about" className={({
            isActive
          }) => `px-4 py-2 text-foreground hover:text-primary transition-all duration-300 font-medium relative group rounded-lg hover:bg-primary/5 ${isActive ? 'text-primary' : ''}`}>
              About
              <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-primary transition-all duration-300 ${location.pathname === '/about' ? 'opacity-100' : 'opacity-0'}`}></span>
            </NavLink>
            
            {/* IT Services Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger onClick={() => navigate('/it-services')} className={`px-4 py-2 text-foreground hover:text-primary bg-transparent hover:bg-primary/5 font-medium data-[state=open]:text-primary transition-all duration-300 rounded-lg relative ${isITActive ? 'text-primary' : ''}`}>
                    IT Services
                    <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-primary transition-all duration-300 ${isITActive ? 'opacity-100' : 'opacity-0'}`}></span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="!w-auto min-w-[500px]">
                    <div className="bg-background/98 backdrop-blur-lg border border-border/50 rounded-2xl shadow-2xl p-8">
                      <div className="grid grid-cols-3 gap-8">
                        {/* Web & Mobile Development */}
                        <div>
                          <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-5 pb-2 border-b border-primary/20">
                            Web & Mobile Development
                          </h4>
                          <div className="space-y-3">
                            <Link to="/web-development" className="block text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 py-1 hover:translate-x-1 transform">
                              Web Development
                            </Link>
                            <Link to="/app-development" className="block text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 py-1 hover:translate-x-1 transform">
                              App Development
                            </Link>
                            <Link to="/ecommerce" className="block text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 py-1 hover:translate-x-1 transform">
                              E-commerce Solutions
                            </Link>
                          </div>
                        </div>

                        {/* Enterprise Solutions */}
                        <div>
                          <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-5 pb-2 border-b border-primary/20">ENTERPRISE SOLUTIONS
                          <br/>
                        </h4>
                          <div className="space-y-3">
                            <Link to="/custom-software" className="block text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 py-1 hover:translate-x-1 transform">
                              Custom Software
                            </Link>
                            <Link to="/open-source" className="block text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 py-1 hover:translate-x-1 transform">
                              Open Source
                            </Link>
                            <Link to="/hardware-services" className="block text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 py-1 hover:translate-x-1 transform">
                              Hardware Services
                            </Link>
                          </div>
                        </div>

                        {/* Support Solutions */}
                        <div>
                          <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-5 pb-2 border-b border-primary/20">SUPPORT SOLUTIONS

                        </h4>
                          <div className="space-y-3">
                            <Link to="/it-consulting" className="block text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 py-1 hover:translate-x-1 transform">
                              IT Consulting
                            </Link>
                            <Link to="/system-integration" className="block text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 py-1 hover:translate-x-1 transform">
                              System Integration
                            </Link>
                            <Link to="/technical-support" className="block text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 py-1 hover:translate-x-1 transform">
                              Technical Support
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Cloud Infrastructure Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={`px-4 py-2 text-foreground hover:text-primary bg-transparent hover:bg-primary/5 font-medium data-[state=open]:text-primary transition-all duration-300 rounded-lg relative ${isCloudActive ? 'text-primary' : ''}`}>
                    Cloud Infrastructure
                    <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-primary transition-all duration-300 ${isCloudActive ? 'opacity-100' : 'opacity-0'}`}></span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="!w-auto min-w-[600px]">
                    <div className="bg-background/98 backdrop-blur-lg border border-border/50 rounded-2xl shadow-2xl p-8">
                      <div className="grid grid-cols-4 gap-8">
                        {/* Cloud Platforms */}
                        <div>
                          <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-5 pb-2 border-b border-primary/20">
                            Cloud Platforms
                          </h4>
                          <div className="space-y-3">
                            <Link to="/cloud/aws" className="block text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 py-1 hover:translate-x-1 transform">
                              Amazon Web Services (AWS)
                            </Link>
                            <Link to="/cloud/azure" className="block text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 py-1 hover:translate-x-1 transform">
                              Microsoft Azure
                            </Link>
                            <Link to="/cloud/gcp" className="block text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 py-1 hover:translate-x-1 transform">
                              Google Cloud Platform (GCP)
                            </Link>
                            <Link to="/cloud/multi-cloud" className="block text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 py-1 hover:translate-x-1 transform">
                              Multi-Cloud Solutions
                            </Link>
                          </div>
                        </div>

                        {/* Migration & Strategy */}
                        <div>
                          <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-5 pb-2 border-b border-primary/20">
                            Migration & Strategy
                          </h4>
                          <div className="space-y-3">
                            <Link to="/cloud-strategy" className="block text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 py-1 hover:translate-x-1 transform">
                              Cloud Strategy & Consulting
                            </Link>
                            <Link to="/data-migration" className="block text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 py-1 hover:translate-x-1 transform">
                              Data Migration Services
                            </Link>
                            <Link to="/cloud/infrastructure-assessment" className="block text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 py-1 hover:translate-x-1 transform">
                              Infrastructure Assessment
                            </Link>
                            <Link to="/cloud/legacy-modernization" className="block text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 py-1 hover:translate-x-1 transform">
                              Legacy Modernization
                            </Link>
                          </div>
                        </div>

                        {/* Security & Backup */}
                        <div>
                          <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-5 pb-2 border-b border-primary/20">
                            Security & Backup
                          </h4>
                          <div className="space-y-3">
                            <Link to="/cloud/security" className="block text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 py-1 hover:translate-x-1 transform">
                              Cloud Security
                            </Link>
                            <Link to="/cloud/backup" className="block text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 py-1 hover:translate-x-1 transform">
                              Backup Solutions
                            </Link>
                            <Link to="/cloud/disaster-recovery" className="block text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 py-1 hover:translate-x-1 transform">
                              Disaster Recovery
                            </Link>
                            <Link to="/cloud/compliance" className="block text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 py-1 hover:translate-x-1 transform">
                              Compliance Management
                            </Link>
                          </div>
                        </div>

                        {/* DevOps & Support */}
                        <div>
                          <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-5 pb-2 border-b border-primary/20">
                            DevOps & Support
                          </h4>
                          <div className="space-y-3">
                            <Link to="/cloud/cicd-pipelines" className="block text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 py-1 hover:translate-x-1 transform">
                              CI/CD Pipelines
                            </Link>
                            <Link to="/cloud/infrastructure-as-code" className="block text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 py-1 hover:translate-x-1 transform">
                              Infrastructure as Code
                            </Link>
                            <Link to="/managed-services" className="block text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 py-1 hover:translate-x-1 transform">
                              Managed Services
                            </Link>
                            <Link to="/cloud/24-7-support" className="block text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 py-1 hover:translate-x-1 transform">
                              24/7 Support
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <NavLink to="/staffing" className={({
            isActive
          }) => `px-4 py-2 text-foreground hover:text-primary transition-all duration-300 font-medium relative group rounded-lg hover:bg-primary/5 ${isActive ? 'text-primary' : ''}`}>
              Staffing
              <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-primary transition-all duration-300 ${location.pathname.startsWith('/staffing') ? 'opacity-100' : 'opacity-0'}`}></span>
            </NavLink>
            
            <NavLink to="/hmis" className={({
            isActive
          }) => `px-4 py-2 text-foreground hover:text-primary transition-all duration-300 font-medium relative group rounded-lg hover:bg-primary/5 ${isActive ? 'text-primary' : ''}`}>
              HMIS
              <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-primary transition-all duration-300 ${location.pathname === '/hmis' ? 'opacity-100' : 'opacity-0'}`}></span>
            </NavLink>
            
            <NavLink to="/careers" className={({
            isActive
          }) => `px-4 py-2 text-foreground hover:text-primary transition-all duration-300 font-medium relative group rounded-lg hover:bg-primary/5 ${isActive ? 'text-primary' : ''}`}>
              Careers
              <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-primary transition-all duration-300 ${location.pathname === '/careers' ? 'opacity-100' : 'opacity-0'}`}></span>
            </NavLink>
            
            <Link to="/contact" className="ml-4">
              <Button variant="outline" className="border-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 px-6 py-2 rounded-full font-medium hover:scale-105 hover:shadow-lg">
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" className="lg:hidden p-2 hover:bg-primary/10 rounded-lg transition-colors duration-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg z-50 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="px-6 py-8 space-y-4">
              <Link to="/" className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-300 font-medium rounded-lg" onClick={closeMenu}>
                Home
              </Link>
              
              <Link to="/about" className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-300 font-medium rounded-lg" onClick={closeMenu}>
                About
              </Link>
              
              {/* IT Services Mobile Accordion */}
              <Collapsible open={isITServicesOpen} onOpenChange={setIsITServicesOpen}>
                <CollapsibleTrigger className="w-full flex items-center justify-between px-4 py-3 text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-300 font-medium rounded-lg">
                  IT Services
                  <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isITServicesOpen ? 'rotate-90' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden">
                  <div className="ml-4 mt-2 space-y-1 border-l-2 border-primary/20 pl-4">
                    <div className="py-2">
                      <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Web & Mobile Development</div>
                      <div className="space-y-1">
                        <Link to="/web-development" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={closeMenu}>Web Development</Link>
                        <Link to="/app-development" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={closeMenu}>App Development</Link>
                        <Link to="/ecommerce" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={closeMenu}>E-commerce Solutions</Link>
                      </div>
                    </div>
                    
                    <div className="py-2">
                      <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Enterprise Solutions</div>
                      <div className="space-y-1">
                        <Link to="/custom-software" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={closeMenu}>Custom Software</Link>
                        <Link to="/open-source" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={closeMenu}>Open Source</Link>
                        <Link to="/hardware-services" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={closeMenu}>Hardware Services</Link>
                      </div>
                    </div>
                    
                    <div className="py-2">
                      <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Support Solutions</div>
                      <div className="space-y-1">
                        <Link to="/it-services" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={closeMenu}>IT Consulting</Link>
                        <Link to="/it-services" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={closeMenu}>System Integration</Link>
                        <Link to="/it-services" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={closeMenu}>Technical Support</Link>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
              
              {/* Cloud Infrastructure Mobile Accordion */}
              <Collapsible open={isCloudOpen} onOpenChange={setIsCloudOpen}>
                <CollapsibleTrigger className="w-full flex items-center justify-between px-4 py-3 text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-300 font-medium rounded-lg">
                  Cloud Infrastructure
                  <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isCloudOpen ? 'rotate-90' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden">
                  <div className="ml-4 mt-2 space-y-1 border-l-2 border-primary/20 pl-4">
                    <div className="py-2">
                      <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Cloud Platforms</div>
                      <div className="space-y-1">
                        <Link to="/cloud/aws" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={closeMenu}>Amazon Web Services (AWS)</Link>
                        <Link to="/cloud/azure" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={closeMenu}>Microsoft Azure</Link>
                        <Link to="/cloud/gcp" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={closeMenu}>Google Cloud Platform (GCP)</Link>
                        <Link to="/cloud/multi-cloud" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={closeMenu}>Multi-Cloud Solutions</Link>
                      </div>
                    </div>
                    
                    <div className="py-2">
                      <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Migration & Strategy</div>
                      <div className="space-y-1">
                        <Link to="/cloud-strategy" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={closeMenu}>Cloud Strategy & Consulting</Link>
                        <Link to="/data-migration" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={closeMenu}>Data Migration Services</Link>
                        <Link to="/cloud/infrastructure-assessment" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={closeMenu}>Infrastructure Assessment</Link>
                        <Link to="/cloud/legacy-modernization" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={closeMenu}>Legacy Modernization</Link>
                      </div>
                    </div>
                    
                    <div className="py-2">
                      <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Security & Backup</div>
                      <div className="space-y-1">
                        <Link to="/cloud/security" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={closeMenu}>Cloud Security</Link>
                        <Link to="/cloud/backup" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={closeMenu}>Backup Solutions</Link>
                        <Link to="/cloud/disaster-recovery" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={closeMenu}>Disaster Recovery</Link>
                        <Link to="/cloud/compliance" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={closeMenu}>Compliance Management</Link>
                      </div>
                    </div>
                    
                    <div className="py-2">
                      <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">DevOps & Support</div>
                      <div className="space-y-1">
                        <Link to="/cloud/cicd-pipelines" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={closeMenu}>CI/CD Pipelines</Link>
                        <Link to="/cloud/infrastructure-as-code" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={closeMenu}>Infrastructure as Code</Link>
                        <Link to="/managed-services" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={closeMenu}>Managed Services</Link>
                        <Link to="/cloud/24-7-support" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={closeMenu}>24/7 Support</Link>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
              
              <Link to="/staffing" className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-300 font-medium rounded-lg" onClick={closeMenu}>
                Staffing
              </Link>
              
              <Link to="/hmis" className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-300 font-medium rounded-lg" onClick={closeMenu}>
                HMIS
              </Link>
              
              <Link to="/careers" className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-300 font-medium rounded-lg" onClick={closeMenu}>
                Careers
              </Link>
              
              <div className="pt-4 mt-4 border-t border-border/50">
                <Link to="/contact" onClick={closeMenu}>
                  <Button variant="outline" className="w-full border-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 rounded-full font-medium">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>}
      </div>
    </header>;
};
export default Header;
