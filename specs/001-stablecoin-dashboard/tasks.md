---

description: "Task list for Stablecoin Dashboard implementation"
---

# Tasks: Stablecoin Dashboard (001)

**Input**: Design documents from `/specs/001-stablecoin-dashboard/`
**Prerequisites**: plan.md ✅ spec.md ✅ research.md ✅ data-model.md ✅ contracts/ ✅ quickstart.md ✅

**Tests**: Not requested — no test tasks generated. Unit tests may be added post-implementation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story?] Description with file path`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- All file paths are relative to repository root

---

## Phase 1: Setup

**Purpose**: Library scaffolding, dependency additions, and tsconfig wiring. Must complete before any service or component work.

- [ ] T001 Add `recharts` dependency to `apps/cryptocurrency/package.json` (version `^2`)
- [ ] T002 [P] Scaffold `libs/services/defillama/` package: create `package.json` (name `@multi-tenancy/defillama`, type module, exports map mirroring appwrite pattern), `tsconfig.json`, `tsconfig.lib.json`, `project.json` (Nx config), and empty `src/index.ts`
- [ ] T003 [P] Scaffold `libs/services/coingecko/` package: create `package.json` (name `@multi-tenancy/coingecko`), `tsconfig.json`, `tsconfig.lib.json`, `project.json` (Nx config), and empty `src/index.ts`
- [ ] T004 [P] Scaffold two new service packages (constitution v1.1.0 — one lib per external API): (a) `libs/services/defi-risk/` with `package.json` (name `@multi-tenancy/defi-risk`), `tsconfig.json`, `tsconfig.lib.json`, `project.json`, empty `src/index.ts`; (b) `libs/services/sentiment/` with `package.json` (name `@multi-tenancy/sentiment`), `tsconfig.json`, `tsconfig.lib.json`, `project.json`, empty `src/index.ts`
- [ ] T005 Update `apps/cryptocurrency/tsconfig.json`: add path aliases for `@multi-tenancy/defillama`, `@multi-tenancy/coingecko`, `@multi-tenancy/defi-risk`, `@multi-tenancy/sentiment` (each → `libs/services/{name}/src/index.ts`) and add all four libs to `references`
- [ ] T035 Create `apps/cryptocurrency/.env.example` documenting all required and optional env vars: `DEFI_RISK_API_KEY` (De.Fi GraphQL — obtain from info@de.fi; app degrades gracefully if absent), `COINGECKO_API_KEY` (optional Demo key for higher rate limits — free registration at coingecko.com/api)

**Checkpoint**: `npm install` succeeds; `npx nx graph` shows the four new libs; `.env.example` committed

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared types and core service implementations that ALL user stories depend on. No user story work can begin until this phase is complete.

**⚠️ CRITICAL**: US1 requires DeFiLlama + CoinGecko + DefiRisk services. US2 requires CoinGecko price history. Both require SectionError. Complete this phase fully before Phase 3.

- [ ] T006 [P] Define DeFiLlama TypeScript types in `libs/services/defillama/src/defillama.types.ts`: `LlamaPool` (poolId, stablecoinSymbol, protocol, chain, symbol, apy, apyBase, apyReward, tvlUsd, ilRisk, exposure, stablecoin, lastUpdated), `LlamaStablecoin` (id, name, symbol, geckoId, pegType, circulating, price), `PoolHistoryPoint` (timestamp, tvlUsd, apy, apyBase, apyReward)
- [ ] T007 [P] Define CoinGecko TypeScript types in `libs/services/coingecko/src/coingecko.types.ts`: `CoinGeckoMarket` (id, symbol, name, image, currentPrice, priceChange24h, priceChangePercentage24h, marketCap, totalVolume, lastUpdated), `PricePoint` (timestamp, price, volume)
- [ ] T008 [P] Define types across two libs (per constitution v1.1.0 split): (a) `libs/services/defi-risk/src/defi-risk.types.ts` — `RiskBreakdown` (overall, smartContract, liquidity, pegStability); (b) `libs/services/sentiment/src/sentiment.types.ts` — `FearGreedData` (value, classification as `FearGreedLabel`, timestamp, timeUntilUpdate), `FearGreedLabel` union type, `TrendDirection` union type, `MarketSentiment` (fearGreedValue, fearGreedLabel, trend, trendBasis, updatedAt)
- [ ] T009 Implement `DeFiLlamaService` class in `libs/services/defillama/src/defillama.service.ts`: `getStablecoinPools(): Promise<LlamaPool[]>` (fetches `https://yields.llama.fi/pools`, filters `stablecoin: true` and `tvlUsd >= 100_000`, excludes negative APY); `getStablecoins(): Promise<LlamaStablecoin[]>` (fetches `https://stablecoins.llama.fi/stablecoins?includePrices=true`); each `fetch()` call MUST include `{ next: { revalidate: 900 } }` — the service owns its own caching (constitution Principle V); export public interface from `src/index.ts` (depends on T006)
- [ ] T010 Implement `CoinGeckoService.getStablecoinMarkets()` in `libs/services/coingecko/src/coingecko.service.ts`: fetches `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=stablecoins&per_page=100`; respects optional `COINGECKO_API_KEY` env var via `x-cg-demo-api-key` header; the `fetch()` call MUST include `{ next: { revalidate: 300 } }` — the service owns its own caching (constitution Principle V); export from `src/index.ts` (depends on T007)
- [ ] T011 Implement `DefiRiskService.getRiskScores(symbols: string[])` in `libs/services/defi-risk/src/defi-risk.service.ts`: POSTs GraphQL query to `https://public-api.de.fi/graphql` with `X-Api-Key` from `DEFI_RISK_API_KEY` env var; returns `Map<string, RiskBreakdown>`; returns empty Map (not throws) when API key is absent or service unavailable; since `fetch` revalidation does not apply to POST requests, cache the result using `import { unstable_cache } from 'next/cache'` wrapping the GraphQL call with `revalidate: 900` — the service MUST own its own caching (constitution Principle V); export `DefiRiskService` and `RiskBreakdown` type from `libs/services/defi-risk/src/index.ts` (depends on T008)
- [ ] T012 [P] Create `SectionError` component in `apps/cryptocurrency/app/components/SectionError.tsx`: props `{ message: string; onRetry?: () => void }`; renders a Bootstrap alert (`alert alert-warning`) with message and optional "Retry" button; used by all sections for FR-010 independent degradation
- [ ] T036 [P] Create skeleton loading components in `apps/cryptocurrency/app/components/Skeleton.tsx` (FR-009 — constitution Principle II MUST): export `SkeletonRow` (a `<tr>` with Bootstrap placeholder cells, props `{ columns: number }`) and `SkeletonCard` (a `div.card` with animated placeholder lines); used inside `Suspense` fallbacks in T018 (list page) and T024 (detail page)

