# Toast & ToastProvider

Accessible toast notifications built on Radix UI Toast. `ToastProvider` must wrap your app once; `Toast` renders individual notifications. For programmatic toasts without manual state, use the [`useToast`](../../hooks/README.md) hook.

## Import

```tsx
import { Toast, ToastProvider } from '@multi-tenancy/ui';
```

---

## ToastProvider

Must be rendered once near the root of your app. It provides the Radix Toast context and the viewport where toasts appear.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | **Required.** App content |
| `viewPortClassName` | `string` | — | **Required.** CSS class for the toast viewport container |
| `duration` | `number` | `5000` | Default auto-dismiss duration in milliseconds for all toasts |

### Setup

```tsx
// app/layout.tsx (Next.js) or root component
import { ToastProvider } from '@multi-tenancy/ui';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ToastProvider viewPortClassName="toast-viewport">
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
```

---

## Toast

Individual notification component. Pair it with the `useToast` hook for declarative, state-free usage, or control it manually with `open` + `onOpenChange`.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onOpenChange` | `(open: boolean) => void` | — | **Required.** Called when the toast should dismiss |
| `open` | `boolean` | — | Controls visibility |
| `title` | `ReactNode` | — | Toast heading |
| `subtitle` | `ReactNode` | — | Secondary description |
| `duration` | `number` | `5000` | Auto-dismiss time in ms |
| `closeIcon` | `ReactNode` | — | Icon for the close button; omit to hide |
| `action` | `{ component: ReactNode; altText: string }` | — | Action button with accessible alt text for screen readers |
| `className` | `string` | — | CSS class for the toast root |
| `contentClassName` | `string` | — | CSS class for the inner content wrapper |

### Accessibility

- Root has `role="status"` and `aria-live="polite"`.
- Title has `role="heading"` and `aria-level={2}`.
- Close button has `aria-label="Close"`.
- Action receives an `altText` label read by screen readers.

---

## Usage

### With `useToast` hook (recommended)

```tsx
import { useToast, Toast } from '@multi-tenancy/ui';

function NotificationList() {
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
```

```tsx
// Anywhere in the tree:
const { toast } = useToast();
toast({ variant: 'success', title: 'Saved!', subtitle: 'Your changes have been saved.' });
```

### Controlled manual usage

```tsx
const [open, setOpen] = useState(false);

<button onClick={() => setOpen(true)}>Show toast</button>

<Toast
  open={open}
  onOpenChange={setOpen}
  title="File uploaded"
  subtitle="your-file.pdf is ready."
  closeIcon={<XIcon />}
  action={{
    component: <button onClick={handleUndo}>Undo</button>,
    altText: 'Undo upload',
  }}
/>
```

### Toast variants (via `useToast`)

```tsx
const { toast } = useToast();

toast({ variant: 'success', title: 'Done!' });
toast({ variant: 'error',   title: 'Failed', subtitle: 'Please try again.' });
toast({ variant: 'warning', title: 'Low storage', duration: 10_000 });
```
