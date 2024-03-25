import React from 'react';


export default function ClosedGameRow({ game }) { 
  let result = 'Unavailable'
  if(game.draftkings_line){
    const recommendOver = game.myLine >= game.draftkings_line
    if(recommendOver){
      result = game.home_team_score + game.visitor_team_score >= game.draftkings_line ? 'W' : 'L'
    }
    else{
      result = game.home_team_score + game.visitor_team_score < game.draftkings_line ? 'W' : 'L'
    }
  }
  return (
      <tr className='text-bittersweet' key={game.id}>
            <td className="px-4">{game.visitor_team.abbreviation} @ {game.home_team.abbreviation}</td>
            <td className="px-4">{String(game.home_team_score) + ' - ' + String(game.visitor_team_score)}</td>
            <td className="px-4">{game.home_team_score + game.visitor_team_score}</td>
            <td className="px-4">{game.myLine}</td>
            <td className="px-4">{game.draftkings_line ? game.draftkings_line : 'Unavailable'}</td>
            <td className="px-4">{result}</td>
      </tr>
  );
}
