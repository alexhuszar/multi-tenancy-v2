import { render, screen, waitFor } from '@testing-library/react';
import { InfiniteScroll } from './InfiniteScroll';
import { intersect, getObserverOf } from '../../utils-test/intersection-observer';

type Item = {
  id: string;
  title: string;
};

const generateItems = (n: number): Item[] =>
  Array.from({ length: n }).map((_, index) => ({
    id: `item-${index}`,
    title: `Item ${index}`,
  }));

describe('InfiniteScroll (pattern)', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test(`behavior:
          ✓ renders items
          ✓ observes sentinel
          ✓ calls onLoadMore on intersect
          ✓ stops loading when hasMore=false
          ✓ disconnects observer on unmount
        `, async () => {
    const onLoadMore = jest.fn();
    const items = generateItems(5);

    const { unmount, rerender } = render(
      <InfiniteScroll
        items={items}
        hasMore
        onLoadMore={onLoadMore}
        renderItem={(item) => <div data-testid="item">{item.title}</div>}
        loader={<div data-testid="loader">Loading…</div>}
      />,
    );

    expect(screen.getAllByTestId('item')).toHaveLength(5);

    const sentinel = document.querySelector(
      '[data-element="infinite-scroll-sentinel"]',
    ) as HTMLElement;

    expect(sentinel).toBeTruthy();

    const observerInstance = getObserverOf(sentinel);
    expect(observerInstance.observe).toHaveBeenCalledWith(sentinel);

    await waitFor(() => {
      intersect(sentinel, true);
    });

    expect(onLoadMore).toHaveBeenCalledTimes(1);

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    rerender(
      <InfiniteScroll
        items={items}
        hasMore={false}
        onLoadMore={onLoadMore}
        renderItem={(item) => <div data-testid="item">{item.title}</div>}
        loader={<div data-testid="loader">Loading…</div>}
      />,
    );

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();

    unmount();

    expect(observerInstance.disconnect).toHaveBeenCalled();
  });

  test('does not call onLoadMore when isLoading is true', async () => {
    const onLoadMore = jest.fn();
    const items = generateItems(3);

    render(
      <InfiniteScroll
        items={items}
        hasMore
        isLoading
        onLoadMore={onLoadMore}
        renderItem={(item) => <div data-testid="item">{item.title}</div>}
      />,
    );

    const sentinel = document.querySelector(
      '[data-element="infinite-scroll-sentinel"]',
    ) as HTMLElement;

    await waitFor(() => {
      intersect(sentinel, true);
    });

    expect(onLoadMore).not.toHaveBeenCalled();
  });

  test('sentinel has a non-zero height', () => {
    const items = generateItems(1);

    render(
      <InfiniteScroll
        items={items}
        hasMore
        onLoadMore={jest.fn()}
        renderItem={(item) => <div>{item.title}</div>}
      />,
    );

    const sentinel = document.querySelector(
      '[data-element="infinite-scroll-sentinel"]',
    ) as HTMLElement;

    expect(sentinel.style.height).toBe('1px');
  });
});
