# Data Model: Stablecoin Dashboard (001)

**Date**: 2026-03-04
**Branch**: `001-stablecoin-dashboard`

---

## Entities

### Stablecoin

The top-level entity representing a tracked USD-pegged stablecoin. Aggregated from
DeFiLlama stablecoin list and CoinGecko market data. One Stablecoin has many
YieldPools.

```typescript
interface Stablecoin {
  // Identity
  symbol: string;             // "USDC" — canonical symbol used as route key
  name: string;               // "USD Coin"
  geckoId: string;            // CoinGecko coin ID: "usd-coin"
  llamaId: string;            // DeFiLlama stablecoin numeric ID: "1"
  logoUrl: string;            // CoinGecko image URL

  // Price (from CoinGecko, revalidate: 300)
  currentPrice: number;       // USD, e.g. 1.0002
  priceChange24h: number;     // percentage, e.g. 0.02
  lastPriceUpdate: string;    // ISO timestamp

  // Yield summary (derived from YieldPool[], revalidate: 900)
  bestApy: number;            // Highest APY across all active pools (%)
  totalTvl: number;           // Sum of tvlUsd across all pools (USD)
  poolCount: number;          // Number of active yield pools

  // Risk (from De.Fi, revalidate: 900)
  riskScore: number | null;   // 0-100, lower = safer; null if data unavailable
  riskBreakdown: RiskBreakdown | null;

  // Derived market signal (computed, revalidate: 900)
  trend: TrendDirection;      // computed from 7-day price slope
}
```

**Validation rules**:
- `symbol` is unique; used as the URL slug for `/coin/[symbol]`
- `currentPrice` must be in range [0.5, 1.5]; outside this range indicates de-peg
- `bestApy` is 0 when `poolCount === 0` (no active pools)
- `riskScore` is `null` when De.Fi API is unavailable (not 0)

---

### YieldPool

A single liquidity or lending pool for a stablecoin. Sourced from DeFiLlama `/pools`
filtered by `stablecoin: true`. Many YieldPools belong to one Stablecoin.

```typescript
interface YieldPool {
  poolId: string;           // DeFiLlama UUID, e.g. "3ed3b47d-..."
  stablecoinSymbol: string; // Foreign key → Stablecoin.symbol
  protocol: string;         // "aave-v3", "compound-v3", "curve"
  chain: string;            // "Ethereum", "Arbitrum", "Polygon"
  symbol: string;           // Pool symbol, e.g. "USDC" or "USDT-USDC"
  apy: number;              // Total APY: apyBase + apyReward (%)
  apyBase: number;          // Base lending/fee APY (%)
  apyReward: number;        // Liquidity mining reward APY (%)
  tvlUsd: number;           // TVL in USD
  ilRisk: 'yes' | 'no';    // Impermanent loss risk
  exposure: 'single' | 'multi'; // Single asset vs. LP pair
  lastUpdated: string;      // ISO timestamp from DeFiLlama
}
```

**Validation rules**:
- `poolId` is globally unique
- `apy` must be non-negative; negative APY pools are excluded
- Pools with `tvlUsd < 100_000` are excluded (dust pools)

---

### RiskBreakdown

Aggregated risk score from De.Fi. Embedded in Stablecoin.

```typescript
interface RiskBreakdown {
  overall: number;         // 0-100, lower = safer
  smartContract: number;   // Smart contract audit risk component
  liquidity: number;       // Liquidity depth risk component
  pegStability: number;    // Historical peg deviation risk component
}
```

**Validation rules**:
- All fields in range [0, 100]
- If De.Fi is unavailable, the entire `riskBreakdown` is `null` on the parent Stablecoin

---

### PricePoint

One data point in a stablecoin's price history. Array of PricePoints forms
PriceHistory. Sourced from CoinGecko `market_chart` endpoint.

```typescript
interface PricePoint {
  timestamp: number;    // Unix milliseconds
  price: number;        // USD closing price
  volume?: number;      // 24 h volume in USD (optional, from market_chart)
}
```

**Time ranges**: 7D (last 7 days), 30D (last 30 days), 90D (last 90 days). Each
request fetches `daily` interval data from CoinGecko.

---

