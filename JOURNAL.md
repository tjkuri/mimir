# Journal

## 2026-03-09

**What changed**
- Tip-off countdown on scheduled game cards — shows "Tips off in 2h 15m" and ticks down every minute via a useEffect interval.
- Discrepancy coloring: gap number is now colored by size and direction. ≥5 is bold verdigris/bittersweet, 2.5–5 is the same at normal weight, <2.5 is muted. Color is scoped to just the number span so it doesn't bleed into the recommendation badge.
- Line movement display on the DK line row: shows "(was 223.0 ▼)" when the line has shifted since opening.
- Refresh Odds button in the header — triggers `?refreshOdds=true`, shows a "Refreshing…" disabled state while in flight.
- Fixed: score now shows during halftime and between-quarter breaks (was checking for STATUS_IN_PROGRESS specifically; changed to `!isScheduled`).

**Why**
- The badge text was invisible for UNDER because the parent row span had `text-bittersweet` which CSS-inherited into the badge, overriding `text-white`. Wrapping only the number in the colored span fixed it.
- Halftime has its own ESPN status string, not STATUS_IN_PROGRESS, so the old condition missed it.


## 2026-03-08

**What changed**
- NBA page got a full visual overhaul. Replaced the table layout (OpenGames/ClosedGames + row components) with a card grid using a new `NbaGameCard` component.
- One card handles both open and final games — open games show gap, recommendation badge (▲ OVER / ▼ UNDER), and W-P-L record; final games show score, total, and a result badge (W/L/Push).
- Live in-progress scores now display on the card. Was basically a free lift since the backend was already returning them, just wasn't being rendered.
- `Basketball.js` cleaned up: `bg-spaceCadet` background (fixed the violet-600 that was in there), CSS spinner instead of the framer-motion bar loader, responsive 1/2/3 column grid, section headers in naplesYellow.
- Deleted `OpenGames.js`, `OpenGameRow.js`, `ClosedGames.js`, `ClosedGameRow.js`.

**Decisions**
- Single card component instead of separate open/closed rows. The data shape is the same either way, the status field just controls which fields get rendered.
- Since the backend now pre-computes recommendation/record/discrepancy, the frontend has zero logic in it. Makes the card component basically dumb which is easier to reason about.

**Why**
- The table was functional but looked dated compared to the NFL page. Cards are easier to scan and feel more intentional. Also the table approach was going to get messy once we started adding more per-game data fields.
- The backend doing the computation is cleaner separation of concerns anyway.


## 2025-08-30

**What changed**
- New NFL page wiring:
  - `NflFootball` now renders a centered layout with comfortable vertical spacing and a “Selected” status line.
  - Added `QBSelect` component: pulls `/api/nfl/qbs`, shows a dropdown, and includes **quick-pick chips** for popular QBs.
- Theme update: added `saffron` / `saffronDark` to Tailwind; quick-picks use saffron with dark text for contrast on `spaceCadet`.
- Config: introduced `src/config.js` (`YGGDRASIL_URL`) + `.env.example` (`VITE_API_URL`).
- Minor polish: consistent button sizing/spacing on home; selection text uses `verdigris`.

**Decisions**
- Keep the simple dropdown for now; upgrade to the hybrid **combobox + chips** when the list grows (backups/historical) or when search is desired.
- Quick-picks use **slugs** from the API (`mahomes-patrick`, `allen-joshua`, `jackson-lamar`, `burrow-joe`, `daniels-jayden`, `herbert-justin`, `prescott-rayne`).

**Why**
- Fast path to an end-to-end flow: the page now hits a real backend route and supports one-tap popular players with clear visual hierarchy on the dark background.

**Next up**
- Wire the “analyze” path to the upcoming `/api/nfl/qb/passing-yards` endpoint.
- Add loading & error states to the NFL page similar to Basketball.
- (Later) Swap dropdown → combobox (typeahead, favorites/recents, team search) without changing the `onPick(player)` API.
- (Later) Tabs/nested routes (`/nfl-football/qb`, `/nfl-football/team-totals`) when we add more dashboards.

## 03-21-2024
Using some stuff from this https://www.hover.dev site. they have some cool front end things, saves me the trouble of struggling with react to get cool/modern looking things.

## 03-05-2024
Not sure if Ill actually keep this journal section updated, but felt like it might be useful to keep track of any lessons learned, or be able to go back and potentially find why I made certain decisions if I no longer remember at some point in the future. 

So far only have a home page with some text. Found some resouces online that used tailwind and it seemed cool enough so am using it it for front end formatting. It had been about 3ish years since I last did any web dev. I was struggling to get even a simple home page going. I then rememberd that I had Gemini open on a tab. Up till now I had only used it as a novelty, asking it silly things just for the sake of seeing what it spit out. But this seemed like a good use case. I was very impressed, asked it how to do some specific formatting with tailwind and it spit out some example react components with the explanation for what each tailwind class was doing. It greatly sped up my develepment. I always enjoyed the backend and more functional aspects of web dev, but I always disliked digging into formatting and layouts. It just seemed so tedious to me, but with Gemini assisting and taking the load of formatting and getting the page to look presentable I think I should not only work faster but be able to spend most of my time on the parts of webdev I enjoy.