import React from 'react';

import ClosedGameRow from './ClosedGameRow';

export default function ClosedGames({ games }) {
    return (
        <table className="table-auto">
            <thead className='text-naplesYellow border-b border-neutral-200'>
                <tr>
                    <th className="px-4">Match-Up</th>
                    <th className="px-4">Final Score</th>
                    <th className="px-4">Total</th>
                    <th className="px-4">My Line </th>
                    <th className="px-4">Draftkings Line</th>
                    <th className="px-4">Result</th>
                </tr>
            </thead>
            <tbody>
                {games.map((game) => (<ClosedGameRow key={game.id} game={game} />))}
            </tbody>
        </table>
    );
}