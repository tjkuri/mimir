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
  let plays = game.lastSix.reduce(
    (acc, value) => {
      if (value > game.draftkings_line) {
        acc[0] += 1; // count for "over"
      } else if (value < game.draftkings_line) {
        acc[1] += 1; // count for "under"
      } else {
        acc[2] += 1; // count for "equal"
      }
      return acc;
    },
    [0, 0, 0] // Initial values for "over", "under", and "equal"
  );
  let play_display = o_u === 'O' ? `${plays[0]}-${plays[2]}-${plays[1]}`:`${plays[1]}-${plays[2]}-${plays[0]}`
  
  return (
      <tr className='text-bittersweet' key={game.id}>
            <td className="px-4">{game.visitor_team.abbreviation} @ {game.home_team.abbreviation}</td>
            <td className="px-4">{statusString}</td>
            <td className="px-4">{game.myLine}</td>
            <td className="px-4">{statusString == 'Final' ? '-' : game.draftkings_line}</td>
            <td className="px-4">{statusString == 'Final' ? '-' : Math.abs(game.myLine - game.draftkings_line).toFixed(2)}</td>
            <td className="px-4">{statusString == 'Final' ? '-' : o_u}</td>
            <td className="px-4">{statusString == 'Final' ? '-' : play_display}</td>
      </tr>
  );
}

