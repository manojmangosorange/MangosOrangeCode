import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import {
  Monitor,
  Server,
  HardDrive,
  Cpu,
  ArrowRight,
  CheckCircle,
  Zap,
  Star,
  Users,
  Award,
  Shield,
  Wrench,
  Settings,
  Network,
  Printer,
  Laptop,
  Smartphone,
  Router,
  Camera,
  Building,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/it-services-hero.webp";

const hardwareCategories = [
  {
    icon: Monitor,
    title: "Desktop & Workstation Solutions",
    description:
      "High-performance desktops and workstations for business productivity and specialized applications.",
    features: [
      "Custom PC builds",
      "Workstation optimization",
      "Multi-monitor setups",
      "Graphics workstations",
    ],
  },
  {
    icon: Laptop,
    title: "Mobile Computing Devices",
    description:
      "Laptops, tablets, and mobile devices for flexible workforce and remote collaboration.",
    features: [
      "Business laptops",
      "Tablet solutions",
      "Mobile device management",
      "Rugged computing devices",
    ],
  },
  {
    icon: Server,
    title: "Server & Infrastructure",
    description:
      "Enterprise servers, storage solutions, and data center infrastructure for scalable operations.",
    features: [
      "Rack servers",
      "Storage arrays",
      "Network switches",
      "UPS systems",
    ],
  },
];

const networkingSecurity = [
  {
    icon: Network,
    title: "Network Infrastructure",
    description:
      "Complete networking solutions including switches, routers, and wireless systems for seamless connectivity.",
    features: [
      "Managed switches",
      "Enterprise routers",
      "Wireless access points",
      "Network monitoring tools",
    ],
  },
  {
    icon: Shield,
    title: "Security Hardware",
    description:
      "Physical security solutions including firewalls, access control, and surveillance systems.",
    features: [
      "Hardware firewalls",
      "Access control systems",
      "Security cameras",
      "Intrusion detection",
    ],
  },
  {
    icon: Camera,
    title: "Surveillance & Monitoring",
    description:
      "Advanced CCTV systems and monitoring solutions for comprehensive security coverage.",
    features: [
      "IP camera systems",
      "DVR/NVR solutions",
      "Video analytics",
      "Remote monitoring",
    ],
  },
];

const supportServices = [
  {
    icon: Wrench,
    title: "Hardware Installation & Setup",
    description:
      "Professional installation and configuration services for all types of hardware equipment.",
    features: [
      "On-site installation",
      "System configuration",
      "Hardware integration",
      "Performance testing",
    ],
  },
  {
    icon: Settings,
    title: "Maintenance & Support",
    description:
      "Comprehensive maintenance and support services to ensure optimal hardware performance.",
    features: [
      "Preventive maintenance",
      "Hardware diagnostics",
      "Repair services",
      "Replacement parts",
    ],
  },
  {
    icon: Building,
    title: "Enterprise Procurement",
    description:
      "Bulk hardware procurement and asset management services for large organizations.",
    features: [
      "Volume purchasing",
      "Asset tracking",
      "Warranty management",
      "Lifecycle planning",
    ],
  },
];

const stats = [
  { icon: Users, value: "1000+", label: "Hardware Deployments" },
  { icon: Star, value: "24/7", label: "Support Available" },
  { icon: Award, value: "5+", label: "Major Brands" },
  { icon: Zap, value: "98%", label: "Uptime Guarantee" },
];

const HardwareServices = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: hardwareRef, isVisible: hardwareVisible } = useScrollAnimation();
  const { ref: networkingRef, isVisible: networkingVisible } =
    useScrollAnimation();
  const { ref: supportRef, isVisible: supportVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Hardware Services - Enterprise IT Hardware Solutions | MangosOrange"
        description="Comprehensive hardware services including servers, desktops, networking equipment, security systems, and enterprise infrastructure solutions with professional support."
      />
      <Header />

      {/* Hero Section */}
      <section className="relative page-top-spacing pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5"></div>
        <div className="container mx-auto max-w-6xl relative">
          <div
            ref={heroRef}
            className={`grid lg:grid-cols-2 gap-12 items-center fade-up ${
              heroVisible ? "visible" : ""
            }`}
          >
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Enterprise Hardware Solutions
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {" "}
                    — Complete Infrastructure
                  </span>
                </h1>
                <p className="text-xl text-gray-800 leading-relaxed">
                  Comprehensive hardware services from desktop computers to
                  enterprise servers. We provide end-to-end solutions including
                  procurement, installation, configuration, and ongoing support
                  for all your IT infrastructure needs.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>
                      Enterprise servers, workstations, and networking equipment
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Security hardware and surveillance systems</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>
                      Professional installation and 24/7 support services
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button size="lg" variant="premium" className="group">
                    Get Hardware Quote
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
              <img
                src={heroImage}
                alt="Hardware Services"
                className="relative w-full h-auto rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto max-w-6xl">
          <div
            ref={statsRef}
            className={`grid grid-cols-2 md:grid-cols-4 gap-8 fade-up ${
              statsVisible ? "visible" : ""
            }`}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center group hover:scale-105 transition-transform duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-800">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hardware Categories Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Computing Hardware
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
            <p className="text-xl text-gray-800 max-w-3xl">
              High-performance computing solutions for every business need, from
              individual workstations to enterprise server infrastructure.
            </p>
          </div>

          <div
            ref={hardwareRef}
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 fade-up ${
              hardwareVisible ? "visible" : ""
            }`}
          >
            {hardwareCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-card/50 backdrop-blur-sm"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-gray-800 leading-relaxed">
                      {category.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {category.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm text-gray-800"
                        >
                          <CheckCircle className="w-4 h-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant="ghost"
                      className="w-full justify-between group/btn hover:bg-primary/10 hover:text-primary"
                    >
                      Get Quote
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
                    </Button>
                  </CardContent>

                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Networking & Security Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Networking & Security Solutions
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
            <p className="text-xl text-gray-800 max-w-3xl">
              Advanced networking infrastructure and security hardware solutions
              to protect and connect your business operations.
            </p>
          </div>

          <div
            ref={networkingRef}
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 fade-up ${
              networkingVisible ? "visible" : ""
            }`}
          >
            {networkingSecurity.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-card/50 backdrop-blur-sm"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-gray-800 leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm text-gray-800"
                        >
                          <CheckCircle className="w-4 h-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant="ghost"
                      className="w-full justify-between group/btn hover:bg-primary/10 hover:text-primary"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
                    </Button>
                  </CardContent>

                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support Services Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Professional Services
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
            <p className="text-xl text-gray-800 max-w-3xl">
              Complete lifecycle support services from initial consultation and
              installation to ongoing maintenance and support.
            </p>
          </div>

          <div
            ref={supportRef}
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 fade-up ${
              supportVisible ? "visible" : ""
            }`}
          >
            {supportServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-card/50 backdrop-blur-sm"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-gray-800 leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm text-gray-800"
                        >
                          <CheckCircle className="w-4 h-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant="ghost"
                      className="w-full justify-between group/btn hover:bg-primary/10 hover:text-primary"
                    >
                      Get Support
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
                    </Button>
                  </CardContent>

                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Ready to Upgrade Your Hardware Infrastructure?
            </h2>
            <p className="text-xl text-gray-800">
              Contact our hardware experts to discuss your requirements and get
              a customized solution that fits your business needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" variant="premium" className="group">
                  Get Hardware Consultation
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HardwareServices;
