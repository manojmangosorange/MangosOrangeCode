import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import ServicePageLayout from '@/components/ServicePageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Headphones, Monitor, Shield, Clock, Users, Zap, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const TechnicalSupport = () => {
  const { ref: heroRef, isVisible: heroInView } = useScrollAnimation();
  const { ref: servicesRef, isVisible: servicesInView } = useScrollAnimation();
  const { ref: levelsRef, isVisible: levelsInView } = useScrollAnimation();
  const { ref: benefitsRef, isVisible: benefitsInView } = useScrollAnimation();

  const supportServices = [
    {
      icon: Headphones,
      title: "24/7 Help Desk",
      description: "Round-the-clock technical support for your IT infrastructure and applications.",
      features: ["Multi-channel support (phone, email, chat)", "Ticket tracking system", "Remote troubleshooting", "Escalation procedures"]
    },
    {
      icon: Monitor,
      title: "System Monitoring",
      description: "Proactive monitoring and maintenance to prevent issues before they impact your business.",
      features: ["Infrastructure monitoring", "Performance optimization", "Automated alerts", "Preventive maintenance"]
    },
    {
      icon: Shield,
      title: "Security Support",
      description: "Comprehensive security monitoring and incident response to protect your digital assets.",
      features: ["Security incident response", "Vulnerability management", "Compliance monitoring", "Security updates"]
    },
    {
      icon: Users,
      title: "User Support",
      description: "End-user training and support to maximize productivity and system adoption.",
      features: ["User training programs", "Knowledge base management", "Self-service portals", "Change management"]
    }
  ];

  const supportLevels = [
    {
      level: "Level 1",
      title: "Basic Support",
      description: "Initial troubleshooting and common issue resolution",
      features: ["Password resets", "Basic software issues", "Hardware troubleshooting", "User guidance"],
      responseTime: "< 2 hours"
    },
    {
      level: "Level 2", 
      title: "Advanced Support",
      description: "Complex technical issues and system configuration",
      features: ["System configuration", "Network troubleshooting", "Software installation", "Performance issues"],
      responseTime: "< 4 hours"
    },
    {
      level: "Level 3",
      title: "Expert Support",
      description: "Specialized expertise for critical systems and applications",
      features: ["Custom application support", "Database optimization", "Security incidents", "Architecture guidance"],
      responseTime: "< 1 hour"
    }
  ];

  const supportBenefits = [
    {
      icon: Clock,
      title: "Rapid Response",
      description: "Fast response times with SLA guarantees to minimize business disruption."
    },
    {
      icon: Zap,
      title: "Proactive Monitoring",
      description: "Identify and resolve issues before they impact your operations."
    },
    {
      icon: Award,
      title: "Expert Team",
      description: "Certified technical professionals with deep industry expertise."
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "Enterprise-grade security protocols and compliance standards."
    }
  ];

  return (
    <>
      <SEO
        title="Technical Support Services | 24/7 IT Help Desk"
        description="Professional technical support services with 24/7 help desk, system monitoring, and expert troubleshooting. Minimize downtime and maximize productivity."
      />
      <Header />

      <main className="bg-background">
        {/* Hero Section */}
        <section ref={heroRef} className={`py-20 bg-gradient-to-br from-primary/5 to-primary/10 transition-all duration-1000 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">Technical Support Services</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Comprehensive technical support services to keep your systems running smoothly. From help desk to proactive monitoring, we ensure your technology works for you, not against you.
            </p>
            <Button asChild size="lg" className="font-semibold">
              <Link to="/contact">Get Support Now</Link>
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
                <h2 className="text-4xl font-bold mb-6">Support Services</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Comprehensive technical support solutions to keep your business running
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {supportServices.map((service, index) => (
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

        {/* Support Levels Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div
              ref={levelsRef}
              className={`transition-all duration-1000 ${
                levelsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-6">Support Levels</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Tiered support structure ensuring the right expertise for every issue
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {supportLevels.map((level, index) => (
                  <Card key={index} className="relative overflow-hidden">
                    <CardContent className="p-8">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl font-bold text-primary">{index + 1}</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{level.title}</h3>
                        <p className="text-muted-foreground mb-4">{level.description}</p>
                        <div className="mb-4">
                          <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                            Response: {level.responseTime}
                          </span>
                        </div>
                        <ul className="space-y-2 text-sm">
                          {level.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center justify-center">
                              <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
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
                <h2 className="text-4xl font-bold mb-6">Support Benefits</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Why businesses choose our technical support services
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {supportBenefits.map((benefit, index) => (
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

        {/* SLA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Service Level Agreements</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
                We guarantee our service levels with comprehensive SLAs
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">System Uptime</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">&lt; 15min</div>
                <div className="text-sm text-muted-foreground">Critical Response</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Availability</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <div className="text-sm text-muted-foreground">First Call Resolution</div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Need Technical Support?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Get expert technical support that keeps your business running smoothly. Available 24/7 with rapid response times.
            </p>
            <Button asChild size="lg" variant="secondary" className="font-semibold">
              <Link to="/contact">Contact Support Team</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default TechnicalSupport;