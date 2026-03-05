# Research: Stablecoin Dashboard (001)

**Date**: 2026-03-04
**Branch**: `001-stablecoin-dashboard`

---

## Decision 1: Primary Yield & Risk Data Source

**Decision**: Use **DeFiLlama** as primary yield/TVL source; use **De.Fi** (formerly DeFiYield) for risk scores only.

**Rationale**: The spec named "DeFiYields.dev" — this domain has no public API. The
intended service is **De.Fi** (de.fi, docs.de.fi). DeFiLlama's free `/pools` endpoint
returns stablecoin yield data (`stablecoin: true` flag), APY, TVL, chain, and protocol
with no authentication. De.Fi provides risk/audit scores via a GraphQL API but requires
an API key (free tier available on request via `info@de.fi`).

**Alternatives considered**:
- DeFiLlama alone: Does not provide risk scores — only yield/TVL data.
- De.Fi alone: Requires API key; no free public stablecoin price feeds.

**Implementation note**: De.Fi risk scores are fetched server-side (API key in env var
`DEFI_RISK_API_KEY`). If the key is absent or the API is down, the risk score section
degrades independently per FR-010.

---

## Decision 2: Price Feed & OHLC Chart Data

**Decision**: Use **CoinGecko** free Demo tier for stablecoin market data and price
history charts.

**Rationale**: CoinGecko's `GET /coins/markets?category=stablecoins` returns the full
stablecoin universe with current price, 24 h change, logo URL, and CoinGecko coin IDs
in a single request. The `GET /coins/{id}/market_chart?days=30&interval=daily` endpoint
provides daily price time-series suitable for peg stability charts (stablecoins barely
move so OHLC candles add no value over a simple line). Free tier: 30 req/min,
10,000 req/month — sufficient given server-side caching at 5 min intervals.

**Alternatives considered**:
- CoinGecko OHLC endpoint: Candle granularity is auto-selected based on `days` param;
  for stablecoins a line chart (market_chart) is more informative.
- DeFiLlama `coins.llama.fi/chart`: Also free; chosen CoinGecko because the same
  `/coins/markets` call already provides the stablecoin list + metadata.

---

## Decision 3: Fear & Greed Index

**Decision**: Use **Alternative.me** (`api.alternative.me/fng/`) for the Fear & Greed
index, NOT CoinGecko.

**Rationale**: CoinGecko's fear/greed endpoint is **Pro-only** (not available on the
free Demo tier). Alternative.me is a widely-used, completely public, unauthenticated
API returning the crypto Fear & Greed index (0–100 scale with classification labels).
It is the de facto standard source for this data in DeFi dashboards.

**Note**: The Alternative.me index is Bitcoin/crypto-market-wide, not stablecoin-
specific. It is displayed as a market context indicator on the coin detail page.
The "stablecoin-specific" trend signal (Bullish/Bearish/Neutral) is derived from
CoinGecko 7-day price slope per the spec Assumptions.

**Alternatives considered**:
- CoinGecko Pro: Cost prohibitive for an open dashboard.
- Computing from price data only: Would lose the sentiment classification labels
  (Extreme Fear/Greed) which users recognise.

---

## Decision 4: Chart Library

**Decision**: Add **Recharts** (`recharts@^2`) to `apps/cryptocurrency`.

**Rationale**: FR-004 requires an interactive price chart with selectable time ranges.
No chart library exists in the workspace. Recharts is React-native (no imperative DOM
wrapper needed), actively maintained, and integrates naturally with Next.js 16 +
React 19. For stablecoin price charts (line charts showing peg stability), its
`LineChart` + `ResponsiveContainer` components are minimal and appropriate.

**Complexity justification** (Constitution IV — Minimal Dependencies): Recharts
(~350 KB parsed, ~80 KB gzipped) is justified because price history visualization is
a core deliverable (FR-004) with no simpler alternative within existing workspace deps.
Alternative: `lightweight-charts` from TradingView (~40 KB) was considered but
requires an imperative React wrapper and is optimised for OHLC candles, not line
charts.

**Alternatives considered**:
- lightweight-charts: Smaller but needs manual React wrapper; OHLC-optimised, poor
  fit for flat stablecoin price lines.
- chart.js + react-chartjs-2: ~100 KB total; decent fit but two packages, and
  Recharts is more idiomatic for React 19.
