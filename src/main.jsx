/* ============================================================
   0. IMPORTS
   ============================================================ */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './styles/global.css';
import App from './App.jsx';

/* ============================================================
   1. MOUNT
   ============================================================ */

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
