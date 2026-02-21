import { useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import AssociatedWithSection from '@/components/AssociatedWithSection';
import ClientLogosSection from '@/components/ClientLogosSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import DynamicSEO from '@/components/DynamicSEO';
import { generateOrganizationSchema, generateWebsiteSchema, generateMetaDescription, generateKeywords } from '@/utils/seo';

const Index = () => {
  useEffect(() => {
    // Handle anchor scrolling when page loads with hash
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  const structuredData = [
    generateOrganizationSchema(),
    generateWebsiteSchema()
  ];

  return (
    <div className="min-h-screen bg-background">
      <DynamicSEO
        title="MangosOrange - Leading IT Services & Cloud Solutions Provider in India"
        description={generateMetaDescription('home')}
        keywords={generateKeywords('home')}
        canonical="https://mangosorange.com"
        jsonLd={structuredData}
      />
      <Header />
      <HeroSection />
      <ServicesSection />
      <AssociatedWithSection />
      <ClientLogosSection />
      
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
