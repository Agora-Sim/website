/* ============================================================
   0. IMPORTS
   ============================================================ */

import './BlueprintBackground.css';

/* ============================================================
   1. COMPONENT
   ============================================================ */

/**
 * The page's blue field, in eight stacked layers.
 *
 * Bottom to top, in three groups. Base texture: the azulejo pattern in two
 * corners (top-right and, point-mirrored through the page centre, bottom-
 * left), a minor graph-paper grid, the major millimetre grid on top of it.
 * Ink, drawn on that texture: two sparse construction lines and an Anzac
 * registration mark at three of the page's four true corners (top-left is
 * bare — the navbar logo already owns that spot). Post-process, over the
 * assembled image: a depth vignette, then paper grain. Purely decorative —
 * it is fixed, non-interactive, and hidden from assistive tech.
 */
export default function BlueprintBackground() {
  return (
    <div className="blueprint" aria-hidden="true">
      <div className="blueprint__azulejo blueprint__azulejo--tr" />
      <div className="blueprint__azulejo blueprint__azulejo--bl" />
      <div className="blueprint__grid-minor" />
      <div className="blueprint__grid" />
      <div className="blueprint__lines" />
      <div className="blueprint__registration" />
      <div className="blueprint__fade" />
      <div className="blueprint__grain" />
    </div>
  );
}