**Checkpoint**: `npm run build:libs` succeeds for all four new libs; `DeFiLlamaService.getStablecoinPools()` returns typed data in a Node test script

---

## Phase 3: User Story 1 — Browse Stablecoin List (Priority: P1) 🎯 MVP

**Goal**: Home page shows a ranked list of stablecoins with best APY, total TVL, current price, and risk score. Default sort: risk score ascending. Responsive table → card on mobile.

**Independent Test**: Navigate to `http://localhost:3001/` — see a populated list of stablecoins sorted safest-first with all columns visible; click a column header to re-sort; resize to 320 px and verify card layout appears.

### Implementation for User Story 1

- [ ] T013 [P] [US1] Create `RiskScoreBadge` component in `apps/cryptocurrency/app/components/RiskScoreBadge.tsx`: props `{ score: number | null }`; renders a Bootstrap badge with colour-coding (green 0–33, yellow 34–66, red 67–100); shows "N/A" when score is null
- [ ] T014 [P] [US1] Create `SortableHeader` client component in `apps/cryptocurrency/app/components/SortableHeader.tsx`: props `{ column: string; currentSort: SortState; onSort: (col: string) => void }`; renders a `<th>` with ascending/descending chevron icons; manages sort state client-side
- [ ] T015 [US1] Create `StablecoinCard` component in `apps/cryptocurrency/app/components/StablecoinCard.tsx`: mobile card layout for one stablecoin row; shows logo, name, symbol, price, APY, TVL, RiskScoreBadge; entire card is a clickable link to `/coin/[symbol]`; uses Bootstrap `card` classes (depends on T013)
- [ ] T016 [US1] Create `StablecoinTable` component in `apps/cryptocurrency/app/components/StablecoinTable.tsx`: receives `stablecoins: Stablecoin[]`; renders Bootstrap `table table-hover` on ≥768 px; renders `StablecoinCard` list on <768 px (CSS `d-none d-md-table` / `d-md-none` pattern); includes `SortableHeader` for APY, TVL, Risk Score columns; each row links to `/coin/[symbol]` (depends on T013, T014, T015)
- [ ] T017 [US1] Create stablecoin data aggregator in `apps/cryptocurrency/app/lib/stablecoin-aggregator.ts`: `aggregateStablecoins(pools: LlamaPool[], markets: CoinGeckoMarket[], riskScores: Map<string, RiskBreakdown>): Stablecoin[]`; computes `bestApy` (max across pools), `totalTvl` (sum across pools), `poolCount`, `trend` from 7-day price slope field; normalises symbol casing; sorts result by `riskScore` ascending (nulls last)
- [ ] T018 [US1] Update `apps/cryptocurrency/app/page.tsx`: server component; call `DeFiLlamaService`, `CoinGeckoService`, `DefiRiskService` with Next.js `fetch` cache (`revalidate: 300` for prices, `revalidate: 900` for pools/risk); pass aggregated `Stablecoin[]` to `StablecoinTable`; render `SectionError` per data section when a service throws; include `Suspense` with skeleton placeholder (depends on T009, T010, T011, T016, T017)

