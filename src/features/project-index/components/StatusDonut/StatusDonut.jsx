/* ============================================================
   0. IMPORTS
   ============================================================ */

import { useEffect, useState } from 'react';

import './StatusDonut.css';

/* ============================================================
   1. CONSTANTS
   ============================================================ */

/* The ring carries `pathLength="100"`, so every arc length below is already
   a percentage of the registry and no circumference arithmetic is needed. */
const TRACK = 100;

/* The gap between arcs, in those same percent units. An arc shorter than
   this would be swallowed by its own gap, so it keeps half its length and
   loses the gap instead. */
const GAP = 1.6;

/* Ring geometry, in viewBox units, centred on the origin. The viewBox is
   wider than it is tall because the labels live to the sides of the ring.
   Only the ring and its leader lines are drawn in svg — the labels are HTML
   laid over it, so their type comes from the page's own sizes instead of
   scaling with the drawing. */
const BOX = { width: 232, height: 124 };
const RADIUS = 40;
const STROKE = 9;
/* Where a leader line leaves the ring, where it turns, and where it ends.
   Kept apart so the elbow reads as an elbow, and `RUN` short enough to
   leave the label roughly a fifth of the width to sit in. */
const LEAVE = RADIUS + STROKE / 2 + 3;
const ELBOW = RADIUS + 14;
const RUN = 56;

/* A viewBox point as a percentage of the box, which is what positions an
   HTML label over the same drawing. */
const across = (x) => ((x + BOX.width / 2) / BOX.width) * 100;
const down = (y) => ((y + BOX.height / 2) / BOX.height) * 100;

const DURATION = 900;

/* Decelerating: the figure arrives rather than stopping dead, which is what
   makes a counter read as a measurement settling. */
const easeOut = (p) => 1 - (1 - p) ** 3;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============================================================
   2. HELPERS
   ============================================================ */

/**
 * Counts from zero to `target` once `active` turns true, and holds there.
 * Reduced motion gets the figure directly — the count is decoration, the
 * number is the content.
 */
function useCountUp(target, active) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return undefined;
    if (prefersReducedMotion()) {
      setValue(target);
      return undefined;
    }

    let frame;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / DURATION);
      setValue(Math.round(target * easeOut(progress)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active]);

  return value;
}

/* Two digits, the way a drawing numbers its sheets. */
const pad = (n) => String(n).padStart(2, '0');

/**
 * The ring's arcs, in registry order: each state's share of the total, the
 * offset it starts at, and the leader line and label that name it.
 *
 * The svg's dash offset starts at three o'clock, so every angle is turned a
 * quarter back to put the first arc at twelve — done here in the geometry
 * rather than by rotating the element, because the labels must stay level
 * while the ring turns.
 *
 * States with no projects are dropped: an arc of zero length is just the gap
 * before the next one. They are named under the ring instead.
 */
function arcs(entries, total) {
  let cursor = 0;

  return entries
    .filter((entry) => entry.count > 0)
    .map((entry) => {
      const length = (entry.count / total) * TRACK;
      const angle = ((cursor + length / 2) / TRACK) * 2 * Math.PI - Math.PI / 2;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      /* Right of the ring's axis the label runs right, left of it left. */
      const side = cos >= 0 ? 1 : -1;

      const arc = {
        ...entry,
        length: Math.max(length - GAP, length / 2),
        offset: cursor,
        leader: {
          from: [cos * LEAVE, sin * LEAVE],
          elbow: [cos * ELBOW, sin * ELBOW],
          to: [side * RUN, sin * ELBOW],
        },
        /* Where the name sits, in percentages of the box: it is an HTML
           element over the svg, not svg text. It is pinned by the edge
           facing the ring — `left` for a label to the right of it, `right`
           for one to the left — so a name that wraps grows outward, away
           from the drawing, instead of back over it. */
        at: {
          side: side > 0 ? 'right' : 'left',
          edge: side > 0 ? 'left' : 'right',
          inset: across(RUN) + 2,
          top: down(sin * ELBOW),
        },
      };

      cursor += length;
      return arc;
    });
}

/* ============================================================
   3. COMPONENT
   ============================================================ */

