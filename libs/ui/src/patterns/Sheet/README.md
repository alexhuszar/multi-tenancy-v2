# Sheet (pattern)

Slide-in panel built on Radix UI Dialog with `overlayClassName` and `contentClassName` as **required** props. This variant merges the shared `className` with both overlay and content, making it easy to apply base styles globally.

> If you need optional class names, use the [primitive Sheet](../../primitives/Sheet/README.md) instead.

## Import

```tsx
import { Sheet, SheetTrigger, SheetClose } from '@multi-tenancy/ui/patterns';
```

## Props

### `Sheet`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | **Required.** Controls visibility |
| `onOpenChange` | `(open: boolean) => void` | — | **Required.** Called when the sheet should open or close |
| `children` | `ReactNode` | — | **Required.** Panel content |
| `overlayClassName` | `string` | — | **Required.** CSS class for the backdrop |
| `contentClassName` | `string` | — | **Required.** CSS class for the panel |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Which edge the panel slides in from |
| `className` | `string` | — | Additional class merged onto both overlay and content |

### `SheetTrigger` / `SheetClose`

Re-exports of Radix Dialog `Trigger` and `Close`.

## Accessibility

- Focus is trapped inside the sheet while open (Radix default).
- `Escape` dismisses the sheet.
- A visually hidden `<Title>` is rendered for screen-reader compliance.
- Overlay has `role="presentation"`.
- Content has `data-position` attribute for CSS animations per direction.

## Usage

```tsx
import { useState } from 'react';
import { Sheet, SheetClose } from '@multi-tenancy/ui/patterns';

function BottomDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open drawer</button>

      <Sheet
        open={open}
        onOpenChange={setOpen}
        position="bottom"
        overlayClassName="drawer-overlay"
        contentClassName="drawer-content"
      >
        <p>Drawer content goes here.</p>

        <SheetClose asChild>
          <button>Close</button>
        </SheetClose>
      </Sheet>
    </>
  );
}
```

### Right-side panel

```tsx
<Sheet
  open={open}
  onOpenChange={setOpen}
  position="right"
  overlayClassName="overlay"
  contentClassName="side-panel"
  className="base-styles"
>
  <SidebarContent />
</Sheet>
```
