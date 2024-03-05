import React from 'react';
import ReactDOM from 'react-dom';

import "./index.css"

import {Welcome} from './components/WelcomePage'

ReactDOM.render(
    <div className="app">
      <Welcome/>        
    </div>
    ,document.getElementById('root')
);