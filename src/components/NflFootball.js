import React, { useState } from "react";
import { Link } from "react-router-dom";
import QBSelect from "../components/QBSelect";


export default function NflFootball() {
    const [picked, setPicked] = useState(null);

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="text-center flex flex-col items-center gap-6">
                <h1 className="text-naplesYellow text-5xl font-bold">DUMMY FOOTBALL PAGE</h1>

                <div className="mx-auto max-w-md">
                    <QBSelect onPick={setPicked} />
                </div>

                {picked && (
                    <div className="text-sm text-verdigris">
                        Ready to analyze: <b>{picked.name}</b> ({picked.team})
                    </div>
                )}

                <Link to="/">
                    <button className="rounded-full px-8 py-2 mt-6 bg-bittersweet hover:bg-ghostWhite hover:text-verdigris">
                        Go Home
                    </button>
                 </Link>
            </div>
        </div>
    )
}