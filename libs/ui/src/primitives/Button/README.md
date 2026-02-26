# Button

Accessible button with built-in loading state. Supports all standard HTML button attributes.

## Import

```tsx
import { Button } from '@multi-tenancy/ui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Button label / content |
| `disabled` | `boolean` | `false` | Disables the button |
| `isLoading` | `boolean` | `false` | Shows loading state; auto-disables the button |
| `loadingIcon` | `ReactElement` | — | **Required when `isLoading` is `true`**. Icon rendered inside a `role="status"` span |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Native button type |
| `className` | `string` | — | CSS class applied to the `<button>` element |
| `...rest` | `ButtonHTMLAttributes` | — | Any standard button attribute (`onClick`, `aria-*`, `data-*`, …) |

> `isLoading` and `loadingIcon` are a **discriminated pair**: if `isLoading` is `true`, `loadingIcon` is required; otherwise it must be omitted.

## Accessibility

- `aria-busy` is set when loading.
- The visible label is wrapped in `<span aria-hidden>` while loading so screen readers only announce the loading status.
- `loadingIcon` is rendered inside `<span role="status" aria-live="polite" aria-label="Loading">`.

## Usage

### Basic

```tsx
<Button onClick={() => console.log('clicked')}>Save</Button>
```

### Submit button

```tsx
<Button type="submit">Create account</Button>
```

### Disabled

```tsx
<Button disabled>Not available</Button>
```

### Loading state

```tsx
import { Spinner } from '../icons/Spinner';

<Button isLoading loadingIcon={<Spinner />}>
  Saving…
</Button>
```

### With custom class

```tsx
<Button className="btn-primary" onClick={handleSave}>
  Save changes
</Button>
```
