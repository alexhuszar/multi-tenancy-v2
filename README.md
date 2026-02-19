# Multi-Tenancy Monorepo

A production-grade multi-tenant SaaS monorepo built with **Nx**, **Next.js 16**, **React 19**, and **TypeScript**. Two independent tenant applications share a common design system, utilities, and service integrations — each with its own CSS framework, auth setup, and domain logic.

---

## Architecture Overview

```text
multi-tenancy-v2/
├── apps/
│   ├── dataroom/            # Virtual DataRoom SaaS (Tailwind + NextAuth + Appwrite)
│   ├── dataroom-e2e/        # Playwright E2E tests for dataroom
│   ├── cryptocurrency/      # Crypto Exchange SaaS (Bootstrap)
│   └── cryptocurrency-e2e/  # Playwright E2E tests for cryptocurrency
├── libs/
│   ├── ui/                  # @multi-tenancy/design-system — shared headless component library
│   ├── utils/               # @multi-tenancy/utils — shared utility functions
│   └── services/
│       └── appwrite/        # @multi-tenancy/appwrite — Appwrite BaaS integration
├── nx.json                  # Nx workspace configuration
├── tsconfig.base.json       # Base TypeScript config + path aliases
└── package.json             # Root workspace + scripts
```

### Key Design Principles

- **True multi-tenancy**: Each app is a fully isolated Next.js workspace — separate dependencies, separate CSS frameworks, shared business logic through libs.
- **Headless design system**: `libs/ui` exports unstyled primitives that apps style via their own CSS framework (Tailwind for dataroom, Bootstrap for cryptocurrency).
- **Strict dependency ownership**: Every dependency is declared in the workspace that uses it. No phantom deps hoisted from root.
- **Type-safe across the board**: `strict` TypeScript mode, Zod schemas for runtime validation, path aliases for clean cross-workspace imports.

---

## Applications

### Dataroom (`apps/dataroom`)

A secure virtual data room for file management and collaboration. Built with Tailwind CSS and a full authentication layer.

| Feature           | Tech                                           |
| ----------------- | ---------------------------------------------- |
| Framework         | Next.js 16 / React 19                          |
| Styling           | Tailwind CSS 3.4 + tailwindcss-animate 1.0.7   |
| Authentication    | NextAuth.js 4 (JWT, Google OAuth, Credentials) |
| Forms             | React Hook Form 7 + Zod 4                      |
| Backend           | Appwrite SDK 22                                |
| Component Library | `@multi-tenancy/design-system`                 |

**Routes:**

```text
app/
├── layout.tsx              # Root layout — wraps app in RootProvider, sets metadata
├── (auth)/
│   ├── layout.tsx          # Auth layout (split-screen: branded left 1/3, form right 2/3)
│   ├── sign-in/page.tsx    # Sign-in form
│   └── sign-up/page.tsx    # Sign-up form
├── (root)/
│   ├── layout.tsx          # App shell layout with NavigationBar
│   └── page.tsx            # Protected home dashboard
├── api/
│   └── auth/[...nextauth]/ # NextAuth API route
└── proxy.ts                # Route protection middleware (formerly middleware.ts)
                            #   — redirects unauthenticated users to /sign-in
                            #   — redirects authenticated users away from /sign-in|/sign-up
                            #   — skips API auth routes, Next.js internals, and favicons
```

**Provider Stack (`app/providers/RootProvider.tsx`):**

```text
RootProvider (outermost → innermost)
  ├── ThemeProvider      # Applies light/dark class to <html> element
  ├── ToastRenderer      # Bottom-right toast container
  ├── SessionProvider    # NextAuth JWT session (1-day max age)
  └── AuthProvider       # Custom context: user, isLoading, isAuthenticated,
                         #                 signUp(), signIn(), signOut(), getCurrentUser()
```

**Auth Forms (`app/core/auth/`):**

- `auth.schemas.ts` — Zod schemas: email + 8+ char password (uppercase + lowercase + number); sign-up adds `fullName` (2–50 chars) + password confirmation
- `AuthForm.tsx` — dual-mode form (sign-in / sign-up), React Hook Form + Zod, Google OAuth button, `PasswordField` with visibility toggle
- Auth state exposed via `useAuth()` hook; database integration stubbed in NextAuth route handler

**Environment Variables:**

Copy `.env.example` to `.env.local` before running:

```bash
NEXT_PUBLIC_APPWRITE_PROJECT_ID=
NEXT_PUBLIC_C_APPWRITE_DATABASE=
NEXT_PUBLIC_C_APPWRITE_BUCKET=
NEXT_PUBLIC_APPWRITE_PROJECT_NAME=dataroom
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
NEXT_APPWRITE_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
```

---

### Cryptocurrency (`apps/cryptocurrency`)

