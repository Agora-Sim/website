/* ============================================================
   0. IMPORTS
   ============================================================ */

import { PLATE } from '../content/site.js';
import './AzulejoPlate.css';

/* ============================================================
   1. COMPONENT
   ============================================================ */

/**
 * The hero's signature: one azulejo lifted out of the background pattern and
 * drawn as an engineering elevation — extension lines, dimension rules, Anzac
 * datum points at the corners, and a caption in the drawing's own register.
 *
 * Every stroke carries `pathLength="1"`, which lets one CSS rule animate the
 * plotter draw-in regardless of each path's real length.
 */
export default function AzulejoPlate() {
  return (
    <svg className="plate" viewBox="0 0 460 470" role="img" aria-label="Azulejo desenhado como peça técnica">
      {/* --- Extension and dimension lines --- */}
      <g className="plate__dims" fill="none">
        <path d="M40 40 H420 M40 420 H420 M40 40 V420 M420 40 V420" />
        <path d="M40 24 V56 M420 24 V56 M40 32 H420" />
        <path d="M24 40 H56 M24 420 H56 M32 40 V420" />
      </g>

      {/* --- The tile --- */}
      <g className="plate__draw" fill="none">
        <path pathLength="1" d="M230 40 L420 230 L230 420 L40 230 Z" />
        <path pathLength="1" d="M230 116 L344 230 L230 344 L116 230 Z" />
        <circle pathLength="1" cx="230" cy="230" r="42" />
        <circle pathLength="1" cx="230" cy="230" r="20" />
        <path pathLength="1" d="M40 130 A 100 100 0 0 0 130 40" />
        <path pathLength="1" d="M330 40 A 100 100 0 0 0 420 130" />
        <path pathLength="1" d="M420 330 A 100 100 0 0 0 330 420" />
        <path pathLength="1" d="M130 420 A 100 100 0 0 0 40 330" />
        <path pathLength="1" d="M230 40 L206 76 L254 76 Z" />
        <path pathLength="1" d="M230 420 L206 384 L254 384 Z" />
        <path pathLength="1" d="M40 230 L76 206 L76 254 Z" />
        <path pathLength="1" d="M420 230 L384 206 L384 254 Z" />
      </g>

      {/* --- Datum points --- */}
      <g className="plate__datum">
        <circle cx="40" cy="40" r="5" />
        <circle cx="420" cy="40" r="5" />
        <circle cx="40" cy="420" r="5" />
        <circle cx="420" cy="420" r="5" />
      </g>

      {/* --- Annotations --- */}
      <g className="plate__label">
        <text x="230" y="20" textAnchor="middle">
          {PLATE.top}
        </text>
        <text x="16" y="230" textAnchor="middle" transform="rotate(-90 16 230)">
          {PLATE.side}
        </text>
        <text x="230" y="452" textAnchor="middle">
          {PLATE.bottom}
        </text>
      </g>
    </svg>
  );
}
