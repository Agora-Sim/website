/* ============================================================
   0. IMPORTS
   ============================================================ */

import { useEffect, useRef, useState } from 'react';

import { GRAPH } from '../../content.js';
import './PropagationGraph.css';

/* ============================================================
   1. PROJECTION
   ============================================================ */

/* Dimetric rather than true isometric: the vertical squash is gentler than
   0.577, so a node lying in the base plane still reads as a node. */
const ISO_X = 0.866;
const ISO_Y = 0.52;

/* The plane is large relative to the nodes on purpose: they have to sit
   inside the rhombus with clearance, radius included, or the model looks
   like it is falling off its own base. */
const PLANE = 300;
const RISE = 165;

/* Centres the projected extent inside the viewBox. */
const ORIGIN_X = 280;
const ORIGIN_Y = 185;

/* A circle of radius r lying in the ground plane projects to an ellipse.
   Substituting the projection into (cos t, sin t) gives
   (√2·ISO_X·cos u, √2·ISO_Y·sin u) — axis-aligned, no rotation needed. */
const ELLIPSE_X = Math.SQRT2 * ISO_X;
const ELLIPSE_Y = Math.SQRT2 * ISO_Y;

/** Plane coordinates and height to a point in the SVG's own space. */
function project(x, y, z) {
  return [ORIGIN_X + (x - y) * ISO_X, ORIGIN_Y + (x + y) * ISO_Y - z];
}

/** `M … L …` between two plane points at the same height. */
function segment(ax, ay, bx, by, z) {
  const [x1, y1] = project(ax, ay, z);
  const [x2, y2] = project(bx, by, z);
  return `M${x1.toFixed(2)} ${y1.toFixed(2)} L${x2.toFixed(2)} ${y2.toFixed(2)}`;
}

/** The vertical from a node up to its cell on the plane above. */
function riserAt(x, y) {
  const [x1, y1] = project(x, y, 0);
  const [x2, y2] = project(x, y, RISE);
  return `M${x1.toFixed(2)} ${y1.toFixed(2)} L${x2.toFixed(2)} ${y2.toFixed(2)}`;
}

/** The lines of one grid plane, drawn both ways across `PLANE`. */
function gridOf(z, divisions) {
  const step = PLANE / divisions;
  const lines = [];

  for (let i = 0; i <= divisions; i += 1) {
    const at = i * step;
    lines.push(segment(at, 0, at, PLANE, z));
    lines.push(segment(0, at, PLANE, at, z));
  }

  return lines;
}

/** The closed boundary of a plane, so it reads as a plate and not a haze. */
function outlineOf(z) {
  const corners = [
    project(0, 0, z),
    project(PLANE, 0, z),
    project(PLANE, PLANE, z),
    project(0, PLANE, z),
  ];

  return `M${corners.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join(' L')} Z`;
}

/** An axis-aligned square in a plane, as projected polygon points. */
function cellAt(x, y, half, z) {
  return [
    project(x - half, y - half, z),
    project(x + half, y - half, z),
    project(x + half, y + half, z),
    project(x - half, y + half, z),
  ]
    .map(([px, py]) => `${px.toFixed(2)},${py.toFixed(2)}`)
    .join(' ');
}

/* ============================================================
   2. GRAPH DATA
   ============================================================ */

/* All lengths are plane units, not screen pixels — `r` is the node's radius
   as it lies in the base plane, before projection flattens it. The six outer
   nodes sit on a ring around the origin at the plane's centre, at slightly
   different radii so the figure reads as drawn rather than plotted. */
/* Radius varies by a couple of units and no more: an attenuating scale said
   the origin mattered most, which the ring topology already says. */
const NODES = [
  { id: 'n1', x: 150, y: 150, r: 27, drift: 2.2, phase: 0.0 },
  { id: 'n2', x: 252, y: 150, r: 25, drift: 3.0, phase: 1.7 },
  { id: 'n3', x: 197.5, y: 232.3, r: 22.5, drift: 3.4, phase: 3.2 },
  { id: 'n4', x: 100, y: 236.6, r: 26, drift: 2.8, phase: 0.8 },
  { id: 'n5', x: 52, y: 150, r: 23, drift: 3.2, phase: 4.6 },
  { id: 'n6', x: 104, y: 70.3, r: 25.5, drift: 3.5, phase: 2.4 },
  { id: 'n7', x: 202, y: 59.9, r: 22.8, drift: 3.0, phase: 5.5 },
];

/* Nine of the twenty-one possible pairs. A complete graph would say nothing
   about dependency, which is the whole point of drawing one. Three spokes
   reach alternating points of the ring and the ring itself is left open in
   two places, so the figure is round without closing into a wheel. Each pair
   is ordered origin-ward first, so pulses travel outward along it. */
