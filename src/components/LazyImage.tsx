import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
}

const LazyImage = ({ src, alt, className, fallback, ...props }: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={cn("overflow-hidden", className)}>
      {isInView && (
        <img
          src={hasError ? fallback : src}
          alt={alt}
          className={cn(
            "transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setHasError(true);
            setIsLoaded(true);
          }}
          loading="lazy"
          decoding="async"
          {...props}
        />
      )}
      {!isLoaded && isInView && (
        <div className={cn(
          "animate-pulse bg-muted",
          "w-full h-full min-h-[200px]",
          className
        )} />
      )}
    </div>
  );
};

export default LazyImage;