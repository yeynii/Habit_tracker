import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SimpleHabit from './components/simpleHabit';
import '@fortawesome/fontawesome-free/js/all.js';
import "./app.css";


ReactDOM.render(
  <React.StrictMode>
    <SimpleHabit />
  </React.StrictMode>,
  document.getElementById('root')
);