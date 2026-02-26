# NavigationBar

Top-level navigation bar built on Radix Navigation Menu. Provides three layout areas: left slot, centered title, and right slot.

## Import

```tsx
import { NavigationBar } from '@multi-tenancy/ui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string \| ReactNode` | — | Brand name or logo rendered as an `<h1>` heading |
| `isTitleCentered` | `boolean` | `true` | Adds `data-visual="centered"` for centering the title via CSS |
| `NavigationLeftSlot` | `ReactElement` | — | Content placed in the left navigation area (e.g., back button, menu items) |
| `NavigationRightSlot` | `ReactElement` | — | Content placed in the right navigation area (e.g., user avatar, actions) |
| `className` | `string` | `''` | CSS class for the root `<nav>` element |
| `titleClassName` | `string` | `''` | CSS class for the title wrapper |
| `navListMenuClassName` | `string` | `''` | CSS class for the navigation list |

## Accessibility

- Root has `aria-label="Main navigation"`.
- Title is rendered with `role="heading"` and `aria-level={1}`.
- Left and right slot items have `role="presentation"` so they are not treated as navigation items.

## Usage

### With title and action slots

```tsx
import { NavigationBar } from '@multi-tenancy/ui';
import { MenuIcon, AvatarIcon } from '../icons';

<NavigationBar
  className="nav-root"
  titleClassName="nav-title"
  title="Dataroom"
  NavigationLeftSlot={
    <button aria-label="Open menu"><MenuIcon /></button>
  }
  NavigationRightSlot={
    <button aria-label="Account"><AvatarIcon /></button>
  }
/>
```

### Logo instead of text title

```tsx
<NavigationBar
  title={<img src="/logo.svg" alt="Acme" />}
  NavigationRightSlot={<UserMenu />}
/>
```

### Left-aligned title

```tsx
<NavigationBar title="Dashboard" isTitleCentered={false} />
```
