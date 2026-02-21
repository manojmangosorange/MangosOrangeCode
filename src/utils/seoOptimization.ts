// SEO optimization utilities for enhanced search engine visibility

interface PageSEOData {
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

interface BreadcrumbItem {
  name: string;
  url: string;
}

// Generate comprehensive meta tags
export const generateMetaTags = (seoData: PageSEOData) => {
  const tags: Array<{ name?: string; property?: string; content: string }> = [];
  
  // Basic meta tags
  tags.push({ name: 'description', content: seoData.description });
  if (seoData.keywords?.length) {
    tags.push({ name: 'keywords', content: seoData.keywords.join(', ') });
  }
  if (seoData.author) {
    tags.push({ name: 'author', content: seoData.author });
  }
  if (seoData.robots) {
    tags.push({ name: 'robots', content: seoData.robots });
  }

  // Open Graph tags
  tags.push({ property: 'og:title', content: seoData.title });
  tags.push({ property: 'og:description', content: seoData.description });
  tags.push({ property: 'og:type', content: seoData.ogType || 'website' });
  if (seoData.canonicalUrl) {
    tags.push({ property: 'og:url', content: seoData.canonicalUrl });
  }
  if (seoData.ogImage) {
    tags.push({ property: 'og:image', content: seoData.ogImage });
    tags.push({ property: 'og:image:alt', content: seoData.title });
  }

  // Twitter Card tags
  tags.push({ name: 'twitter:card', content: seoData.twitterCard || 'summary_large_image' });
  tags.push({ name: 'twitter:title', content: seoData.title });
  tags.push({ name: 'twitter:description', content: seoData.description });
  if (seoData.ogImage) {
    tags.push({ name: 'twitter:image', content: seoData.ogImage });
  }

  // Article specific tags
  if (seoData.publishedTime) {
    tags.push({ property: 'article:published_time', content: seoData.publishedTime });
  }
  if (seoData.modifiedTime) {
    tags.push({ property: 'article:modified_time', content: seoData.modifiedTime });
  }

  return tags;
};

// Generate structured data for better search visibility
export const generateStructuredData = {
  organization: (data: {
    name: string;
    url: string;
    logo: string;
    description: string;
    contactPoint?: {
      telephone: string;
      contactType: string;
      email?: string;
    };
    address?: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
    sameAs?: string[];
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    ...data,
  }),

  service: (data: {
    name: string;
    description: string;
    provider: string;
    serviceType: string;
    areaServed: string | string[];
    offers?: {
      '@type': 'Offer';
      availability: string;
      price?: string;
      priceCurrency?: string;
    };
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    ...data,
  }),

  breadcrumb: (items: BreadcrumbItem[]) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }),

  faq: (faqs: Array<{ question: string; answer: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }),

  article: (data: {
    headline: string;
    description: string;
    author: string;
    datePublished: string;
    dateModified?: string;
    image?: string;
    publisher: string;
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    ...data,
    publisher: {
      '@type': 'Organization',
      name: data.publisher,
    },
  }),
};

// SEO-optimized URL generation
export const generateSEOUrl = (title: string, baseUrl: string = '') => {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  
  return `${baseUrl}/${slug}`;
};

// Generate sitemap data
export const generateSitemapEntry = (
  url: string,
  lastModified: Date = new Date(),
  changeFreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'weekly',
  priority: number = 0.5
) => ({
  url,
  lastModified: lastModified.toISOString().split('T')[0],
  changeFreq,
  priority: Math.max(0, Math.min(1, priority)), // Ensure priority is between 0 and 1
});

// Performance-optimized meta tag injection
export const injectMetaTags = (tags: Array<{ name?: string; property?: string; content: string; }>) => {
  // Remove existing meta tags to avoid duplicates
  const existingTags = document.querySelectorAll('meta[name], meta[property]');
  existingTags.forEach(tag => {
    const name = tag.getAttribute('name') || tag.getAttribute('property');
    if (name && tags.some(t => (t.name === name || t.property === name))) {
      tag.remove();
    }
  });

  // Add new meta tags
  const fragment = document.createDocumentFragment();
  tags.forEach(({ name, property, content }) => {
    const meta = document.createElement('meta');
    if (name) meta.setAttribute('name', name);
    if (property) meta.setAttribute('property', property);
    meta.setAttribute('content', content);
    fragment.appendChild(meta);
  });
  
  document.head.appendChild(fragment);
};

// Canonical URL management
export const setCanonicalUrl = (url: string) => {
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = url;
};

// Enhanced title optimization
export const optimizeTitle = (title: string, siteName: string = 'MangosOrange', maxLength: number = 60) => {
  const separator = ' | ';
  const fullTitle = `${title}${separator}${siteName}`;
  
  if (fullTitle.length <= maxLength) {
    return fullTitle;
  }
  
  // If too long, truncate the main title but keep site name
  const availableLength = maxLength - separator.length - siteName.length;
  if (availableLength > 0) {
    return `${title.substring(0, availableLength).trim()}...${separator}${siteName}`;
  }
  
  // If still too long, just use truncated title
  return title.substring(0, maxLength - 3).trim() + '...';
};

// Rich snippets generation
export const generateLocalBusinessSchema = (businessData: {
  name: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string[];
  priceRange?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': businessData.url,
  name: businessData.name,
  description: businessData.description,
  url: businessData.url,
  telephone: businessData.telephone,
  email: businessData.email,
  address: {
    '@type': 'PostalAddress',
    ...businessData.address,
  },
  ...(businessData.geo && {
    geo: {
      '@type': 'GeoCoordinates',
      latitude: businessData.geo.latitude,
      longitude: businessData.geo.longitude,
    },
  }),
  ...(businessData.openingHours && { openingHours: businessData.openingHours }),
  ...(businessData.priceRange && { priceRange: businessData.priceRange }),
});
