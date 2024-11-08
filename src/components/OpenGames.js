import React from 'react';

import OpenGameRow from './OpenGameRow';

export default function OpenGames({ games }) {
    return (
        <table className="table-auto">
            <thead className='text-naplesYellow border-b border-neutral-200'>
                <tr>
                    <th className="px-4">Match-Up</th>
                    <th className="px-4">Status</th>
                    <th className="px-4">My Line</th>
                    <th className="px-4">Draftkings Line</th>
                    <th className="px-4">Discrepancy</th>
                    <th className="px-4">O/U</th>
                    <th className="px-4">Play (W-Push-L) </th>
                </tr>
            </thead>
            <tbody>
                {games.map((game) => (<OpenGameRow key={game.id} game={game} />))}
            </tbody>
        </table>
    );
}

