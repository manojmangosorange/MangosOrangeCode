import { useEffect } from 'react';

interface DynamicSEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  jsonLd?: Record<string, any> | Record<string, any>[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const DynamicSEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  jsonLd,
  author = 'MangosOrange',
  publishedTime,
  modifiedTime
}: DynamicSEOProps) => {
  useEffect(() => {
    // Title optimization
    const optimizedTitle = title.length > 60 ? `${title.slice(0, 57)}...` : title;
    document.title = optimizedTitle;

    // Meta description
    const descriptionMeta = document.querySelector('meta[name="description"]') ||
      document.createElement('meta');
    descriptionMeta.setAttribute('name', 'description');
    descriptionMeta.setAttribute('content', description.slice(0, 160));
    if (!document.querySelector('meta[name="description"]')) {
      document.head.appendChild(descriptionMeta);
    }

    // Keywords
    if (keywords) {
      const keywordsMeta = document.querySelector('meta[name="keywords"]') ||
        document.createElement('meta');
      keywordsMeta.setAttribute('name', 'keywords');
      keywordsMeta.setAttribute('content', keywords);
      if (!document.querySelector('meta[name="keywords"]')) {
        document.head.appendChild(keywordsMeta);
      }
    }

    // Canonical URL
    const href = canonical || window.location.href;
    const canonicalLink = document.querySelector('link[rel="canonical"]') ||
      document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    canonicalLink.setAttribute('href', href);
    if (!document.querySelector('link[rel="canonical"]')) {
      document.head.appendChild(canonicalLink);
    }

    // Open Graph meta tags
    const ogTags = [
      { property: 'og:title', content: optimizedTitle },
      { property: 'og:description', content: description.slice(0, 160) },
      { property: 'og:url', content: href },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'MangosOrange' },
      ...(ogImage ? [{ property: 'og:image', content: ogImage }] : [])
    ];

    ogTags.forEach(({ property, content }) => {
      const existingTag = document.querySelector(`meta[property="${property}"]`);
      if (existingTag) {
        existingTag.setAttribute('content', content);
      } else {
        const newTag = document.createElement('meta');
        newTag.setAttribute('property', property);
        newTag.setAttribute('content', content);
        document.head.appendChild(newTag);
      }
    });

    // Twitter Card meta tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: optimizedTitle },
      { name: 'twitter:description', content: description.slice(0, 160) },
      ...(ogImage ? [{ name: 'twitter:image', content: ogImage }] : [])
    ];

    twitterTags.forEach(({ name, content }) => {
      const existingTag = document.querySelector(`meta[name="${name}"]`);
      if (existingTag) {
        existingTag.setAttribute('content', content);
      } else {
        const newTag = document.createElement('meta');
        newTag.setAttribute('name', name);
        newTag.setAttribute('content', content);
        document.head.appendChild(newTag);
      }
    });

    // Author meta tag
    const authorMeta = document.querySelector('meta[name="author"]') ||
      document.createElement('meta');
    authorMeta.setAttribute('name', 'author');
    authorMeta.setAttribute('content', author);
    if (!document.querySelector('meta[name="author"]')) {
      document.head.appendChild(authorMeta);
    }

    // Article meta tags for blog posts
    if (publishedTime || modifiedTime) {
      if (publishedTime) {
        const publishedMeta = document.querySelector('meta[property="article:published_time"]') ||
          document.createElement('meta');
        publishedMeta.setAttribute('property', 'article:published_time');
        publishedMeta.setAttribute('content', publishedTime);
        if (!document.querySelector('meta[property="article:published_time"]')) {
          document.head.appendChild(publishedMeta);
        }
      }

      if (modifiedTime) {
        const modifiedMeta = document.querySelector('meta[property="article:modified_time"]') ||
          document.createElement('meta');
        modifiedMeta.setAttribute('property', 'article:modified_time');
        modifiedMeta.setAttribute('content', modifiedTime);
        if (!document.querySelector('meta[property="article:modified_time"]')) {
          document.head.appendChild(modifiedMeta);
        }
      }
    }

    // JSON-LD structured data
    const scriptId = 'dynamic-seo-jsonld';
    const existing = document.getElementById(scriptId);
    if (existing) existing.remove();
    
    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = scriptId;
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    // Cleanup function
    return () => {
      // Remove dynamic meta tags on unmount if needed
    };
  }, [title, description, keywords, canonical, ogImage, jsonLd, author, publishedTime, modifiedTime]);

  return null;
};

export default DynamicSEO;