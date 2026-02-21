import { memo } from 'react';
import LazyImage from '@/components/LazyImage';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import LazySection from '@/components/performance/LazySection';

// Client logos with optimized loading
const clientLogos = [
  { 
    src: '/client/client1.webp', 
    alt: 'Client 1 - Enterprise Software Solutions', 
    name: 'Enterprise Corp' 
  },
  { 
    src: '/client/client2.webp', 
    alt: 'Client 2 - Healthcare Technology', 
    name: 'HealthTech Solutions' 
  },
  { 
    src: '/client/client3.webp', 
    alt: 'Client 3 - Financial Services', 
    name: 'FinanceFirst' 
  },
  { 
    src: '/client/client4.webp', 
    alt: 'Client 4 - E-commerce Platform', 
    name: 'EcomGlobal' 
  },
  { 
    src: '/client/client5.webp', 
    alt: 'Client 5 - Educational Technology', 
    name: 'EduTech Pro' 
  },
  { 
    src: '/client/client6.webp', 
    alt: 'Client 6 - Manufacturing Solutions', 
    name: 'ManufacturePlus' 
  },
  { 
    src: '/client/client7.webp', 
    alt: 'Client 7 - Retail Technology', 
    name: 'RetailTech' 
  },
  { 
    src: '/client/client8.webp', 
    alt: 'Client 8 - Logistics Solutions', 
    name: 'LogiFlow' 
  }
];

const OptimizedClientLogosSection = memo(() => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px'
  }) as { ref: React.RefObject<HTMLDivElement>; isIntersecting: boolean };

  return (
    <LazySection className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className={`text-center mb-12 transition-all duration-700 ${
            isIntersecting ? 'fade-up visible' : 'fade-up'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Leading <span className="text-primary">Organizations</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're proud to partner with innovative companies across various industries
          </p>
        </div>

        {/* Infinite scroll animation */}
        <div className="relative overflow-hidden">
          <div className="flex space-x-8 animate-scroll">
            {/* First set */}
            {clientLogos.map((client, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 w-32 h-20 flex items-center justify-center bg-background rounded-lg border border-border/50 hover:border-border transition-colors group"
              >
                <LazyImage
                  src={client.src}
                  alt={client.alt}
                  className="max-w-24 max-h-12 object-contain opacity-60 group-hover:opacity-100 transition-opacity filter grayscale group-hover:grayscale-0"
                  fallback="/upload-image/ad985e4f-a179-4593-963e-c3031c12dcff.webp"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {clientLogos.map((client, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 w-32 h-20 flex items-center justify-center bg-background rounded-lg border border-border/50 hover:border-border transition-colors group"
              >
                <LazyImage
                  src={client.src}
                  alt={client.alt}
                  className="max-w-24 max-h-12 object-contain opacity-60 group-hover:opacity-100 transition-opacity filter grayscale group-hover:grayscale-0"
                  fallback="/upload-image/ad985e4f-a179-4593-963e-c3031c12dcff.webp"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Stats section */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 transition-all duration-700 delay-300 ${
          isIntersecting ? 'fade-up visible' : 'fade-up'
        }`}>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-sm text-muted-foreground">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-sm text-muted-foreground">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime Record</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Support Available</div>
          </div>
        </div>
      </div>
    </LazySection>
  );
});

OptimizedClientLogosSection.displayName = 'OptimizedClientLogosSection';

export default OptimizedClientLogosSection;