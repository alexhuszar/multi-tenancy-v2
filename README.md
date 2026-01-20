# MultiTenancyV2

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/nx-api/next?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

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
| **types** | `@multi-tenancy-v2/types` | Shared TypeScript types (User, Tenant, ApiResponse) |
| **utils** | `@multi-tenancy-v2/utils` | Utility functions (formatters, validators) |
| **ui** | `@multi-tenancy-v2/ui` | Shared React components (Button, etc.) |
| **data-access** | `@multi-tenancy-v2/data-access` | API client and data fetching hooks |

### Using Libraries in Your App

```typescript
// Import types
import type { User, Tenant, ApiResponse } from '@multi-tenancy-v2/types';

// Import utilities
import { formatDate, formatCurrency, isValidEmail } from '@multi-tenancy-v2/utils';

// Import UI components
import { Button } from '@multi-tenancy-v2/ui';

// Import data access hooks
import { useFetch, ApiClient, initializeApiClient } from '@multi-tenancy-v2/data-access';
```

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

Run all tests:

```sh
npm run test
```

Run library tests only:

```sh
npm run test:libs
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


## ▶️ View project details
nx show project @multi-tenancy-v2/dataroom --web


## ▶️ Run affected commands
# see what's been affected by changes
nx affected:graph

# run tests for current changes
nx affected:test

# run e2e tests for current changes
nx affected:e2e




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

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/nx-api/next?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
