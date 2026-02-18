import { render, screen } from '@testing-library/react';
import { useInfiniteScroll } from './useInfiniteScroll';
import React from 'react';

let ioCallback!: IntersectionObserverCallback;

beforeEach(() => {
  global.IntersectionObserver = jest.fn((cb: IntersectionObserverCallback) => {
    ioCallback = cb;
    return {
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
      takeRecords: jest.fn(),
    };
  }) as unknown as typeof IntersectionObserver;
});

afterEach(() => {
  jest.clearAllMocks();
});

test('calls onLoadMore on intersect', () => {
  const onLoadMore = jest.fn();

  function TestComponent() {
    const { watchRef } = useInfiniteScroll<HTMLDivElement>({
      hasMore: true,
      onLoadMore,
    });
    return <div ref={watchRef} data-testid="sentinel" />;
  }

  render(<TestComponent />);

  const sentinel = screen.getByTestId('sentinel');

  ioCallback(
    [
      {
        isIntersecting: true,
        target: sentinel,
      } as unknown as IntersectionObserverEntry,
    ],
    {} as unknown as IntersectionObserver,
  );

  expect(onLoadMore).toHaveBeenCalledTimes(1);
});

test('does not call onLoadMore when isLoading is true', () => {
  const onLoadMore = jest.fn();

  function TestComponent() {
    const { watchRef } = useInfiniteScroll<HTMLDivElement>({
      hasMore: true,
      isLoading: true,
      onLoadMore,
    });
    return <div ref={watchRef} data-testid="sentinel" />;
  }

  render(<TestComponent />);

  const sentinel = screen.getByTestId('sentinel');

  ioCallback(
    [
      {
        isIntersecting: true,
        target: sentinel,
      } as unknown as IntersectionObserverEntry,
    ],
    {} as unknown as IntersectionObserver,
  );

  expect(onLoadMore).not.toHaveBeenCalled();
});

test('does not recreate observer when onLoadMore identity changes', () => {
  const observerSpy = jest.spyOn(global, 'IntersectionObserver');

  function TestComponent({ count }: { count: number }) {
    const { watchRef } = useInfiniteScroll<HTMLDivElement>({
      hasMore: true,
      onLoadMore: () => {
        void count; // new identity every render
      },
    });

    return <div ref={watchRef} data-testid="sentinel" />;
  }

  const { rerender } = render(<TestComponent count={1} />);
  const initialCalls = observerSpy.mock.calls.length;

  rerender(<TestComponent count={2} />);
  rerender(<TestComponent count={3} />);

  expect(observerSpy.mock.calls.length).toBe(initialCalls);

  observerSpy.mockRestore();
});
