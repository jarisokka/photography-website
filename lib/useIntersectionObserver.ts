// lib/useIntersectionObserver.ts
import { useEffect, useRef, useState } from 'react';

const useIntersectionObserver = <T extends HTMLElement>() => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  // This will specifically be a ref of type T, where T extends HTMLElement
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach(entry => {
        setIsIntersecting(entry.isIntersecting);
      });
    };

    const observer = new IntersectionObserver(observerCallback, { threshold: 0.25 });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return { isIntersecting, elementRef };
};

export default useIntersectionObserver;
