// Image optimization utilities

// Generate srcset for responsive images
export const generateSrcSet = (baseSrc: string, sizes: number[]): string => {
  return sizes
    .map(size => `${baseSrc}?w=${size} ${size}w`)
    .join(', ');
};

// Generate sizes attribute for responsive images
export const generateSizes = (breakpoints: { size: string; width: string }[]): string => {
  return breakpoints
    .map(bp => `(${bp.size}) ${bp.width}`)
    .join(', ');
};

// Convert images to WebP format (placeholder for future implementation)
export const convertToWebP = (src: string): string => {
  // In a real implementation, this would convert images to WebP
  // For now, just ensure the extension is correct
  if (src.endsWith('.jpg') || src.endsWith('.jpeg') || src.endsWith('.png')) {
    return src.replace(/\.(jpg|jpeg|png)$/, '.webp');
  }
  return src;
};

// Image loading priority helper
export const getImagePriority = (imageIndex: number, viewportPosition: 'above' | 'below' | 'unknown'): 'high' | 'low' => {
  // Above the fold images get high priority
  if (viewportPosition === 'above') return 'high';
  
  // First few images get higher priority
  if (imageIndex < 3) return 'high';
  
  return 'low';
};

// Optimize image URL based on device capabilities
export const optimizeImageUrl = (src: string, options: {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'auto';
}): string => {
  const { width, height, quality = 85, format = 'webp' } = options;
  
  let optimizedSrc = src;
  
  // Add optimization parameters (this would integrate with image CDN in production)
  const params = new URLSearchParams();
  
  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  if (quality) params.append('q', quality.toString());
  if (format) params.append('f', format);
  
  const paramString = params.toString();
  if (paramString) {
    optimizedSrc += `${src.includes('?') ? '&' : '?'}${paramString}`;
  }
  
  return optimizedSrc;
};

// Critical image preloader
export const preloadCriticalImage = (src: string): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
};

// Lazy load images with Intersection Observer
export const createImageObserver = (callback: (entries: IntersectionObserverEntry[]) => void) => {
  return new IntersectionObserver(callback, {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
  });
};