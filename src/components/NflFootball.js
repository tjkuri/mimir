import React from "react";
import { Link } from 'react-router-dom';

export default function NflFootball() {

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="text-center">
                <h1 className="text-naplesYellow text-5xl font-bold">DUMMY FOOTBALL PAGE</h1>
        

                <Link to="/">
                    <button className="rounded-full px-8 py-2 mt-6 bg-bittersweet hover:bg-ghostWhite hover:text-verdigris">
                        Go Home
                    </button>
                 </Link>
            </div>
        </div>
    )
}