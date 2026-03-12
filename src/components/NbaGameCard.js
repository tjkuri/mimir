import React, { useState, useEffect } from 'react';

function statusLabel(game) {
  if (game.status === 'STATUS_FINAL') return 'Final';
  if (game.status === 'STATUS_IN_PROGRESS') {
    const q = game.period <= 4 ? `Q${game.period}` : `OT${game.period - 4}`;
    return `Live · ${q}`;
  }
  return null; // scheduled — handled by countdown
}

function formatCountdown(dateStr) {
  const diff = new Date(dateStr) - Date.now();
  if (diff <= 0) return 'Starting soon';
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  return h > 0 ? `Tips off in ${h}h ${m}m` : `Tips off in ${m}m`;
}

function Countdown({ dateStr }) {
  const [label, setLabel] = useState(() => formatCountdown(dateStr));
  useEffect(() => {
    const id = setInterval(() => setLabel(formatCountdown(dateStr)), 60000);
    return () => clearInterval(id);
  }, [dateStr]);
  return <span className="text-xs text-spaceCadet/60 font-medium">{label}</span>;
}

function InfoTip({ text }) {
  return (
    <span className="relative group cursor-help inline-block ml-1">
      <span className="text-spaceCadet/30 text-xs">ⓘ</span>
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-48 p-2 text-xs
        bg-spaceCadet text-ghostWhite rounded-lg shadow-lg
        opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 text-left">
        {text}
      </span>
    </span>
  );
}

function ConfidenceBadge({ confidence }) {
  if (!confidence) return null;
  const cls = confidence === 'HIGH'   ? 'bg-verdigris text-white'
            : confidence === 'MEDIUM' ? 'bg-saffron text-spaceCadet'
            : 'bg-spaceCadet/10 text-spaceCadet/40'; // LOW
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-bold font-cinzel ${cls}`}>
      {confidence}
    </span>
  );
}

function RecBadge({ rec, confidence }) {
  if (!rec || rec === 'NO_BET' || rec === 'P') return null;
  const isOver = rec === 'O';
  const isLow = confidence === 'LOW';
  const cls = isOver
    ? (isLow ? 'bg-verdigris/40 text-white/70' : 'bg-verdigris text-white')
    : (isLow ? 'bg-bittersweet/40 text-white/70' : 'bg-bittersweet text-white');
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-bold font-cinzel ${cls}`}>
      {isOver ? '▲ OVER' : '▼ UNDER'}
    </span>
  );
}

function ResultBadge({ game }) {
  if (game.status !== 'STATUS_FINAL' || game.dk_line == null || game.my_line == null) return null;
  const actualTotal = (game.home_score ?? 0) + (game.away_score ?? 0);
  const push = actualTotal === game.dk_line;
  const wentOver = actualTotal > game.dk_line;
  const predictedOver = game.my_line >= game.dk_line;
  let text, cls;
  if (push) {
    text = 'Push'; cls = 'bg-gray-400 text-white';
  } else if ((predictedOver && wentOver) || (!predictedOver && !wentOver)) {
    text = 'W'; cls = 'bg-verdigris text-white';
  } else {
    text = 'L'; cls = 'bg-bittersweet text-white';
  }
  return <span className={`px-2 py-0.5 rounded-full text-xs font-bold font-cinzel ${cls}`}>{text}</span>;
}

function formatEV(ev) {
  if (ev == null) return null;
  const dollars = (ev * 100).toFixed(2);
  const isPos = dollars >= 0;
  return { label: `${isPos ? '+' : ''}$${dollars}`, positive: isPos };
}

