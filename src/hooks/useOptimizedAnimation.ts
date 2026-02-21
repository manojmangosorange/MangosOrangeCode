import { useEffect, useRef, useState, useMemo } from 'react';

interface UseOptimizedAnimationProps {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export const useOptimizedAnimation = ({
  threshold = 0.1,
  rootMargin = '50px',
  triggerOnce = true,
  delay = 0
}: UseOptimizedAnimationProps = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Memoize observer options to prevent recreation
  const observerOptions = useMemo(() => ({
    threshold,
    rootMargin
  }), [threshold, rootMargin]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Use requestIdleCallback for non-critical animations
    const setupObserver = () => {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (delay > 0) {
                setTimeout(() => setIsVisible(true), delay);
              } else {
                setIsVisible(true);
              }
              
              if (triggerOnce && observerRef.current) {
                observerRef.current.unobserve(element);
              }
            } else if (!triggerOnce) {
              setIsVisible(false);
            }
          });
        },
        observerOptions
      );

      observerRef.current.observe(element);
    };

    // Use requestIdleCallback if available, fallback to setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(setupObserver);
    } else {
      setTimeout(setupObserver, 0);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [observerOptions, triggerOnce, delay]);

  return {
    ref: elementRef,
    isVisible,
    // Helper classes for different animation types
    fadeUpClass: `transition-all duration-700 ${isVisible ? 'fade-up visible' : 'fade-up'}`,
    slideLeftClass: `transition-all duration-700 ${isVisible ? 'slide-in-left visible' : 'slide-in-left'}`,
    slideRightClass: `transition-all duration-700 ${isVisible ? 'slide-in-right visible' : 'slide-in-right'}`
  };
};