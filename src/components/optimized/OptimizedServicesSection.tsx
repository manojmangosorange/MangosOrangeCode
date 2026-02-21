import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { 
  Cloud, 
  Code, 
  Users, 
  Database, 
  Shield, 
  Smartphone,
  ArrowRight 
} from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import LazySection from '@/components/performance/LazySection';

const services = [
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Comprehensive cloud migration and infrastructure management services.',
    link: '/cloud-strategy',
    color: 'text-blue-600'
  },
  {
    icon: Code,
    title: 'Custom Development',
    description: 'Tailored software solutions built to meet your specific business needs.',
    link: '/custom-software',
    color: 'text-green-600'
  },
  {
    icon: Users,
    title: 'IT Staffing',
    description: 'Expert technical professionals to augment your development team.',
    link: '/staffing',
    color: 'text-purple-600'
  },
  {
    icon: Smartphone,
    title: 'App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android.',
    link: '/app-development',
    color: 'text-orange-600'
  },
  {
    icon: Database,
    title: 'Data Solutions',
    description: 'Data migration, analytics, and management solutions for your business.',
    link: '/data-migration',
    color: 'text-red-600'
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description: 'Robust security measures and compliance management for your systems.',
    link: '/cloud/security',
    color: 'text-indigo-600'
  }
];

const OptimizedServicesSection = memo(() => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px'
  }) as { ref: React.RefObject<HTMLDivElement>; isIntersecting: boolean };

  return (
    <LazySection className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            isIntersecting ? 'fade-up visible' : 'fade-up'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive IT solutions designed to accelerate your digital transformation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={service.title}
                className={`group hover-scale transition-all duration-300 border-0 shadow-md hover:shadow-xl bg-card/50 backdrop-blur-sm ${
                  isIntersecting ? 'fade-up visible' : 'fade-up'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className={`inline-flex p-3 rounded-lg bg-background ${service.color} bg-opacity-10`}>
                      <Icon className={`w-8 h-8 ${service.color}`} />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <Button 
                    asChild 
                    variant="ghost" 
                    className="group/btn p-0 h-auto font-medium text-primary hover:text-primary-glow"
                  >
                    <Link to={service.link} className="flex items-center gap-2">
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className={`text-center mt-16 transition-all duration-700 delay-300 ${
          isIntersecting ? 'fade-up visible' : 'fade-up'
        }`}>
          <Button asChild size="lg" className="group">
            <Link to="/contact">
              Get Custom Solutions
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </LazySection>
  );
});

OptimizedServicesSection.displayName = 'OptimizedServicesSection';

export default OptimizedServicesSection;