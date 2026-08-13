/* ============================================================
   0. IMPORTS
   ============================================================ */

import { useEffect, useRef, useState } from 'react';

import { GRAPH } from '../content/site.js';
import './PropagationGraph.css';

/* ============================================================
   1. GRAPH DATA
   ============================================================ */

/* Radius falls monotonically with x: magnitude attenuating as it propagates
   outward from the origin node. Positions are hand-placed, not solved.
   `drift` and `phase` set each node's idle wander (see section 2). */
const NODES = [
  { id: 'n1', x: 92, y: 184, r: 54, drift: 2.4, phase: 0.0 },
  { id: 'n2', x: 208, y: 64, r: 35, drift: 3.6, phase: 1.7 },
  { id: 'n3', x: 226, y: 302, r: 28, drift: 4.1, phase: 3.2 },
  { id: 'n4', x: 338, y: 170, r: 20, drift: 5.2, phase: 0.8 },
  { id: 'n5', x: 356, y: 322, r: 14, drift: 6.0, phase: 4.6 },
  { id: 'n6', x: 462, y: 86, r: 10, drift: 6.8, phase: 2.4 },
  { id: 'n7', x: 490, y: 248, r: 7, drift: 7.4, phase: 5.5 },
];

/* Ten of the twenty-one possible pairs. A complete graph would say nothing
   about dependency, which is the whole point of drawing one. Each pair is
   ordered origin-ward first, so pulses travel outward along it. */
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

/* Edges from a node one hop out start their pulse one beat later, so the
   wave reads as spreading rather than firing everywhere at once. */
const HOP = { n1: 0, n2: 1, n3: 1, n4: 1, n5: 2, n6: 2, n7: 2 };

const INDEX_BY_ID = Object.fromEntries(NODES.map((node, i) => [node.id, i]));

/* ============================================================
   2. MOTION
   ============================================================ */

const PULSE_BEAT_S = 0.5;

/* Slow enough that no node ever appears to be travelling somewhere. */
const DRIFT_RATE = 0.24;

/** Ids of every node one edge away from `id`, plus `id` itself. */
function neighbourhoodOf(id) {
  const ids = new Set([id]);

  for (const [from, to] of EDGES) {
    if (from === id) ids.add(to);
    if (to === id) ids.add(from);
  }

  return ids;
}

/** Each node's position at time `t` seconds, on its own Lissajous loop. */
function positionsAt(t) {
  return NODES.map((node) => ({
    x: node.x + Math.sin(t * DRIFT_RATE + node.phase) * node.drift,
    y: node.y + Math.cos(t * DRIFT_RATE * 0.78 + node.phase) * node.drift,
  }));
}

/* ============================================================
   3. COMPONENT
   ============================================================ */

/**
 * The hero's signature: a node-link network with one large origin node on the
 * left and magnitude attenuating to the right, edges skipping most pairs so it
 * reads as a dependency graph rather than a constellation.
 *
 * Three things make it move. The nodes drift continuously on slow independent
 * loops, so it reads as a model being run rather than a diagram. A pulse
 * travels outward from the origin along each edge, one beat per hop. Hovering
 * a node takes over: the ambient pulse stops, that node and its incident edges
 * light, and the rest of the graph drops back.
 *
 * The drift is driven from a rAF loop writing SVG attributes directly, because
 * edge endpoints have to track their nodes every frame and CSS cannot express
 * that relationship.
 */
export default function PropagationGraph() {
  const [hovered, setHovered] = useState(null);

  const nodeRefs = useRef([]);
  const edgeRefs = useRef([]);
  const pulseRefs = useRef([]);
  const coreRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const started = performance.now();

    const step = (now) => {
      const at = positionsAt((now - started) / 1000);

      at.forEach((point, i) => {
        nodeRefs.current[i]?.setAttribute('cx', point.x.toFixed(2));
        nodeRefs.current[i]?.setAttribute('cy', point.y.toFixed(2));
      });

      coreRef.current?.setAttribute('cx', at[0].x.toFixed(2));
      coreRef.current?.setAttribute('cy', at[0].y.toFixed(2));

      EDGES.forEach(([from, to], j) => {
        const a = at[INDEX_BY_ID[from]];
        const b = at[INDEX_BY_ID[to]];
        const d = `M${a.x.toFixed(2)} ${a.y.toFixed(2)} L${b.x.toFixed(2)} ${b.y.toFixed(2)}`;

        edgeRefs.current[j]?.setAttribute('d', d);
        pulseRefs.current[j]?.setAttribute('d', d);
      });

      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  const lit = hovered ? neighbourhoodOf(hovered) : null;

  return (
    <svg
      className={`graph${hovered ? ' graph--hovering' : ''}`}
      viewBox="0 0 540 380"
      role="img"
      aria-label={GRAPH.alt}
    >
      <g className="graph__edges" fill="none">
        {EDGES.map(([from, to], index) => {
          const a = NODES[INDEX_BY_ID[from]];
          const b = NODES[INDEX_BY_ID[to]];
          const d = `M${a.x} ${a.y} L${b.x} ${b.y}`;
          const isLit = hovered === from || hovered === to;

          return (
            <g key={`${from}-${to}`}>
              <path
                className={`graph__edge${isLit ? ' is-lit' : ''}`}
                ref={(el) => {
                  edgeRefs.current[index] = el;
                }}
                pathLength="1"
                d={d}
                style={{ animationDelay: `${0.3 + index * 0.07}s` }}
              />
              <path
                className="graph__pulse"
                ref={(el) => {
                  pulseRefs.current[index] = el;
                }}
                pathLength="1"
                d={d}
                style={{ animationDelay: `${1.6 + HOP[from] * PULSE_BEAT_S}s` }}
              />
            </g>
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
              ref={(el) => {
                nodeRefs.current[index] = el;
              }}
              cx={node.x}
              cy={node.y}
              r={node.r}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
            />
            {node.id === 'n1' && (
              <circle className="graph__core" ref={coreRef} cx={node.x} cy={node.y} r="9" />
            )}
          </g>
        ))}
      </g>
    </svg>
  );
}
