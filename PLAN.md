# Plan: Add Buildable Libraries to Nx Monorepo

## Overview
Create a `libs/` directory structure with 4 buildable library types that can be consumed by apps via TypeScript path aliases (development) and as pre-built packages (production/distribution).

## Libraries to Create
1. **@multi-tenancy-v2/types** - Shared TypeScript types and interfaces
2. **@multi-tenancy-v2/utils** - Utility functions and helpers
3. **@multi-tenancy-v2/ui** - Shared React components
4. **@multi-tenancy-v2/data-access** - API clients and data fetching hooks

## Library Dependency Graph
```
types (no dependencies)
  ├── utils (depends on types)
  ├── ui (depends on types)
  └── data-access (depends on types, utils)
```

## Folder Structure
```
libs/
├── types/
│   ├── src/
│   │   ├── index.ts
│   │   └── models/
│   │       ├── user.ts
│   │       ├── tenant.ts
│   │       └── api.ts
│   ├── package.json
│   ├── project.json
│   ├── tsconfig.json
│   ├── tsconfig.lib.json
│   └── eslint.config.mjs
├── utils/
│   ├── src/
│   │   ├── index.ts
│   │   └── helpers/
│   │       ├── formatters.ts
│   │       └── validators.ts
│   ├── package.json
│   ├── project.json
│   ├── tsconfig.json
│   ├── tsconfig.lib.json
│   ├── tsconfig.spec.json
│   ├── jest.config.ts
│   ├── eslint.config.mjs
│   └── .swcrc
├── ui/
│   ├── src/
│   │   ├── index.ts
│   │   └── components/
│   │       └── Button/
│   │           ├── Button.tsx
│   │           └── index.ts
│   ├── package.json
│   ├── project.json
│   ├── tsconfig.json
│   ├── tsconfig.lib.json
│   ├── tsconfig.spec.json
│   ├── jest.config.ts
│   ├── eslint.config.mjs
│   └── .swcrc
└── data-access/
    ├── src/
    │   ├── index.ts
    │   ├── clients/
    │   │   └── apiClient.ts
    │   └── hooks/
    │       └── useFetch.ts
    ├── package.json
    ├── project.json
    ├── tsconfig.json
    ├── tsconfig.lib.json
    ├── tsconfig.spec.json
    ├── jest.config.ts
    ├── eslint.config.mjs
    └── .swcrc
```

## Implementation Steps

### Phase 1: Root Configuration Updates

**1. Update `package.json`**
- Add `"libs/*"` to workspaces array
- Add build scripts for libraries

**2. Update `tsconfig.base.json`**
- Add `baseUrl: "."`
- Add path aliases:
  ```json
  "paths": {
    "@multi-tenancy-v2/ui": ["libs/ui/src/index.ts"],
    "@multi-tenancy-v2/utils": ["libs/utils/src/index.ts"],
    "@multi-tenancy-v2/data-access": ["libs/data-access/src/index.ts"],
    "@multi-tenancy-v2/types": ["libs/types/src/index.ts"]
  }
  ```

**3. Update root `tsconfig.json`**
- Add references to all 4 libraries

**4. Update `nx.json`**
- Add `build` target defaults with `dependsOn: ["^build"]`
- Add generator defaults for `@nx/js` and `@nx/react`

### Phase 2: Create Types Library
- Create `libs/types/` with package.json, project.json, tsconfig files
- Add initial type definitions (User, Tenant, ApiResponse)
- No dependencies on other libs

### Phase 3: Create Utils Library
- Create `libs/utils/` with full config (including jest, swcrc)
- Add formatters and validators
- Reference types library in tsconfig

### Phase 4: Create UI Library
- Create `libs/ui/` with React-specific config (jsx support)
- Add Button component as starter
- Reference types library in tsconfig

### Phase 5: Create Data Access Library
- Create `libs/data-access/` with React hooks support
- Add ApiClient and useFetch hook
- Reference types and utils libraries in tsconfig

### Phase 6: App Integration
- Update `apps/multi-tenancy-v2/tsconfig.json` with library paths and references
- Verify app can import from libraries

## Key Configuration Details

### Each Library's project.json
```json
{
  "targets": {
    "build": {
      "executor": "@nx/js:swc",
      "options": {
        "outputPath": "dist/libs/{name}",
        "main": "libs/{name}/src/index.ts",
        "tsConfig": "libs/{name}/tsconfig.lib.json"
      }
    }
  },
  "tags": ["scope:shared", "type:lib", "type:{name}"]
}
```

### Each Library's package.json exports
```json
{
  "exports": {
    ".": {
      "import": { "types": "./dist/index.d.ts", "default": "./dist/index.js" },
      "require": { "types": "./dist/index.d.cts", "default": "./dist/index.cjs" }
    }
  }
}
```

## Usage After Implementation

### Development (path aliases)
```typescript
import { Button } from '@multi-tenancy-v2/ui';
import { formatDate } from '@multi-tenancy-v2/utils';
import { useFetch } from '@multi-tenancy-v2/data-access';
import type { User } from '@multi-tenancy-v2/types';
```

### Build Commands
```bash
# Build all libraries
nx run-many --target=build --projects=tag:type:lib

# Build specific library
nx build ui

# Build app (auto-builds lib dependencies)
nx build multi-tenancy-v2

# Watch mode for library development
nx watch --projects=ui,utils,data-access,types -- nx build $NX_PROJECT_NAME
```

## Verification Steps
1. Run `nx build types` - should succeed
2. Run `nx build utils` - should succeed (builds types first)
3. Run `nx build ui` - should succeed
4. Run `nx build data-access` - should succeed
5. Run `nx build multi-tenancy-v2` - should succeed with libs
6. Run `nx graph` - verify dependency graph is correct
7. Run `nx dev multi-tenancy-v2` - verify imports work in development

## Files to Modify
- `package.json` - Add libs/* workspace, build scripts
- `tsconfig.base.json` - Add baseUrl and paths
- `tsconfig.json` - Add library references
- `nx.json` - Add target defaults
- `apps/multi-tenancy-v2/tsconfig.json` - Add library paths

## Files to Create
- All files under `libs/types/`, `libs/utils/`, `libs/ui/`, `libs/data-access/`
