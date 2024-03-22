import React from 'react';

export default function NbaTotals({ game }) {
  return (
    <div className="card m-2 p-2 shadow-md">
      <h2 className="text-center font-bold">{`${game.home_team.full_name} vs ${game.visitor_team.full_name}`}</h2>
      {/* Display additional stats based on your API data */}
      <p>My Line {game.myLine}</p>
    </div>
  );
}

