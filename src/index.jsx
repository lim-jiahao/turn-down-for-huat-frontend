import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import { TotoProvider } from './store.jsx';

ReactDOM.render(
  <React.StrictMode>
    <TotoProvider>
      <App />
    </TotoProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
