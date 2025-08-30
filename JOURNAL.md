# Journal

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