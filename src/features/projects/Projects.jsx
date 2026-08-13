/* ============================================================
   0. IMPORTS
   ============================================================ */

import { useRef } from 'react';

import { useRevealed } from '@/hooks';

import { PROJECTS, PROJECT_STATUSES } from './content.js';
import './Projects.css';

/* ============================================================
   1. COMPONENT
   ============================================================ */

/**
 * The work itself: a row of cards, each an image banner with the project's
 * state stamped on it. State is the one thing a reader needs before reading
 * anything else about a project, so it sits on the banner rather than under
 * the title. A card with no image yet renders an empty plate — a blueprint
 * pool, not a grey box — so the row holds its rhythm until the art lands.
 */
export default function Projects() {
  const { eyebrow, headline, body, items } = PROJECTS;
  const sectionRef = useRef(null);
  const revealed = useRevealed(sectionRef);

  return (
    <section
      className={revealed ? 'projects is-revealed' : 'projects'}
      id="projetos"
      ref={sectionRef}
    >
      <div className="wrap">
        <div className="projects__intro">
          <div className="projects__intro-head">
            <span className="overline projects__eyebrow">{eyebrow}</span>
            <h2 className="projects__headline">
              {headline.map((line) => (
                <span className="projects__line" key={line}>
                  {line}
                </span>
              ))}
            </h2>
          </div>

          <p className="projects__body">{body}</p>
        </div>

        <ul className="projects__grid">
          {items.map((item, index) => {
            const status = PROJECT_STATUSES[item.status];

            return (
              <li
                className="projects__card"
                key={item.id}
                style={{ transitionDelay: `${0.24 + index * 0.09}s` }}
              >
                <div
                  className={
                    item.image
                      ? 'projects__banner'
                      : 'projects__banner projects__banner--empty'
                  }
                >
                  {item.image && (
                    <img
                      className="projects__image"
                      src={item.image}
                      alt={item.imageAlt ?? ''}
                      loading="lazy"
                    />
                  )}

                  <span className="projects__frame" aria-hidden="true" />

                  <span className={`projects__status projects__status--${item.status}`}>
                    <span className="projects__status-dot" aria-hidden="true" />
                    {status.label}
                  </span>
                </div>

                <div className="projects__card-body">
                  <h3 className="projects__card-title">
                    {item.href ? (
                      <a
                        className="projects__card-link"
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.title}
                        <span className="projects__arrow" aria-hidden="true">
                          ↗
                        </span>
                      </a>
                    ) : (
                      item.title
                    )}
                  </h3>
                  <p className="projects__card-text">{item.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
