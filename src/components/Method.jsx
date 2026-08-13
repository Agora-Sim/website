/* ============================================================
   0. IMPORTS
   ============================================================ */

import { METHOD } from '../content/site.js';
import './Method.css';

/* ============================================================
   1. ICONS
   One concrete component per glyph, keyed by `content.icon` — a small
   registry rather than a switch, so a new card only needs a new entry.
   Line-only, currentColor, echoing the background's registration marks
   and PropagationGraph's own dot-and-line vocabulary at icon scale.
   ============================================================ */

function NetworkIcon() {
  return (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M9.3 18.4 12 10.4M15.8 9.8 20.4 14.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="7" cy="20" r="2.4" fill="currentColor" />
      <circle cx="14" cy="8" r="3.1" fill="currentColor" />
      <circle cx="22" cy="16" r="2" fill="currentColor" />
    </svg>
  );
}

function FlowIcon() {
  return (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M4 6h20l-8 8v8h-4v-8L4 6Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ICONS = {
  network: NetworkIcon,
  flow: FlowIcon,
};

/* ============================================================
   2. COMPONENT
   ============================================================ */

/**
 * How we work: two instrument-panel cards, staged like the reference this
 * section adapts — a plain card and a staggered one, split by a single
 * vertical rule rather than lined up flush in a uniform grid. Each card is
 * the same engine (the simulator) turned on a different kind of problem;
 * the investigation angle stays in the intro paragraph rather than earning
 * a third card, so the two-card staging survives intact.
 */
export default function Method() {
  const { eyebrow, headline, body, cards } = METHOD;

  return (
    <section className="method" id="sobre">
      <div className="wrap">
        <div className="method__intro">
          <div className="method__intro-head">
            <span className="overline method__eyebrow">{eyebrow}</span>
            <h2 className="method__headline">
              {headline.map((line) => (
                <span className="method__line" key={line}>
                  {line}
                </span>
              ))}
            </h2>
          </div>

          <p className="method__body">{body}</p>
        </div>

        <div className="method__grid">
          <span className="method__divider" aria-hidden="true" />

          {cards.map((card, index) => {
            const Icon = ICONS[card.icon];
            /* The second card carries the stagger — the reference's own
               offset rhythm — independent of any per-card content flag. */
            const cardClass =
              index === 1 ? 'method__card method__card--staged' : 'method__card';

            return (
              <article
                className={cardClass}
                key={card.id}
                style={{ animationDelay: `${0.1 + index * 0.12}s` }}
              >
                <div className="method__card-header">
                  <span className="method__icon">
                    <Icon />
                  </span>
                  <h3 className="method__card-title">{card.title}</h3>
                </div>
                <p className="method__card-subtitle">{card.subtitle}</p>

                <ul className="method__readout">
                  {card.lines.map((line) => (
                    <li className="method__readout-line" key={line}>
                      {line}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