**Checkpoint**: US1 fully functional and independently testable — list loads, sorts, and collapses to cards on mobile

---

## Phase 4: User Story 2 — Stablecoin Detail Page (Priority: P2)

**Goal**: Clicking a coin navigates to `/coin/[symbol]`. Detail page shows metric cards (price, best APY, total TVL, risk score), an interactive price chart with 7D/30D/90D time ranges, and a full pool breakdown table.

**Independent Test**: Navigate to `http://localhost:3001/coin/USDC` — see metric cards, a line chart with time-range buttons, and a pool table. Click 30D → chart updates. Navigate to `/coin/FAKECOIN` → see "not found" page.

### Implementation for User Story 2

- [ ] T019 [US2] Implement `CoinGeckoService.getPriceHistory(geckoId: string, days: 7 | 30 | 90)` in `libs/services/coingecko/src/coingecko.service.ts`: fetches `/coins/{geckoId}/market_chart?vs_currency=usd&days={days}&interval=daily`; returns `PricePoint[]` with timestamp, price, volume; update `src/index.ts` export (depends on T010)
- [ ] T020 [P] [US2] Create `MetricCard` component in `apps/cryptocurrency/app/components/MetricCard.tsx`: props `{ label: string; value: string; subValue?: string; isError?: boolean; onRetry?: () => void }`; Bootstrap `card` with label/value layout; renders `SectionError` inline when `isError` is true (depends on T012)
- [ ] T021 [P] [US2] Create `YieldPoolsTable` component in `apps/cryptocurrency/app/components/YieldPoolsTable.tsx`: props `{ pools: YieldPool[]; isError?: boolean; onRetry?: () => void }`; Bootstrap `table table-sm` with columns: Protocol, Chain, APY, TVL, IL Risk; sorted by APY descending; shows "No active pools" empty state when `pools.length === 0`; renders `SectionError` when `isError` (depends on T012)
- [ ] T022 [P] [US2] Create `PriceChart` client component in `apps/cryptocurrency/app/components/PriceChart.tsx`: uses `recharts` `LineChart` + `ResponsiveContainer`; props `{ symbol: string; geckoId: string; initialData: PricePoint[] }`; fetches updated data from `/api/coin/[symbol]/price-history?days=N` on time-range button click; time-range buttons (7D/30D/90D) styled as Bootstrap `btn-group`; `ResponsiveContainer` at 100% width × 300 px height; renders `SectionError` when fetch fails
- [ ] T023 [US2] Create `/api/coin/[symbol]/price-history` Route Handler in `apps/cryptocurrency/app/api/coin/[symbol]/price-history/route.ts`: validates `days` query param (7, 30, 90); returns 400 for invalid values; calls `CoinGeckoService.getPriceHistory()`; returns 404 when symbol unknown; returns 502 on upstream failure; sets `Cache-Control: s-maxage=300` (depends on T019)
- [ ] T024 [US2] Create coin detail page in `apps/cryptocurrency/app/coin/[symbol]/page.tsx`: server component; fetches `Stablecoin`, `YieldPool[]`, and `PricePoint[]` (7D default) using cached service calls; returns `notFound()` when symbol is unrecognised; renders `MetricCard` ×4, `PriceChart`, `YieldPoolsTable`; each section wrapped in `Suspense` with skeleton; each section independently degradable via `SectionError` (depends on T009, T010, T011, T019, T020, T021, T022)
- [ ] T025 [US2] Create `apps/cryptocurrency/app/not-found.tsx`: renders a Bootstrap-styled "Coin not found" page with a link back to `/`; used automatically by Next.js when `notFound()` is called from coin detail page

