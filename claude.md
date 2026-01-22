# Design System Architecture Plan

## Overview

Build a **primitive-first, multi-CSS framework design system** for the NX monorepo that:
- Separates headless primitives from styled components
- Supports **Tailwind** and **MaterializeCSS** via adapters (extensible to others)
- Uses design tokens for consistent theming
- Keeps business logic in hooks, UI in components
- **Headless + Adapter pattern**: Primitives are purely headless (className only), styling via adapter hooks
- **App-level wrappers**: Apps create their own styled components using primitives + adapters

---

## Current State

**Existing Components** (in `libs/ui/src/`):
- `components/`: Button, Dialog, Toast, ToastProvider, Breadcrumbs, NavigationBar
- `patterns/`: Sheet, InfiniteScroll
- `hooks/`: useInfiniteScroll

**Good Patterns Already in Place**:
- Headless/unstyled approach (className passthrough)
- ForwardRef for DOM access
- Radix UI primitives for accessibility
- TypeScript strict typing

**Issues to Address**:
- Some hardcoded styles (Toast, Sheet have inline classes)
- No design token system
- No theming/adapter layer
- Flat folder structure

---

## Proposed Architecture

```
@multi-tenancy/design-system
├── tokens/          → Design tokens (colors, spacing, typography)
├── primitives/      → Headless components (Button, Dialog, Toast...)
├── patterns/        → Behavioral patterns (InfiniteScroll, FormField...)
├── hooks/           → Business logic hooks
├── adapters/        → CSS framework adapters (tailwind, materialize)
├── theme/           → ThemeProvider + useTheme
└── utils/           → Helpers (cn, polymorphic types)
```

---

## Implementation Plan

### Phase 1: Foundation (Design Tokens + Utils)

**1.1 Create token system**

Create `libs/ui/src/tokens/`:
- `types.ts` - Token type definitions
- `colors.ts` - Color palette (gray, blue, green, red scales)
- `spacing.ts` - Spacing scale (0-24)
- `typography.ts` - Font sizes, weights, line heights
- `defaults.ts` - Default token values
- `index.ts` - Barrel export

**Token Structure**:
```typescript
interface DesignTokens {
  core: CoreTokens;        // Raw values (gray.500, spacing.4)
  semantic: SemanticTokens; // Purpose-driven (primary, background, error)
  components: ComponentTokens; // Component-specific (button.radius)
}
```

**1.2 Create utilities**

Create `libs/ui/src/utils/`:
- `classNames.ts` - Class merging utility (cn)
- `polymorphic.ts` - Polymorphic component types
- `index.ts`

---

### Phase 2: Adapter Layer

**2.1 Create adapter interface**

Create `libs/ui/src/adapters/`:
- `types.ts` - StyleAdapter interface

```typescript
interface StyleAdapter {
  name: string;
  cn(...classes: ClassValue[]): string;
  getButtonStyles(props: ButtonStyleProps): string;
  getDialogStyles(props: DialogStyleProps): string;
  // ... per component
}
```

**2.2 Implement Tailwind adapter**

Create `libs/ui/src/adapters/tailwind/`:
- `adapter.ts` - Tailwind implementation
- `presets.ts` - Tailwind config preset
- `index.ts`

**2.3 Implement MaterializeCSS adapter**

Create `libs/ui/src/adapters/materialize/`:
- `adapter.ts` - MaterializeCSS implementation
- `index.ts`

**Adapter Examples:**

```typescript
// Tailwind adapter
getButtonStyles({ variant = 'primary', size = 'md', className }) {
  return twMerge(clsx(
    'inline-flex items-center justify-center font-medium rounded-md transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50',
    variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
    variant === 'secondary' && 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    variant === 'outline' && 'border border-gray-300 bg-transparent hover:bg-gray-50',
    size === 'sm' && 'h-8 px-3 text-sm',
    size === 'md' && 'h-10 px-4 text-base',
    size === 'lg' && 'h-12 px-6 text-lg',
    className
  ));
}

// MaterializeCSS adapter
getButtonStyles({ variant = 'primary', size = 'md', className }) {
  return clsx(
    'btn waves-effect',
    variant === 'primary' && 'blue darken-1',
    variant === 'secondary' && 'grey darken-1',
    variant === 'outline' && 'btn-flat',
    size === 'sm' && 'btn-small',
    size === 'lg' && 'btn-large',
    className
  );
}
```

---

### Phase 3: Theme Provider

Create `libs/ui/src/theme/`:
- `ThemeContext.ts` - React context
- `ThemeProvider.tsx` - Provider component
- `useTheme.ts` - Hook to access theme
- `useStyles.ts` - Hook to access adapter
- `index.ts`

