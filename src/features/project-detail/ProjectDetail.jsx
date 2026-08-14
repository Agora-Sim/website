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
} from '@/content/projects.js';

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
  const { eyebrow, back, specsLabel, statusLabel, repo, bodyEmpty } =
    PROJECT_DETAIL;
  const fields = disclosedFields(project.fields);
  const sections = project.sections ?? [];

  return (
    <article className="detail">
      <div className="wrap">
        <Link className="detail__back" to={PROJECTS_PATH}>
          <span className="detail__back-arrow" aria-hidden="true">
            ←
          </span>
          {back}
        </Link>

        <header className="detail__head">
          <span className="overline detail__eyebrow">{eyebrow}</span>
          <h1 className="detail__title">{project.title}</h1>
          <p className="detail__lede">{project.summary ?? project.description}</p>
        </header>

        {/* The page's own figure, not the card's banner — see PROJECT_FIGURES
            for why they are two pictures. None is drawn yet, so this is an
            empty plate on every project today. The shape comes from content
            rather than the stylesheet so the artwork brief and the layout
            are one number. No `plate-host`: nothing here is a link, and the
            plate's hover states would promise one. */}
        <div
          className="detail__figure"
          style={{ '--figure-ratio': PROJECT_FIGURES.cover.ratio }}
        >
          <ProjectPlate
            image={project.cover}
            imageAlt={project.coverAlt}
            status={project.status}
          />
        </div>

        <div className="detail__columns">
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

          {/* The card's title block, stood up as the page's spec column. */}
          <aside className="detail__specs">
            <h2 className="detail__specs-label">{specsLabel}</h2>

            <dl className="detail__spec-list">
              <div className="detail__spec">
                <dt className="detail__spec-key">{statusLabel}</dt>
                <dd className="detail__spec-value">
                  {PROJECT_STATUSES[project.status].label}
                </dd>
              </div>

              {fields.map((field) => (
                <div className="detail__spec" key={field.id}>
                  <dt className="detail__spec-key">{field.label}</dt>
                  <dd className="detail__spec-value">{field.value}</dd>
                </div>
              ))}
            </dl>

            {project.href && (
              <a
                className="btn btn--ghost detail__repo"
                href={project.href}
                target="_blank"
                rel="noreferrer"
              >
                {repo}
                <span className="btn__arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            )}
          </aside>
        </div>
      </div>
    </article>
  );
}
