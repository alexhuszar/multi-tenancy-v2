# Quickstart: Stablecoin Dashboard (001)

**Date**: 2026-03-04
**Branch**: `001-stablecoin-dashboard`

Use this guide to get the dashboard running locally and verify the implementation.

---

## Prerequisites

- Node.js 20+, npm 10+
- Access to CoinGecko free API (no key needed)
- Access to DeFiLlama API (no key needed)
- Access to Alternative.me API (no key needed)
- (Optional) De.Fi API key for risk scores — see note below

---

## 1. Environment Setup

Create `apps/cryptocurrency/.env.local`:

```bash
# Required — De.Fi risk scores (obtain key from info@de.fi)
# If absent, risk score columns will show "Risk data unavailable"
DEFI_RISK_API_KEY=your_key_here

# CoinGecko — optional free Demo key for higher rate limits
# Without this, keyless access applies (30 req/min still works)
COINGECKO_API_KEY=

# No keys needed for DeFiLlama or Alternative.me
```

**Without `DEFI_RISK_API_KEY`**: The app runs fully but risk score columns display
a graceful "unavailable" state. All other features work normally.

---

## 2. Install Dependencies

```bash
# From repository root
npm install

# Verify recharts was added to apps/cryptocurrency
grep recharts apps/cryptocurrency/package.json
```

---

## 3. Build Service Libraries

```bash
# Build all four new service libs
npm run build:libs
```

Or individually:
```bash
npx nx build defillama
npx nx build coingecko
npx nx build defi-risk
npx nx build sentiment
```

---

## 4. Start Development Server

```bash
npm run dev:cryptocurrency
```

Open `http://localhost:3001` (or the port shown in terminal).

---

## 5. Verify User Story 1 — Stablecoin List

1. Navigate to `http://localhost:3001/`
2. ✅ List of stablecoins loads with columns: Name, Price, APY, TVL, Risk Score
3. ✅ Default sort is risk score ascending (safest coin at top)
4. ✅ Click "APY" column header → list re-sorts by APY descending
5. ✅ Click "TVL" column header → list re-sorts by TVL descending
6. ✅ Resize browser to 375 px width → table collapses to card layout
7. ✅ Skeleton loaders visible during initial data fetch

---

## 6. Verify User Story 2 — Coin Detail Page

1. Click any stablecoin row in the list
2. ✅ Browser navigates to `/coin/[SYMBOL]` (e.g. `/coin/USDC`)
3. ✅ Metric cards show: Current Price, Best APY, Total TVL, Risk Score
4. ✅ Price chart renders with 7-day data by default
5. ✅ Click "30D" time-range button → chart updates without full page reload
6. ✅ Click "90D" → chart updates again
7. ✅ Pool table shows individual pools with protocol, chain, APY, TVL
8. ✅ Resize to mobile → chart and cards stack vertically

---

## 7. Verify User Story 3 — Sentiment

1. On any coin detail page, scroll to the Sentiment section
2. ✅ Fear & Greed value (0–100) and label (e.g. "Greed") are displayed
3. ✅ Trend indicator shows Bullish / Bearish / Neutral with colour coding

---

## 8. Verify Edge Cases

```bash
# Invalid coin route
open http://localhost:3001/coin/FAKECOIN
```
✅ "Coin not found" page displays with link back to list.

```bash
# Simulate API failure (disconnect network, or set a bad API key)
# Each section should show error + retry independently
```

---

## 9. Run Tests

```bash
# All tests
npm test

# Service library tests only
npm run test:libs

# Cryptocurrency app tests only
npx nx test cryptocurrency
```

---

## 10. Typecheck

```bash
npm run typecheck
```

All three new service libraries and the cryptocurrency app must pass with zero errors.