**Checkpoint**: US1 and US2 both work independently — coin detail page loads metrics, chart switches time ranges, not-found page appears for invalid symbols

---

## Phase 5: User Story 3 — Market Sentiment & Trend Indicators (Priority: P3)

**Goal**: The coin detail page shows a Fear & Greed gauge (0–100 with label) and a Bullish/Bearish/Neutral trend badge derived from 7-day price slope.

**Independent Test**: On any coin detail page, a sentiment section is visible showing a Fear & Greed value with label and a colour-coded trend badge. When Alternative.me is unavailable, section shows "Sentiment data unavailable" instead of crashing.

### Implementation for User Story 3

- [ ] T026 [US3] Implement `SentimentService.getFearGreedIndex()` in `libs/services/sentiment/src/sentiment.service.ts`: fetches `https://api.alternative.me/fng/`; the `fetch()` call MUST include `{ next: { revalidate: 900 } }` — the service owns its own caching (constitution Principle V); parses `value` and `value_classification` from response; returns `FearGreedData`; returns `null` (not throws) on network error; export from `src/index.ts` (depends on T008)
- [ ] T027 [US3] Create `computeTrend(priceHistory: PricePoint[]): { trend: TrendDirection; trendBasis: string }` utility in `apps/cryptocurrency/app/lib/compute-trend.ts` (app-layer utility — NOT in a service lib, to avoid cross-lib type dependency between `@multi-tenancy/sentiment` and `@multi-tenancy/coingecko`): imports `PricePoint` from `@multi-tenancy/coingecko` and `TrendDirection` from `@multi-tenancy/sentiment`; slope ≥ +1% → `'bullish'`, ≤ -1% → `'bearish'`, else `'neutral'`; `trendBasis` is a formatted string e.g. `"7-day slope: +1.2%"` (depends on T008)
- [ ] T028 [US3] Create `SentimentGauge` component in `apps/cryptocurrency/app/components/SentimentGauge.tsx`: props `{ sentiment: MarketSentiment | null }`; renders Fear & Greed value as a large number with colour-coded label (red = fear, green = greed); renders trend badge (Bootstrap `badge bg-success` / `bg-danger` / `bg-secondary` for bullish/bearish/neutral); renders `SectionError` with message "Sentiment data unavailable" when `sentiment` is null (depends on T012)
- [ ] T029 [US3] Wire sentiment into coin detail page `apps/cryptocurrency/app/coin/[symbol]/page.tsx`: call `SentimentService.getFearGreedIndex()` and `computeTrend(priceHistory)` in the server component; pass resulting `MarketSentiment | null` to `SentimentGauge`; add `SentimentGauge` to the detail page layout below the metric cards (depends on T024, T026, T027, T028)

**Checkpoint**: All three user stories independently functional — sentiment section renders with fear/greed value and trend badge, degrades gracefully when API is down

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Hardening, responsive audit, stale-data warnings, and final validation.

