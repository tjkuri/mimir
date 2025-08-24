import React from "react";
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBasketball } from '@fortawesome/free-solid-svg-icons'
import { faFootball } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <h1 className="text-naplesYellow text-5xl font-bold">MIMIR</h1>
                <p className=" text-verdigris text-5sm mt-3 mb-3 px-8">
                    Renowned for his unparalleled wisdom, the most knowledgable giant takes on the Vegas line setters.
                </p>
                <div className="w-full grid grid-flow-col auto-cols-max justify-center gap-4">
                    <Link to="/basketball">
                        <button className="rounded-lg flex-none w-40 px-5 py-2 bg-bittersweet text-white hover:bg-ghostWhite hover:text-verdigris">
                            <FontAwesomeIcon icon={faBasketball} className="text-xl" />
                        </button>
                    </Link>

                    <Link to="/nfl-football">
                        <button className="rounded-lg flex-none w-40 px-5 py-2 bg-bittersweet text-white hover:bg-ghostWhite hover:text-verdigris">
                            <FontAwesomeIcon icon={faFootball} className="text-xl" />
                        </button>
                    </Link>
                 </div>
            </div>
        </div>
    );
}
