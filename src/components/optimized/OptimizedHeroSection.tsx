import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Cloud, Users } from 'lucide-react';
import LazyImage from '@/components/LazyImage';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const OptimizedHeroSection = memo(() => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-1/4 -left-4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute top-1/3 -right-4 w-72 h-72 bg-accent/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-secondary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`space-y-8 transition-all duration-700 ${isIntersecting ? 'fade-up visible' : 'fade-up'}`}>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                <Code className="w-4 h-4" />
                Leading IT Solutions Provider
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
                  Transform
                </span>
                <br />
                Your Digital
                <br />
                <span className="text-foreground">Future</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Empowering businesses across India with cutting-edge cloud solutions, 
                custom software development, and expert IT staffing services.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">5+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="group">
                <Link to="/contact">
                  Get Started Today
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Cloud className="w-4 h-4 text-primary" />
                Cloud Certified
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4 text-primary" />
                Expert Team
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className={`relative transition-all duration-700 delay-300 ${isIntersecting ? 'fade-up visible' : 'fade-up'}`}>
            <div className="relative">
              <LazyImage
                src="/assets/hero-team.webp"
                alt="MangosOrange professional IT team providing digital solutions"
                className="w-full h-auto rounded-2xl shadow-2xl"
                fallback="/upload-image/ad985e4f-a179-4593-963e-c3031c12dcff.webp"
              />
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">99.9% Uptime</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg animate-float animation-delay-2000">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

OptimizedHeroSection.displayName = 'OptimizedHeroSection';

export default OptimizedHeroSection;