const EDGES = [
  ['n1', 'n2'],
  ['n1', 'n4'],
  ['n1', 'n6'],
  ['n2', 'n3'],
  ['n4', 'n3'],
  ['n4', 'n5'],
  ['n6', 'n5'],
  ['n6', 'n7'],
  ['n2', 'n7'],
];

/* Edges one hop out start their pulse a beat later, so the wave spreads
   rather than firing everywhere at once. Risers go last: the result only
   rises once the measure has reached that node. */
const HOP = { n1: 0, n2: 1, n4: 1, n6: 1, n3: 2, n5: 2, n7: 2 };

const INDEX_BY_ID = Object.fromEntries(NODES.map((node, i) => [node.id, i]));

const CELL_SCALE = 0.78;
const BASE_GRID = gridOf(0, 6);
const UPPER_GRID = gridOf(RISE, 4);

/* ============================================================
   3. DEPTH
   ============================================================ */

/* Viewing along (1,1,1), so x + y + z increases toward the camera. Painter's
   order is that key ascending: whatever is furthest goes down first.
   Drift never moves a node far enough to reorder the stack, so this is
   settled once at module load rather than every frame. */
function depthOf(node, z) {
  return node.x + node.y + z;
}

const MODEL_ORDER = NODES.flatMap((node, index) => [
  { kind: 'riser', index, depth: depthOf(node, RISE * 0.5) },
  { kind: 'node', index, depth: depthOf(node, 0) },
]).sort((a, b) => a.depth - b.depth);

const CELL_ORDER = NODES.map((node, index) => ({
  index,
  depth: depthOf(node, RISE),
}))
  .sort((a, b) => a.depth - b.depth)
  .map((item) => item.index);

/* ============================================================
   4. MOTION
   ============================================================ */

const PULSE_BEAT_S = 0.5;
const RISER_DELAY_S = 1.1;

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

/** Each node's plane position at time `t` seconds, on its own slow loop. */
function positionsAt(t) {
  return NODES.map((node) => ({
    x: node.x + Math.sin(t * DRIFT_RATE + node.phase) * node.drift,
    y: node.y + Math.cos(t * DRIFT_RATE * 0.78 + node.phase) * node.drift,
  }));
}

/* ============================================================
   5. COMPONENT
   ============================================================ */

/**
 * The hero's signature: an exploded axonometric of a simulation.
 *
 * The base plate carries the model — a dependency graph laid out as a ring
 * around one origin node, every node near enough the same size that structure
 * rather than magnitude is what the eye reads, edges skipping most pairs so it
 * reads as structure rather than a constellation. Above it, a second plate
 * holds the results: every node sends a riser up to a cell sized by its own
 * magnitude. That vertical move is the argument of the page, a measure
 * modelled below and its consequence read off above.
 *
 * Nodes are ellipses, not circles: they lie in the base plane and take the
 * same projection everything else does. Everything is painted back to front
 * by depth, so a node never covers a cell that is nearer the camera.
 *
 * Three things make it move. Nodes drift continuously on slow independent
 * loops, so it reads as a model being run rather than a diagram. A pulse
 * travels outward along the edges one beat per hop, then up the risers once
 * it arrives. Hovering a node takes over: the ambient pulse stops, that node
 * with its edges, riser and cell light, and the rest drops back.
 *
 * The drift is driven from a rAF loop writing SVG attributes directly,
 * because every derived shape has to track its node every frame and CSS
 * cannot express that relationship.
 */