/**
 * The registry counted as a ring: one arc per state, each named by a leader
 * line the way a drawing labels a part, and the total held in the middle.
 *
 * States no project has reached yet are listed under the ring rather than
 * pointed at — there is nothing on the ring to point to — which is how the
 * registry shows what is still ahead of it. That list comes from
 * `PROJECT_STATUSES`, so a state exists here the moment it is registered,
 * with or without a project in it.
 *
 * Every figure is counted from the registry by the caller, so the ring
 * cannot contradict the list below it: change a project's `status` and the
 * arcs, the labels and the total all follow on the next render.
 *
 * @param {object} props
 * @param {{ id: string, label: string, count: number }[]} props.entries every state, in registry order
 * @param {number} props.total the whole registry
 * @param {string} props.totalLabel names what the middle figure counts
 * @param {boolean} props.revealed the section has scrolled into view
 */
export default function StatusDonut({ entries, total, totalLabel, revealed }) {
  const counted = useCountUp(total, revealed);
  const segments = arcs(entries, total || 1);

  return (
    <figure className={revealed ? 'donut is-revealed' : 'donut'}>
      <div className="donut__ring">
        <svg
          className="donut__svg"
          viewBox="-116 -62 232 124"
          role="img"
          aria-label={`${total} ${totalLabel}: ${entries
            .map((entry) => `${entry.label} ${entry.count}`)
            .join(', ')}`}
        >
          {/* The full ring under the arcs: without it a registry that is
              mostly one state reads as a broken circle rather than a
              measured one. Rotated on its own so the arcs can be placed by
              dash offset while the labels stay level. */}
          <g transform="rotate(-90)">
            <circle
              className="donut__track"
              cx="0"
              cy="0"
              r={RADIUS}
              pathLength={TRACK}
            />
            {segments.map((segment, position) => (
              <circle
                className={`donut__arc donut__arc--${segment.id}`}
                cx="0"
                cy="0"
                r={RADIUS}
                pathLength={TRACK}
                key={segment.id}
                style={{
                  '--length': segment.length,
                  '--offset': -segment.offset,
                  transitionDelay: `${0.15 + position * 0.14}s`,
                }}
              />
            ))}
          </g>

          {segments.map((segment, position) => (
            <g
              className={`donut__leader donut__leader--${segment.id}`}
              key={segment.id}
              style={{ transitionDelay: `${0.5 + position * 0.12}s` }}
            >
              <polyline
                className="donut__line"
                points={[segment.leader.from, segment.leader.elbow, segment.leader.to]
                  .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
                  .join(' ')}
              />
              <circle
                className="donut__node"
                cx={segment.leader.to[0]}
                cy={segment.leader.to[1]}
                r="1.6"
              />
            </g>
          ))}
        </svg>

        {/* The labels are HTML over the drawing, not svg text: svg text
            scales with its viewBox, so at this column's width the technical
            register would render half again too large and drift every time
            the column changed. */}
        {segments.map((segment, position) => (
          <p
            className={`donut__label donut__label--${segment.at.side}`}
            key={segment.id}
            style={{
              [segment.at.edge]: `${segment.at.inset}%`,
              top: `${segment.at.top}%`,
              transitionDelay: `${0.5 + position * 0.12}s`,
            }}
          >
            <span className="donut__name">{segment.label}</span>
            <span className="donut__figure">{pad(segment.count)}</span>
          </p>
        ))}


        <div className="donut__centre">
          <span className="donut__total">{pad(counted)}</span>
          <span className="donut__total-label">{totalLabel}</span>
        </div>
      </div>

      {/* The key. Wide, it carries only the states with no arc to point at —
          a state nothing has reached has nothing on the ring to label, and
          naming it is how the registry says what it has not written yet.
          Narrow, the leaders come off and this carries every state, because
          a label at the end of a line needs width the phone hasn't got. */}
      <figcaption className="donut__key">
        {entries.map((entry) => (
          <span
            className={entry.count > 0 ? 'donut__row' : 'donut__row is-empty'}
            key={entry.id}
          >
            <span
              className={`donut__swatch donut__swatch--${entry.id}`}
              aria-hidden="true"
            />
            {entry.label}
            <span className="donut__row-count">{pad(entry.count)}</span>
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
