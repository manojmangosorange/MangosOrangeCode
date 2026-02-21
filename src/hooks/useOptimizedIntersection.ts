import { useEffect, useRef, useState, useCallback } from 'react';

interface UseOptimizedIntersectionOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  enabled?: boolean;
}

// Singleton IntersectionObserver instances to reduce overhead
const observerMap = new Map<string, IntersectionObserver>();

const getObserverKey = (threshold: number | number[], rootMargin: string) => {
  const thresholdKey = Array.isArray(threshold) ? threshold.join(',') : threshold.toString();
  return `${thresholdKey}-${rootMargin}`;
};

export const useOptimizedIntersection = (options: UseOptimizedIntersectionOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = false,
    enabled = true,
  } = options;

  const elementRef = useRef<HTMLElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];
    if (entry?.isIntersecting) {
      setIsIntersecting(true);
      if (triggerOnce) {
        setHasTriggered(true);
      }
    } else if (!triggerOnce) {
      setIsIntersecting(false);
    }
  }, [triggerOnce]);

  useEffect(() => {
    if (!enabled || !elementRef.current || (triggerOnce && hasTriggered)) {
      return;
    }

    const element = elementRef.current;
    const observerKey = getObserverKey(threshold, rootMargin);

    // Reuse existing observer or create new one
    let observer = observerMap.get(observerKey);
    if (!observer) {
      observer = new IntersectionObserver(handleIntersection, {
        threshold,
        rootMargin,
      });
      observerMap.set(observerKey, observer);
    }

    observer.observe(element);

    return () => {
      if (observer) {
        observer.unobserve(element);
        
        // Clean up unused observers - check if no elements are being observed
        const observerEntries = Array.from(observerMap.entries());
        const unusedObserver = observerEntries.find(([key, obs]) => obs === observer);
        if (unusedObserver && !document.querySelector('[data-observer-active]')) {
          observer.disconnect();
          observerMap.delete(unusedObserver[0]);
        }
      }
    };
  }, [threshold, rootMargin, triggerOnce, enabled, hasTriggered, handleIntersection]);

  return {
    ref: elementRef,
    isIntersecting: isIntersecting || (triggerOnce && hasTriggered),
  };
};