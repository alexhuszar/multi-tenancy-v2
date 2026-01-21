# Multi-Tenancy V2

A multi-tenant design system built with Nx, Next.js, and React. Features framework-agnostic design tokens, CSS variable-based theming, and type-safe feature flags.

## Project Structure

```
multi-tenancy-v2/
├── apps/
│   ├── dataroom/              # Main Next.js application
│   └── dataroom-e2e/          # E2E tests (Playwright)
│
├── libs/
│   ├── foundation/            # Design system foundation
│   │   ├── tokens/            # Design tokens (no React)
│   │   │   ├── base/          # Base color, typography, spacing, etc.
│   │   │   └── semantic/      # Light/dark mode semantic mappings
│   │   ├── themes/            # Theme composition logic
│   │   └── css/               # CSS variable generation
│   │
│   ├── ui/                    # Pure, theme-driven components
│   │   ├── components/        # Button, Dialog, Toast, etc.
│   │   ├── primitives/        # Box, Text, Stack, Flex
│   │   ├── patterns/          # InfiniteScroll, Sheet
│   │   ├── providers/         # ThemeProvider
│   │   └── hooks/             # useInfiniteScroll, etc.
│   │
│   ├── tenants/               # Tenant configuration
│   │   ├── dataroom/          # DataRoom tenant (blue theme)
│   │   ├── cryptocurrency/    # CryptoVault tenant (golden theme)
│   │   └── default/           # Default fallback config
│   │
│   ├── config/                # Shared configuration
│   │   ├── env.ts             # Environment utilities
│   │   └── feature-flags.ts   # Type-safe feature flags
│   │
│   ├── types/                 # Shared TypeScript types
│   ├── utils/                 # Utility functions
│   └── data-access/           # API clients and data hooks
│
└── dist/                      # Build outputs
```

## Shared Libraries

| Library | Package Name | Description |
|---------|--------------|-------------|
| **foundation** | `@multi-tenancy/foundation` | Design tokens, themes, CSS variable generation |
| **ui** | `@multi-tenancy/design-system` | React components with CSS variable theming |
| **tenants** | `@multi-tenancy/tenants` | Tenant-specific theme and feature configuration |
| **config** | `@multi-tenancy/config` | Environment and feature flag utilities |
| **types** | `@multi-tenancy/types` | Shared TypeScript types |
| **utils** | `@multi-tenancy/utils` | Utility functions |
| **data-access** | `@multi-tenancy/data-access` | API client and data fetching hooks |

## Multi-Tenancy Theming

### How It Works

1. **Design Tokens** (`@multi-tenancy/foundation`): Framework-agnostic token definitions for colors, typography, spacing, etc.

2. **Tenant Overrides** (`@multi-tenancy/tenants`): Each tenant can override base tokens with custom colors and branding.

3. **Theme Composition**: The `composeTheme()` function merges base tokens with tenant overrides.

4. **CSS Variables**: The `ThemeProvider` injects CSS variables at runtime, enabling dynamic theming.

5. **Component Styling**: Components use CSS variables like `var(--semantic-interactive-default)` for colors.

### Adding a New Tenant

1. Create a new folder in `libs/tenants/src/`:

```typescript
// libs/tenants/src/my-tenant/theme.ts
import type { TenantThemeConfig } from '@multi-tenancy/types';

export const myTenantThemeConfig: TenantThemeConfig = {
  tenantId: 'my-tenant',
  tokenOverrides: {
    colors: {
      primary: {
        500: '#your-brand-color',
        // ... other shades
      },
    },
  },
};
```

2. Create features and branding files:

```typescript
// libs/tenants/src/my-tenant/features.ts
import { FEATURE_FLAGS } from '@multi-tenancy/types';

export const myTenantFeatures = [
  FEATURE_FLAGS.DARK_MODE,
  FEATURE_FLAGS.CUSTOM_BRANDING,
];

// libs/tenants/src/my-tenant/branding.ts
export const myTenantBranding = {
  logo: '/tenants/my-tenant/logo.svg',
  appName: 'My Tenant App',
};
```

3. Register the tenant in `libs/tenants/src/registry.ts`.

### Using the Theme in Components

