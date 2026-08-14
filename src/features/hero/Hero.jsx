/* ============================================================
   0. IMPORTS
   ============================================================ */

import { Link } from 'react-router-dom';

import { HERO } from './content.js';
import { PropagationGraph } from './components/PropagationGraph';
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
            <Link className="btn btn--primary" to={actions.primary.to}>
              {actions.primary.label}
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>

        <div className="hero__figure">
          <PropagationGraph />
        </div>
      </div>
    </section>
  );
}
