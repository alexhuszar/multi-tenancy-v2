'use client';

import { useEffect, useRef, useCallback } from 'react';

export function useInfiniteScroll({
  hasMore,
  isLoading = false,
  onLoadMore,
  rootMargin = '200px',
}: {
  hasMore: boolean;
  isLoading?: boolean;
  onLoadMore: () => void;
  rootMargin?: string;
}) {
  const watchRef = useRef<HTMLDivElement | null>(null);

  const onLoadMoreRef = useRef(onLoadMore);
  onLoadMoreRef.current = onLoadMore;

  const hasMoreRef = useRef(hasMore);
  hasMoreRef.current = hasMore;

  const isLoadingRef = useRef(isLoading);
  isLoadingRef.current = isLoading;

  const handleIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting && hasMoreRef.current && !isLoadingRef.current) {
        onLoadMoreRef.current();
      }
    },
    [],
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
