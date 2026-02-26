# useToast

Manage toast notifications without a context provider. Backed by a module-level store using `useSyncExternalStore`.

## Import

```tsx
import { useToast } from '@multi-tenancy/ui';
```

## Returns

| Key | Type | Description |
|-----|------|-------------|
| `toasts` | `ToastItem[]` | Currently active toasts |
| `toast` | `(options: ToastOptions) => string` | Creates a toast; returns its `id` |
| `dismiss` | `(id: string) => void` | Removes a specific toast |
| `dismissAll` | `() => void` | Removes all toasts |

## `ToastOptions`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `title` | `ReactNode` | — | Toast heading |
| `subtitle` | `ReactNode` | — | Secondary message |
| `variant` | `'default' \| 'success' \| 'error' \| 'warning'` | — | Visual style |
| `duration` | `number` | `5000` | Auto-dismiss time in ms |
| `action` | `{ component: ReactNode; altText: string }` | — | Action button |

## Usage

```tsx
import { useToast, Toast } from '@multi-tenancy/ui';

// 1. Render active toasts once in your layout
function ToastList() {
  const { toasts, dismiss } = useToast();
  return (
    <>
      {toasts.map((t) => (
        <Toast
          key={t.id}
          open
          title={t.title}
          subtitle={t.subtitle}
          duration={t.duration}
          onOpenChange={(open) => { if (!open) dismiss(t.id); }}
          closeIcon={<XIcon />}
        />
      ))}
    </>
  );
}

// 2. Trigger from anywhere — no prop-drilling needed
function SaveButton() {
  const { toast } = useToast();

  const save = async () => {
    await saveData();
    toast({ variant: 'success', title: 'Saved!', subtitle: 'Your changes are safe.' });
  };

  return <button onClick={save}>Save</button>;
}
```

### Variants

```tsx
const { toast } = useToast();

toast({ variant: 'success', title: 'Done!' });
toast({ variant: 'error',   title: 'Failed', subtitle: 'Please try again.' });
toast({ variant: 'warning', title: 'Low storage', duration: 10_000 });
toast({ variant: 'default', title: 'FYI' });
```

### Dismiss programmatically

```tsx
const { toast, dismiss, dismissAll } = useToast();

const id = toast({ title: 'Processing…' });
await doWork();
dismiss(id); // remove specific toast

dismissAll(); // clear all
```

## See also

- [Toast component](../primitives/Toast/README.md) — the UI component that renders each `ToastItem`
