# InfiniteScroll

Generic infinite-scroll list. Uses an Intersection Observer sentinel to detect when the user has scrolled to the bottom and automatically calls `onLoadMore`.

## Import

```tsx
import { InfiniteScroll } from '@multi-tenancy/ui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `T[]` | — | **Required.** Array of items to render. Each item **must** have an `id: string` property |
| `hasMore` | `boolean` | — | **Required.** Whether additional items can be loaded |
| `onLoadMore` | `() => void` | — | **Required.** Called when the sentinel enters the viewport |
| `renderItem` | `(item: T) => ReactNode` | — | **Required.** Render function for each item |
| `isLoading` | `boolean` | — | Prevents `onLoadMore` from being triggered while a request is in flight |
| `loader` | `ReactNode` | — | Loading indicator shown below the list when `hasMore` is true |

**Generic constraint:** `T extends { id: string }`

## Behaviour

- Renders items in order, each wrapped in a keyed `<div>`.
- When `hasMore` is `true`, a 1 px invisible sentinel div is placed after the list. When it enters the viewport the `onLoadMore` callback fires.
- The sentinel and loader are hidden from assistive technology (`aria-hidden="true"`).

## Usage

### Basic

```tsx
import { useState } from 'react';
import { InfiniteScroll } from '@multi-tenancy/ui';

type Document = { id: string; name: string };

function DocumentList() {
  const [docs, setDocs] = useState<Document[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    setLoading(true);
    const next = await fetchDocuments({ after: docs.at(-1)?.id });
    setDocs((prev) => [...prev, ...next.items]);
    setHasMore(next.hasMore);
    setLoading(false);
  };

  return (
    <InfiniteScroll
      items={docs}
      hasMore={hasMore}
      isLoading={loading}
      onLoadMore={loadMore}
      loader={<p>Loading…</p>}
      renderItem={(doc) => <div className="doc-card">{doc.name}</div>}
    />
  );
}
```

### With a custom spinner

```tsx
import { Spinner } from '../icons';

<InfiniteScroll
  items={files}
  hasMore={hasMore}
  isLoading={isLoading}
  onLoadMore={fetchMore}
  loader={<Spinner aria-label="Loading more files" />}
  renderItem={(file) => <FileRow key={file.id} file={file} />}
/>
```
