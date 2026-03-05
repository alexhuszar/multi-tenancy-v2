<!--
SYNC IMPACT REPORT
Version change: 1.0.0 → 1.1.0
Modified principles:
  - V. Library-First Services: replaced DeFiYields.dev / libs/services/defiyields/
    with De.Fi / libs/services/defi-risk/ (DeFiYields.dev has no public API —
    discovered in research phase 2026-03-04); added Alternative.me /
    libs/services/sentiment/ as a 4th designated integration for fear/greed data.
Added sections: None
Removed sections: None
Templates requiring updates:
  - .specify/templates/plan-template.md  ✅ reviewed — no changes required
  - .specify/templates/spec-template.md  ✅ reviewed — no changes required
  - .specify/templates/tasks-template.md ✅ reviewed — no changes required
  - specs/001-stablecoin-dashboard/tasks.md ⚠️ pending — T002/T004 scaffold paths
    and T011/T026 service paths must be verified against updated lib names
Follow-up TODOs:
  - None.
-->

# Multi-Tenancy v2 Constitution

## Core Principles

### I. Clean Code

Every module MUST be readable, maintainable, and self-documenting. Functions MUST have
a single responsibility and MUST NOT exceed 40 logical lines. Shared logic MUST be
extracted into named utilities rather than duplicated inline. Commented-out code MUST
NOT be committed. Variable and function names MUST convey intent without requiring
supplemental comments.

**Rationale**: Readable code reduces cognitive load, accelerates onboarding, and
prevents silent regressions across a multi-app monorepo.

### II. Simple UX

Interfaces MUST present only the information required for the current user task.
Default views MUST be immediately actionable without configuration steps. Progressive
disclosure MUST be used for advanced filters or secondary data. User-facing error
messages MUST be plain-language and actionable. Loading states MUST be communicated
clearly; skeleton screens or spinners MUST appear for every async data fetch.

**Rationale**: A dashboard ranking stablecoin yield risk must be instantly
comprehensible — cognitive overload undermines trust in the data and drives users away.

### III. Responsive Design

All UI components MUST be mobile-first and MUST render correctly at the following
breakpoints: 320 px, 768 px, 1024 px, and 1440 px. The shared design system
(`@multi-tenancy/design-system`) MUST be the sole source of spacing, colour, and
typography tokens. Custom one-off styles MUST be justified and documented in the
relevant component file. Tables displaying APY, TVL, and risk-score data MUST
collapse to card-based layouts on small viewports.

**Rationale**: DeFi users access dashboards across devices; a broken mobile layout
erodes credibility and reduces audience reach.

### IV. Minimal Dependencies

Every new third-party package MUST be justified with a written rationale before
inclusion (in the relevant `plan.md` Complexity Tracking table). Packages MUST NOT
be added when the same result is achievable with native browser APIs, Node built-ins,
or existing workspace libraries. The `apps/cryptocurrency` package MUST NOT duplicate
libraries already provided by the shared workspace (`libs/ui`, `libs/utils`,
`libs/services`). API integration code MUST NOT leak out of `libs/services` into
app-layer components or pages.

**Rationale**: Lean dependency graphs reduce attack surface, bundle size, and long-term
maintenance cost across all workspace packages.

### V. Library-First Services

All external data integrations MUST be implemented as independent service modules
under `libs/services/`. The four designated integrations are:

- **De.Fi** (`libs/services/defi-risk/`) — smart contract audit risk scores
- **DeFiLlama** (`libs/services/defillama/`) — yield pools, TVL, stablecoin list
- **CoinGecko** (`libs/services/coingecko/`) — live price feeds and price history
- **Alternative.me** (`libs/services/sentiment/`) — Fear & Greed index

Each service module MUST expose a typed, async public interface and MUST NOT import
from any `apps/` directory. Components and pages MUST call service modules only —
direct `fetch` calls to external APIs inside component files are PROHIBITED. Service
modules MUST handle rate limiting, error normalisation, and response caching
internally.

**Rationale**: Centralising integrations enables independent testing, cross-app reuse,
and a clean separation between data access and presentation concerns.

## Technology Stack & Integration Constraints

- **Target app**: `apps/cryptocurrency` — Next.js 16 / React 19, Bootstrap styling
- **Design system**: `@multi-tenancy/design-system` (libs/ui) — primitives and
  patterns MUST be evaluated and used before writing any custom component
- **Service layer**: `libs/services/` — one subdirectory per external API (see
  Principle V above)
- **Data displayed**: APY, TVL, stablecoin risk scores, live price feeds
- **Prohibited without constitution amendment**: new ORM, client-side state management
  library (e.g. Redux, Zustand), or CSS-in-JS framework
- **Environment variables**: all required vars MUST be documented in a root-level
  `.env.example`; secrets MUST NOT be committed to the repository

## Development Workflow

- New features MUST have a specification (`/speckit.specify`) before implementation
- Implementation MUST follow the plan produced by `/speckit.plan`
- Tasks MUST be generated via `/speckit.tasks` and executed via `/speckit.implement`
- The **Constitution Check** section of every `plan.md` MUST enumerate which
  principles apply and flag any violations with written justification
- PRs MUST NOT be merged when a principle violation is unjustified or undocumented
- Service modules in `libs/services/` MUST be independently testable without running
  the Next.js application
- Each service module MUST export a typed interface from its `index.ts` so consuming
  code never imports internal implementation files directly

## Governance

This constitution supersedes any ad-hoc decisions made at implementation time.
Amendments MUST be submitted as a PR that:

1. Increments the version following the policy below
2. Provides a written justification for the change
3. Updates this file's Sync Impact Report comment with the new version diff

**Versioning policy**:

- **MAJOR**: removal or backward-incompatible redefinition of a principle
- **MINOR**: new principle or section added, or material expansion of existing guidance
- **PATCH**: wording clarification, typo fix, or non-semantic refinement

All PRs and code reviews MUST verify compliance with each Core Principle. Complexity
that exceeds what a principle permits MUST be justified in the `Complexity Tracking`
table of the relevant `plan.md`.

**Version**: 1.1.0 | **Ratified**: 2026-03-04 | **Last Amended**: 2026-03-05
