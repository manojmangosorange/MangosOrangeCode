import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  CheckCircle,
  TrendingUp,
  Shield,
  Zap,
  Users,
  ArrowRight,
  Cloud,
  Database,
  Settings,
  Monitor,
  Lock,
  BarChart3,
} from "lucide-react";
import cloudStrategyHero from "@/assets/cloud-strategy-hero.webp";
import SEO from "@/components/SEO";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const cloudPlatforms = [
  {
    title: "Amazon Web Services (AWS)",
    description: "Complete AWS migration, optimization, and managed services",
    icon: Cloud,
    features: [
      "EC2 & Lambda",
      "RDS & DynamoDB",
      "S3 & CloudFront",
      "Auto Scaling",
    ],
  },
  {
    title: "Microsoft Azure",
    description: "Azure cloud strategy, migration, and enterprise integration",
    icon: Database,
    features: [
      "Azure VMs",
      "SQL Database",
      "Active Directory",
      "DevOps Services",
    ],
  },
  {
    title: "Google Cloud Platform",
    description: "GCP infrastructure, BigQuery analytics, and AI/ML services",
    icon: BarChart3,
    features: [
      "Compute Engine",
      "BigQuery",
      "Kubernetes Engine",
      "AI Platform",
    ],
  },
];

const managedServices = [
  {
    title: "24/7 Cloud Monitoring",
    description: "Continuous monitoring and performance optimization",
    icon: Monitor,
    features: [
      "Real-time Alerts",
      "Performance Metrics",
      "Cost Optimization",
      "Security Monitoring",
    ],
  },
  {
    title: "Backup & Recovery",
    description: "Automated backup solutions and disaster recovery planning",
    icon: Shield,
    features: [
      "Automated Backups",
      "Point-in-time Recovery",
      "Disaster Recovery",
      "Data Archiving",
    ],
  },
  {
    title: "Security & Compliance",
    description: "Enterprise-grade security and compliance management",
    icon: Lock,
    features: [
      "Identity Management",
      "Encryption",
      "Compliance Audits",
      "Vulnerability Scanning",
    ],
  },
];

const migrationServices = [
  {
    title: "Assessment & Planning",
    description:
      "Comprehensive cloud readiness assessment and migration strategy",
    icon: TrendingUp,
    features: [
      "Infrastructure Analysis",
      "Cost Assessment",
      "Risk Evaluation",
      "Migration Roadmap",
    ],
  },
  {
    title: "Application Migration",
    description:
      "Seamless application and database migration with minimal downtime",
    icon: Settings,
    features: [
      "Lift & Shift",
      "Re-platforming",
      "Refactoring",
      "Hybrid Solutions",
    ],
  },
  {
    title: "Optimization Services",
    description:
      "Post-migration optimization for performance and cost efficiency",
    icon: Zap,
    features: [
      "Performance Tuning",
      "Cost Optimization",
      "Resource Scaling",
      "Monitoring Setup",
    ],
  },
];

const CloudStrategy = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: platformsRef, isVisible: platformsVisible } =
    useScrollAnimation();
  const { ref: servicesRef, isVisible: servicesVisible } = useScrollAnimation();
  const { ref: migrationRef, isVisible: migrationVisible } =
    useScrollAnimation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <SEO
        title="Cloud Strategy & Migration Services | MangosOrange"
        description="Expert cloud strategy, migration, and managed services. AWS, Azure, GCP solutions with 24/7 support and enterprise-grade security."
      />
      <Header />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className={`page-top-spacing pb-12 sm:pb-16 md:pb-20 px-4 fade-up ${
          heroVisible ? "visible" : ""
        }`}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
                Cloud Infrastructure Solutions
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {" "}
                  — Strategy to Scale
                </span>
              </h1>
              <p className="text-lg text-gray-800 leading-relaxed mb-8">
                Comprehensive cloud strategy and infrastructure services to
                accelerate your digital transformation. From migration planning
                to managed services, we deliver scalable, secure, and
                cost-effective cloud solutions.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-gray-800">
                    Multi-cloud platform expertise (AWS, Azure, GCP)
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-gray-800">
                    Zero-downtime migration strategies
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-gray-800">
                    24/7 managed services and support
                  </span>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button size="lg" variant="premium" className="group">
                    Start Migration Today
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <img
                src={cloudStrategyHero}
                alt="Cloud Strategy and Infrastructure Services"
                className="w-full h-auto rounded-2xl shadow-2xl"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cloud Platforms Section */}
      <section
        ref={platformsRef}
        className={`py-20 px-4 fade-up ${platformsVisible ? "visible" : ""}`}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Cloud Platforms
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {cloudPlatforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {platform.title}
                    </CardTitle>
                    <p className="text-gray-800">{platform.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {platform.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span className="text-gray-800">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Managed Services Section */}
      <section
        ref={servicesRef}
        className={`py-20 px-4 bg-muted/30 fade-up ${
          servicesVisible ? "visible" : ""
        }`}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Managed Services
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {managedServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                    <p className="text-gray-800">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span className="text-gray-800">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Migration Services Section */}
      <section
        ref={migrationRef}
        className={`py-20 px-4 fade-up ${migrationVisible ? "visible" : ""}`}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Migration Services
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {migrationServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                    <p className="text-gray-800">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span className="text-gray-800">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto text-center max-w-4xl">
          <Cloud className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h2 className="text-4xl font-bold mb-6">
            Ready to Accelerate Your Cloud Journey?
          </h2>
          <p className="text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
            Let's discuss how our cloud infrastructure solutions can transform
            your business operations and reduce costs.
          </p>
          <Link to="/contact">
            <Button size="lg" variant="premium" className="group">
              Get Cloud Assessment
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CloudStrategy;
