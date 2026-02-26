# Dialog

Accessible modal dialog built on Radix UI Dialog. Renders in a portal so it escapes overflow/stacking contexts.

## Import

```tsx
import { Dialog } from '@multi-tenancy/ui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | — | **Required.** Unique key for the dialog root |
| `title` | `string` | — | **Required.** Dialog heading (rendered as `<h2>`) |
| `open` | `boolean` | — | **Required.** Controls whether the dialog is visible |
| `onOpenChange` | `(open: boolean) => void` | — | **Required.** Called when the dialog should open or close |
| `children` | `ReactNode` | — | **Required.** Dialog body content |
| `contentClassName` | `string` | — | **Required.** CSS class for the content panel |
| `closeIcon` | `ReactNode` | — | Icon rendered inside the close button; omit to hide the button |
| `overlayClassName` | `string` | — | CSS class for the backdrop overlay |
| `titleClassName` | `string` | — | CSS class for the title element |

## Accessibility

- Title has `role="heading"` and `aria-level={2}`.
- Overlay has `role="presentation"` to suppress screen-reader announcement.
- Close button has `aria-label="Close"`.
- Focus is trapped inside the dialog while open (Radix default).
- `Escape` closes the dialog (Radix default).

## Usage

### Basic dialog

```tsx
import { useState } from 'react';
import { Dialog } from '@multi-tenancy/ui';
import { XIcon } from '../icons';

function ConfirmDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>

      <Dialog
        id="confirm-dialog"
        title="Confirm action"
        open={open}
        onOpenChange={setOpen}
        contentClassName="dialog-content"
        overlayClassName="dialog-overlay"
        closeIcon={<XIcon />}
      >
        <p>Are you sure you want to continue?</p>
        <button onClick={() => setOpen(false)}>Cancel</button>
        <button onClick={handleConfirm}>Confirm</button>
      </Dialog>
    </>
  );
}
```

### Without a close button

```tsx
<Dialog
  id="alert-dialog"
  title="Session expired"
  open={open}
  onOpenChange={setOpen}
  contentClassName="dialog-content"
>
  <p>Please sign in again to continue.</p>
  <button onClick={() => setOpen(false)}>OK</button>
</Dialog>
```
