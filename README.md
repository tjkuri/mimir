# MIMIR
Renowned for his unparalleled wisdom, **Mimir**, the 
the wisest of the giants of the tribe Aesir is said to hold universal secrets. So much so that even after his beheading, Odin preserved his head to continue seeking counsel from this font of knowledge.

In the present day he uses his knowledge to take on the Sportsbooks.

Relies on [Yygdrasil](https://github.com/tjkuri/yggdrasil) for its back end

## Current Features

**NBA Totals** — Card-based view of today's games. Each card shows a projected total (O/D split model across the last 10 games per team, recency-weighted; OT games use regulation-only scores so inflated totals don't skew the model) vs the DraftKings line, with a signal row: confidence badge (HIGH/MEDIUM/LOW), Over/Under/NO BET recommendation, win probability, and expected value (per $100 bet). LOW confidence cards mute the win prob and EV so you don't anchor on numbers from thin data. Line movement shows when the DK line has shifted since opening. Color-coded accent borders (teal = Over, red = Under). In-progress games show the live score; final games show the actual result (W/L/Push relative to the prediction).

**NFL QB Analysis** — Pick a QB, get their passing yards market odds from The Odds API alongside career/last season/current season distributions built from nflverse weekly stats. Includes histogram, percentiles, and over/under probabilities relative to the market line.

## Roadmap
Trying to keep this highlevel. Theres a [Journal.md](JOURNAL.md) page where Ill try to keep track of more 'nitty-gritty' details of some tool/design choices.

### (In Progress) Baseball
The NBA playoffs are coming up so I am starting to do the prepwork for implementing something for a different sport. With the start of spring the obvious choice is baseball. I dont think the average total would work for baseball, (total conjecture) but my intuition tells me the totals runs has a higher variance that total points in the NBA. 

Recently orderd this [book](https://www.amazon.com/Monte-Carlo-Bust-Simulations-Aspiring/dp/0857304852) on random sampling. Am working my way through it, hopefully by the time im done, inspiration will have struck for what baseball stat to apply the strategies/methods detailed.

### First Phase - NBA Totals
Card-based view showing my calculated line vs DraftKings for every game on the slate. Persistent header navigation with sport switcher. Space Grotesk + Inter typography. Color-coded cards with over/under accent borders and line movement tracking.

