# Feature Specification: Stablecoin Dashboard

**Feature Branch**: `001-stablecoin-dashboard`
**Created**: 2026-03-04
**Status**: Draft
**Input**: User description: "initial page setup - the application should display the list of stablecoins, when selected on stablecoin should redirect to that coin page where we will have chart with the current price, APY + TVL + stablecoin risk scores, current price, trending on the market, market feelings fear or greed index on the current coin, trending bullish or bearish."

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Browse Stablecoin List (Priority: P1)

A user lands on the cryptocurrency app homepage and sees a ranked list of stablecoins.
Each row shows the coin name/logo, current price, APY, TVL, and a risk score badge.
The list defaults to risk score ascending (safest first), and is sortable by APY,
TVL, and risk score, enabling quick comparison.

**Why this priority**: This is the entry point of the entire application. Without a
functional list page, no other feature is reachable. Delivers immediate value as a
read-only screener.

**Independent Test**: Navigating to `/` shows a populated table of stablecoins with
name, price, APY, TVL, and risk score visible without any login or configuration.

**Acceptance Scenarios**:

1. **Given** the app is open, **When** the home page loads, **Then** a list of
   stablecoins is displayed with columns: Name, Current Price, APY, TVL, Risk Score.
2. **Given** the list is displayed, **When** the user clicks a column header (APY,
   TVL, Risk Score), **Then** the list re-sorts by that column in ascending/descending
   order.
3. **Given** the list is displayed on a mobile viewport, **When** the page renders,
   **Then** the table collapses to a card layout with all key metrics visible per card.
4. **Given** the data source is unavailable, **When** the page loads, **Then** an
   error state is shown with a retry option instead of a blank or broken layout.

---

### User Story 2 — Stablecoin Detail Page (Priority: P2)

A user selects a stablecoin from the list and is taken to a dedicated detail page.
The detail page shows a live price chart, current price, APY, TVL, and a risk score
breakdown. Users can explore historical price movement with selectable time ranges.

**Why this priority**: Provides depth beyond the list view. Users evaluating a
specific pool before committing capital rely on this page for due diligence.

**Independent Test**: Navigating to `/coin/[symbol]` (e.g. `/coin/USDC`) renders a
page with a price chart, current price, APY, TVL, and risk score without errors.

**Acceptance Scenarios**:

1. **Given** the user is on the list page, **When** they click a stablecoin row,
   **Then** they are navigated to `/coin/[symbol]`.
2. **Given** the detail page loads, **When** the chart renders, **Then** it displays
   price history with a time-range selector (7D, 30D, 90D).
3. **Given** the detail page loads, **When** the data is fetched, **Then** the current
   price, APY, TVL, and risk score are displayed in clearly labelled metric cards.
4. **Given** the user is on a detail page, **When** they resize to a mobile viewport,
   **Then** the chart and metric cards stack vertically and remain fully readable.

---

### User Story 3 — Market Sentiment & Trend Indicators (Priority: P3)

On the detail page the user sees market sentiment signals: a Fear & Greed index for
the selected coin and a trend indicator showing whether the coin is currently trending
bullish or bearish.

**Why this priority**: Adds qualitative context that complements quantitative metrics.
Useful for informed decision-making but not blocking for the initial launch.

**Independent Test**: The detail page for any stablecoin shows a Fear & Greed gauge
and a Bullish/Bearish badge that reflects recent price action.

**Acceptance Scenarios**:

1. **Given** the detail page loads, **When** the sentiment section renders, **Then**
   a Fear & Greed index value (0–100) with a label (Extreme Fear / Fear / Neutral /
   Greed / Extreme Greed) is displayed.
2. **Given** the detail page loads, **When** the trend indicator renders, **Then**
   it shows one of three states: Bullish, Bearish, or Neutral with a colour-coded
   indicator.
3. **Given** the sentiment data is unavailable, **When** the section renders, **Then**
   a "Sentiment data unavailable" message is shown rather than a blank or broken view.

---

### Edge Cases

- What happens when a stablecoin has no yield pools? The detail page renders with price
  and chart data; APY and TVL fields show "No active pools".
- What happens when price data is stale (last update > 1 hour)? A "Data may be stale"
  warning badge appears next to the price.
- What happens when the user navigates to `/coin/INVALID`? A "Coin not found" page is
  displayed with a link back to the list.