A cryptocurrency exchange/trading platform scaffold. Uses Bootstrap 5 — intentionally different from dataroom to demonstrate multi-CSS-framework support.

| Feature           | Tech                           |
| ----------------- | ------------------------------ |
| Framework         | Next.js 16 / React 19          |
| Styling           | Bootstrap 5.3                  |
| Component Library | `@multi-tenancy/design-system` |

Currently a working skeleton with toast, button, and theme provider patterns ready for business logic.

---

## Libraries

### Design System (`libs/ui`)

**Package:** `@multi-tenancy/design-system`

A headless component library supporting multiple CSS frameworks. Components are unstyled at the primitive level; tenants compose styles via their framework of choice.

**Import paths:**

```ts
import { Button, Dialog, Toast } from '@multi-tenancy/design-system';
import { Button } from '@multi-tenancy/design-system/primitives';
import { InfiniteScroll, FileUpload } from '@multi-tenancy/design-system/patterns';
import { useToast, useTheme } from '@multi-tenancy/design-system/hooks';
import { colors, spacing } from '@multi-tenancy/design-system/tokens';
import { tailwindAdapter } from '@multi-tenancy/design-system/adapters/tailwind';
import { ThemeProvider, useStyles, useTheme } from '@multi-tenancy/design-system/theme';
import { createDesignTokens } from '@multi-tenancy/design-system/tokens';
import { cn } from '@multi-tenancy/design-system';
```

**Primitives:**

| Component                 | Description                          |
| ------------------------- | ------------------------------------ |
| `Button`                  | Accessible button with loading state |
| `Input`                   | Text input field                     |
| `Dialog`                  | Modal dialog (Radix UI)              |
| `Sheet`                   | Slide-out panel (Radix UI)           |
| `Toast` / `ToastProvider` | Notifications (Radix UI)             |
| `Breadcrumbs`             | Navigation breadcrumbs               |
| `NavigationBar`           | Top navigation bar                   |

**Patterns:**

| Component                                                          | Description                                 |
| ------------------------------------------------------------------ | ------------------------------------------- |
| `InfiniteScroll`                                                   | Intersection Observer-based infinite scroll |
| `FileUpload`                                                       | Drag-and-drop file upload (react-dropzone)  |
| `FormField`, `FormControl`, `FormItem`, `FormLabel`, `FormMessage` | React Hook Form integration                 |
| `PasswordField`                                                    | Password input with visibility toggle       |

**Hooks:**

| Hook                  | Description                        |
| --------------------- | ---------------------------------- |
| `useToast()`          | Trigger and dismiss toasts         |
| `useTheme()`          | Access adapter + design tokens     |
| `useStyles()`         | Get the style adapter from context |
| `useInfiniteScroll()` | Attach infinite scroll behaviour   |
| `useFileUpload()`     | File selection and upload state    |
| `useOnline()`         | Detect online/offline status       |

**Dependencies (internal):**

| Package                           | Version | Purpose              |
| --------------------------------- | ------- | -------------------- |
| `@radix-ui/react-dialog`          | 1.1.15  | Dialog primitive     |
| `@radix-ui/react-dropdown-menu`   | 2.1.16  | Dropdown primitive   |
| `@radix-ui/react-label`           | 2.1.8   | Form label           |
| `@radix-ui/react-navigation-menu` | 1.2.14  | Navigation primitive |
| `@radix-ui/react-slot`            | 1.1.2   | Polymorphic slot     |
| `@radix-ui/react-toast`           | 1.2.15  | Toast primitive      |
| `clsx`                            | 2.1.0   | Class merging        |
| `react-dropzone`                  | 14.3.8  | File upload          |

**Peer dependencies:** `react ^18||^19`, `react-dom ^18||^19`, `react-hook-form ^7`

**Package config:** Dual CJS + ESM output, `"sideEffects": false` (fully tree-shakeable).

#### Quick Start

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

#### Custom Design Tokens

Tokens are organized into `colors`, `spacing`, and `typography` modules with factory functions for customization:

```tsx
import { ThemeProvider, createDesignTokens } from '@multi-tenancy/design-system';
import { tailwindAdapter } from '@multi-tenancy/design-system/adapters/tailwind';

const customTokens = createDesignTokens({
  colors: {
    primary: {
      500: '#0066cc',
      600: '#1578EB',
    },
  },
});

<ThemeProvider adapter={tailwindAdapter} tokens={customTokens}>
  {children}
</ThemeProvider>;
```

Built-in token categories: `colors` (gray, blue, green, red, yellow scales), `spacing`, `typography` (fontSizes, fontWeights, lineHeights). Compose with `CoreTokens`, `SemanticTokens`, `ComponentTokens`, `DesignTokens` types.

---

