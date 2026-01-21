'use client';

import { useEffect, useRef, useCallback } from 'react';

export function useInfiniteScroll({
  hasMore,
  onLoadMore,
  rootMargin = '200px',
}: {
  hasMore: boolean;
  onLoadMore: () => void;
  rootMargin?: string;
}) {
  const watchRef = useRef<HTMLDivElement | null>(null);

  const handleIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting && hasMore) {
        onLoadMore();
      }
    },
    [hasMore, onLoadMore],
  );

  useEffect(() => {
    if (!watchRef.current) return;

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin,
    });

    observer.observe(watchRef.current);

    return () => observer.disconnect();
  }, [handleIntersect, rootMargin]);

  return { watchRef };
}