```typescript
// ThemeProvider accepts adapter instance (not string) for tree-shaking
import { tailwindAdapter } from '@multi-tenancy/design-system/adapters/tailwind';

<ThemeProvider adapter={tailwindAdapter} tokens={customTokens}>
  <App />
</ThemeProvider>
```

---

### Phase 4: Restructure Primitives

**4.1 Move existing components**

Move to `libs/ui/src/primitives/`:
- Button/ (existing - already clean)
- Dialog/ (existing)
- Toast/ (existing - remove hardcoded `flex items-center justify-between`)
- ToastProvider/ (existing)
- Breadcrumbs/ (existing)
- NavigationBar/ (existing)
- Sheet/ (from patterns - convert inline styles to className)

**4.2 Keep patterns directory**

Keep in `libs/ui/src/patterns/`:
- InfiniteScroll/ (existing)
- FormField/ (new - Label + Input + Error pattern)

**4.3 Move/enhance hooks**

Move to `libs/ui/src/hooks/`:
- useInfiniteScroll (existing)
- useToast (new - toast state management)
- useDialog (new - dialog state management)

---

### Phase 5: Update Package Exports

Update `libs/ui/package.json` exports:

```json
{
  "exports": {
    ".": "./src/index.ts",
    "./primitives": "./src/primitives/index.ts",
    "./patterns": "./src/patterns/index.ts",
    "./hooks": "./src/hooks/index.ts",
    "./tokens": "./src/tokens/index.ts",
    "./adapters": "./src/adapters/index.ts",
    "./adapters/tailwind": "./src/adapters/tailwind/index.ts",
    "./adapters/materialize": "./src/adapters/materialize/index.ts",
    "./theme": "./src/theme/index.ts"
  }
}
```

Update `libs/ui/src/index.ts`:

```typescript
// Primitives (v1 compat + new)
export * from './primitives';

// Patterns
export * from './patterns';

// Hooks
export * from './hooks';

// Theme
export * from './theme';

// Tokens (optional for consumers who want raw access)
export * from './tokens';
```

---

### Phase 6: App Integration

**6.1 Update apps to use ThemeProvider**

Each app imports ONLY its adapter (separate entry points for smaller bundles):

```typescript
// apps/dataroom/app/layout.tsx (Tailwind app)
import { ThemeProvider } from '@multi-tenancy/design-system';
import { tailwindAdapter } from '@multi-tenancy/design-system/adapters/tailwind';

export default function Layout({ children }) {
  return (
    <ThemeProvider adapter={tailwindAdapter}>
      {children}
    </ThemeProvider>
  );
}

// apps/other-app/app/layout.tsx (MaterializeCSS app)
import { ThemeProvider } from '@multi-tenancy/design-system';
import { materializeAdapter } from '@multi-tenancy/design-system/adapters/materialize';

export default function Layout({ children }) {
  return (
    <ThemeProvider adapter={materializeAdapter}>
      {children}
    </ThemeProvider>
  );
}
```

**Bundle optimization**: Each app only bundles its own adapter (~3-4 KB). MaterializeCSS apps don't include `tailwind-merge`.

**6.2 Create app-level styled wrappers**

Apps create their own styled components using primitives + adapter:

```typescript
// apps/dataroom/components/ui/Button.tsx
import { Button as PrimitiveButton, useStyles } from '@multi-tenancy/design-system';
import { forwardRef, ComponentProps } from 'react';

type ButtonProps = ComponentProps<typeof PrimitiveButton> & {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, ...props }, ref) => {
    const styles = useStyles();
    return (
      <PrimitiveButton
        ref={ref}
        className={styles.getButtonStyles({ variant, size, className })}
        {...props}
      />
    );
  }
);
```

**6.3 Create Tailwind preset** (optional)

Create `libs/ui/tailwind.preset.js` for Tailwind apps to extend:
```javascript
// apps/dataroom/tailwind.config.js
const designSystemPreset = require('@multi-tenancy/design-system/tailwind');

module.exports = {
  presets: [designSystemPreset],
  // ...
};
```

---

## File Structure After Implementation

```
libs/ui/src/
├── index.ts                    # Main barrel export
├── tokens/
│   ├── index.ts
│   ├── types.ts
│   ├── colors.ts
│   ├── spacing.ts
│   ├── typography.ts
│   └── defaults.ts
├── primitives/
│   ├── index.ts
│   ├── Button/
│   ├── Dialog/
│   ├── Toast/
│   ├── ToastProvider/
│   ├── Breadcrumbs/
│   ├── NavigationBar/
│   └── Sheet/
├── patterns/
│   ├── index.ts
│   ├── InfiniteScroll/
│   └── FormField/
├── hooks/
│   ├── index.ts
│   ├── useInfiniteScroll.ts
│   ├── useToast.ts
│   └── useDialog.ts
├── adapters/
│   ├── index.ts
│   ├── types.ts
│   ├── tailwind/
│   │   ├── index.ts
│   │   ├── adapter.ts
│   │   └── presets.ts
│   └── materialize/
│       ├── index.ts
│       └── adapter.ts
├── theme/
│   ├── index.ts
│   ├── ThemeContext.ts
│   ├── ThemeProvider.tsx
│   ├── useTheme.ts
│   └── useStyles.ts
└── utils/
    ├── index.ts
    ├── classNames.ts
    └── polymorphic.ts
```