### Utils (`libs/utils`)

**Package:** `@multi-tenancy/utils`

Shared pure utility functions. No framework coupling.

```ts
import { formatDate, formatCurrency, truncate } from '@multi-tenancy/utils';
import { isValidEmail, isDefined, isEmpty } from '@multi-tenancy/utils';
import { hashPasswordBcrypt, verifyPassword } from '@multi-tenancy/utils';
```

**Formatters:**

| Function                                   | Description                                  |
| ------------------------------------------ | -------------------------------------------- |
| `formatDate(date, locale)`                 | Internationalized date formatting via `Intl` |
| `formatCurrency(amount, currency, locale)` | Currency formatting via `Intl.NumberFormat`  |
| `truncate(str, maxLength, suffix)`         | String truncation with custom suffix         |

**Validators:**

| Function              | Description                                |
| --------------------- | ------------------------------------------ |
| `isValidEmail(email)` | Regex-based email validation               |
| `isDefined<T>(value)` | Type guard: excludes null and undefined    |
| `isEmpty(str)`        | True if string is empty or whitespace-only |

**Password:**

| Function                         | Description                           |
| -------------------------------- | ------------------------------------- |
| `hashPasswordBcrypt(password)`   | bcrypt hash (10 salt rounds)          |
| `verifyPassword(password, hash)` | Compare plaintext against bcrypt hash |

Uses `bcryptjs ^3` (max 72 bytes per bcrypt spec enforced internally).

---

### Appwrite Service (`libs/services/appwrite`)

**Package:** `@multi-tenancy/appwrite`

