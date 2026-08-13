/* ============================================================
   0. IMPORTS
   ============================================================ */

import { useState } from 'react';

import { GRAPH } from '../content/site.js';
import './PropagationGraph.css';

/* ============================================================
   1. GRAPH DATA
   ============================================================ */

/* Radius falls monotonically with x: magnitude attenuating as it propagates
   outward from the origin node. Positions are hand-placed, not solved. */
const NODES = [
  { id: 'n1', x: 86, y: 180, r: 52 },
  { id: 'n2', x: 196, y: 62, r: 34 },
  { id: 'n3', x: 214, y: 296, r: 27 },
  { id: 'n4', x: 322, y: 166, r: 19 },
  { id: 'n5', x: 340, y: 316, r: 14 },
  { id: 'n6', x: 440, y: 84, r: 10 },
  { id: 'n7', x: 466, y: 242, r: 7 },
];

/* Ten of the twenty-one possible pairs. A complete graph would say nothing
   about dependency, which is the whole point of drawing one. */
const EDGES = [
  ['n1', 'n2'],
  ['n1', 'n3'],
  ['n1', 'n4'],
  ['n2', 'n4'],
  ['n3', 'n4'],
  ['n3', 'n5'],
  ['n2', 'n6'],
  ['n4', 'n6'],
  ['n4', 'n7'],
  ['n5', 'n7'],
];

const NODE_BY_ID = Object.fromEntries(NODES.map((node) => [node.id, node]));

/* ============================================================
   2. HELPERS
   ============================================================ */

/** Ids of every node one edge away from `id`, plus `id` itself. */
function neighbourhoodOf(id) {
  const ids = new Set([id]);

  for (const [from, to] of EDGES) {
    if (from === id) ids.add(to);
    if (to === id) ids.add(from);
  }

  return ids;
}

/* ============================================================
   3. COMPONENT
   ============================================================ */

/**
 * The hero's signature: a node-link network with one large origin node on the
 * left and magnitude attenuating to the right, edges skipping most pairs so it
 * reads as a dependency graph rather than a constellation.
 *
 * Hovering a node lifts it and its incident edges and dims the rest, so the
 * figure answers a question — what does this one touch — instead of just
 * decorating. Edges carry `pathLength="1"` so a single CSS rule can draw every
 * one of them in regardless of its real length.
 */
export default function PropagationGraph() {
  const [hovered, setHovered] = useState(null);

  const lit = hovered ? neighbourhoodOf(hovered) : null;

  return (
    <svg
      className={`graph${hovered ? ' graph--hovering' : ''}`}
      viewBox="0 0 520 360"
      role="img"
      aria-label={GRAPH.alt}
    >
      <g className="graph__edges" fill="none">
        {EDGES.map(([from, to], index) => {
          const a = NODE_BY_ID[from];
          const b = NODE_BY_ID[to];
          const isLit = hovered === from || hovered === to;

          return (
            <path
              className={`graph__edge${isLit ? ' is-lit' : ''}`}
              key={`${from}-${to}`}
              pathLength="1"
              d={`M${a.x} ${a.y} L${b.x} ${b.y}`}
              style={{ animationDelay: `${0.3 + index * 0.07}s` }}
            />
          );
        })}
      </g>

      <g className="graph__nodes">
        {NODES.map((node, index) => (
          /* The wrapper owns the draw-in so hover is free to drive the
             circle's own opacity and scale without the two colliding. */
          <g
            className="graph__pop"
            key={node.id}
            style={{ animationDelay: `${0.45 + index * 0.09}s` }}
          >
            <circle
              className={[
                'graph__node',
                node.id === 'n1' ? 'graph__node--origin' : '',
                lit && !lit.has(node.id) ? 'is-dim' : '',
                hovered === node.id ? 'is-lit' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              cx={node.x}
              cy={node.y}
              r={node.r}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
            />
            {node.id === 'n1' && (
              <circle className="graph__core" cx={node.x} cy={node.y} r="9" />
            )}
          </g>
        ))}
      </g>
    </svg>
  );
}
