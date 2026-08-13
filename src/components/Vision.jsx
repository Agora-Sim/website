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
 * The claim sits inside its own bordered panel — a detail view cut from
 * the blueprint sheet, the way a technical drawing frames an enlarged
 * callout rather than annotating the main plate directly. The rings inside
 * it are a compass circle rather than land-book's decorative dashed rings —
 * the same drafting vocabulary the background's registration marks already
 * use, drawn once at a larger scale instead of borrowed as ornament.
 *
 * The eyebrow is that panel's file-folder tab rather than a line of copy
 * inside it: the callout gets labelled on its edge, the way a drawing's
 * detail view is titled outside the frame it encloses.
 */
export default function Vision() {
  const { eyebrow, headline, body, cta } = VISION;

  return (
    <section className="vision" id="visao">
      {/* `wrap` alone, on a plain frame: the panel inside it spans the full
          content width, so its border lines up with the hero's own `wrap`
          edges instead of insetting further. */}
      <div className="wrap">
        {/* The tab is a sibling of the panel, not a child: the panel clips
            its own rings, and a child would be clipped with them. */}
        <div className="vision__frame">
          <span className="overline vision__tab">{eyebrow}</span>

          <div className="vision__panel">
            <div className="vision__rings" aria-hidden="true">
              <span className="vision__ring vision__ring--outer" />
              <span className="vision__ring vision__ring--inner" />
            </div>

            <div className="vision__inner">
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
          </div>
        </div>
      </div>
    </section>
  );
}
