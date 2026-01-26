# Multi-Tenancy Monorepo

A Next.js/React monorepo with a multi-CSS framework design system.

## Architecture

```
├── apps/
│   ├── dataroom/          # Next.js app (Tailwind CSS)
│   └── cryptocurrency/    # Next.js app (Tailwind CSS)
├── libs/
│   ├── ui/                # @multi-tenancy/design-system
│   └── utils/             # @multi-tenancy/utils
```

## Design System

The design system (`@multi-tenancy/design-system`) supports multiple CSS frameworks through adapters.

### Key Features

- **Headless primitives** - Unstyled components that accept `className` props
- **Multi-CSS framework support** - Tailwind and MaterializeCSS adapters included
- **Design tokens** - Consistent colors, spacing, typography
- **ThemeProvider** - React context for adapter and tokens
- **Tree-shakeable** - Import only what you need

### Quick Start

1. Wrap your app with `ThemeProvider`:

```tsx
// app/layout.tsx
import { ThemeProvider } from '@multi-tenancy/design-system';
import { tailwindAdapter } from '@multi-tenancy/design-system/adapters/tailwind';

export default function Layout({ children }) {
  return <ThemeProvider adapter={tailwindAdapter}>{children}</ThemeProvider>;
}
```

2. Create styled components using primitives + `useStyles()`:

```tsx
// components/ui/Button.tsx
import { Button as PrimitiveButton, useStyles } from '@multi-tenancy/design-system';
import { forwardRef, ComponentProps } from 'react';

type ButtonProps = ComponentProps<typeof PrimitiveButton> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ variant = 'primary', size = 'md', className, ...props }, ref) => {
  const styles = useStyles();
  return <PrimitiveButton ref={ref} className={styles.getButtonStyles({ variant, size, className })} {...props} />;
});
```

3. Use in your pages:

```tsx
import { Button } from '@/components/ui/Button';

export default function Page() {
  return (
    <Button variant="primary" size="lg">
      Submit
    </Button>
  );
}
```

### Available Imports

```tsx
// Main entry (all exports)
import { Button, ThemeProvider, useStyles } from '@multi-tenancy/design-system';

// Subpath imports (tree-shakeable)
import { Button } from '@multi-tenancy/design-system/primitives';
import { tailwindAdapter } from '@multi-tenancy/design-system/adapters/tailwind';
import { materializeAdapter } from '@multi-tenancy/design-system/adapters/materialize';
import { ThemeProvider, useStyles, useTheme } from '@multi-tenancy/design-system/theme';
import { createDesignTokens } from '@multi-tenancy/design-system/tokens';
import { cn } from '@multi-tenancy/design-system/utils';
```

### Primitives

| Component       | Description                          |
| --------------- | ------------------------------------ |
| `Button`        | Accessible button with loading state |
| `Dialog`        | Modal dialog (Radix UI)              |
| `Toast`         | Toast notifications (Radix UI)       |
| `ToastProvider` | Toast context provider               |
| `Sheet`         | Slide-out panel                      |
| `Breadcrumbs`   | Navigation breadcrumbs               |
| `NavigationBar` | Top navigation bar                   |

### Patterns

| Pattern          | Description                                   |
| ---------------- | --------------------------------------------- |
| `InfiniteScroll` | Infinite scrolling with intersection observer |

### Hooks

| Hook                  | Description                        |
| --------------------- | ---------------------------------- |
| `useStyles()`         | Get the style adapter from context |
| `useTheme()`          | Get adapter + tokens from context  |
| `useInfiniteScroll()` | Infinite scroll behavior           |

### Adapters

**Tailwind Adapter**

```tsx
import { tailwindAdapter } from '@multi-tenancy/design-system/adapters/tailwind';
```

**MaterializeCSS Adapter**

```tsx
import { materializeAdapter } from '@multi-tenancy/design-system/adapters/materialize';
```

### Custom Tokens

```tsx
import { ThemeProvider, createDesignTokens } from '@multi-tenancy/design-system';
import { tailwindAdapter } from '@multi-tenancy/design-system/adapters/tailwind';

const customTokens = createDesignTokens({
  colors: {
    blue: {
      500: '#0066cc', // Custom brand color
      600: '#0055aa',
      // ...
    },
  },
});

<ThemeProvider adapter={tailwindAdapter} tokens={customTokens}>
  {children}
</ThemeProvider>;
```

## Development

```bash
# Install dependencies
npm install

# Start dataroom app
npm run dev

# Build all
npm run build:all

# Test design system
npx nx test design-system

# Build design system
npx nx build design-system
```

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/next:app demo
```

## Add UI library

```bash
# Generate UI lib
nx g @nx/next:library ui

# Add a component
nx g @nx/next:component ui/src/lib/button


## ▶️ View project details
nx show project @multi-tenancy-v2/dataroom --web


## ▶️ Run affected commands
# see what's been affected by changes
nx affected:graph

# run tests for current changes
nx affected:test

# run e2e tests for current changes
nx affected:e2e


## File Structure

```

libs/ui/src/
├── index.ts # Main exports
├── primitives/ # Headless components
├── patterns/ # Behavioral patterns
├── hooks/ # Business logic hooks
├── adapters/ # CSS framework adapters
│ ├── tailwind/
│ └── materialize/
├── theme/ # ThemeProvider + hooks
├── tokens/ # Design tokens
└── utils/ # Utilities (cn, polymorphic)

```

```
