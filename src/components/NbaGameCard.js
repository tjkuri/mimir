import React from 'react';

function statusLabel(game) {
  if (game.status === 'STATUS_FINAL') return 'Final';
  if (game.status === 'STATUS_SCHEDULED') return 'Upcoming';
  if (game.status === 'STATUS_IN_PROGRESS') {
    const q = game.period <= 4 ? `Q${game.period}` : `OT${game.period - 4}`;
    return `Live · ${q}`;
  }
  return game.status_detail || game.status;
}

function RecBadge({ rec }) {
  if (!rec) return null;
  const isOver = rec === 'O';
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${isOver ? 'bg-verdigris text-white' : 'bg-bittersweet text-white'}`}>
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
  return <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${cls}`}>{text}</span>;
}

export default function NbaGameCard({ game }) {
  const isFinal = game.status === 'STATUS_FINAL';
  const label = statusLabel(game);

  return (
    <div className="bg-ghostWhite text-spaceCadet rounded-2xl shadow p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="font-bold text-lg">
          {game.away_team.abbreviation} @ {game.home_team.abbreviation}
        </span>
        <span className="text-xs text-spaceCadet/60 font-medium">{label}</span>
      </div>

      {(isFinal || game.status === 'STATUS_IN_PROGRESS') && game.home_score != null && (
        <div className="text-sm text-spaceCadet/80">
          {game.away_team.abbreviation} {game.away_score} – {game.home_score} {game.home_team.abbreviation}
          &nbsp;|&nbsp;Total: {(game.home_score ?? 0) + (game.away_score ?? 0)}
        </div>
      )}

      <hr className="border-spaceCadet/10" />

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-y-1 text-sm">
        <span className="text-spaceCadet/60">My line</span>
        <span className="font-mono font-semibold">{game.my_line ?? '—'}</span>

        <span className="text-spaceCadet/60">DK line</span>
        <span className="font-mono">{game.dk_line ?? '—'}</span>

        {!isFinal && game.discrepancy != null && (
          <>
            <span className="text-spaceCadet/60">Gap</span>
            <span className="font-mono flex items-center gap-2">
              {game.discrepancy > 0 ? '+' : ''}{game.discrepancy}
              <RecBadge rec={game.recommendation} />
            </span>
          </>
        )}

        {!isFinal && game.record != null && (
          <>
            <span className="text-spaceCadet/60">Record</span>
            <span className="font-mono">
              {game.record.wins}W · {game.record.pushes}P · {game.record.losses}L
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
    </div>
  );
}
