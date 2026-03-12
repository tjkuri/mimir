# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Mimir is a React frontend for sports betting analytics. It consumes the Yggdrasil backend API (sibling project at `../yggdrasil`, runs on port 3001) and presents NBA totals analysis and NFL QB passing yards analysis.

## Commands

```bash
npm start     # Dev server on port 3000
npm run build # Production build
npm test      # Jest (react-scripts test)
```

## Architecture

```
src/
  index.js                # Router setup — /, /basketball, /nfl-football
  config.js               # YGGDRASIL_URL — reads REACT_APP_YGGDRASIL_URL env var, falls back to localhost:3001
  components/
    Home.js               # Landing page with sport navigation
    Basketball.js         # NBA totals page — fetches /api/nba/totals, renders NbaGameCard grid
    NbaGameCard.js        # Unified card for open + final NBA games. Shows projected/DK lines, signal row
                          #   (confidence badge, rec badge, NO BET badge, win prob, EV), team breakdown
                          #   (collapsible). EV is per $100. LOW confidence mutes win prob + EV to gray.
    NflFootball.js        # NFL QB analysis page — orchestrates QBSelect, OddsCard, ScopeCard, HistogramMini
    QBSelect.js           # QB dropdown + quick-pick chips; fires onPick(player)
    OddsCard.js           # Displays consensus line, book lines, market dispersion
    ScopeCard.js          # Single scope stats card (mean, median, P(over), n, z-score)
    HistogramMini.js      # Custom SVG histogram with vertical line marker
```

## Key Patterns

**State machines** — Page components (Basketball, NflFootball) use `status`/`isLoading`/`error` state to show loading → data → error transitions. NflFootball also tracks `activeScope` (last_season | career | current_season) and `picked` (selected QB player object).

**API calls** — Basketball uses Axios; NflFootball uses the native Fetch API. Both import `YGGDRASIL_URL` from `src/config.js`.

**Callbacks** — `QBSelect` fires `onPick(player)` to the parent (`NflFootball`), which then triggers the analysis fetch.

**Visualization** — `HistogramMini` renders a custom SVG histogram; do not replace with a charting library without discussion. It takes `bins` (array of `{start, end, count}`) and a `line` (number) prop. SVG colours are defined in a `COLORS` constant at the top of the file — use that rather than inline hex strings, since Tailwind tokens don't work inside SVG.

## Styling

Tailwind CSS with a custom color palette defined in `tailwind.config.js`:

| Token | Hex | Usage |
|-------|-----|-------|
| `spaceCadet` | `#1c2541` | Dark navy background |
| `verdigris` | `#48a9a6` | Primary teal accent |
| `naplesYellow` | `#f4d35e` | Headings |
| `ghostWhite` | `#fbf9ff` | Cards |
| `bittersweet` | `#f25f5c` | CTAs |
| `saffron` / `saffronDark` | `#d97706` / `#b45309` | Secondary buttons |

Always use these tokens rather than raw hex or generic Tailwind colors to stay consistent with the design system.
