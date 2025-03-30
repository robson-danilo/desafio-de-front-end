import { StrictMode } from 'react';
import './index.css'
import App from './App.jsx'
import { setup } from '@twind/core';
import config from '../twind.config.js';
import ReactDOM from 'react-dom';
setup(config);

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
