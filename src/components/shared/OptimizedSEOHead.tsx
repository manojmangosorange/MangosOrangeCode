import { useEffect, memo } from 'react';
import { generateMetaTags, injectMetaTags, setCanonicalUrl, optimizeTitle } from '@/utils/seoOptimization';

interface OptimizedSEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  structuredData?: object;
  robots?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const OptimizedSEOHead = memo(({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  structuredData,
  robots = 'index, follow',
  author = 'MangosOrange',
  publishedTime,
  modifiedTime,
}: OptimizedSEOHeadProps) => {
  useEffect(() => {
    // Optimize and set page title
    const optimizedTitle = optimizeTitle(title);
    document.title = optimizedTitle;

    // Generate and inject meta tags
    const metaTags = generateMetaTags({
      title: optimizedTitle,
      description,
      keywords,
      canonicalUrl,
      ogImage,
      ogType,
      twitterCard,
      robots,
      author,
      publishedTime,
      modifiedTime,
    });

    injectMetaTags(metaTags);

    // Set canonical URL
    if (canonicalUrl) {
      setCanonicalUrl(canonicalUrl);
    }

    // Inject structured data
    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      script.id = 'structured-data';
      
      // Remove existing structured data
      const existing = document.getElementById('structured-data');
      if (existing) {
        existing.remove();
      }
      
      document.head.appendChild(script);
    }

    // Cleanup function to remove structured data when component unmounts
    return () => {
      const structuredDataScript = document.getElementById('structured-data');
      if (structuredDataScript) {
        structuredDataScript.remove();
      }
    };
  }, [
    title,
    description,
    keywords,
    canonicalUrl,
    ogImage,
    ogType,
    twitterCard,
    structuredData,
    robots,
    author,
    publishedTime,
    modifiedTime,
  ]);

  return null; // This component doesn't render anything visible
});

OptimizedSEOHead.displayName = 'OptimizedSEOHead';

export default OptimizedSEOHead;