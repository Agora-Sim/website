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
        strokeWidth="1.4"
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
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.4" />
      <path d="M17.5 17.5 24 24" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

const ICONS = {
  network: NetworkIcon,
  flow: FlowIcon,
  search: SearchIcon,
};

/* ============================================================
   2. COMPONENT
   ============================================================ */

/**
 * How we work: the simulator (and the tools that follow it) read as
 * instrument panels rather than product screenshots — a card per problem
 * shape the same engine takes on, each a small technical drawing in its
 * own right instead of a numbered step in a sequence.
 *
 * Only the first card carries the stamp. It marks the tool named in the
 * brief; the other two are the same engine turned on a different problem,
 * not separate products each needing their own seal.
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
          {cards.map((card, index) => {
            const Icon = ICONS[card.icon];

            return (
              <article
                className="method__card"
                key={card.id}
                style={{ animationDelay: `${0.1 + index * 0.12}s` }}
              >
                {card.badge && <span className="method__badge">{card.badge}</span>}

                <div className="method__card-header">
                  <span className="method__icon">
                    <Icon />
                  </span>
                  <div>
                    <h3 className="method__card-title">{card.title}</h3>
                    <p className="method__card-subtitle">{card.subtitle}</p>
                  </div>
                </div>

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
