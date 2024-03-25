import React from 'react';

function getStatus (game) {
  console.log(game)
  if (game.status == 'Final') { return 'Final'; }
  if (game.period == 0) { return 'Upcoming'; }
  return 'Qtr ' + game.period + ': ' + String(game.home_team_score) + ' - ' + String(game.visitor_team_score)
}

// TODO: Not sure if I want to move all of the (albiet very small) calculations here to the back end.
// If I dont need to refactor this to use better practices, dont want all the magic strings
export default function OpenGameRow({ game }) {
  const status = getStatus(game)
  let dkLine = false;
  let o_u = false;
  let play = false;
  if (status != 'Final') { 
    dkLine = game.bookmakers[0].markets[0].outcomes[0].point
    o_u = game.myLine >= dkLine ? 'O' : 'U'
  }
  
  return (
      <tr className='text-bittersweet' key={game.id}>
            <td className="px-4">{game.visitor_team.abbreviation} @ {game.home_team.abbreviation}</td>
            <td className="px-4">{status}</td>
            <td className="px-4">{game.myLine}</td>
            <td className="px-4">{status == 'Final' ? '-' : dkLine}</td>
            <td className="px-4">{status == 'Final' ? '-' : Math.abs(game.myLine - dkLine).toFixed(2)}</td>
            <td className="px-4">{status == 'Final' ? '-' : o_u}</td>
            <td className="px-4">{status == 'Final' ? '-' : play}</td>
      </tr>
  );
}

