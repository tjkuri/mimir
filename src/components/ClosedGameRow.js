import React from 'react';


export default function ClosedGameRow({ game }) { 
  return (
      <tr className='text-bittersweet' key={game.id}>
            <td className="px-4">{game.visitor_team.abbreviation} @ {game.home_team.abbreviation}</td>
            <td className="px-4">{String(game.home_team_score) + ' - ' + String(game.visitor_team_score)}</td>
            <td className="px-4">{game.home_team_score + game.visitor_team_score}</td>
            <td className="px-4">{game.myLine}</td>
            <td className="px-4">{game.draftkings_line ? game.draftkings_line : 'Couldnt find DK line'}</td>
            <td className="px-4">{'TBA'}</td>
      </tr>
  );
}
