/* ============================================================
   0. IMPORTS
   ============================================================ */

import { HERO } from '../content/site.js';
import PropagationGraph from './PropagationGraph.jsx';
import './Hero.css';

/* ============================================================
   1. COMPONENT
   ============================================================ */

/**
 * Opening section: the thesis on the left, the drawn network on the right.
 *
 * The headline breaks on fixed lines from `HERO.headline` rather than wrapping
 * on its own — the three-line stack against the figure is the composition.
 */
export default function Hero() {
  const { headline, headlineAccent, lede, actions } = HERO;

  return (
    <section className="hero" id="topo">
      <div className="hero__inner wrap">
        <div className="hero__copy">
          <h1 className="hero__headline">
            {headline.map((line) => (
              <span className="hero__line" key={line}>
                {line}
              </span>
            ))}
            <span className="hero__line">
              <em className="hero__accent">{headlineAccent}</em>.
            </span>
          </h1>

          <p className="hero__lede">{lede}</p>

          <div className="hero__actions">
            <a className="btn btn--primary" href={actions.primary.href}>
              {actions.primary.label}
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a className="btn btn--ghost" href={actions.secondary.href}>
              {actions.secondary.label}
            </a>
          </div>
        </div>

        <div className="hero__figure">
          <PropagationGraph />
        </div>
      </div>
    </section>
  );
}
