import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';

import { YGGDRASIL_URL } from '../config';
import NbaGameCard from './NbaGameCard';
import HowToReadOverlay from './HowToReadOverlay';

export default function BasketBall() {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const fetchGames = useCallback((refreshOdds = false) => {
    const url = YGGDRASIL_URL + '/api/nba/totals' + (refreshOdds ? '?refreshOdds=true' : '');
    return axios.get(url)
      .then(res => { setGames(res.data); setError(null); })
      .catch(err => { console.error(err); setError(err); });
  }, []);

  useEffect(() => {
    fetchGames().finally(() => setIsLoading(false));
  }, [fetchGames]);

  function handleRefreshOdds() {
    setIsRefreshing(true);
    fetchGames(true).finally(() => setIsRefreshing(false));
  }

  const openGames = games.filter(g => g.status !== 'STATUS_FINAL');
  const closedGames = games.filter(g => g.status === 'STATUS_FINAL');

  return (
    <div className="flex flex-col items-center gap-6">
      {showOverlay && <HowToReadOverlay onClose={() => setShowOverlay(false)} />}
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-naplesYellow text-5xl font-bold font-cinzel tracking-wide">NBA Totals</h1>
        <div className="flex items-center gap-3">
          <button
            className="rounded-full px-5 py-1.5 text-sm font-cinzel bg-saffron text-white hover:bg-saffronDark disabled:opacity-50"
            onClick={handleRefreshOdds}
            disabled={isLoading || isRefreshing}
          >
            {isRefreshing ? 'Refreshing…' : 'Refresh Odds'}
          </button>
          <button
            className="rounded-full px-3 py-1.5 text-sm font-cinzel border border-ghostWhite/20 text-ghostWhite/50 hover:text-ghostWhite hover:border-ghostWhite/40 transition-colors"
            onClick={() => setShowOverlay(true)}
            aria-label="How to read"
          >
            ?
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-24">
          <div className="w-10 h-10 border-4 border-ghostWhite border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && <p className="text-bittersweet">Error: {error.message}</p>}

      {!isLoading && !error && (
        <>
          {openGames.length > 0 && (
            <section className="w-full max-w-5xl flex flex-col gap-3 px-4">
              <h2 className="text-naplesYellow text-xl font-semibold font-cinzel tracking-wide">Today&apos;s Games</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {openGames.map(g => <NbaGameCard key={g.id} game={g} />)}
              </div>
            </section>
          )}

          {closedGames.length > 0 && (
            <section className="w-full max-w-5xl flex flex-col gap-3 px-4 opacity-90">
              <h2 className="text-naplesYellow text-xl font-semibold font-cinzel tracking-wide">Final</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {closedGames.map(g => <NbaGameCard key={g.id} game={g} />)}
              </div>
            </section>
          )}

          {games.length === 0 && (
            <p className="text-ghostWhite/60">No NBA games today.</p>
          )}
        </>
      )}

    </div>
  );
}
