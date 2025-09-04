import React from "react";

function Row({ label, value, hint }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-sm">
        <span className="text-verdigris font-semibold">{value}</span>
        {hint ? <span className="ml-2 text-gray-500">{hint}</span> : null}
      </div>
    </div>
  );
}

export default function OddsCard({ odds, event }) {
  if (!odds) return null;

  const noMarket = odds.no_upcoming_game || odds.book_count === 0 || odds.consensus_line == null;

  return (
    <div className="rounded-2xl p-4 shadow bg-ghostWhite text-spaceCadet border border-ghostWhite/30 w-full max-w-2xl">
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold">QB Passing Yards (market)</div>
        {noMarket ? (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">no market</span>
        ) : (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-verdigris/15 text-verdigris">
            {odds.book_count} book{odds.book_count === 1 ? "" : "s"}
          </span>
        )}
      </div>

      {event ? (
        <div className="text-xs text-gray-500 mb-2">
          {event.away_team} @ {event.home_team} • {event.commence_time}
        </div>
      ) : (
        <div className="text-xs text-gray-500 mb-2">No upcoming game scheduled</div>
      )}

      <div className="space-y-1">
        <Row label="Consensus line" value={noMarket ? "—" : `${odds.consensus_line} yds`} />
        <Row label="Range (min–max)" value={noMarket ? "—" : `${odds.points_min} – ${odds.points_max}`} hint={noMarket ? "" : `Δ ${odds.points_range}`} />
        <Row label="IQR (Q1–Q3)" value={noMarket ? "—" : `${odds.points_q1} – ${odds.points_q3}`} hint={noMarket ? "" : `IQR ${odds.points_iqr}`} />
        <div className="text-xs text-gray-500">as of: {odds.as_of || "—"}</div>
      </div>

      {!noMarket && odds.books?.length ? (
        <div className="mt-3">
          <div className="text-xs font-semibold mb-1">Books</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {odds.books.slice(0, 6).map((b) => (
              <div key={`${b.book}-${b.point}`} className="text-xs rounded-lg border px-2 py-1 bg-white">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{b.book_title || b.book}</span>
                  <span className="text-verdigris">{b.point}</span>
                </div>
                <div className="text-[10px] text-gray-600">O {b.price_over ?? "—"} • U {b.price_under ?? "—"}</div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
