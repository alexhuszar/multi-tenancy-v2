# Breadcrumbs

Accessible breadcrumb navigation that follows the WAI-ARIA breadcrumb pattern. Automatically marks the last item as the current page and hides separators from assistive technology.

## Import

```tsx
import { Breadcrumbs } from '@multi-tenancy/ui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | **Required.** Breadcrumb items (links or plain text) |
| `separator` | `string \| ReactNode` | `'/'` | Separator rendered between items |
| `className` | `string` | — | CSS class for the `<nav>` element |

## Accessibility

- Wraps items in `<nav aria-label="breadcrumb"><ol>`.
- The last child automatically receives `aria-current="page"`.
- Separators are rendered as `<li aria-hidden="true">` so they are not read by screen readers.
- Invalid (non-element) children are silently filtered out.

## Usage

### Basic

```tsx
import { Breadcrumbs } from '@multi-tenancy/ui';

<Breadcrumbs>
  <a href="/">Home</a>
  <a href="/documents">Documents</a>
  <span>Annual Report</span>
</Breadcrumbs>
```

### Custom separator

```tsx
<Breadcrumbs separator="›">
  <a href="/">Home</a>
  <a href="/settings">Settings</a>
  <span>Profile</span>
</Breadcrumbs>
```

### Icon separator

```tsx
import { ChevronRight } from '../icons';

<Breadcrumbs separator={<ChevronRight size={14} />}>
  <a href="/">Home</a>
  <a href="/projects">Projects</a>
  <span>Multi-tenancy</span>
</Breadcrumbs>
```
