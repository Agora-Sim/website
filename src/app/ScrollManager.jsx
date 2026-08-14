/* ============================================================
   0. IMPORTS
   ============================================================ */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/* ============================================================
   1. COMPONENT
   ============================================================ */

/**
 * Restores the scroll position the browser would have handled on its own if
 * these were separate documents: a route change lands at the top, and a
 * route carrying a hash lands on that section.
 *
 * The browser cannot do the hash itself here — the target section is
 * rendered by React after the URL has already changed, so by the time the
 * element exists the navigation is over. Jumps are instant rather than
 * smooth: `global.css` sets `scroll-behavior: smooth` for in-page anchors,
 * but animating the arrival at a page the reader has just navigated to
 * reads as a glitch.
 *
 * Renders nothing.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    const target = document.querySelector(hash);
    if (target) target.scrollIntoView({ behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}