### MarketSentiment

Market sentiment signals displayed on the coin detail page. Sourced from
Alternative.me (Fear & Greed index) and computed from CoinGecko price data (trend).

```typescript
interface MarketSentiment {
  fearGreedValue: number;           // 0-100
  fearGreedLabel: FearGreedLabel;   // Classification label
  trend: TrendDirection;            // Computed from 7-day price slope
  trendBasis: string;               // Human-readable: "7-day slope: +1.2%"
  updatedAt: string;                // ISO timestamp of last index update
}

type FearGreedLabel =
  | 'Extreme Fear'
  | 'Fear'
  | 'Neutral'
  | 'Greed'
  | 'Extreme Greed';

type TrendDirection = 'bullish' | 'bearish' | 'neutral';
```

**Computation rules**:
- `trend` from 7-day price slope: slope ≥ +1% → `'bullish'`, slope ≤ -1% → `'bearish'`,
  otherwise `'neutral'`
- `fearGreedValue` and `fearGreedLabel` from Alternative.me response field
  `value` and `value_classification`

---

### CoinDetail

Composite view model returned by the server for the coin detail page. Assembles all
entities for a single stablecoin.

```typescript
interface CoinDetail {
  stablecoin: Stablecoin;
  pools: YieldPool[];
  priceHistory: PricePoint[];     // Default: 7D on initial load
  sentiment: MarketSentiment | null;  // null if Alternative.me unavailable
}
```

---

## Relationships

```
Stablecoin (1) ──── (many) YieldPool
Stablecoin (1) ──── (1) RiskBreakdown     [nullable]
Stablecoin (1) ──── (many) PricePoint     [time-series]
Stablecoin (1) ──── (1) MarketSentiment   [nullable, market-wide not coin-specific]
```

---

## Derived / Computed Fields

| Field | Entity | Source | Computation |
|-------|--------|--------|-------------|
| `bestApy` | Stablecoin | YieldPool[] | `Math.max(...pools.map(p => p.apy))` |
| `totalTvl` | Stablecoin | YieldPool[] | `pools.reduce((s, p) => s + p.tvlUsd, 0)` |
| `poolCount` | Stablecoin | YieldPool[] | `pools.length` |
| `trend` | Stablecoin / MarketSentiment | PricePoint[] | 7-day price slope |
| `trendBasis` | MarketSentiment | PricePoint[] | Human-readable slope string |

---

## State Lifecycle

### Stablecoin List Page Load

```
Server component renders
  ├── fetchStablecoins()         → CoinGecko /coins/markets  (revalidate: 300)
  ├── fetchAllPools()            → DeFiLlama /pools          (revalidate: 900)
  └── fetchRiskScores()          → De.Fi GraphQL             (revalidate: 900)
        ↓
  Merge by symbol → Stablecoin[]
  Sort by riskScore ascending (FR-002 default)
        ↓
  Render StablecoinTable (server HTML)
  Hydrate SortableHeader (client component for sort interactivity)
```

### Coin Detail Page Load

```
Server component for /coin/[symbol]
  ├── fetchStablecoin(symbol)    → merged from cached list
  ├── fetchPools(symbol)         → from cached DeFiLlama pools (filter by symbol)
  ├── fetchPriceHistory(geckoId, days=7)  → CoinGecko market_chart (revalidate: 300)
  └── fetchSentiment()           → Alternative.me /fng/      (revalidate: 900)
        ↓
  Render CoinDetail (server HTML for metrics/pools)
  Hydrate PriceChart (client component — time-range switching via /api/...)
```

---

## Symbol Normalisation

DeFiLlama pool `symbol` may be compound (e.g. `"USDT-USDC"`, `"DAI-USDC-USDT"`).
Normalisation rule: a pool is associated with a stablecoin if `pool.symbol` contains
the stablecoin's `symbol` as a whole word (case-insensitive).

CoinGecko `symbol` field uses lowercase (`"usdc"`). Internal canonical symbol uses
uppercase (`"USDC"`).

Cross-referencing DeFiLlama stablecoins to CoinGecko: DeFiLlama's
`stablecoins?includePrices=true` response includes a `gecko_id` field per stablecoin,
enabling direct lookup.
