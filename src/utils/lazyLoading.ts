// Enhanced lazy loading utilities for optimal performance

interface LazyImageOptions {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  sizes?: string;
  srcSet?: string;
  onLoad?: () => void;
  onError?: () => void;
  placeholder?: string;
}

// Optimized image component with built-in lazy loading
export const createOptimizedImage = (options: LazyImageOptions) => {
  const {
    src,
    alt,
    className = '',
    loading = 'lazy',
    decoding = 'async',
    sizes,
    srcSet,
    onLoad,
    onError,
    placeholder
  } = options;

  const img = document.createElement('img');
  
  // Set optimization attributes
  img.loading = loading;
  img.decoding = decoding;
  img.alt = alt;
  img.className = className;
  
  if (sizes) img.sizes = sizes;
  if (srcSet) img.srcset = srcSet;
  
  // Add event listeners
  if (onLoad) img.onload = onLoad;
  if (onError) img.onerror = onError;
  
  // Use placeholder first, then load actual image
  if (placeholder) {
    img.src = placeholder;
    // Load actual image after initial render
    setTimeout(() => {
      img.src = src;
    }, 0);
  } else {
    img.src = src;
  }
  
  return img;
};

// WebP support detection with fallback
export const supportsWebP = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

// Generate responsive image sources
export const generateResponsiveSources = (baseSrc: string, sizes: number[] = [320, 640, 1024, 1280, 1920]) => {
  const extension = baseSrc.split('.').pop();
  const baseName = baseSrc.replace(`.${extension}`, '');
  
  return sizes.map(size => ({
    srcSet: `${baseName}-${size}w.webp ${size}w`,
    media: size === sizes[0] ? '(max-width: 640px)' : 
           size === sizes[1] ? '(max-width: 1024px)' : 
           size === sizes[2] ? '(max-width: 1280px)' : 
           '(min-width: 1281px)'
  }));
};

// Critical resource preloader with priority queue
class ResourcePreloader {
  private queue: Array<{ src: string; priority: number }> = [];
  private isLoading = false;
  private maxConcurrent = 3;
  private currentlyLoading = 0;

  add(src: string, priority: number = 0) {
    this.queue.push({ src, priority });
    this.queue.sort((a, b) => b.priority - a.priority);
    this.processQueue();
  }

  private async processQueue() {
    if (this.isLoading || this.currentlyLoading >= this.maxConcurrent) return;
    
    const item = this.queue.shift();
    if (!item) return;

    this.currentlyLoading++;
    this.isLoading = true;

    try {
      await this.preloadResource(item.src);
    } catch (error) {
      console.warn(`Failed to preload resource: ${item.src}`);
    } finally {
      this.currentlyLoading--;
      if (this.queue.length > 0) {
        setTimeout(() => this.processQueue(), 0);
      } else {
        this.isLoading = false;
      }
    }
  }

  private preloadResource(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (src.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i)) {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = src;
      } else {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = src;
        link.onload = () => resolve();
        link.onerror = reject;
        document.head.appendChild(link);
      }
    });
  }
}

export const resourcePreloader = new ResourcePreloader();

// Enhanced critical resource preloading
export const preloadCriticalAssets = () => {
  const criticalImages = [
    '/upload-image/ad985e4f-a179-4593-963e-c3031c12dcff.webp',
    // Add more critical images with high priority
  ];

  criticalImages.forEach((src, index) => {
    resourcePreloader.add(src, 10 - index); // Higher numbers = higher priority
  });
};

// Intersection Observer for lazy loading with performance optimizations
export const createLazyLoadObserver = (callback: (entries: IntersectionObserverEntry[]) => void) => {
  const options = {
    root: null,
    rootMargin: '50px 0px',
    threshold: 0.01
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback([entry]);
        obs.unobserve(entry.target);
      }
    });
  }, options);

  return observer;
};

// Memory-efficient image caching
class ImageCache {
  private cache = new Map<string, HTMLImageElement>();
  private maxSize = 50; // Maximum number of cached images

  get(src: string): HTMLImageElement | null {
    return this.cache.get(src) || null;
  }

  set(src: string, img: HTMLImageElement) {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(src, img);
  }

  clear() {
    this.cache.clear();
  }
}

export const imageCache = new ImageCache();