import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import "./index.css"

import {Home} from './components/Home'
import {BasketBall} from './components/Basketball'


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className='h-screen bg-spaceCadet text-verdigris'>
  <Router>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/basketball" element={<BasketBall/>} />
    </Routes>
  </Router>
  </div>
);
