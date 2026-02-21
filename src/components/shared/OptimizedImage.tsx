import { useState, useCallback, memo } from 'react';
import { useOptimizedIntersection } from '@/hooks/useOptimizedIntersection';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  sizes?: string;
  srcSet?: string;
  onLoad?: () => void;
  onError?: () => void;
  placeholder?: string;
  priority?: boolean;
}

const OptimizedImage = memo(({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  decoding = 'async',
  sizes,
  srcSet,
  onLoad,
  onError,
  placeholder,
  priority = false,
}: OptimizedImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder || '');

  const { ref, isIntersecting } = useOptimizedIntersection({
    threshold: 0.1,
    rootMargin: '50px 0px',
    triggerOnce: true,
    enabled: loading === 'lazy' && !priority,
  });

  const handleLoad = useCallback(() => {
    setImageLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setImageError(true);
    onError?.();
  }, [onError]);

  // Load image when it becomes visible or if it's high priority
  const shouldLoadImage = priority || loading === 'eager' || isIntersecting;

  // Update src when image should load
  if (shouldLoadImage && currentSrc !== src && !imageError) {
    setCurrentSrc(src);
  }

  // Render placeholder while loading
  if (!shouldLoadImage || (!imageLoaded && placeholder)) {
    return (
      <div
        ref={ref as any}
        className={`${className} bg-muted animate-pulse`}
        style={{ 
          width: width ? `${width}px` : undefined,
          height: height ? `${height}px` : undefined,
          aspectRatio: width && height ? `${width}/${height}` : undefined,
        }}
        aria-label={`Loading ${alt}`}
      />
    );
  }

  // Render error state
  if (imageError) {
    return (
      <div
        className={`${className} bg-muted flex items-center justify-center text-muted-foreground text-sm`}
        style={{ 
          width: width ? `${width}px` : undefined,
          height: height ? `${height}px` : undefined,
          aspectRatio: width && height ? `${width}/${height}` : undefined,
        }}
      >
        Failed to load image
      </div>
    );
  }

  return (
    <img
      ref={ref as any}
      src={currentSrc}
      alt={alt}
      className={`${className} transition-opacity duration-300 ${
        imageLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      width={width}
      height={height}
      loading={loading}
      decoding={decoding}
      sizes={sizes}
      srcSet={srcSet}
      onLoad={handleLoad}
      onError={handleError}
      style={{
        aspectRatio: width && height ? `${width}/${height}` : undefined,
      }}
    />
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;