---

## Dependencies to Add

```json
{
  "dependencies": {
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  }
}
```

---

## Critical Files to Modify

| File | Action |
|------|--------|
| `libs/ui/src/index.ts` | Update exports |
| `libs/ui/package.json` | Add subpath exports |
| `libs/ui/src/components/Toast/Toast.tsx` | Remove hardcoded classes |
| `libs/ui/src/patterns/Sheet/Sheet.tsx` | Convert inline styles |
| `apps/dataroom/app/layout.tsx` | Add ThemeProvider |
| `apps/cryptocurrency/app/layout.tsx` | Add ThemeProvider |

---

## Verification Plan

1. **Build the library**: `nx build design-system`
2. **Run existing tests**: `nx test design-system`
3. **Test in dataroom app**: Wrap with ThemeProvider + Tailwind adapter, use styled Button
4. **Test MaterializeCSS adapter**: Create a test page with MaterializeCSS adapter
5. **Verify useStyles hook**: Ensure hook throws error when used outside ThemeProvider

---

## Migration Notes

- **ThemeProvider Required**: Apps MUST wrap their root with `ThemeProvider` and provide an adapter
- **Breaking Change**: This is a new architecture - existing component usage will need to be updated
- **Gradual Adoption**: Apps can migrate one component at a time to use `useStyles()` hook

---

## Complete Flow Example

### 1. Design System exports (libs/ui)

```typescript
// libs/ui/src/primitives/Button/Button.tsx (headless)
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...rest }, ref) => (
    <button ref={ref} className={className} {...rest}>
      {children}
    </button>
  )
);

// libs/ui/src/adapters/types.ts
export interface StyleAdapter {
  name: string;
  getButtonStyles(props: ButtonStyleProps): string;
  getDialogStyles(props: DialogStyleProps): string;
}

// libs/ui/src/theme/useStyles.ts
export function useStyles(): StyleAdapter {
  const adapter = useContext(ThemeContext);
  if (!adapter) throw new Error('useStyles must be used within ThemeProvider');
  return adapter;
}
```

### 2. App integration (apps/dataroom)

```typescript
// apps/dataroom/app/layout.tsx
import { ThemeProvider } from '@multi-tenancy/design-system';
import { tailwindAdapter } from '@multi-tenancy/design-system/adapters/tailwind';

export default function RootLayout({ children }) {
  return (
    <html><body>
      <ThemeProvider adapter={tailwindAdapter}>
        {children}
      </ThemeProvider>
    </body></html>
  );
}

// apps/dataroom/components/ui/Button.tsx
import { Button as PrimitiveButton, useStyles } from '@multi-tenancy/design-system';

export const Button = forwardRef(({ variant, size, className, ...props }, ref) => {
  const styles = useStyles();
  return (
    <PrimitiveButton
      ref={ref}
      className={styles.getButtonStyles({ variant, size, className })}
      {...props}
    />
  );
});

// apps/dataroom/app/page.tsx
import { Button } from '@/components/ui/Button';

export default function Page() {
  return <Button variant="primary" size="lg">Submit</Button>;
}
// → <button class="inline-flex items-center ... bg-blue-600 text-white ... h-12 px-6">Submit</button>
```

### 3. Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│  apps/dataroom                                                  │
├─────────────────────────────────────────────────────────────────┤
│  layout.tsx                                                     │
│    <ThemeProvider adapter={tailwindAdapter}>                    │
│                              ↓                                  │
│  components/ui/Button.tsx                                       │
│    const styles = useStyles()  // gets tailwindAdapter          │
│    <PrimitiveButton className={styles.getButtonStyles(...)}>    │
│                              ↓                                  │
│  page.tsx                                                       │
│    <Button variant="primary" size="lg">Submit</Button>          │
└─────────────────────────────────────────────────────────────────┘
                               ↓
┌─────────────────────────────────────────────────────────────────┐
│  @multi-tenancy/design-system                                   │
│  ┌─────────────┐  ┌──────────────────┐  ┌───────────────────┐   │
│  │ primitives/ │  │ adapters/        │  │ theme/            │   │
│  │   Button    │  │   tailwind       │  │   ThemeProvider   │   │
│  │  (headless) │  │   materialize    │  │   useStyles()     │   │
│  └─────────────┘  └──────────────────┘  └───────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```