export default function NbaGameCard({ game }) {
  const isFinal = game.status === 'STATUS_FINAL';
  const isScheduled = game.status === 'STATUS_SCHEDULED';
  const label = statusLabel(game);
  const [expanded, setExpanded] = useState(false);

  const rec = game.recommendation;
  const conf = game.confidence;

  const accentBorder =
    rec === 'O' && conf === 'HIGH'   ? 'border-l-4 border-verdigris'
    : rec === 'O' && conf === 'MEDIUM' ? 'border-l-4 border-verdigris/60'
    : rec === 'O'                      ? 'border-l-4 border-verdigris/20'
    : rec === 'U' && conf === 'HIGH'   ? 'border-l-4 border-bittersweet'
    : rec === 'U' && conf === 'MEDIUM' ? 'border-l-4 border-bittersweet/60'
    : rec === 'U'                      ? 'border-l-4 border-bittersweet/20'
    : rec === 'P'                      ? 'border-l-4 border-ghostWhite/30'
    : 'border-l-4 border-ghostWhite/10';

  const dimmed = rec === 'NO_BET' ? 'opacity-70' : '';

  const ev = formatEV(game.expected_value);

  return (
    <div className={`bg-ghostWhite text-spaceCadet rounded-2xl shadow p-4 flex flex-col gap-3 ${accentBorder} ${dimmed}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="font-bold text-lg">
          {game.away_team.abbreviation} @ {game.home_team.abbreviation}
        </span>
        {isScheduled && game.date
          ? <Countdown dateStr={game.date} />
          : <span className="text-xs text-spaceCadet/60 font-medium">{label}</span>
        }
      </div>

      {/* Live / final score */}
      {!isScheduled && game.home_score != null && (
        <div className="text-sm text-spaceCadet/80">
          {game.away_team.abbreviation} {game.away_score} – {game.home_score} {game.home_team.abbreviation}
          &nbsp;|&nbsp;Total: {(game.home_score ?? 0) + (game.away_score ?? 0)}
        </div>
      )}

      <hr className="border-spaceCadet/10" />

      {/* Top stats row */}
      <div className="grid grid-cols-2 gap-y-1 text-sm">
        <span className="text-spaceCadet/60">Projected</span>
        <span className="font-mono font-semibold">{game.my_line ?? '—'}</span>

        <span className="text-spaceCadet/60">DK Line</span>
        <span className="font-mono flex items-center gap-2">
          {game.dk_line ?? '—'}
          {game.line_movement && (
            <span className="text-xs text-spaceCadet/50 whitespace-nowrap">
              (was {game.line_movement.from} {game.line_movement.to > game.line_movement.from ? '▲' : '▼'})
            </span>
          )}
        </span>

        {!isFinal && game.discrepancy != null && (
          <>
            <span className="text-spaceCadet/60">Gap</span>
            <span className="font-mono">
              {game.discrepancy > 0 ? '+' : ''}{game.discrepancy}
            </span>
          </>
        )}

        {isFinal && (
          <>
            <span className="text-spaceCadet/60">Result</span>
            <span><ResultBadge game={game} /></span>
          </>
        )}
      </div>

      {/* Signal row */}
      {!isFinal && (rec || game.win_probability != null || ev) && (
        <div className="flex items-center gap-2 flex-wrap">
          <ConfidenceBadge confidence={conf} />
          <RecBadge rec={rec} confidence={conf} />
          {rec === 'NO_BET' && (
            <span className="px-2 py-0.5 rounded-full text-xs font-bold font-cinzel bg-spaceCadet/10 text-spaceCadet/40">
              NO BET
            </span>
          )}
          {game.win_probability != null && (
            <span className={`text-xs flex items-center ${conf === 'LOW' ? 'text-spaceCadet/40' : 'text-spaceCadet/60'}`}>
              Win {game.win_probability}%
              <InfoTip text="Estimated probability this bet wins based on our z-score. Treat as relative, not absolute." />
            </span>
          )}
          {ev && (
            <span className={`text-xs font-mono font-semibold flex items-center ${conf === 'LOW' ? 'text-spaceCadet/40' : (ev.positive ? 'text-verdigris' : 'text-bittersweet')}`}>
              EV {ev.label}
              <InfoTip text="Expected profit per $100 bet over many bets. Positive = edge in your favor at standard -110 odds." />
            </span>
          )}
        </div>
      )}

      {/* Team breakdown (collapsible) */}
      {!isFinal && game.components && (
        <div className="text-xs">
          <button
            onClick={() => setExpanded(e => !e)}
            className="text-spaceCadet/50 hover:text-spaceCadet transition-colors"
          >
            {expanded ? '▾' : '▸'} Team Breakdown
          </button>
          {expanded && (
            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
              <span className="font-semibold text-spaceCadet/70">{game.home_team.abbreviation} (home)</span>
              <span className="font-semibold text-spaceCadet/70">{game.away_team.abbreviation} (away)</span>

              <span className="text-spaceCadet/60 flex items-center">
                Off {game.components.homeOff?.toFixed(1) ?? '—'}
                <InfoTip text="Avg points scored per game across all recent games (home + away). Home court adjustment applied separately." />
              </span>
              <span className="text-spaceCadet/60 flex items-center">
                Off {game.components.awayOff?.toFixed(1) ?? '—'}
                <InfoTip text="Avg points scored per game across all recent games (home + away). Home court adjustment applied separately." />
              </span>

              <span className="text-spaceCadet/60 flex items-center">
                Def {game.components.homeDef?.toFixed(1) ?? '—'}
                <InfoTip text="Avg points allowed per game across all recent games (home + away). Home court adjustment applied separately." />
              </span>
              <span className="text-spaceCadet/60 flex items-center">
                Def {game.components.awayDef?.toFixed(1) ?? '—'}
                <InfoTip text="Avg points allowed per game across all recent games (home + away). Home court adjustment applied separately." />
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
