# MIMIR
Renowned for his unparalleled wisdom, **Mimir**, the 
the wisest of the giants of the tribe Aesir is said to hold universal secrets. So much so that even after his beheading, Odin preserved his head to continue seeking counsel from this font of knowledge.

In the present day he uses his knowledge to take on the Sportsbooks.

Relies on [Yygdrasil](https://github.com/tjkuri/yggdrasil) for its back end

## Current Features

**NBA Totals** — Card-based view of today's games. Shows a calculated 'My Line' (average total from the last 3 games each team played) vs the DraftKings line. If our line is higher the recommendation is Over, otherwise Under. Each card also shows a W-P-L record: how the DK line would have fared following our recommendation across those 6 recent games. In-progress games show the live score. Final games show the actual total and whether the play was a win, loss, or push.

**NFL QB Analysis** — Pick a QB, get their passing yards market odds from The Odds API alongside career/last season/current season distributions built from nflverse weekly stats. Includes histogram, percentiles, and over/under probabilities relative to the market line.

## Roadmap
Trying to keep this highlevel. Theres a [Journal.md](JOURNAL.md) page where Ill try to keep track of more 'nitty-gritty' details of some tool/design choices.

### (In Progress) Baseball
The NBA playoffs are coming up so I am starting to do the prepwork for implementing something for a different sport. With the start of spring the obvious choice is baseball. I dont think the average total would work for baseball, (total conjecture) but my intuition tells me the totals runs has a higher variance that total points in the NBA. 

Recently orderd this [book](https://www.amazon.com/Monte-Carlo-Bust-Simulations-Aspiring/dp/0857304852) on random sampling. Am working my way through it, hopefully by the time im done, inspiration will have struck for what baseball stat to apply the strategies/methods detailed.

### First Phase - NBA Totals
The first MVP-esque feature was getting something simple up and running. Displays a calculated 'my-line' total from the average of the last few games from each team in a given match up and compares it to the line on DK (this is what I personally use, but the backend can be modified to include multiple sportsbooks in the response).

Theres definetely still room here for improvement (front-end polishing and robustness) but next steps will probably involve other sports/stats

