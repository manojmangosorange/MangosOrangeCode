import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import ServicePageLayout from '@/components/ServicePageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Network, Database, Workflow, Zap, Shield, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const SystemIntegration = () => {
  const { ref: heroRef, isVisible: heroInView } = useScrollAnimation();
  const { ref: servicesRef, isVisible: servicesInView } = useScrollAnimation();
  const { ref: approachRef, isVisible: approachInView } = useScrollAnimation();
  const { ref: benefitsRef, isVisible: benefitsInView } = useScrollAnimation();

  const integrationServices = [
    {
      icon: Network,
      title: "API Integration",
      description: "Seamlessly connect disparate systems through robust API development and integration solutions.",
      features: ["RESTful & GraphQL APIs", "Real-time data sync", "Authentication & security", "Rate limiting & monitoring"]
    },
    {
      icon: Database,
      title: "Data Integration",
      description: "Unify data across multiple platforms with ETL processes and real-time synchronization.",
      features: ["ETL pipeline development", "Data warehousing", "Real-time streaming", "Data quality assurance"]
    },
    {
      icon: Workflow,
      title: "Process Integration",
      description: "Streamline business workflows by connecting systems and automating processes.",
      features: ["Workflow automation", "Business process modeling", "Event-driven architecture", "Process optimization"]
    },
    {
      icon: Zap,
      title: "Enterprise Integration",
      description: "Connect enterprise applications like ERP, CRM, and HR systems for unified operations.",
      features: ["ERP integrations", "CRM connectivity", "Legacy system modernization", "Middleware solutions"]
    }
  ];

  const integrationApproach = [
    {
      phase: "Assessment",
      description: "Analyze existing systems, data flows, and integration requirements to design optimal solutions.",
      icon: Database
    },
    {
      phase: "Architecture",
      description: "Design scalable integration architecture with proper security, monitoring, and error handling.",
      icon: Network
    },
    {
      phase: "Implementation", 
      description: "Develop and deploy integration solutions with minimal disruption to existing operations.",
      icon: Workflow
    },
    {
      phase: "Optimization",
      description: "Monitor performance, optimize data flows, and ensure seamless system communication.",
      icon: Zap
    }
  ];

  const integrationBenefits = [
    {
      icon: Zap,
      title: "Improved Efficiency",
      description: "Eliminate manual data entry and reduce operational overhead through automated integration."
    },
    {
      icon: Shield,
      title: "Enhanced Security",
      description: "Secure data transfer protocols and authentication mechanisms protect sensitive information."
    },
    {
      icon: Clock,
      title: "Real-time Insights",
      description: "Access to unified, real-time data across all systems for better decision-making."
    },
    {
      icon: Users,
      title: "Better Collaboration",
      description: "Unified systems enable seamless collaboration across departments and teams."
    }
  ];

  return (
    <>
      <SEO
        title="System Integration Services | Enterprise Integration Solutions"
        description="Professional system integration services to connect your business applications. API integration, data synchronization, and enterprise connectivity solutions."
      />
      <Header />

      <main className="bg-background">
        {/* Hero Section */}
        <section ref={heroRef} className={`py-20 bg-gradient-to-br from-primary/5 to-primary/10 transition-all duration-1000 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">System Integration Services</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Transform your business operations with comprehensive system integration services. We connect disparate systems, automate workflows, and ensure seamless data flow across your organization.
            </p>
            <Button asChild size="lg" className="font-semibold">
              <Link to="/contact">Start Integration Project</Link>
            </Button>
          </div>
        </section>
        {/* Services Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div
              ref={servicesRef}
              className={`transition-all duration-1000 ${
                servicesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-6">Integration Solutions</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Comprehensive system integration services to unify your business operations
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {integrationServices.map((service, index) => (
                  <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <service.icon className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                          <p className="text-muted-foreground mb-4">{service.description}</p>
                          <ul className="space-y-2">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center text-sm">
                                <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Approach Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div
              ref={approachRef}
              className={`transition-all duration-1000 ${
                approachInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-6">Our Integration Approach</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  A systematic methodology ensuring successful system integration
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {integrationApproach.map((phase, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <phase.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{phase.phase}</h3>
                    <p className="text-muted-foreground">{phase.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div
              ref={benefitsRef}
              className={`transition-all duration-1000 ${
                benefitsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-6">Integration Benefits</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Transform your business operations with connected systems
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {integrationBenefits.map((benefit, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <benefit.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Technical Excellence Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Technical Excellence</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
                We use industry-leading technologies and best practices for reliable integration solutions
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-3">Integration Platforms</h3>
                <p className="text-muted-foreground">
                  MuleSoft, Apache Kafka, Microsoft BizTalk, Dell Boomi, and custom middleware solutions.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-3">Protocols & Standards</h3>
                <p className="text-muted-foreground">
                  REST, SOAP, GraphQL, XML, JSON, EDI, and industry-specific communication protocols.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-3">Security & Compliance</h3>
                <p className="text-muted-foreground">
                  OAuth, SAML, encryption, audit trails, and compliance with industry regulations.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Integrate Your Systems?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Let's connect your business systems for improved efficiency and seamless operations.
            </p>
            <Button asChild size="lg" variant="secondary" className="font-semibold">
              <Link to="/contact">Discuss Your Integration Needs</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default SystemIntegration;