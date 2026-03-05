# Implementation Plan: Stablecoin Dashboard

**Branch**: `001-stablecoin-dashboard` | **Date**: 2026-03-04 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-stablecoin-dashboard/spec.md`

## Summary

Build a public, read-only stablecoin yield dashboard in `apps/cryptocurrency`. The home
page lists USD-pegged stablecoins ranked by risk score (safest first), showing best APY,
total TVL, and current price. Clicking a coin navigates to a detail page with a price
history chart, per-pool yield breakdown, risk score cards, and market sentiment
(Fear & Greed index + Bullish/Bearish trend). Four new service libraries handle all
external API calls: `defillama` (yield/TVL), `coingecko` (prices/charts), `defi-risk`
(risk scores), and `sentiment` (fear/greed). No authentication required.

## Technical Context

**Language/Version**: TypeScript 5 / Next.js 16 / React 19
**Primary Dependencies**: Bootstrap 5.3 (existing), Recharts ^2 (new — chart library, justified in research.md Decision 4), @multi-tenancy/design-system (existing)
**Storage**: No persistent storage. Next.js `fetch` cache with `revalidate: 300` (prices) / `revalidate: 900` (APY/TVL/risk)
**Testing**: Jest (existing workspace pattern)
**Target Platform**: Web — Next.js 16 server + client components, deployed on Vercel or Node server
**Performance Goals**: Full page visible in <3 s (SC-002); partial data visible in <2 s per section (SC-004)
**Constraints**: Bootstrap-only styling; design system components first; 30 req/min CoinGecko free tier; De.Fi API key required for risk scores (server-side only); no auth
**Scale/Scope**: 15–30 stablecoins, public dashboard, single Next.js app

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Clean Code | ✅ Pass | One service class per external API; typed interfaces; no duplication |
| II. Simple UX | ✅ Pass | Default sort by risk asc; skeleton loaders; independent section errors |
| III. Responsive Design | ✅ Pass | Bootstrap responsive grid; table→card on mobile; `ResponsiveContainer` in chart |
| IV. Minimal Dependencies | ⚠️ Justified | `recharts` added (see Complexity Tracking below) |
| V. Library-First Services | ✅ Pass | All API calls in `libs/services/defillama/`, `libs/services/coingecko/`, `libs/services/defi-risk/`, `libs/services/sentiment/`; zero direct fetches from app components |

*Post-Phase 1 re-check*: All principles still satisfied after design. No new violations introduced.

## Project Structure

### Documentation (this feature)

```text
specs/001-stablecoin-dashboard/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── api-routes.md
├── checklists/
│   └── requirements.md
└── tasks.md             # Phase 2 output (/speckit.tasks - NOT created here)
```

### Source Code (repository root)

```text
libs/services/
├── defillama/                             # NEW — yield pools, TVL, stablecoin list
│   ├── src/
│   │   ├── index.ts                       # Public barrel export
│   │   ├── defillama.service.ts           # DeFiLlamaService class
│   │   └── defillama.types.ts             # Pool, Stablecoin, TVL types
│   ├── package.json
│   ├── tsconfig.json
│   └── tsconfig.lib.json
│
├── coingecko/                             # NEW — price market data + price history
│   ├── src/
│   │   ├── index.ts
│   │   ├── coingecko.service.ts           # CoinGeckoService class
│   │   └── coingecko.types.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── tsconfig.lib.json
│
├── defi-risk/                             # NEW — De.Fi risk scores (GraphQL)
│   ├── src/
│   │   ├── index.ts
│   │   ├── defi-risk.service.ts           # DefiRiskService class (De.Fi GraphQL)
│   │   └── defi-risk.types.ts             # RiskBreakdown type
│   ├── package.json
│   ├── tsconfig.json
│   └── tsconfig.lib.json
│
└── sentiment/                             # NEW — Alternative.me Fear & Greed index
    ├── src/
    │   ├── index.ts
    │   ├── sentiment.service.ts           # SentimentService class (Alternative.me)
    │   └── sentiment.types.ts             # FearGreedData, MarketSentiment, TrendDirection
    ├── package.json
    ├── tsconfig.json
    └── tsconfig.lib.json

apps/cryptocurrency/
├── app/
│   ├── page.tsx                           # US1: Stablecoin list (server component)
│   ├── coin/
│   │   └── [symbol]/
│   │       └── page.tsx                   # US2+US3: Coin detail (server component)
│   ├── not-found.tsx                      # Edge case: invalid coin route
│   ├── api/
│   │   └── coin/
│   │       └── [symbol]/
│   │           └── price-history/
│   │               └── route.ts           # Client-side chart data refresh
│   └── components/
│       ├── StablecoinTable.tsx            # Desktop table + mobile card list
│       ├── StablecoinCard.tsx             # Mobile card variant per coin
│       ├── SortableHeader.tsx             # Clickable column header (client)
│       ├── MetricCard.tsx                 # Current price / APY / TVL / risk card
│       ├── PriceChart.tsx                 # Recharts LineChart (client component)
│       ├── YieldPoolsTable.tsx            # Per-pool breakdown table
│       ├── RiskScoreBadge.tsx             # Colour-coded 0-100 risk badge
│       ├── SentimentGauge.tsx             # Fear/Greed + Bullish/Bearish badge
│       └── SectionError.tsx              # Per-section error + retry UI
├── package.json                           # + recharts dependency
└── tsconfig.json                          # + new libs/services/* references
```

**Structure Decision**: Next.js web application layout. Services in
`libs/services/` (Constitution V). App components in `apps/cryptocurrency/app/`.
No separate backend — all external API calls happen in Next.js server components or
Route Handlers, keeping API keys server-side.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| `recharts` added (Constitution IV) | FR-004 requires interactive price chart with time-range selector; core deliverable | Native SVG requires bespoke axes/tooltip/resize logic; `lightweight-charts` needs imperative React wrapper and is OHLC-optimised (poor for flat stablecoin price lines) |
