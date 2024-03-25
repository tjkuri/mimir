import React from 'react';


export default function ClosedGameRow({ game }) { 
  const DKLine = game.bookmakers ? game.bookmakers[0].markets[0].outcomes[0].point : false
  return (
      <tr className='text-bittersweet' key={game.id}>
            <td className="px-4">{game.visitor_team.abbreviation} @ {game.home_team.abbreviation}</td>
            <td className="px-4">{String(game.home_team_score) + ' - ' + String(game.visitor_team_score)}</td>
            <td className="px-4">{game.home_team_score + game.visitor_team_score}</td>
            <td className="px-4">{game.myLine}</td>
            <td className="px-4">{DKLine ? DKLine : 'Couldnt find DK line'}</td>
            <td className="px-4">{'TBA'}</td>
      </tr>
  );
}
