import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import "./index.css"

import Home from './components/Home'
import BasketBall from './components/Basketball'
import NflFootball from './components/NflFootball'


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className='h-screen bg-spaceCadet'>
  <Router>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/basketball" element={<BasketBall/>} />
        <Route path="/nfl-football" element={<NflFootball/>} />
    </Routes>
  </Router>
  </div>
);
