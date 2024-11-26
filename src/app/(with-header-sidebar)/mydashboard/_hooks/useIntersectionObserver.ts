import { useEffect, useRef } from 'react';

export const useIntersectionObserver = (
  onIntersect: () => void,
  isLoading: boolean,
  cursorId: number | null,
  threshold: number = 0.5
) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && cursorId != null && !isLoading) {
          onIntersect();
        }
      },
      { threshold }
    );

    const current = observerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [isLoading, cursorId, onIntersect]);

  return observerRef;
};
