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
  Code2,
  Smartphone,
  Cloud,
  Settings,
  Boxes,
  ShoppingCart,
  ArrowRight,
  CheckCircle,
  Zap,
  Star,
  Users,
  Award,
  Shield,
  Database,
  Globe,
  Server,
  Lock,
  Coffee,
  Network,
  Headphones,
  Wrench,
  Code,
  Heart,
  Download,
  GitBranch,
  Brain,
  Building,
  Target,
  Rocket,
  Clock,
  Lightbulb,
  UserCheck,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import heroImage from "@/assets/it-services-hero.webp";
import webDevImage from "@/assets/web-development-service.webp";
import appDevImage from "@/assets/app-development-service.webp";
import cloudImage from "@/assets/cloud-infrastructure-service.webp";
import openSourceImage from "@/assets/open-source-service.webp";
import ecommerceImage from "@/assets/ecommerce-service.webp";
import customSoftwareImage from "@/assets/custom-software-development.webp";

const webMobileDevelopment = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "High-performance websites and web apps using modern frameworks. SEO-ready, accessible, and optimized for Core Web Vitals.",
    image: webDevImage,
    features: [
      "Responsive UX & accessibility",
      "SSR/SPA architectures",
      "Performance tuning & SEO",
    ],
  },
  {
    icon: Smartphone,
    title: "App Development",
    description:
      "Native and cross-platform mobile apps with delightful UX, robust APIs, and secure data handling.",
    image: appDevImage,
    features: [
      "iOS & Android (native/cross)",
      "Offline-first & push notifications",
      "App store compliance & CI/CD",
    ],
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Development",
    description:
      "Conversion-focused storefronts and headless commerce with secure payments and analytics.",
    image: ecommerceImage,
    features: [
      "Headless & CMS integrations",
      "Payments, taxes, fulfilment",
      "Analytics & CRO",
    ],
  },
];

