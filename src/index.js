import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import "./index.css"

import Layout from './components/Layout';
import BasketBall from './components/Basketball';
import NflFootball from './components/NflFootball';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<BasketBall />} />
        <Route path="/basketball" element={<BasketBall />} />
        <Route path="/nfl" element={<NflFootball />} />
        <Route path="/nfl-football" element={<Navigate to="/nfl" replace />} />
      </Route>
    </Routes>
  </Router>
);