- [ ] T030 [P] Add stale data warning to `apps/cryptocurrency/app/components/MetricCard.tsx`: if `lastPriceUpdate` timestamp is >1 hour old, render a Bootstrap `badge bg-warning text-dark` "Data may be stale" next to the price value
- [ ] T031 Add search/filter input to home page `apps/cryptocurrency/app/page.tsx`: a Bootstrap `form-control` input client component that filters the rendered stablecoin list by coin name or symbol (client-side, no API call)
- [ ] T032 [P] Responsive audit at all four constitution breakpoints (320 px, 768 px, 1024 px, 1440 px): verify `StablecoinTable` collapses to cards at 320 px, chart and metric cards stack correctly at 768 px, table layout holds at 1024 px and 1440 px — fix any layout issues across `StablecoinTable.tsx`, `MetricCard.tsx`, `PriceChart.tsx`
- [ ] T033 [P] Run `npm run typecheck` — fix all TypeScript errors across `libs/services/defillama/`, `libs/services/coingecko/`, `libs/services/defi-risk/`, `libs/services/sentiment/`, and `apps/cryptocurrency/`
- [ ] T034 Run quickstart.md validation: follow all 10 steps in `specs/001-stablecoin-dashboard/quickstart.md`, confirm all checkboxes pass; update quickstart if any step is inaccurate

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 complete — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Phase 2 complete — no dependency on US2/US3
- **US2 (Phase 4)**: Depends on Phase 2 complete — no dependency on US1 (though T019 extends T010 from Phase 2)
- **US3 (Phase 5)**: Depends on Phase 2 + Phase 4 (US2 detail page must exist to wire sentiment in)
- **Polish (Phase 6)**: Depends on all desired stories complete

### User Story Dependencies

- **US1 (P1)**: Starts after Phase 2 — no dependency on US2/US3
- **US2 (P2)**: Starts after Phase 2 — independent of US1 (shares service libs from Phase 2)
- **US3 (P3)**: Starts after US2 (sentiment is wired into the detail page built in US2)

### Critical Dependency Chain Within US2

```
T019 (getPriceHistory) → T023 (Route Handler) → T024 (detail page)
T020 + T021 + T022 (components) → T024 (detail page)
T024 (detail page) → T025 (not-found)
```

---

## Parallel Execution Examples

### Phase 2: All foundational tasks parallelizable

```
Parallel group A (types + shared components — no deps):
  T006 defillama.types.ts
  T007 coingecko.types.ts
  T008 defi-risk.types.ts + sentiment.types.ts
  T012 SectionError component
  T036 Skeleton.tsx (SkeletonRow + SkeletonCard)

Then parallel group B (services — depend on their own types):
  T009 DeFiLlamaService      (after T006)
  T010 CoinGeckoService      (after T007)
  T011 DefiRiskService       (after T008)
```

### Phase 3 (US1): Parallel start, sequential finish

```
Parallel start:
  T013 RiskScoreBadge
  T014 SortableHeader
  T017 stablecoin-aggregator.ts

Then:
  T015 StablecoinCard    (needs T013)
  T016 StablecoinTable   (needs T013, T014, T015)
  T018 page.tsx          (needs T016, T017 + Phase 2 services)
```

### Phase 4 (US2): Three parallel streams then converge

```
Stream A: T019 getPriceHistory → T023 Route Handler
Stream B: T020 MetricCard (parallel)
Stream C: T021 YieldPoolsTable (parallel)
Stream D: T022 PriceChart (parallel)
All → T024 detail page → T025 not-found
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001–T005)
2. Complete Phase 2: Foundational (T006–T012) — CRITICAL
3. Complete Phase 3: US1 (T013–T018)
4. **STOP and VALIDATE**: Open `localhost:3001/`, confirm list loads, sorts, and collapses on mobile
5. Deploy/demo if ready — independently valuable as a read-only stablecoin screener

### Incremental Delivery

1. Setup + Foundational → services ready
2. US1 → test independently → stablecoin list is live
3. US2 → test independently → coin detail pages with chart
4. US3 → test independently → sentiment signals added
5. Polish → hardening and validation

### Parallel Team Strategy

With two developers:
- **Dev A**: Phase 1 + Phase 2 (service libs) + Phase 3 (US1 home page)
- **Dev B**: Phase 4 (US2 detail page + chart) after Phase 2 completes
- Dev A can continue to Phase 6 polish while Dev B works on US3

---

## Notes

- `[P]` tasks have no dependencies on incomplete tasks in their phase — safe to run in parallel
- Each service lib must export typed interfaces only via `src/index.ts` — never import internal files from the app
- `DEFI_RISK_API_KEY` is optional; `DefiRiskService` returns empty Map when absent (graceful degradation per FR-010)
- `recharts` must be added as a direct dependency of `apps/cryptocurrency` (not a shared lib), per Constitution IV
- Commit after each checkpoint: after Phase 2, after US1, after US2, after US3
- Stop at any checkpoint to validate the story independently before proceeding
