# Multi tenancy - Version2

## Project Structure

```
multi-tenancy-v2/
├── apps/
│   ├── dataroom/          # Main Next.js application
│   └── dataroom-e2e/      # E2E tests (Playwright)
├── libs/
│   ├── types/                      # Shared TypeScript types
│   ├── utils/                      # Utility functions
│   ├── ui/                         # Shared React components
│   └── data-access/                # API clients and data hooks
└── dist/                           # Build outputs
```

## Shared Libraries

This monorepo includes four buildable shared libraries:

| Library | Package Name | Description |
|---------|--------------|-------------|
| **types** | `@multi-tenancy/types` | Shared TypeScript types (User, Tenant, ApiResponse) |
| **utils** | `@multi-tenancy/utils` | Utility functions (formatters, validators) |
| **ui** | `@multi-tenancy/design-system` | Shared React components (Button, etc.) |
| **data-access** | `@multi-tenancy/data-access` | API client and data fetching hooks |

### Using Libraries in Your App

```typescript
// Import types
import type { User, Tenant, ApiResponse } from '@multi-tenancy/types';

// Import utilities
import { formatDate, formatCurrency, isValidEmail } from '@multi-tenancy/utils';

// Import UI components
import { Button } from '@multi-tenancy/design-system';

// Import data access hooks
import { useFetch, ApiClient, initializeApiClient } from '@multi-tenancy/data-access';
```

### TypeScript Configuration

The monorepo uses TypeScript path aliases to resolve library imports:

- **Development**: Imports resolve to source files (`libs/*/src/index.ts`) via tsconfig paths
- **Production build**: Imports resolve to built files (`dist/`) via package.json exports

Each library's `package.json` includes a custom export condition (`@multi-tenancy/source`) that points to source files. This is configured in `tsconfig.base.json` via `customConditions`.

**Important**: When creating new apps, you must include the library path aliases in the app's `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@multi-tenancy/types": ["../../libs/types/src/index.ts"],
      "@multi-tenancy/utils": ["../../libs/utils/src/index.ts"],
      "@multi-tenancy/design-system": ["../../libs/ui/src/index.ts"],
      "@multi-tenancy/data-access": ["../../libs/data-access/src/index.ts"]
    }
  }
}
```

This is required because TypeScript `paths` don't merge when extending configs - they override completely.

### Library Dependency Graph

```
types (no dependencies)
  ├── utils (depends on types)
  ├── ui (depends on types)
  └── data-access (depends on types, utils)
```

## Run tasks

To run the dev server for your app, use:

```sh
npx nx dev dataroom
```

To create a production bundle:

```sh
npx nx build dataroom
```

### Build Libraries

Build all libraries:

```sh
npm run build:libs
# or
npx nx run-many --target=build --projects=tag:type:lib
```

Build a specific library:

```sh
npx nx build types
npx nx build utils
npx nx build ui
npx nx build data-access
```

### Run Tests

This project uses **Jest** with **React Testing Library** for unit testing.

Run all tests:

```sh
npm run test
```

Run library tests only:

```sh
npm run test:libs
```

Run tests for a specific library:

```sh
npx nx test design-system
npx nx test utils
npx nx test types
npx nx test data-access
```

#### Testing Stack

| Package | Purpose |
|---------|---------|
| `jest` | Test runner |
| `@swc/jest` | Fast TypeScript/JSX transformation |
| `jest-environment-jsdom` | DOM environment for React components |
| `@testing-library/react` | React component testing utilities |
| `@testing-library/user-event` | User interaction simulation |
| `@testing-library/jest-dom` | Custom Jest matchers for DOM assertions |

#### Writing Tests

Test files should be placed next to the source files with `.spec.ts` or `.spec.tsx` extension:

```
libs/ui/src/components/Button/
├── Button.tsx
├── Button.spec.tsx    # Test file
└── index.ts
```

Example test:

```tsx
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('should call onClick when clicked', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    await userEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Lint and Type Check

```sh
npm run lint
npm run typecheck
```

To see all available targets to run for a project, run:

```sh
npx nx show project dataroom
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/next:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/react:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add UI library

```bash
# Generate UI lib
nx g @nx/next:library ui

# Add a component
nx g @nx/next:component ui/src/lib/button
```

## View project details


```bash
nx show project @multi-tenancy/dataroom --web
```

## Run affected commands
```bash
# see what's been affected by changes
nx affected:graph

# run tests for current changes
nx affected:test

# run e2e tests for current changes
nx affected:e2e
```

## Set up CI!

### Step 1

To connect to Nx Cloud, run the following command:

```sh
npx nx connect
```

Connecting to Nx Cloud ensures a [fast and scalable CI](https://nx.dev/ci/intro/why-nx-cloud?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) pipeline. It includes features such as:

- [Remote caching](https://nx.dev/ci/features/remote-cache?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task distribution across multiple machines](https://nx.dev/ci/features/distribute-task-execution?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Automated e2e test splitting](https://nx.dev/ci/features/split-e2e-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task flakiness detection and rerunning](https://nx.dev/ci/features/flaky-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

### Step 2

Use the following command to configure a CI workflow for your workspace:

```sh
npx nx g ci-workflow
```

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)