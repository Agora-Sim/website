/* ============================================================
   0. IMPORTS
   ============================================================ */

import './BlueprintBackground.css';

/* ============================================================
   1. COMPONENT
   ============================================================ */

/**
 * The page's blue field, in three stacked layers.
 *
 * Bottom to top: the azulejo pattern (masked to the top-right corner so it
 * reads as texture the drawn tile was lifted out of), the millimetre grid
 * across the full field, and a depth vignette. Purely decorative — it is
 * fixed, non-interactive, and hidden from assistive tech.
 */
export default function BlueprintBackground() {
  return (
    <div className="blueprint" aria-hidden="true">
      <div className="blueprint__azulejo" />
      <div className="blueprint__grid" />
      <div className="blueprint__fade" />
    </div>
  );
}
