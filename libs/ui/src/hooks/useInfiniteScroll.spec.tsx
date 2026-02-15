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

test('does not call onLoadMore when isLoading is true', () => {
  const onLoadMore = jest.fn();

  function TestComponent() {
    const { watchRef } = useInfiniteScroll({
      hasMore: true,
      isLoading: true,
      onLoadMore,
    });
    return <div ref={watchRef} data-testid="sentinel" />;
  }

  render(<TestComponent />);

  const sentinel = screen.getByTestId('sentinel');
  intersect(sentinel, true);

  expect(onLoadMore).not.toHaveBeenCalled();
});

test('does not recreate observer when onLoadMore identity changes', () => {
  const observerSpy = jest.spyOn(global, 'IntersectionObserver' as never);

  let renderCount = 0;

  function TestComponent({ count }: { count: number }) {
    renderCount++;
    const { watchRef } = useInfiniteScroll({
      hasMore: true,
      onLoadMore: () => {
        // new function identity each render due to closure over count
        void count;
      },
    });
    return <div ref={watchRef} data-testid="sentinel" />;
  }

  const { rerender } = render(<TestComponent count={1} />);

  const initialCallCount = observerSpy.mock.calls.length;

  rerender(<TestComponent count={2} />);
  rerender(<TestComponent count={3} />);

  // Observer should not be recreated on re-renders
  expect(observerSpy.mock.calls.length).toBe(initialCallCount);

  observerSpy.mockRestore();
});
