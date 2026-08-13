/* ============================================================
   0. IMPORTS
   ============================================================ */

import { GRAPH } from '../content/site.js';
import './PropagationGraph.css';

/* ============================================================
   1. COMPONENT
   ============================================================ */

/**
 * The hero's signature: a node-link network drawn as an engineering diagram —
 * one primary node on the left, magnitude attenuating to the right, edges that
 * skip most pairs so it reads as a dependency graph and not a constellation.
 *
 * Every stroke carries `pathLength="1"`, which lets one CSS rule animate the
 * plotter draw-in regardless of each path's real length.
 */
export default function PropagationGraph() {
  return (
    <svg className="graph" viewBox="0 0 460 410" role="img" aria-label={GRAPH.alt}>
      {/* --- Sheet frame --- */}
      <g className="graph__dims" fill="none">
        <path d="M40 72 H420 M40 344 H420 M40 72 V344 M420 72 V344" />
      </g>

      {/* --- Edges: sparse on purpose, ten of the twenty-one pairs --- */}
      <g className="graph__edges" fill="none">
        <path pathLength="1" d="M96 200 L186 112" />
        <path pathLength="1" d="M96 200 L198 296" />
        <path pathLength="1" d="M96 200 L290 186" />
        <path pathLength="1" d="M186 112 L290 186" />
        <path pathLength="1" d="M198 296 L290 186" />
        <path pathLength="1" d="M198 296 L300 316" />
        <path pathLength="1" d="M186 112 L388 122" />
        <path pathLength="1" d="M290 186 L388 122" />
        <path pathLength="1" d="M290 186 L398 252" />
        <path pathLength="1" d="M300 316 L398 252" />
      </g>

      {/* --- Nodes: filled so they occlude the edges running beneath --- */}
      <g className="graph__nodes">
        <circle className="graph__node graph__node--primary" cx="96" cy="200" r="42" />
        <circle className="graph__core" cx="96" cy="200" r="8" />
        <circle className="graph__node" cx="186" cy="112" r="27" />
        <circle className="graph__node" cx="198" cy="296" r="21" />
        <circle className="graph__node" cx="290" cy="186" r="15" />
        <circle className="graph__node" cx="300" cy="316" r="11" />
        <circle className="graph__node" cx="388" cy="122" r="8" />
        <circle className="graph__node" cx="398" cy="252" r="5.5" />
      </g>

      {/* --- Datum points --- */}
      <g className="graph__datum">
        <circle cx="40" cy="72" r="3.5" />
        <circle cx="420" cy="72" r="3.5" />
        <circle cx="40" cy="344" r="3.5" />
        <circle cx="420" cy="344" r="3.5" />
      </g>

      {/* --- Annotations --- */}
      <g className="graph__label">
        <text x="230" y="50" textAnchor="middle">
          {GRAPH.top}
        </text>
        <text x="18" y="208" textAnchor="middle" transform="rotate(-90 18 208)">
          {GRAPH.side}
        </text>
        <text x="96" y="270" textAnchor="middle">
          {GRAPH.primary}
        </text>
        <text x="230" y="398" textAnchor="middle">
          {GRAPH.bottom}
        </text>
      </g>
    </svg>
  );
}
