import React from 'react';
import ReactDOM from 'react-dom/client';
import TagManager from 'react-gtm-module';
import { App } from './App.tsx';
import './style.css';

TagManager.initialize({
  gtmId: 'GTM-P7HVP9K9',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
