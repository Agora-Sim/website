/* ============================================================
   0. IMPORTS
   ============================================================ */

import { Link } from 'react-router-dom';

import { ProjectPlate } from '@/components/media/ProjectPlate';
import {
  PROJECTS_PATH,
  PROJECT_FIGURES,
  PROJECT_STATUSES,
  disclosedFields,
  joinPath,
} from '@/content/projects.js';

import { BrandIcon } from './components/BrandIcon';
import { PROJECT_DETAIL } from './content.js';
import './ProjectDetail.css';

/* ============================================================
   1. COMPONENT
   ============================================================ */

/**
 * One project's own page: the register's card opened up — the same plate,
 * the same summary, the same title block — with room under it for the
 * written record, which the project's `sections` carry.
 *
 * Everything project-specific arrives in `project`, an entry from
 * `@/content/projects.js`; nothing here is written per project, so a new
 * page is an entry in that registry and no code at all.
 *
 * @param {object} props
 * @param {object} props.project an entry from PROJECTS
 */
export default function ProjectDetail({ project }) {
  const { back, specsLabel, statusLabel, join, bodyEmpty } = PROJECT_DETAIL;
  const fields = disclosedFields(project.fields);
  const sections = project.sections ?? [];
  const links = project.links ?? [];
  const state = PROJECT_STATUSES[project.status];

  return (
    <article className="detail">
      <div className="wrap">
        <Link className="detail__back" to={PROJECTS_PATH}>
          <span className="detail__back-arrow" aria-hidden="true">
            ←
          </span>
          {back}
        </Link>

        <header className={`detail__head detail__head--${project.status}`}>
          <div className="detail__masthead">
            <div className="detail__headline">
              {/* The plate's completion seal, promoted to the page's mark:
                  the monogram in a tilted double ring at the title's height,
                  inked in the state's own hue. Decorative beside the name. */}
              <span className="detail__seal" aria-hidden="true" />
              <h1 className="detail__title">{project.title}</h1>
            </div>

            {/* State, moved off the plate and stood up beside the title as a
                drafting stamp: the reading label over the state. Hue carries
                the state, the same three inks the register uses. */}
            <div className="detail__status">
              <span className="detail__status-label">{statusLabel}</span>
              <span className="detail__status-state">{state.label}</span>
            </div>
          </div>

          <p className="detail__lede">{project.summary ?? project.description}</p>
        </header>

        <div className="detail__columns">
          <div className="detail__main">
            {/* The page's own figure, not the card's banner — see
                PROJECT_FIGURES for why they are two pictures. None is drawn
                yet, so this is an empty plate on every project today. The
                shape comes from content rather than the stylesheet so the
                artwork brief and the layout are one number. No `plate-host`:
                nothing here is a link, and the plate's hover states would
                promise one. */}
            <div
              className="detail__figure"
              style={{ '--figure-ratio': PROJECT_FIGURES.cover.ratio }}
            >
              <ProjectPlate
                image={project.cover}
                imageAlt={project.coverAlt}
                status={project.status}
                showStatus={false}
                showSeal={false}
              />
            </div>

            <div className="detail__body">
              {sections.length > 0 ? (
                sections.map((section) => (
                  <section className="detail__section" key={section.heading}>
                    <h2 className="detail__section-title">{section.heading}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p className="detail__text" key={paragraph}>
                        {paragraph}
                      </p>
                    ))}
                  </section>
                ))
              ) : (
                <p className="detail__empty">{bodyEmpty}</p>
              )}
            </div>
          </div>

          {/* The card's title block, stood up as the page's spec column. */}
          <aside className="detail__specs">
            <h2 className="detail__specs-label">{specsLabel}</h2>

            <dl className="detail__spec-list">
              {fields.map((field) => (
                <div className="detail__spec" key={field.id}>
                  <dt className="detail__spec-key">{field.label}</dt>
                  <dd className="detail__spec-value">{field.value}</dd>
                </div>
              ))}
            </dl>

            {/* The page's one action, and the only Monza on it — a project
                that isn't taking people simply omits `join` and the column
                ends at the repository link. `→` because it stays on the
                site, the same rule the cards follow. */}
            {project.join && (
              <Link
                className="btn btn--primary detail__join"
                to={joinPath(project)}
              >
                {join}
                <span className="btn__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            )}

            {/* The project's external destinations, in registry order —
                repository, package registry, and any others it lists. Each
                carries its own icon and stays off the site, so `↗`, the rule
                the cards follow. */}
            {links.map((link) => (
              <a
                className="btn btn--ghost detail__link"
                href={link.href}
                target="_blank"
                rel="noreferrer"
                key={link.href}
              >
                <span className="detail__link-lead">
                  <BrandIcon name={link.icon} />
                  {link.label}
                </span>
                <span className="btn__arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </aside>
        </div>
      </div>
    </article>
  );
}
