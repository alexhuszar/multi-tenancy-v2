# useOnline

Detect whether the browser has a network connection.

## Import

```tsx
import { useOnline } from '@multi-tenancy/ui';
```

## Returns

`boolean` — `true` if the browser is online, `false` if offline.

Reads `navigator.onLine` on mount and updates reactively on `online` / `offline` window events. Returns `false` during SSR.

## Usage

### Offline banner

```tsx
import { useOnline } from '@multi-tenancy/ui';

function StatusBanner() {
  const isOnline = useOnline();

  if (isOnline) return null;

  return (
    <div role="alert" aria-live="assertive">
      You are offline. Some features may be unavailable.
    </div>
  );
}
```

### Disable actions while offline

```tsx
function SaveButton() {
  const isOnline = useOnline();

  return (
    <button disabled={!isOnline} onClick={save}>
      {isOnline ? 'Save' : 'Offline'}
    </button>
  );
}
```
