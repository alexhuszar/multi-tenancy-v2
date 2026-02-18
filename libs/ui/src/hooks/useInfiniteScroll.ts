'use client';

import { useEffect, useRef, useCallback } from 'react';

type UseInfiniteScrollOptions = {
  hasMore: boolean;
  isLoading?: boolean;
  onLoadMore: () => void;
  rootMargin?: string;
};

export function useInfiniteScroll<T extends Element = Element>({
  hasMore,
  isLoading = false,
  onLoadMore,
  rootMargin = '200px',
}: UseInfiniteScrollOptions) {
  const watchRef = useRef<T | null>(null);

  const latest = useRef({ hasMore, isLoading, onLoadMore });
  latest.current = { hasMore, isLoading, onLoadMore };

  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (
        entry.isIntersecting &&
        latest.current.hasMore &&
        !latest.current.isLoading
      ) {
        latest.current.onLoadMore();
      }
    },
    [],
  );

  useEffect(() => {
    if (!watchRef.current) return;
    if (typeof IntersectionObserver === 'undefined') return;

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin,
    });

    observerRef.current.observe(watchRef.current);

    return () => observerRef.current?.disconnect();
  }, [handleIntersect, rootMargin]);

  return { watchRef };
}
