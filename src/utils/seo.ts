// SEO utilities and structured data generators

export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'MangosOrange Services Pvt. Ltd.',
  description: 'IT consulting, staffing, payroll outsourcing, manpower, and software development company serving enterprises and SMEs across India.',
  url: 'https://mangosorange.com',
  logo: 'https://mangosorange.com/upload-image/ad985e4f-a179-4593-963e-c3031c12dcff.webp',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91-120-416-4821',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi']
    }
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
    addressLocality: 'Noida',
    addressRegion: 'Delhi NCR'
  },
  sameAs: [
    // Add social media links if available
  ]
});

export const generateWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'MangosOrange',
  url: 'https://mangosorange.com',
  description: 'IT services, staffing solutions, payroll outsourcing, cloud and software development across India.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://mangosorange.com/search?q={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  }
});

export const generateServiceSchema = (service: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.name,
  description: service.description,
  url: service.url,
  serviceType: service.serviceType,
  provider: {
    '@type': 'Organization',
    name: 'MangosOrange',
    url: 'https://mangosorange.com'
  },
  areaServed: {
    '@type': 'Country',
    name: 'India'
  }
});

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});

export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

export const generateJobPostingSchema = (job: {
  title: string;
  description: string;
  location: string;
  datePosted: string;
  validThrough: string;
  salary?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'JobPosting',
  title: job.title,
  description: job.description,
  datePosted: job.datePosted,
  validThrough: job.validThrough,
  hiringOrganization: {
    '@type': 'Organization',
    name: 'MangosOrange',
    sameAs: 'https://mangosorange.com'
  },
  jobLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: job.location,
      addressCountry: 'IN'
    }
  },
  ...(job.salary && {
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: {
        '@type': 'QuantitativeValue',
        value: job.salary
      }
    }
  })
});

// Generate page-specific meta descriptions
export const generateMetaDescription = (page: string, content?: string): string => {
  const baseDescription = 'MangosOrange Services Pvt. Ltd. is an IT consulting, staffing, payroll outsourcing, and software development company in India.';
  
  const descriptions: Record<string, string> = {
    home: 'IT consulting, staffing, payroll outsourcing, and software development services for enterprises and SMEs across India.',
    about: 'MangosOrange Services Pvt. Ltd. (founded 2017, Delhi NCR) delivers IT services, staffing, payroll, and business automation.',
    contact: 'Get in touch with MangosOrange for IT services, staffing solutions, payroll outsourcing, and cloud software development.',
    careers: 'Apply to MangosOrange careers in IT services, staffing, cloud, and software development. Explore open roles.',
    'cloud-strategy': 'Cloud strategy, migration, and modernization services for Indian businesses. AWS, Azure, and GCP support.',
    staffing: 'IT staffing, manpower outsourcing, and recruitment services across India and Delhi NCR.',
    'web-development': 'Custom web development and business automation solutions for SMEs and enterprises.',
    'app-development': 'Mobile and web application development for business automation and growth.',
    'custom-software': 'Custom software development tailored for payroll, staffing, and enterprise workflows.',
    ecommerce: 'E-commerce development and digital commerce platforms for scalable online business.',
    hmis: 'Hospital Management Information System (HMIS) software for healthcare operations.',
    blog: 'Insights on IT services, staffing, payroll outsourcing, and business automation in India.'
  };
  
  return descriptions[page] || content || baseDescription;
};

// Generate page-specific keywords
export const generateKeywords = (page: string): string => {
  const baseKeywords = 'MangosOrange, IT services company India, staffing solutions, payroll outsourcing, manpower outsourcing, IT consulting';
  
  const keywords: Record<string, string> = {
    home: 'IT services company India, payroll outsourcing company, staffing solutions company, manpower outsourcing India, IT consulting services',
    about: 'IT consulting Delhi NCR, staffing company in India, payroll outsourcing company Delhi NCR',
    contact: 'MangosOrange contact, IT services company in Noida, payroll outsourcing Noida, staffing company Delhi NCR',
    careers: 'IT jobs India, software developer jobs, staffing careers, MangosOrange careers',
    'cloud-strategy': 'cloud migration services India, cloud strategy consulting, AWS Azure GCP services',
    staffing: 'IT staffing services India, manpower outsourcing Noida, contract labour outsourcing',
    'web-development': 'software development company for business automation, web development India',
    'app-development': 'mobile app development India, business automation apps',
    'custom-software': 'custom software development India, enterprise software solutions',
    ecommerce: 'ecommerce development India, digital commerce solutions',
    hmis: 'HMIS software India, hospital management system',
    blog: 'payroll outsourcing guide, IT staffing vs traditional hiring, workforce outsourcing India'
  };
  
  return keywords[page] || baseKeywords;
};
