import React, { useState, useEffect } from 'react';
import NbaGameCard from './NbaGameCard';

const FAKE_GAME = {
  id: 'demo',
  status: 'STATUS_SCHEDULED',
  date: new Date(Date.now() + 3 * 3600 * 1000).toISOString(),
  home_team: { id: '1', name: 'Miami Heat',     abbreviation: 'MIA' },
  away_team: { id: '2', name: 'Boston Celtics', abbreviation: 'BOS' },
  home_score: null,
  away_score: null,
  my_line: 218.4,
  dk_line: 213.5,
  discrepancy: 4.9,
  z_score: 1.12,
  confidence: 'MEDIUM',
  expected_value: 0.3120,
  win_probability: 86.8,
  recommendation: 'O',
  line_movement: { from: 211.5, to: 213.5 },
  components: { homeOff: 108.2, homeDef: 110.1, awayOff: 114.3, awayDef: 109.8 },
};

const ANNOTATIONS = [
  {
    label: 'Projected',
    text: "Our estimate of the total points, built from each team's recent offensive and defensive performance, weighted toward recent games.",
  },
  {
    label: 'DK Line',
    text: 'The DraftKings total line. "(was X ▲/▼)" shows the opening line and which direction it has moved since.',
  },
  {
    label: 'Gap',
    text: 'How far our projection differs from the market line. Positive = leaning over, negative = leaning under.',
  },
  {
    label: 'Confidence (HIGH / MEDIUM / LOW)',
    text: 'How consistent the underlying data is. A big gap with noisy data is still LOW. Driven by the z-score — the gap relative to variance in the data.',
  },
  {
    label: '▲ OVER / ▼ UNDER',
    text: "The model's directional call. Only shown when the z-score and EV both clear the minimum thresholds. Faded when confidence is LOW.",
  },
  {
    label: 'NO BET',
    text: "The model sees a lean but doesn't trust its own data enough to recommend acting. Shown instead of OVER/UNDER when the edge is below threshold.",
  },
  {
    label: 'Win %',
    text: 'Estimated probability the bet wins, derived from the z-score. Higher = stronger signal. Treat as relative, not as a precise prediction. Muted when confidence is LOW.',
  },
  {
    label: 'EV',
    text: 'Expected profit or loss per $100 bet if this exact situation played out hundreds of times. Positive = mathematically favorable at -110 odds. Muted when confidence is LOW.',
  },
  {
    label: 'Off / Def (Team Breakdown)',
    text: "Each team's recent avg points scored (Off) and allowed (Def), weighted toward recent games. Cross-matched against tonight's opponent to produce the projection.",
  },
];

const MATH = [
  {
    label: 'Variance',
    text: "How much a team's scoring bounces around game to game. A team that scores 108, 112, 110, 109, 111 is low variance. A team that scores 95, 130, 102, 125, 108 is high variance — same average, very different predictability. Higher variance means we trust our projection less.",
  },
  {
    label: 'Z-Score',
    text: "Combines the gap and the variance into one number. It asks: how big is the disagreement with the market, relative to how noisy our data is? A 5-point gap means a lot when the data is tight, and almost nothing when the data is all over the place. Higher z-score = stronger signal.",
  },
  {
    label: 'Expected Value (EV)',
    text: "If you placed this exact bet 1,000 times, EV is your average profit or loss per bet. Positive EV means the math favors you over time. It doesn't mean you'll win this specific bet — it means the pattern is profitable if repeated at -110 odds.",
  },
  {
    label: 'Confidence Tiers',
    text: "The z-score translated into plain language. HIGH means a large z-score (big gap, consistent data). MEDIUM is moderate. LOW means the signal is weak — the numbers still show up but are muted so you don't anchor on them. NO BET means the z-score is too small to act on regardless of direction.",
  },
];

export default function HowToReadOverlay({ onClose }) {
  const [tab, setTab] = useState('read');

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const tabCls = (t) =>
    t === tab
      ? 'px-4 py-1 rounded-full text-xs font-bold font-cinzel border border-verdigris/40 bg-verdigris/20 text-verdigris transition-colors'
      : 'px-4 py-1 rounded-full text-xs font-bold font-cinzel border border-transparent text-ghostWhite/40 hover:text-ghostWhite/70 transition-colors';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-spaceCadet/70 overflow-y-auto py-8"
      onClick={onClose}
    >
      <div
        className="relative bg-spaceCadet rounded-2xl shadow-2xl ring-1 ring-ghostWhite/20 p-6 mx-4 w-full max-w-4xl flex flex-col gap-5"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button className={tabCls('read')} onClick={() => setTab('read')}>How to Read</button>
            <button className={tabCls('math')} onClick={() => setTab('math')}>The Math</button>
          </div>
          <button
            onClick={onClose}
            className="text-ghostWhite/50 hover:text-ghostWhite transition-colors text-xl leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Tab 1: How to Read */}
        {tab === 'read' && (
          <div className="flex gap-6 items-start">
            <div className="w-80 flex-shrink-0">
              <p className="text-xs text-ghostWhite/40 font-cinzel uppercase tracking-widest mb-2">Sample card</p>
              <div className="rounded-2xl ring-1 ring-ghostWhite/20">
                <NbaGameCard game={FAKE_GAME} defaultExpanded={true} />
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <p className="text-xs text-ghostWhite/40 font-cinzel uppercase tracking-widest mb-1">What each field means</p>
              {ANNOTATIONS.map((a, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-verdigris/20 text-verdigris text-xs font-bold font-cinzel flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <span className="text-ghostWhite text-sm font-semibold">{a.label}</span>
                    <span className="text-ghostWhite/60 text-sm"> — {a.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: The Math */}
        {tab === 'math' && (
          <div className="flex flex-col gap-5 max-w-2xl">
            <p className="text-xs text-ghostWhite/40 font-cinzel uppercase tracking-widest">Concepts behind the model</p>
            {MATH.map((m, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-naplesYellow text-sm font-bold font-cinzel">{m.label}</span>
                <p className="text-ghostWhite/70 text-sm leading-relaxed">{m.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
