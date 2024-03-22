import React, { useState, useEffect } from "react";
import axios from 'axios';

import { motion } from "framer-motion"; //For loading bar

import { YGGDRASIL_URL } from '../config';  // Import backend address
import NbaTotals from './NbaTotals';

const variants = {
    initial: {
        scaleY: 0.5,
        opacity: 0,
    },
    animate: {
        scaleY: 1,
        opacity: 1,
        transition: {
            repeat: Infinity,
            repeatType: "mirror",
            duration: 1,
            ease: "circIn",
        },
    },
};

//Got the code for this loading bar from https://www.hover.dev/components/loaders
const BarLoader = () => {
    return (
        <motion.div
            transition={{
                staggerChildren: 0.25,
            }}
            initial="initial"
            animate="animate"
            className="flex gap-1"
        >
            <motion.div variants={variants} className="h-12 w-2 bg-ghostWhite" />
            <motion.div variants={variants} className="h-12 w-2 bg-ghostWhite" />
            <motion.div variants={variants} className="h-12 w-2 bg-ghostWhite" />
            <motion.div variants={variants} className="h-12 w-2 bg-ghostWhite" />
            <motion.div variants={variants} className="h-12 w-2 bg-ghostWhite" />
        </motion.div>
    );
};

export default function BasketBall() {
    const [games, setGames] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            axios.get(
                YGGDRASIL_URL + '/api/nba/totals'
            ).then(response => {
                setGames(response.data);
                setIsLoading(false)}
            ).catch(error => {
                console.error(error);
                setError(error)
            });
        }
        fetchData();
    }, []);

    return (
        <div className="flex justify-center items-center h-screen">
            {isLoading && <div className="grid place-content-center bg-violet-600 px-4 py-24">
                <BarLoader />
            </div>}
            {error && <p>Error: {error.message}</p>}
            {games && games.map((game) => (
                <NbaTotals key={game.id} game={game} />
            ))}
        </div>
    )
}