```tsx
// Using CSS variables directly
const buttonStyle = {
  backgroundColor: 'var(--semantic-interactive-default)',
  color: 'var(--semantic-foreground-inverse)',
};

// Using Tailwind with CSS variable mapping
<button className="bg-interactive text-foreground-inverse">
  Click me
</button>

// Using the useTheme hook
import { useTheme } from '@multi-tenancy/design-system';

function MyComponent() {
  const { theme, mode, setMode, resolvedMode } = useTheme();
  // ...
}
```

## Using Libraries in Your App

```typescript
// Import types
import type { User, Tenant, FeatureFlag } from '@multi-tenancy/types';

// Import foundation
import { composeTheme, generateThemeCSS, baseTokens } from '@multi-tenancy/foundation';

// Import UI components
import { Button, ThemeProvider, Box, Text, Stack } from '@multi-tenancy/design-system';

// Import tenant config
import { getTenantConfig, getTenantSettings } from '@multi-tenancy/tenants';

// Import config utilities
import { resolveFeatureFlags, isFeatureEnabled, createEnvConfig } from '@multi-tenancy/config';

// Import utilities
import { formatDate, formatCurrency, isValidEmail } from '@multi-tenancy/utils';

// Import data access hooks
import { useFetch, ApiClient } from '@multi-tenancy/data-access';
```

## Library Dependency Graph

```
types ──────────────────────────────────┐
   │                                    │
   ├──→ foundation                      │
   │         │                          │
   ├──→ config                          │
   │         │                          │
   └──→ utils ───────────────┐          │
                             │          │
         tenants ←───────────┴──────────┘
            │
     ┌──────┴──────┐
     │             │
     ui        data-access
     │             │
     └──────┬──────┘
            │
        dataroom
```

## Run Tasks

### Development

```sh
# Start the dev server
npx nx dev dataroom

# Start with a specific tenant
TENANT_ID=cryptocurrency npx nx dev dataroom
```

### Build

```sh
# Build the app
npx nx build @multi-tenancy/dataroom

# Build all libraries
npx nx run-many --target=build --projects=types,foundation,config,tenants,design-system
```

### Test

```sh
# Run all tests
npm run test

# Run tests for a specific library
npx nx test design-system
npx nx test types
```

### Lint and Type Check

```sh
npm run lint
npm run typecheck
```

## Feature Flags

The feature flag system provides type-safe feature toggling per tenant.

```typescript
import { FEATURE_FLAGS, resolveFeatureFlags, isFeatureEnabled } from '@multi-tenancy/config';
import { getTenantSettings } from '@multi-tenancy/tenants';

const settings = getTenantSettings('dataroom');
const flags = resolveFeatureFlags('dataroom', settings.features);

if (isFeatureEnabled(flags, FEATURE_FLAGS.DARK_MODE)) {
  // Enable dark mode toggle
}
```

### Available Feature Flags

| Flag | Description |
|------|-------------|
| `DARK_MODE` | Enable dark/light mode toggle |
| `ADVANCED_SEARCH` | Advanced search functionality |
| `BULK_OPERATIONS` | Bulk file operations |
| `ANALYTICS_DASHBOARD` | Analytics and reporting |
| `CUSTOM_BRANDING` | Custom logo and branding |
| `API_ACCESS` | External API access |
| `SSO_LOGIN` | Single sign-on support |
| `AUDIT_LOGS` | Audit logging |

## Testing

Test files should be placed next to source files with `.spec.ts` or `.spec.tsx` extension:

```
libs/ui/src/components/Button/
├── Button.tsx
├── Button.spec.tsx
└── index.ts
```

Example test:

```tsx
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('should render with primary variant', () => {
    render(<Button variant="primary">Click me</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'primary');
  });
});
```

## Add New Projects

```sh
# Generate a new application
npx nx g @nx/next:app demo

# Generate a new library
npx nx g @nx/js:library my-lib --directory=libs/my-lib --buildable --bundler=swc
```

## CI Setup

```sh
# Connect to Nx Cloud
npx nx connect

# Configure CI workflow
npx nx g ci-workflow
```

## Resources

- [Nx Documentation](https://nx.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
