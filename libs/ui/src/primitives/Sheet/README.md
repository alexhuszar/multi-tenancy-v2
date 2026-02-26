# Sheet

Slide-in panel (drawer) built on Radix UI Dialog. Supports four positions and exposes `SheetTrigger` and `SheetClose` for composition.

## Import

```tsx
import { Sheet, SheetTrigger, SheetClose } from '@multi-tenancy/ui';
```

## Props

### `Sheet`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | **Required.** Controls visibility |
| `onOpenChange` | `(open: boolean) => void` | — | **Required.** Called when the sheet should open or close |
| `children` | `ReactNode` | — | **Required.** Panel content |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Which edge the panel slides in from |
| `className` | `string` | — | Applied to both overlay and content if specific overrides are not set |
| `overlayClassName` | `string` | — | CSS class for the backdrop overlay (overrides `className`) |
| `contentClassName` | `string` | — | CSS class for the content panel (overrides `className`) |
| `titleClassName` | `string` | — | CSS class for the hidden accessible title |

### `SheetTrigger`

Re-export of `@radix-ui/react-dialog` `Trigger`. Use to declaratively open the sheet.

### `SheetClose`

Re-export of `@radix-ui/react-dialog` `Close`. Use inside the sheet to close it.

## Accessibility

- Built on Radix Dialog, so focus is trapped and `Escape` closes the panel.
- An accessible `<Title>` is always rendered (hidden visually) to satisfy ARIA requirements.
- The overlay has `role="presentation"`.
- `data-position` attribute reflects the current position for CSS targeting.

## Usage

### Controlled (recommended)

```tsx
import { useState } from 'react';
import { Sheet } from '@multi-tenancy/ui';

function FilterPanel() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Filters</button>

      <Sheet
        open={open}
        onOpenChange={setOpen}
        position="right"
        overlayClassName="sheet-overlay"
        contentClassName="sheet-content"
      >
        <h2>Filter options</h2>
        <button onClick={() => setOpen(false)}>Apply</button>
      </Sheet>
    </>
  );
}
```

### With `SheetTrigger` and `SheetClose`

```tsx
import { useState } from 'react';
import { Sheet, SheetTrigger, SheetClose } from '@multi-tenancy/ui';

function BottomSheet() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen} contentClassName="bottom-sheet">
      <SheetTrigger asChild>
        <button onClick={() => setOpen(true)}>Open sheet</button>
      </SheetTrigger>

      <p>Sheet content goes here.</p>

      <SheetClose asChild>
        <button>Close</button>
      </SheetClose>
    </Sheet>
  );
}
```

### Left-side panel

```tsx
<Sheet
  open={open}
  onOpenChange={setOpen}
  position="left"
  contentClassName="sidebar"
>
  <nav>…</nav>
</Sheet>
```
