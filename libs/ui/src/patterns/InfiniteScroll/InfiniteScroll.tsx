'use client';

import { ReactNode } from 'react';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';

export type Identifiable = { id: string };

export interface InfiniteScrollProps<T extends Identifiable> {
  items: T[];
  hasMore: boolean;
  onLoadMore: () => void;
  renderItem: (item: T) => ReactNode;
  loader?: ReactNode;
}

export function InfiniteScroll<T extends Identifiable>({
  items,
  hasMore,
  onLoadMore,
  renderItem,
  loader,
}: InfiniteScrollProps<T>) {
  const { watchRef } = useInfiniteScroll({ hasMore, onLoadMore });

  return (
    <>
      {items.map((item) => (
        <div key={item.id}>{renderItem(item)}</div>
      ))}

      {hasMore && (
        <>
          <div
            ref={watchRef}
            aria-hidden="true"
            data-element="infinite-scroll-sentinel"
          />
          {loader}
        </>
      )}
    </>
  );
}
