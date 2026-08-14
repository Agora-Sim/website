/* ============================================================
   0. IMPORTS
   ============================================================ */

import { useRef } from 'react';
import { Link } from 'react-router-dom';

import { ProjectPlate } from '@/components/media/ProjectPlate';
import { PROJECTS, projectPath } from '@/content/projects.js';
import { useRevealed } from '@/hooks';

import { PROJECTS_SECTION } from './content.js';
import './Projects.css';

/* ============================================================
   1. COMPONENT
   ============================================================ */

/**
 * The work itself: a row of cards, each a plate with the project's state
 * stamped on it and a one-line description under it. This is the summary —
 * the /projetos register carries the same projects with their metadata, and
 * the link under the row is what says so.
 */
export default function Projects() {
  const { eyebrow, headline, body, more } = PROJECTS_SECTION;
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
          {PROJECTS.map((item, index) => (
            <li
              className="projects__card plate-host"
              key={item.id}
              style={{ transitionDelay: `${0.24 + index * 0.09}s` }}
            >
              <ProjectPlate
                image={item.image}
                imageAlt={item.imageAlt}
                status={item.status}
              />

              <div className="projects__card-body">
                {/* Every project has a page, so every card is a link to
                    one — the repository, where there is one, is linked
                    from that page rather than from here. */}
                <h3 className="projects__card-title">
                  <Link
                    className="projects__card-link"
                    to={projectPath(item.id)}
                  >
                    {item.title}
                    <span className="projects__arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </h3>
                <p className="projects__card-text">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>

        <Link className="projects__more" to={more.to}>
          {more.label}
          <span className="projects__more-arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