Thin integration layer for [Appwrite](https://appwrite.io/) backend-as-a-service. Currently a stub — ready for full SDK wiring.

```ts
import { appwrite } from '@multi-tenancy/appwrite';
```

Extend this library to encapsulate Appwrite Databases, Storage, Auth, and Functions calls — then consume via the dataroom app.

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Install

```bash
npm install
```

### Development

```bash
# Start dataroom dev server
npm run dev:dataroom

# Start cryptocurrency dev server
npm run dev:cryptocurrency
```

Apps run independently. Each starts on its own port (configured by Next.js).

### Production Builds

```bash
# Build a single app
npm run build:dataroom
npm run build:cryptocurrency

# Build all libraries
npm run build:libs

# Build everything
npm run build:all
```

---

## Manage Dependencies

Each dependency must be declared in the workspace that uses it, not the root.

```bash
# Add a runtime dependency to a specific app
npm install <package> --workspace=apps/dataroom

# Add a dev dependency to a specific app
npm install <package> --save-dev --workspace=apps/dataroom

# Add a dependency to a specific lib
npm install <package> --workspace=libs/ui

# Add a shared dev dependency (Nx, TypeScript, ESLint, etc.)
npm install <package> --save-dev
```

---

## Add New Projects

Use Nx generators to scaffold new apps or libraries with the correct config pre-applied.

```bash
# Generate a new Next.js app (defaults: Tailwind + ESLint)
npx nx g @nx/next:app <app-name>

# Generate a new JS/TS library (defaults: SWC bundler + Jest + ESLint)
npx nx g @nx/js:library <lib-name>

# Generate a new React component library
npx nx g @nx/react:library <lib-name>
```

### Add a component to an existing library

```bash
npx nx g @nx/next:component libs/ui/src/lib/<component-name>
```

### View project details

```bash
npx nx show project dataroom --web
```

---

## Testing

```bash
# Run all unit tests
npm test

# Run tests for libraries only
npm run test:libs

# Run tests for a single project
npx nx test dataroom
npx nx test ui

# Run E2E tests (Playwright)
npx nx e2e dataroom-e2e
npx nx e2e cryptocurrency-e2e
```

E2E test suites are in `apps/dataroom-e2e` and `apps/cryptocurrency-e2e`.

---

## Code Quality

```bash
# Lint all projects
npm run lint

# TypeScript type checking across all projects
npm run typecheck

# Format with Prettier
npx prettier --write .
```

---

## Nx Commands

```bash
# Visualise the dependency graph
npx nx graph

# Run a target on a specific project
npx nx build dataroom
npx nx dev dataroom
npx nx lint ui
npx nx test utils

# Run a target across all projects with a tag
npx nx run-many --target=build --projects=tag:type:lib

# Run only affected projects (useful in CI)
npx nx affected --target=build
npx nx affected --target=test
npx nx affected:graph

# Clear Nx cache and daemon (use after version upgrades or cache issues)
npx nx reset
```

**Caching:** `build` and `lint` targets are cached by default (configured in `nx.json`). Nx only re-runs tasks when inputs change.

---

## TypeScript Path Aliases

Defined in [`tsconfig.base.json`](tsconfig.base.json) and available across all workspaces:

```json
{
  "@multi-tenancy/design-system/*": ["libs/ui/src/*"],
  "@multi-tenancy/utils": ["libs/utils/src/index.ts"]
}
```

The `customConditions: ["@multi-tenancy/source"]` field in `tsconfig.base.json` enables source-level imports during development (bypasses compiled output via the `exports` map in each lib's `package.json`).

---

## Tech Stack

| Layer                    | Technology                                   |
| ------------------------ | -------------------------------------------- |
| Monorepo                 | Nx 22.5.1                                    |
| Framework                | Next.js 16 / React 19                        |
| Language                 | TypeScript 5.9 (strict)                      |
| Styling — Dataroom       | Tailwind CSS 3.4 + tailwindcss-animate 1.0.7 |
| Styling — Cryptocurrency | Bootstrap 5.3                                |
| Auth                     | NextAuth.js 4 (JWT, OAuth)                   |
| Forms                    | React Hook Form 7 + Zod 4                    |
| UI Primitives            | Radix UI                                     |
| Backend                  | Appwrite SDK 22                              |
| Unit Testing             | Jest 30 + Testing Library                    |
| E2E Testing              | Playwright 1.36                              |
| Linting                  | ESLint 9 + typescript-eslint 8               |
| Formatting               | Prettier 3.6                                 |
| Compilation              | SWC                                          |

---

## Dependency Ownership

Each dependency is declared only in the workspace that uses it — no phantom dependencies via hoisting.

| Package                                                                           | Owner                             |
| --------------------------------------------------------------------------------- | --------------------------------- |
| `tailwindcss`, `autoprefixer`, `postcss`, `tailwind-merge`, `tailwindcss-animate` | `apps/dataroom` (devDependencies) |
| `bootstrap`                                                                       | `apps/cryptocurrency`             |
| `next`, `react`, `react-dom`                                                      | Each app independently            |
| `next-auth`, `react-hook-form`, `zod`, `appwrite`                                 | `apps/dataroom`                   |
| `@radix-ui/*`, `react-dropzone`, `clsx`                                           | `libs/ui`                         |
| `bcryptjs`                                                                        | `libs/utils`                      |
| Nx, TypeScript, Jest, ESLint, Prettier, SWC                                       | Root `devDependencies`            |

---

## Project Structure — Full

```text
multi-tenancy-v2/
├── apps/
│   ├── dataroom/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── sign-in/page.tsx
│   │   │   │   └── sign-up/page.tsx
│   │   │   ├── (root)/
│   │   │   │   └── page.tsx
│   │   │   ├── api/auth/[...nextauth]/route.ts
│   │   │   ├── components/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── NavigationBar.tsx
│   │   │   │   └── Toast.tsx
│   │   │   ├── core/auth/
│   │   │   │   ├── AuthContext.tsx
│   │   │   │   ├── AuthForm.tsx
│   │   │   │   └── auth.schemas.ts
│   │   │   └── providers/
│   │   │       ├── RootProvider.tsx
│   │   │       ├── ThemeProvider.tsx
│   │   │       └── ToastRenderer.tsx
│   │   ├── proxy.ts
│   │   ├── package.json
│   │   ├── tailwind.config.js
│   │   └── tsconfig.json
│   ├── dataroom-e2e/
│   ├── cryptocurrency/
│   │   ├── app/
│   │   │   ├── page.tsx
│   │   │   ├── components/
│   │   │   └── providers/
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── cryptocurrency-e2e/
├── libs/
│   ├── ui/
│   │   ├── src/
│   │   │   ├── primitives/
│   │   │   │   ├── Button/
│   │   │   │   ├── Dialog/
│   │   │   │   ├── Input/
│   │   │   │   ├── Sheet/
│   │   │   │   ├── Toast/
│   │   │   │   ├── Breadcrumbs/
│   │   │   │   └── NavigationBar/
│   │   │   ├── patterns/
│   │   │   │   ├── FileUpload/
│   │   │   │   ├── InfiniteScroll/
│   │   │   │   └── Form/
│   │   │   ├── hooks/
│   │   │   ├── tokens/
│   │   │   └── utils/
│   │   └── package.json
│   ├── utils/
│   │   ├── src/helpers/
│   │   │   ├── formatters.ts
│   │   │   ├── validators.ts
│   │   │   └── password.ts
│   │   └── package.json
│   └── services/
│       └── appwrite/
│           ├── src/index.ts
│           └── package.json
├── nx.json
├── tsconfig.base.json
└── package.json
```

---

## Contributing

1. Branch from `main`.
2. Install dependencies: `npm install`.
3. Run `npm run typecheck` and `npm run lint` before pushing.
4. Write or update tests for any changed logic.
5. Open a PR against `main`.

---

## License

MIT
