# API Route Contracts: Stablecoin Dashboard (001)

**Date**: 2026-03-04
**Branch**: `001-stablecoin-dashboard`

These are the Next.js Route Handler contracts used by client components to fetch data
after initial server-side render (primarily for the chart time-range switching in US2).

All routes are read-only (`GET`). No authentication required. Responses are JSON.
All error responses follow the standard error shape.

---

## Standard Error Shape

```typescript
interface ApiError {
  error: string;    // Human-readable message
  code: string;     // Machine-readable code, e.g. "COIN_NOT_FOUND"
}
```

HTTP status codes used: `200 OK`, `400 Bad Request`, `404 Not Found`, `502 Bad Gateway`
(upstream API failure), `500 Internal Server Error`.

---

## Route 1: Stablecoin List

Used only as a cache-busting refresh endpoint. Initial data is served via server
component. Client may call this to refresh without a full page reload.

```
GET /api/stablecoins
```

**Query parameters**: none

**Response `200 OK`**:
```typescript
{
  data: Stablecoin[];      // Sorted by riskScore ascending (FR-002 default)
  lastUpdated: string;     // ISO timestamp
}
```

**Response `502 Bad Gateway`** (when all upstream sources fail):
```typescript
{ error: "Failed to fetch stablecoin data", code: "UPSTREAM_ERROR" }
```

**Cache**: `Cache-Control: s-maxage=300, stale-while-revalidate=60`

---

## Route 2: Coin Detail

Returns the full detail payload for a single coin: metadata, pools, current
sentiment. Price history is fetched separately (Route 3).

```
GET /api/coin/[symbol]
```

**Path parameter**: `symbol` — uppercase stablecoin symbol, e.g. `USDC`, `USDT`

**Response `200 OK`**:
```typescript
{
  stablecoin: Stablecoin;
  pools: YieldPool[];           // All active pools, sorted by APY desc
  sentiment: MarketSentiment | null;
  lastUpdated: string;
}
```

**Response `404 Not Found`**:
```typescript
{ error: "Stablecoin not found", code: "COIN_NOT_FOUND" }
```

**Response `502 Bad Gateway`**:
```typescript
{ error: "Failed to fetch coin data", code: "UPSTREAM_ERROR" }
```

**Cache**: `Cache-Control: s-maxage=900, stale-while-revalidate=120`

---

## Route 3: Price History (chart time-range switching)

Called by the `PriceChart` client component when the user selects a different
time-range (7D / 30D / 90D). Returns an array of daily price points.

```
GET /api/coin/[symbol]/price-history?days=7
```

**Path parameter**: `symbol` — uppercase stablecoin symbol

**Query parameter**:

| Parameter | Type | Required | Values | Default |
|-----------|------|----------|--------|---------|
| `days` | integer | no | `7`, `30`, `90` | `7` |

Invalid `days` values return `400 Bad Request`.

**Response `200 OK`**:
```typescript
{
  symbol: string;
  days: number;
  data: PricePoint[];      // Chronological order, daily interval
  lastUpdated: string;
}
```

Where `PricePoint`:
```typescript
{
  timestamp: number;    // Unix milliseconds
  price: number;        // USD
  volume: number;       // 24 h volume in USD
}
```

**Response `400 Bad Request`**:
```typescript
{ error: "Invalid days parameter. Allowed: 7, 30, 90", code: "INVALID_PARAMS" }
```

**Response `404 Not Found`**:
```typescript
{ error: "Stablecoin not found", code: "COIN_NOT_FOUND" }
```

**Response `502 Bad Gateway`** (CoinGecko unavailable):
```typescript
{ error: "Price history unavailable", code: "UPSTREAM_ERROR" }
```

**Cache**: `Cache-Control: s-maxage=300, stale-while-revalidate=60`

---

## Service Layer Contracts

These are the TypeScript interfaces that each service library MUST export from its
`index.ts`. App-layer code imports these types; it never imports internal
implementation files.

### DeFiLlamaService (`libs/services/defillama`)

```typescript
export interface DeFiLlamaService {
  /** Fetch all stablecoin pools with stablecoin:true flag */
  getStablecoinPools(): Promise<YieldPool[]>;

  /** Fetch all DeFiLlama stablecoins with market data */
  getStablecoins(): Promise<LlamaStablecoin[]>;

  /** Fetch historical APY data for a single pool */
  getPoolHistory(poolId: string): Promise<PoolHistoryPoint[]>;
}
```

### CoinGeckoService (`libs/services/coingecko`)

```typescript
export interface CoinGeckoService {
  /** Fetch all stablecoins from CoinGecko markets endpoint */
  getStablecoinMarkets(): Promise<CoinGeckoMarket[]>;

  /** Fetch daily price history for a coin */
  getPriceHistory(geckoId: string, days: 7 | 30 | 90): Promise<PricePoint[]>;
}
```

### SentimentService (`libs/services/sentiment`)

```typescript
export interface SentimentService {
  /** Fetch current Fear & Greed index from Alternative.me */
  getFearGreedIndex(): Promise<FearGreedData>;
}

export interface DefiRiskService {
  /** Fetch risk scores for a list of stablecoin symbols */
  getRiskScores(symbols: string[]): Promise<Map<string, RiskBreakdown>>;
}
```
