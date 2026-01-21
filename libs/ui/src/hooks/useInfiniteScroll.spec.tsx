import { render, screen } from '@testing-library/react';
import { useInfiniteScroll } from './useInfiniteScroll';
import { intersect } from '../utils-test/intersection-observer';
import React, { RefObject } from 'react';

test('calls onLoadMore on intersect', () => {
  const onLoadMore = jest.fn();

  let watchRef: React.RefObject<HTMLDivElement> | { current: null } = {
    current: null,
  };

  function TestComponent() {
    watchRef = useInfiniteScroll({ hasMore: true, onLoadMore })
      .watchRef as RefObject<HTMLDivElement>;
    return <div ref={watchRef} data-testid="item-current" />;
  }

  render(<TestComponent />);

  const sentinel = screen.getByTestId('item-current');
  expect(sentinel).toBeTruthy();

  intersect(sentinel, true);

  expect(onLoadMore).toHaveBeenCalledTimes(1);
});
