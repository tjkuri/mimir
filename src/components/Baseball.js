import React, { useState, useCallback } from "react";
import axios from 'axios';
import { YGGDRASIL_URL } from '../config';

export default function Baseball() {
  const [days, setDays] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOdds = useCallback((refresh = false) => {
    setIsLoading(true);
    const url = YGGDRASIL_URL + '/api/mlb/odds' + (refresh ? '?refreshOdds=true' : '');
    return axios.get(url)
      .then(res => { setDays(res.data.days); setError(null); })
      .catch(err => { console.error(err); setError(err); })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-naplesYellow text-5xl font-bold font-cinzel tracking-wide">MLB Odds Logger</h1>
      <p className="text-ghostWhite/50 text-sm font-cinzel">
        Collecting pre-game DraftKings lines (h2h, totals, spreads) for backtesting
      </p>

      <div className="flex items-center gap-3">
        <button
          className="rounded-full px-5 py-1.5 text-sm font-cinzel bg-saffron text-white hover:bg-saffronDark disabled:opacity-50"
          onClick={() => fetchOdds(true)}
          disabled={isLoading}
        >
          {isLoading ? 'Caching...' : 'Cache MLB Odds'}
        </button>
      </div>

      {error && (
        <p className="text-red-400 text-sm">Failed to fetch: {error.message}</p>
      )}

      {days && days.map(day => (
        <div key={day.date} className="w-full max-w-2xl bg-spaceCadet/50 rounded-lg p-6 border border-ghostWhite/10">
          <div className="flex justify-between text-sm text-ghostWhite/70 mb-2">
            <span className="text-naplesYellow font-cinzel">{day.date}</span>
            <span>{day.game_count} games</span>
            <span>Opening: {day.has_opening_snapshot ? 'Yes' : 'No'}</span>
          </div>
          {day.cached_at && (
            <p className="text-xs text-ghostWhite/40 mb-3">
              Last cached: {new Date(day.cached_at).toLocaleString()}
            </p>
          )}
          {day.games.length > 0 ? (
            <div className="space-y-1">
              {day.games.map(game => (
                <div key={game.id} className="flex justify-between text-sm text-ghostWhite/80 py-1 border-b border-ghostWhite/5">
                  <span>{game.away_team} @ {game.home_team}</span>
                  <span className="text-ghostWhite/50">
                    {new Date(game.commence_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-ghostWhite/40 text-sm text-center">No future games found</p>
          )}
        </div>
      ))}
    </div>
  );
}
