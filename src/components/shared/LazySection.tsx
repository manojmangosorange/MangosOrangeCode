import { ReactNode, memo, forwardRef } from 'react';
import { useOptimizedIntersection } from '@/hooks/useOptimizedIntersection';

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  fallback?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

const LazySection = memo(forwardRef<HTMLDivElement, LazySectionProps>(({
  children,
  className = '',
  fallback,
  threshold = 0.1,
  rootMargin = '100px 0px',
  triggerOnce = true,
}, forwardedRef) => {
  const { ref, isIntersecting } = useOptimizedIntersection({
    threshold,
    rootMargin,
    triggerOnce,
  });

  return (
    <div ref={ref as any} className={className}>
      {isIntersecting ? children : (fallback || <div className="min-h-[200px] bg-muted/30 animate-pulse rounded-lg" />)}
    </div>
  );
}));

LazySection.displayName = 'LazySection';

export default LazySection;