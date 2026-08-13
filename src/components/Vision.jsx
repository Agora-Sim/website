/* ============================================================
   0. IMPORTS
   ============================================================ */

import { VISION } from '../content/site.js';
import './Vision.css';

/* ============================================================
   1. COMPONENT
   ============================================================ */

/**
 * The thesis restated as a stance: one claim, centred, with a single call
 * to action underneath it.
 *
 * The rings behind the text are a compass circle rather than land-book's
 * decorative dashed rings — the same drafting vocabulary the background's
 * registration marks already use, drawn once at a larger scale instead of
 * borrowed as ornament.
 */
export default function Vision() {
  const { eyebrow, headline, body, cta } = VISION;

  return (
    <section className="vision" id="visao">
      <div className="vision__rings" aria-hidden="true">
        <span className="vision__ring vision__ring--outer" />
        <span className="vision__ring vision__ring--inner" />
      </div>

      <div className="vision__inner wrap">
        <span className="overline vision__eyebrow">{eyebrow}</span>

        <h2 className="vision__headline">
          {headline.map((line) => (
            <span className="vision__line" key={line}>
              {line}
            </span>
          ))}
        </h2>

        <p className="vision__body">{body}</p>

        <a className="btn btn--ghost vision__cta" href={cta.href}>
          {cta.label}
          <span className="btn__arrow" aria-hidden="true">
            →
          </span>
        </a>
      </div>
    </section>
  );
}
