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
    : (isLow ? 'bg-bittersweet/60 text-white/80' : 'bg-bittersweet text-white');
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-bold font-cinzel ${cls}`}>
      {isOver ? '▲ OVER' : '▼ UNDER'}
    </span>
  );
}

const MIN_Z_THRESHOLD = 0.5;

function computeLineRec(projection, sdTotal, lineValue, actualTotal) {
  if (projection == null || lineValue == null) {
    return { rec: 'NO_BET', dot: 'gray' };
  }
  const gap = projection - lineValue;

  // Determine rec direction — fall back to simple gap sign if sdTotal is missing
  let rec;
  if (sdTotal == null || sdTotal === 0) {
    rec = gap > 0 ? 'OVER' : gap < 0 ? 'UNDER' : 'NO_BET';
  } else {
    const z = gap / sdTotal;
    if (Math.abs(z) < MIN_Z_THRESHOLD) return { rec: 'NO_BET', dot: 'gray' };
    rec = z > 0 ? 'OVER' : 'UNDER';
  }

  if (rec === 'NO_BET') return { rec: 'NO_BET', dot: 'gray' };

  if (rec === 'OVER') {
    const dot = actualTotal == null ? 'gray'
              : actualTotal > lineValue ? 'green'
              : actualTotal < lineValue ? 'red' : 'gray';
    return { rec: 'OVER', dot };
  }
  // UNDER
  const dot = actualTotal == null ? 'gray'
            : actualTotal < lineValue ? 'green'
            : actualTotal > lineValue ? 'red' : 'gray';
  return { rec: 'UNDER', dot };
}

function ResultDot({ dot }) {
  if (dot === 'gray') return null;
  const cls = dot === 'green' ? 'bg-hit' : 'bg-miss';
  return <span className={`inline-block w-3 h-3 rounded-full flex-shrink-0 ${cls}`} />;
}

function LineRow({ label, lineValue, projection, sdTotal, actualTotal }) {
  const { rec, dot } = computeLineRec(projection, sdTotal, lineValue, actualTotal);
  const recText = rec === 'OVER' ? '▲ OVER' : rec === 'UNDER' ? '▼ UNDER' : 'NO BET';
  return (
    <>
      <span className="text-spaceCadet/60">{label}</span>
      <span className="font-mono flex items-center gap-1.5">
        {lineValue}
        <span className="text-xs text-spaceCadet/50">{recText}</span>
        <ResultDot dot={dot} />
      </span>
    </>
  );
}

function formatEV(ev) {
  if (ev == null) return null;
  const dollars = (ev * 100).toFixed(2);
  const isPos = dollars >= 0;
  return { label: `${isPos ? '+' : ''}$${dollars}`, positive: isPos };
}

export default function NbaGameCard({ game, defaultExpanded = false }) {
  const isFinal = game.status === 'STATUS_FINAL';
  const isScheduled = game.status === 'STATUS_SCHEDULED';
  const label = statusLabel(game);
  const [expanded, setExpanded] = useState(defaultExpanded);

  const rec = game.recommendation;
  const conf = game.confidence;

  const actualTotal = isFinal ? (game.home_score ?? 0) + (game.away_score ?? 0) : null;
  const modelMiss = isFinal && game.my_line != null && actualTotal != null
    ? parseFloat((actualTotal - game.my_line).toFixed(1))
    : null;

  let accentBorder;
  if (isFinal && modelMiss != null) {
    const absMiss = Math.abs(modelMiss);
    accentBorder = absMiss < 5  ? 'border-l-4 border-hit/60'
                 : absMiss < 15 ? 'border-l-4 border-warnText/60'
                 :                'border-l-4 border-miss/80';
  } else {
    accentBorder =
      rec === 'O' && conf === 'HIGH'   ? 'border-l-4 border-verdigris'
      : rec === 'O' && conf === 'MEDIUM' ? 'border-l-4 border-verdigris/60'
      : rec === 'O'                      ? 'border-l-4 border-verdigris/20'
      : rec === 'U' && conf === 'HIGH'   ? 'border-l-4 border-bittersweet'
      : rec === 'U' && conf === 'MEDIUM' ? 'border-l-4 border-bittersweet/60'
      : rec === 'U'                      ? 'border-l-4 border-bittersweet/20'
      : rec === 'P'                      ? 'border-l-4 border-ghostWhite/30'
      : 'border-l-4 border-ghostWhite/10';
  }

  const dimmed = !isFinal && rec === 'NO_BET' ? 'opacity-70' : '';

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

        {!isFinal && (
          <>
            <span className="text-spaceCadet/60">DK Line</span>
            <span className="font-mono flex items-center gap-2">
              {game.dk_line ?? '—'}
              {game.line_movement && (
                <span className="text-xs text-spaceCadet/50 whitespace-nowrap">
                  (was {game.line_movement.from} {game.line_movement.to > game.line_movement.from ? '▲' : '▼'})
                </span>
              )}
            </span>
          </>
        )}

        {!isFinal && game.discrepancy != null && (
          <>
            <span className="text-spaceCadet/60">Gap</span>
            <span className="font-mono">
              {game.discrepancy > 0 ? '+' : ''}{game.discrepancy}
            </span>
          </>
        )}

        {isFinal && game.my_line != null && (
          <>
            {game.line_movement && game.line_movement.from !== game.dk_line ? (
              <>
                <LineRow
                  label="Opened"
                  lineValue={game.line_movement.from}
                  projection={game.my_line}
                  sdTotal={game.sd_total}
                  actualTotal={actualTotal}
                />
                <LineRow
                  label="Closed"
                  lineValue={game.dk_line}
                  projection={game.my_line}
                  sdTotal={game.sd_total}
                  actualTotal={actualTotal}
                />
              </>
            ) : (
              <LineRow
                label="DK Line"
                lineValue={game.dk_line}
                projection={game.my_line}
                sdTotal={game.sd_total}
                actualTotal={actualTotal}
              />
            )}

            <span className="text-spaceCadet/60">Actual</span>
            <span className="font-mono font-semibold">{actualTotal}</span>

            <span className="text-spaceCadet/60">Model miss</span>
            <span className={`font-mono font-bold ${Math.abs(modelMiss) < 5 ? 'text-hitText' : Math.abs(modelMiss) < 15 ? 'text-warnText' : 'text-missText'}`}>
              {modelMiss > 0 ? '+' : ''}{modelMiss}
            </span>
          </>
        )}
      </div>

      {/* Signal row */}
      {!isFinal && (rec || game.win_probability != null || ev) && (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <ConfidenceBadge confidence={conf} />
            <RecBadge rec={rec} confidence={conf} />
            {rec === 'NO_BET' && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold font-cinzel bg-spaceCadet/10 text-spaceCadet/40">
                NO BET
              </span>
            )}
            {game.win_probability != null && (
              <span className={`text-xs ${conf === 'LOW' ? 'text-spaceCadet/40' : 'text-spaceCadet/60'}`}>
                Win {game.win_probability}%
              </span>
            )}
          </div>
          {ev && (
            <span className={`text-xs font-mono font-semibold ${conf === 'LOW' ? 'text-spaceCadet/40' : (ev.positive ? 'text-verdigris' : 'text-bittersweet')}`}>
              EV {ev.label}
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

              <span className="text-spaceCadet/60">Off {game.components.homeOff?.toFixed(1) ?? '—'}</span>
              <span className="text-spaceCadet/60">Off {game.components.awayOff?.toFixed(1) ?? '—'}</span>
              <span className="text-spaceCadet/60">Def {game.components.homeDef?.toFixed(1) ?? '—'}</span>
              <span className="text-spaceCadet/60">Def {game.components.awayDef?.toFixed(1) ?? '—'}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
