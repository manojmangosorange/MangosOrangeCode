import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import ServicePageLayout from '@/components/ServicePageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Users, Target, TrendingUp, Shield, Zap, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const ITConsulting = () => {
  const { ref: heroRef, isVisible: heroInView } = useScrollAnimation();
  const { ref: servicesRef, isVisible: servicesInView } = useScrollAnimation();
  const { ref: processRef, isVisible: processInView } = useScrollAnimation();
  const { ref: benefitsRef, isVisible: benefitsInView } = useScrollAnimation();

  const consultingServices = [
    {
      icon: Target,
      title: "Strategic IT Planning",
      description: "Align your technology roadmap with business objectives for maximum ROI and competitive advantage.",
      features: ["Technology assessment", "Strategic roadmapping", "Budget planning", "Risk management"]
    },
    {
      icon: TrendingUp,
      title: "Digital Transformation",
      description: "Navigate the digital landscape with expert guidance on modernization and innovation strategies.",
      features: ["Legacy system modernization", "Process automation", "Digital workflow design", "Change management"]
    },
    {
      icon: Shield,
      title: "IT Security Consulting",
      description: "Comprehensive security assessments and strategy development to protect your digital assets.",
      features: ["Security audits", "Compliance frameworks", "Risk assessment", "Security training"]
    },
    {
      icon: Users,
      title: "IT Governance",
      description: "Establish robust IT governance frameworks for better decision-making and resource allocation.",
      features: ["Policy development", "ITIL best practices", "Service management", "Performance metrics"]
    }
  ];

  const consultingProcess = [
    {
      step: "01",
      title: "Discovery & Assessment",
      description: "Comprehensive analysis of your current IT landscape, challenges, and opportunities."
    },
    {
      step: "02", 
      title: "Strategy Development",
      description: "Create tailored IT strategies aligned with your business goals and industry best practices."
    },
    {
      step: "03",
      title: "Implementation Planning",
      description: "Develop detailed roadmaps and execution plans with timelines and resource requirements."
    },
    {
      step: "04",
      title: "Ongoing Support",
      description: "Continuous monitoring, optimization, and strategic guidance throughout your IT journey."
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Accelerated Innovation",
      description: "Leverage cutting-edge technologies to drive business growth and competitive advantage."
    },
    {
      icon: Clock,
      title: "Faster Time-to-Market",
      description: "Streamlined processes and optimized workflows reduce development and deployment cycles."
    },
    {
      icon: Award,
      title: "Industry Expertise",
      description: "Benefit from our deep knowledge across various industries and technology domains."
    },
    {
      icon: Target,
      title: "Cost Optimization",
      description: "Strategic IT investments that maximize ROI while minimizing operational costs."
    }
  ];

  return (
    <>
      <SEO
        title="IT Consulting Services | Strategic Technology Advisory"
        description="Expert IT consulting services to align technology with business goals. Strategic planning, digital transformation, and IT governance solutions."
      />
      <Header />

      <main className="bg-background">
        {/* Hero Section */}
        <section ref={heroRef} className={`py-20 bg-gradient-to-br from-primary/5 to-primary/10 transition-all duration-1000 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">IT Consulting Services</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Transform your business with expert IT consulting services. We help organizations align technology with business objectives, optimize operations, and drive digital innovation.
            </p>
            <Button asChild size="lg" className="font-semibold">
              <Link to="/contact">Get Strategic IT Consultation</Link>
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
                <h2 className="text-4xl font-bold mb-6">Our Consulting Services</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Comprehensive IT consulting solutions to drive your business forward
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {consultingServices.map((service, index) => (
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

        {/* Process Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div
              ref={processRef}
              className={`transition-all duration-1000 ${
                processInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-6">Our Consulting Process</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  A proven methodology that delivers results
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {consultingProcess.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
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
                <h2 className="text-4xl font-bold mb-6">Why Choose Our IT Consulting</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Experience the advantages of working with strategic technology partners
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit, index) => (
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

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your IT Strategy?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Let our experts help you align technology with business objectives for maximum impact and growth.
            </p>
            <Button asChild size="lg" variant="secondary" className="font-semibold">
              <Link to="/contact">Schedule a Consultation</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ITConsulting;