- Native SVG: Zero deps but significant custom code for axes, tooltips, responsive
  resize — violates Constitution I (Clean Code) by introducing bespoke chart logic.

---

## Decision 5: New Service Library Structure

**Decision**: Create four new lib packages under `libs/services/` (constitution v1.1.0 —
one lib per external API):

| Package | Purpose |
|---------|---------|
| `libs/services/defillama/` | Yield pools, stablecoin list, TVL |
| `libs/services/coingecko/` | Price market data, price history |
| `libs/services/defi-risk/` | De.Fi risk scores (GraphQL) |
| `libs/services/sentiment/` | Alternative.me Fear & Greed index |

**Rationale**: Constitution V (Library-First Services) mandates all external API calls
in `libs/services/` with one subdirectory per external API. Each service is an
independent, typed module so it can be tested and reused without the Next.js app
running. The original plan merged De.Fi and Alternative.me into `sentiment/` — this
was corrected during the constitution v1.1.0 amendment (one-API-per-lib rule).

**Alternatives considered**:
- Single `@multi-tenancy/defi-data` lib: Simpler to configure Nx/tsconfig, but mixes
  four unrelated external APIs, complicating independent testing and error isolation.
- Three libs (merging De.Fi + Alternative.me): Violates constitution Principle V
  one-API-per-lib rule; rejected during speckit.analyze remediation.

---

## Decision 6: Data Fetching Strategy

**Decision**: Use **Next.js 16 server components** with `fetch` cache tags for all
initial page data. Route handlers (`/api/coin/[symbol]/price-history`) only for
client-side chart time-range switching.

**Rationale**: Server components reduce client-side JavaScript and allow server-side
API key use for De.Fi. Next.js 16's `fetch` supports `{ next: { revalidate: 300 } }`
(5-minute revalidation for prices) and `{ next: { revalidate: 900 } }` (15-minute for
APY/TVL/risk) natively — no additional caching infrastructure needed.

**Alternatives considered**:
- Client-side SWR/React Query: Adds a dependency (Constitution IV violation) and
  exposes API keys to the browser.
- Static generation: Stale after 5–15 min; ISR (Incremental Static Regeneration) is
  equivalent to `revalidate` option already chosen.

---

## Decision 7: Risk Score Fallback

**Decision**: If De.Fi API key is absent or the service is unavailable, risk score
columns display "Risk data unavailable" per FR-010. No alternative risk data source
is used (Constitution V — no cross-API fallback).

**Rationale**: Per spec clarification Q3, each data section degrades independently
with no cross-API fallback. De.Fi is the only source of aggregated smart-contract
audit risk scores — there is no equivalent free substitute.

**Note**: During development without a De.Fi API key, mock/fixture data SHOULD be
used to enable UI development of risk score components.

---

## API Endpoint Reference

### DeFiLlama (no auth required)

| Data | Endpoint |
|------|----------|
| All yield pools | `GET https://yields.llama.fi/pools` |
| Historical pool APY | `GET https://yields.llama.fi/chart/{poolId}` |
| Stablecoin list | `GET https://stablecoins.llama.fi/stablecoins?includePrices=true` |
| Protocol TVL | `GET https://api.llama.fi/protocols` |

### CoinGecko (no key required for free tier)

| Data | Endpoint |
|------|----------|
| Stablecoin market list | `GET /coins/markets?vs_currency=usd&category=stablecoins&per_page=100` |
| Daily price chart | `GET /coins/{id}/market_chart?vs_currency=usd&days=30&interval=daily` |

Base URL: `https://api.coingecko.com/api/v3`

### Alternative.me (no auth)

| Data | Endpoint |
|------|----------|
| Current Fear & Greed | `GET https://api.alternative.me/fng/` |
| Historical (30 days) | `GET https://api.alternative.me/fng/?limit=30` |

Response: `{ data: [{ value: "72", value_classification: "Greed", timestamp: "..." }] }`

### De.Fi (API key required)

| Data | Endpoint |
|------|----------|
| Risk/yield opportunities | `POST https://public-api.de.fi/graphql` |

GraphQL query example:
```graphql
query {
  opportunities(filter: { features: ["stablecoin"] }) {
    name
    apy
    tvl
    riskScore
  }
}
```

Header: `X-Api-Key: {DEFI_RISK_API_KEY}`
Obtain key: email `info@de.fi`.
