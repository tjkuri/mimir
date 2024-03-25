import React from 'react';

function getStatus (game) {
  console.log(game)
  if (game.period == 0) { return 'Upcoming'; }
  return 'Qtr ' + game.period + ': ' + String(game.home_team_score) + ' - ' + String(game.visitor_team_score)
}

// TODO: Not sure if I want to move all of the (albiet very small) calculations here to the back end.
// If I dont need to refactor this to use better practices, dont want all the magic strings
export default function OpenGameRow({ game }) {
  const statusString = getStatus(game)
  let o_u = game.myLine >= game.draftkings_line ? 'O' : 'U';
  let play = false;
  
  return (
      <tr className='text-bittersweet' key={game.id}>
            <td className="px-4">{game.visitor_team.abbreviation} @ {game.home_team.abbreviation}</td>
            <td className="px-4">{statusString}</td>
            <td className="px-4">{game.myLine}</td>
            <td className="px-4">{statusString == 'Final' ? '-' : game.draftkings_line}</td>
            <td className="px-4">{statusString == 'Final' ? '-' : Math.abs(game.myLine - game.draftkings_line).toFixed(2)}</td>
            <td className="px-4">{statusString == 'Final' ? '-' : o_u}</td>
            <td className="px-4">{statusString == 'Final' ? '-' : play}</td>
      </tr>
  );
}

