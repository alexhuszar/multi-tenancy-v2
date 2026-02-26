# useInfiniteScroll

Low-level hook that fires a callback when a sentinel element enters the viewport, using the Intersection Observer API.

> For standard list use cases, prefer the [`InfiniteScroll`](../patterns/InfiniteScroll/README.md) component which wraps this hook.

## Import

```tsx
import { useInfiniteScroll } from '@multi-tenancy/ui';
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `hasMore` | `boolean` | — | **Required.** Whether more data is available to load |
| `onLoadMore` | `() => void` | — | **Required.** Called when the sentinel enters the viewport |
| `isLoading` | `boolean` | `false` | Prevents `onLoadMore` from firing while a request is in flight |
| `rootMargin` | `string` | `'200px'` | Intersection Observer root margin — pre-loads before the sentinel is fully visible |

## Returns

| Key | Type | Description |
|-----|------|-------------|
| `watchRef` | `RefObject<T>` | Attach to your sentinel element |

## Usage

```tsx
import { useInfiniteScroll } from '@multi-tenancy/ui';

function CustomList() {
  const { watchRef } = useInfiniteScroll<HTMLDivElement>({
    hasMore,
    isLoading,
    onLoadMore: fetchNextPage,
    rootMargin: '100px',
  });

  return (
    <div>
      {items.map((item) => <Row key={item.id} item={item} />)}

      {hasMore && (
        <div ref={watchRef} aria-hidden="true" style={{ height: 1 }} />
      )}

      {isLoading && <Spinner />}
    </div>
  );
}
```

### With eager pre-loading

```tsx
// Trigger load 400px before the user reaches the bottom
const { watchRef } = useInfiniteScroll({
  hasMore,
  isLoading,
  onLoadMore: loadMore,
  rootMargin: '400px',
});
```
