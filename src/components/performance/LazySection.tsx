import { ReactNode, memo } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  fallback?: ReactNode;
}

const LazySection = memo(({
  children,
  className,
  threshold = 0.1,
  rootMargin = '100px',
  fallback
}: LazySectionProps) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: true
  });

  return (
    <section ref={ref} className={cn("transition-opacity duration-300", className)}>
      {isIntersecting ? children : (fallback || <div className="min-h-[200px] bg-muted/20 animate-pulse" />)}
    </section>
  );
});

LazySection.displayName = 'LazySection';

export default LazySection;