- What happens on slow connections? Each data section loads independently with its own
  skeleton/spinner so partial data is visible while other sections load.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The home page MUST display a list of tracked stablecoins with per-coin
  data: name, logo, current price, best available APY (highest across all active
  pools), total TVL across all pools, and risk score.
- **FR-002**: The stablecoin list MUST default to risk score ascending (safest first)
  and MUST be re-sortable by APY, TVL, and risk score (ascending and descending).
- **FR-003**: Users MUST be able to navigate to a coin detail page by clicking any
  stablecoin row in the list.
- **FR-004**: The coin detail page MUST display a price chart with selectable time
  ranges (7D, 30D, 90D minimum).
- **FR-005**: The coin detail page MUST display metric cards for: current price, best
  APY (highest across all active pools for that coin), total TVL, and risk score.
- **FR-005a**: The coin detail page MUST list all individual yield pools for the
  selected stablecoin with each pool's protocol name, APY, TVL, and network.
- **FR-006**: The coin detail page MUST display a Fear & Greed index value and
  descriptive label for the selected coin.
- **FR-007**: The coin detail page MUST display a trend indicator (Bullish / Bearish /
  Neutral) derived from recent market data.
- **FR-008**: All pages MUST be responsive and render correctly at 320 px, 768 px,
  1024 px, and 1440 px viewports with no horizontal scrolling.
- **FR-009**: Data loading states MUST be communicated via skeleton screens or
  spinners; no blank content areas are permitted during data fetch.
- **FR-010**: Each data section (price, APY/TVL/pools, risk score, sentiment) MUST
  degrade independently — when its data source is unavailable, that section MUST
  show a user-readable error message with a retry action while all other sections
  continue to function normally. No cross-API fallback is used.
- **FR-011**: The home page MUST provide a client-side text filter input that narrows
  the displayed stablecoin list by coin name or symbol without requiring a page reload
  or additional API call.

### Key Entities

- **Stablecoin**: A tracked stablecoin asset. Attributes: symbol, name, logo URL,
  current price (USD), 24 h price change (%).
- **YieldPool**: A liquidity or lending pool for a stablecoin. Attributes: protocol
  name, APY (%), TVL (USD), blockchain network, last updated timestamp. One
  stablecoin has many YieldPools; the list page displays the best (highest) APY
  and summed TVL across all pools for that coin.
- **RiskScore**: An aggregated risk rating. Attributes: overall score (0–100, lower =
  safer), category breakdown (smart contract risk, liquidity risk, peg stability).
- **PriceHistory**: Time-series price data. Attributes: timestamp, price (USD).
- **MarketSentiment**: Sentiment signals derived from price and volume. Attributes:
  fear/greed index (0–100), trend direction (bullish / bearish / neutral).

## Clarifications

### Session 2026-03-04

- Q: What is the default sort order when a user first lands on the list page? → A: Risk score ascending (safest first)
- Q: What does the single APY figure shown on the list and detail metric card represent? → A: Best (highest) APY across all active pools for that stablecoin
- Q: When an external API is unavailable, should the app attempt cross-API fallback or degrade that section independently? → A: Degrade each section independently with error/retry; no cross-API fallback

## Assumptions

- Stablecoin universe is limited to USD-pegged stablecoins (USDC, USDT, DAI, FRAX,
  LUSD, etc.) — approximately 15–30 coins initially.
- Risk scores are sourced from De.Fi (de.fi) and normalised to a 0–100 scale; lower
  is safer. Requires `DEFI_RISK_API_KEY`; risk columns degrade gracefully if absent.
- The Fear & Greed index is sourced from Alternative.me (`api.alternative.me/fng/`),
  a free public API. CoinGecko's fear/greed endpoint is Pro-only and is not used.
- Trend indicator is computed from the 7-day price slope: ≥ +1% = Bullish,
  ≤ −1% = Bearish, otherwise Neutral.
- No authentication is required; the dashboard is fully public.
- Data refresh interval: 5 minutes for prices, 15 minutes for APY/TVL/risk scores.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can identify the top 5 lowest-risk yield pools within 30 seconds
  of landing on the home page without any instructions.
- **SC-002**: Navigating from the list to a coin detail page and seeing all core
  metrics completes in under 3 seconds on a standard broadband connection.
- **SC-003**: The full dashboard is usable on a 320 px wide mobile screen with no
  horizontal scrolling on either the list or detail page.
- **SC-004**: Each data section loads independently so users see partial data within
  2 seconds even when one data source is slow or unavailable.
- **SC-005**: 100% of invalid coin routes display a "not found" page rather than a
  blank or errored view.