export default function PropagationGraph() {
  const [hovered, setHovered] = useState(null);

  const nodeRefs = useRef([]);
  const riserRefs = useRef([]);
  const riserPulseRefs = useRef([]);
  const cellRefs = useRef([]);
  const edgeRefs = useRef([]);
  const edgePulseRefs = useRef([]);
  const coreRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const started = performance.now();

    const step = (now) => {
      const at = positionsAt((now - started) / 1000);

      at.forEach((point, i) => {
        const [bx, by] = project(point.x, point.y, 0);
        const riser = riserAt(point.x, point.y);

        nodeRefs.current[i]?.setAttribute('cx', bx.toFixed(2));
        nodeRefs.current[i]?.setAttribute('cy', by.toFixed(2));
        riserRefs.current[i]?.setAttribute('d', riser);
        riserPulseRefs.current[i]?.setAttribute('d', riser);
        cellRefs.current[i]?.setAttribute(
          'points',
          cellAt(point.x, point.y, NODES[i].r * CELL_SCALE, RISE),
        );
      });

      const [cx, cy] = project(at[0].x, at[0].y, 0);
      coreRef.current?.setAttribute('cx', cx.toFixed(2));
      coreRef.current?.setAttribute('cy', cy.toFixed(2));

      EDGES.forEach(([from, to], j) => {
        const a = at[INDEX_BY_ID[from]];
        const b = at[INDEX_BY_ID[to]];
        const d = segment(a.x, a.y, b.x, b.y, 0);

        edgeRefs.current[j]?.setAttribute('d', d);
        edgePulseRefs.current[j]?.setAttribute('d', d);
      });

      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  const lit = hovered ? neighbourhoodOf(hovered) : null;
  const dimClass = (id) => (lit && !lit.has(id) ? ' is-dim' : '');

  const renderRiser = (index) => {
    const node = NODES[index];
    const d = riserAt(node.x, node.y);

    return (
      <g key={`riser-${node.id}`}>
        <path
          className={`graph__riser${hovered === node.id ? ' is-lit' : ''}${dimClass(node.id)}`}
          ref={(el) => {
            riserRefs.current[index] = el;
          }}
          pathLength="1"
          d={d}
          style={{ animationDelay: `${1.1 + index * 0.06}s` }}
        />
        <path
          className="graph__pulse graph__pulse--riser"
          ref={(el) => {
            riserPulseRefs.current[index] = el;
          }}
          pathLength="1"
          d={d}
          style={{
            animationDelay: `${1.6 + HOP[node.id] * PULSE_BEAT_S + RISER_DELAY_S}s`,
          }}
        />
      </g>
    );
  };

  const renderNode = (index) => {
    const node = NODES[index];
    const [cx, cy] = project(node.x, node.y, 0);

    return (
      /* The wrapper owns the draw-in so hover is free to drive the ellipse's
         own opacity and scale without the two colliding. */
      <g
        className="graph__pop"
        key={`node-${node.id}`}
        style={{ animationDelay: `${0.45 + index * 0.09}s` }}
      >
        <ellipse
          className={[
            'graph__node',
            node.id === 'n1' ? 'graph__node--origin' : '',
            hovered === node.id ? 'is-lit' : '',
            lit && !lit.has(node.id) ? 'is-dim' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          ref={(el) => {
            nodeRefs.current[index] = el;
          }}
          cx={cx}
          cy={cy}
          rx={node.r * ELLIPSE_X}
          ry={node.r * ELLIPSE_Y}
          onMouseEnter={() => setHovered(node.id)}
          onMouseLeave={() => setHovered(null)}
        />
        {node.id === 'n1' && (
          <ellipse
            className="graph__core"
            ref={coreRef}
            cx={cx}
            cy={cy}
            rx={6.4 * ELLIPSE_X}
            ry={6.4 * ELLIPSE_Y}
          />
        )}
      </g>
    );
  };

  return (
    <svg
      className={`graph${hovered ? ' graph--hovering' : ''}`}
      viewBox="0 0 560 520"
      role="img"
      aria-label={GRAPH.alt}
    >
      {/* --- Base plate: the ground the model stands on --- */}
      <g className="graph__plane graph__plane--base" fill="none">
        {BASE_GRID.map((d) => (
          <path d={d} key={d} />
        ))}
        <path className="graph__plane-edge" d={outlineOf(0)} />
      </g>

      <g className="graph__edges" fill="none">
        {EDGES.map(([from, to], index) => {
          const a = NODES[INDEX_BY_ID[from]];
          const b = NODES[INDEX_BY_ID[to]];
          const d = segment(a.x, a.y, b.x, b.y, 0);
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
                  edgePulseRefs.current[index] = el;
                }}
                pathLength="1"
                d={d}
                style={{ animationDelay: `${1.6 + HOP[from] * PULSE_BEAT_S}s` }}
              />
            </g>
          );
        })}
      </g>

      {/* --- Model and risers, furthest first --- */}
      {MODEL_ORDER.map((item) =>
        item.kind === 'riser' ? renderRiser(item.index) : renderNode(item.index),
      )}

      {/* --- Result plate, in front: it is nearer the camera than the model,
              which is what an exploded axonometric is meant to show --- */}
      <g className="graph__plane graph__plane--upper" fill="none">
        {UPPER_GRID.map((d) => (
          <path d={d} key={d} />
        ))}
        <path className="graph__plane-edge" d={outlineOf(RISE)} />
      </g>

      {CELL_ORDER.map((index) => {
        const node = NODES[index];

        return (
          <polygon
            className={`graph__cell${hovered === node.id ? ' is-lit' : ''}${dimClass(node.id)}`}
            key={`cell-${node.id}`}
            ref={(el) => {
              cellRefs.current[index] = el;
            }}
            points={cellAt(node.x, node.y, node.r * CELL_SCALE, RISE)}
            style={{ animationDelay: `${1.7 + index * 0.06}s` }}
          />
        );
      })}
    </svg>
  );
}
