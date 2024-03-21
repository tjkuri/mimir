import React from "react";
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBasketball } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <h1 className="text-naplesYellow text-5xl font-bold">MIMIR</h1>
                <p className=" text-verdigris text-5sm mt-3 px-8 pb-8">
                    Renowned for his unparalleled wisdom, the most knowledgable giant takes on the Vegas line setters.
                </p>
                <Link to="/basketball">
                    <button className="rounded-lg w-1/6 py-1 bg-bittersweet hover:bg-ghostWhite hover:text-verdigris">
                        <FontAwesomeIcon icon={faBasketball} />
                    </button>
                </Link>
            </div>
        </div>
    );
}