const customOpenSourceSolutions = [
  {
    icon: Settings,
    title: "Custom Software Development",
    description:
      "End-to-end product engineering: discovery, design, development, QA, and ongoing evolution with AI-powered business intelligence.",
    image: customSoftwareImage,
    features: [
      "Domain-driven design",
      "API-first & microservices",
      "AI-powered BI & analytics",
      "Enterprise CRM/ERP solutions",
    ],
  },
  {
    icon: Boxes,
    title: "Open Source Customization",
    description:
      "Tailor open-source platforms with custom modules, integrations, and enterprise-grade support for scalable solutions.",
    image: openSourceImage,
    features: [
      "Module/plugin development",
      "License compliance management",
      "Community contributions",
      "Migration & modernization",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description:
      "Cloud strategy, migration, and managed services for scalable, cost-efficient operations across all major platforms.",
    image: cloudImage,
    features: [
      "Multi-cloud strategy (AWS, Azure, GCP)",
      "Zero-downtime migration",
      "24/7 monitoring & security",
      "Cost optimization",
    ],
  },
];

const stats = [
  { icon: Users, value: "500+", label: "Happy Clients" },
  { icon: Star, value: "12+", label: "States of India" },
  { icon: Award, value: "15+", label: "Cities of India" },
  { icon: Zap, value: "10,000+", label: "Beneficiaries" },
];

const routes = [
  "/web-development",
  "/app-development",
  "/ecommerce",
  "/custom-software",
  "/open-source",
  "/cloud-strategy",
];

const supportSolutions = [
  {
    icon: Target,
    title: "IT Consulting",
    description:
      "Strategic technology advisory to align IT with business objectives and drive digital transformation.",
    features: [
      "Strategic IT planning",
      "Digital transformation",
      "IT governance",
      "Technology roadmapping",
    ],
  },
  {
    icon: Network,
    title: "System Integration",
    description:
      "Seamlessly connect disparate systems and automate workflows for improved operational efficiency.",
    features: [
      "API integration",
      "Data synchronization",
      "Process automation",
      "Enterprise connectivity",
    ],
  },
  {
    icon: Headphones,
    title: "Technical Support",
    description:
      "24/7 technical support and monitoring to keep your systems running smoothly and efficiently.",
    features: [
      "24/7 help desk",
      "System monitoring",
      "Security support",
      "User training",
    ],
  },
];

const supportRoutes = [
  "/it-consulting",
  "/system-integration",
  "/technical-support",
];

const ITServices = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: webMobileRef, isVisible: webMobileVisible } =
    useScrollAnimation();
  const { ref: customRef, isVisible: customVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="IT Services - Web, Mobile, Custom Software | MangosOrange"
        description="Comprehensive IT services including web development, mobile apps, custom software, open source solutions, and cloud infrastructure. Transform your business with our expert solutions."
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
                  IT Services for Modern Enterprises
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {" "}
                    — Strategy to Scale
                  </span>
                </h1>
                <p className="text-xl text-gray-800 leading-relaxed">
                  We deliver end-to-end software engineering—from discovery and
                  design to build, deploy, and manage. Comprehensive solutions
                  including custom development, open source customization, and
                  enterprise modernization with proven expertise across 200+
                  successful projects.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>
                      Web & Mobile Engineering with performance, accessibility,
                      and SEO baked in
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>
                      Custom Software Development with AI-powered Business
                      Intelligence
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>
                      Open Source Customization and Legacy System Modernization
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button size="lg" variant="premium" className="group">
                    Get Started Today
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
              <img
                src={heroImage}
                alt="IT Services Hero"
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

      {/* Web & Mobile Development Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Web & Mobile Development
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
            <p className="text-xl text-gray-800 max-w-3xl">
              Modern web and mobile solutions built for performance,
              scalability, and user experience across all devices and platforms.
            </p>
          </div>

          <div
            ref={webMobileRef}
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 fade-up ${
              webMobileVisible ? "visible" : ""
            }`}
          >
            {webMobileDevelopment.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-card/50 backdrop-blur-sm"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                    </div>
                  </div>

                  <CardHeader className="pb-4">
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
                    <Link to={routes[index]}>
                      <Button
                        variant="ghost"
                        className="w-full justify-between group/btn hover:bg-primary/10 hover:text-primary"
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
                      </Button>
                    </Link>
                  </CardContent>

                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Custom Software & Open Source Solutions Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Custom Software & Enterprise Solutions
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
            <p className="text-xl text-gray-800 max-w-3xl">
              Enterprise-grade custom software development, open source
              customization, and cloud infrastructure solutions for scalable
              business growth.
            </p>
          </div>

          <div
            ref={customRef}
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 fade-up ${
              customVisible ? "visible" : ""
            }`}
          >
            {customOpenSourceSolutions.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-card/50 backdrop-blur-sm"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                    </div>
                  </div>

                  <CardHeader className="pb-4">
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
                    <Link to={routes[index + 3]}>
                      <Button
                        variant="ghost"
                        className="w-full justify-between group/btn hover:bg-primary/10 hover:text-primary"
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
                      </Button>
                    </Link>
                  </CardContent>

                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support Solutions Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Support Solutions
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              Comprehensive IT consulting and support services to optimize your
              technology infrastructure and drive business success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {supportSolutions.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-card/50 backdrop-blur-sm"
                >
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary-foreground" />
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
                    <Link to={supportRoutes[index]}>
                      <Button
                        variant="ghost"
                        className="w-full justify-between group/btn hover:bg-primary/10 hover:text-primary"
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
                      </Button>
                    </Link>
                  </CardContent>

                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support Solutions Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Support Solutions
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              Comprehensive IT consulting and support services to optimize your
              technology infrastructure.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {supportSolutions.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300"
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link to={supportRoutes[index]}>
                      <Button variant="ghost" className="w-full">
                        Learn More
                      </Button>
                    </Link>
                  </CardContent>
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
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-800">
              Let's discuss how our comprehensive IT services can help
              accelerate your digital transformation and drive your business
              forward with proven enterprise solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" variant="premium" className="group">
                  Contact Now
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

export default ITServices;
