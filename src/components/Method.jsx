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

/* The mark of the host the CTA points at, not a brand element of ours. */
function GithubIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
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
  const { eyebrow, headline, body, cards, repo } = METHOD;

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
                  {card.stamp && (
                    <a
                      className="method__stamp"
                      href={repo.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={repo.label}
                    >
                      <span className="method__stamp-mark" aria-hidden="true">
                        <GithubIcon />
                      </span>
                      {card.stamp}
                    </a>
                  )}
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
