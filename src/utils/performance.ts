// Enhanced performance utilities for optimal website performance

// Debounce function for performance optimization
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for performance optimization
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Enhanced image preloading with priority support
export const preloadImage = (src: string, priority: number = 0): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
    
    // Set loading priority for critical images
    if (priority > 5) {
      img.loading = 'eager';
      img.decoding = 'sync';
    } else {
      img.loading = 'lazy';
      img.decoding = 'async';
    }
  });
};

// Batch image preloading with concurrency control
export const preloadImages = async (
  srcs: Array<{ src: string; priority?: number }>,
  maxConcurrent: number = 3
): Promise<void> => {
  const sortedSrcs = srcs.sort((a, b) => (b.priority || 0) - (a.priority || 0));
  
  for (let i = 0; i < sortedSrcs.length; i += maxConcurrent) {
    const batch = sortedSrcs.slice(i, i + maxConcurrent);
    await Promise.allSettled(
      batch.map(({ src, priority }) => preloadImage(src, priority))
    );
  }
};

// Critical resource preloading with enhanced performance
export const preloadCriticalResources = async () => {
  const criticalImages = [
    { src: '/upload-image/ad985e4f-a179-4593-963e-c3031c12dcff.webp', priority: 10 },
    { src: '/lovable-uploads/c6935172-f978-4b7f-a28c-db62025bfe9b.webp', priority: 9 },
  ];
  
  await preloadImages(criticalImages, 2);
};

// Enhanced font loading optimization
export const preloadFonts = () => {
  const fonts = [
    // Add critical fonts here if using custom fonts
  ];
  
  fonts.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.href = font;
    link.crossOrigin = 'anonymous';
    link.type = 'font/woff2'; // Optimize for modern browsers
    document.head.appendChild(link);
  });
};

// Enhanced resource hints for external domains
export const addResourceHints = () => {
  const hints = [
    { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  ];
  
  hints.forEach(({ rel, href, crossOrigin }) => {
    // Check if hint already exists
    const existing = document.querySelector(`link[rel="${rel}"][href="${href}"]`);
    if (!existing) {
      const link = document.createElement('link');
      link.rel = rel;
      link.href = href;
      if (crossOrigin) link.crossOrigin = crossOrigin;
      document.head.appendChild(link);
    }
  });
};

// Lazy loading for non-critical CSS with enhanced performance
export const loadCSSLazy = (href: string, media: string = 'all') => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = 'print'; // Load as print first to avoid render blocking
  link.onload = () => {
    link.media = media; // Switch to target media once loaded
  };
  document.head.appendChild(link);
  
  // Fallback for browsers that don't support onload on link elements
  setTimeout(() => {
    if (link.media === 'print') {
      link.media = media;
    }
  }, 100);
};

// Performance monitoring utilities
export const measurePerformance = {
  // Measure First Contentful Paint
  getFCP: () => {
    return new Promise<number>((resolve) => {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const fcp = entries.find(entry => entry.name === 'first-contentful-paint');
        if (fcp) {
          resolve(fcp.startTime);
          observer.disconnect();
        }
      });
      observer.observe({ entryTypes: ['paint'] });
    });
  },

  // Measure Largest Contentful Paint
  getLCP: () => {
    return new Promise<number>((resolve) => {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        resolve(lastEntry.startTime);
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      
      // Auto-resolve after 10 seconds
      setTimeout(() => {
        observer.disconnect();
        resolve(0);
      }, 10000);
    });
  },

  // Measure Cumulative Layout Shift
  getCLS: () => {
    return new Promise<number>((resolve) => {
      let clsValue = 0;
      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
      });
      observer.observe({ entryTypes: ['layout-shift'] });
      
      // Resolve after page load
      window.addEventListener('load', () => {
        setTimeout(() => {
          observer.disconnect();
          resolve(clsValue);
        }, 1000);
      });
    });
  },
};

// Memory cleanup utilities
export const cleanupResources = () => {
  // Clear unused image caches
  if ('caches' in window) {
    caches.keys().then(names => {
      names.forEach(name => {
        if (name.includes('images') && Date.now() - parseInt(name.split('-')[1]) > 86400000) {
          caches.delete(name); // Delete caches older than 1 day
        }
      });
    });
  }
  // Cleanup performance monitoring
  if ('PerformanceObserver' in window) {
    // Let the browser handle performance observer cleanup
  }
};