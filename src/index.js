import React from 'react';
import ReactDOM from 'react-dom/client';

import "./index.css"

import {Home} from './components/Home'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className='h-screen bg-spaceCadet text-verdigris'>
    <Home />
  </div>
);