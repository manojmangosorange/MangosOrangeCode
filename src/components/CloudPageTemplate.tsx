import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import ServicePageLayout from '@/components/ServicePageLayout';

interface CloudPageTemplateProps {
  title: string;
  seoTitle: string;
  tagline: string;
  heroImage: string;
  description: React.ReactNode;
  steps: Array<{ title: string; description: string }>;
  benefits: string[];
  caseStudies: Array<{ title: string; result: string; description: string }>;
  canonicalPath: string;
  serviceType?: string;
}

const CloudPageTemplate = ({ 
  title, 
  seoTitle, 
  tagline, 
  heroImage, 
  description, 
  steps, 
  benefits, 
  caseStudies, 
  canonicalPath,
  serviceType = 'Cloud Computing'
}: CloudPageTemplateProps) => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up, .slide-in-left, .slide-in-right');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title,
    description: typeof description === 'string' ? description : 'Expert cloud services and solutions',
    serviceType,
    areaServed: 'IN',
    provider: { '@type': 'Organization', name: 'MangosOrange' },
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={seoTitle}
        description={typeof description === 'string' ? description : `Expert ${title.toLowerCase()} services and solutions`}
        canonical={typeof window !== 'undefined' ? `${window.location.origin}${canonicalPath}` : canonicalPath}
        jsonLd={jsonLd}
      />
      <Header />
      <div className="fade-up">
        <ServicePageLayout
          title={title}
          tagline={tagline}
          heroImage={heroImage}
          description={description}
          steps={steps}
          benefits={benefits}
          caseStudies={caseStudies}
        />
      </div>
      <div className="slide-in-left">
        <Footer />
      </div>
    </div>
  );
};

export default CloudPageTemplate;