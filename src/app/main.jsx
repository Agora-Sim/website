/* ============================================================
   0. IMPORTS
   ============================================================ */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import '@/assets/styles/global.css';
import App from '@/app/App.jsx';

/* ============================================================
   1. MOUNT
   ============================================================ */

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
