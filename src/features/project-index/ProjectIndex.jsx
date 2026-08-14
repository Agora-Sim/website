/* ============================================================
   0. IMPORTS
   ============================================================ */

import { useRef } from 'react';

import { ProjectPlate } from '@/components/media/ProjectPlate';
import {
  PROJECTS,
  PROJECT_FIELDS,
  PROJECT_STATUSES,
} from '@/content/projects.js';
import { useRevealed } from '@/hooks';

import { PROJECT_INDEX } from './content.js';
import './ProjectIndex.css';

/* ============================================================
   1. HELPERS
   ============================================================ */

/**
 * The spec cells a project actually discloses, in registry order. Every
 * field is optional — a project omits any it has no real value for — so
 * this drops the missing ones rather than drawing empty cells.
 *
 * @param {Record<string, string>} [fields] the project's `fields` object
 */
function disclosedFields(fields = {}) {
  return PROJECT_FIELDS.filter((field) => Boolean(fields[field.id])).map(
    (field) => ({ ...field, value: fields[field.id] }),
  );
}

/**
 * How many projects sit in each state, in the registry's own order, with
 * empty states dropped. Counted from the data on every render rather than
 * written into content, so the strip can never contradict the list below it.
 */
function statusCounts() {
  return Object.entries(PROJECT_STATUSES)
    .map(([id, { label }]) => ({
      id,
      label,
      count: PROJECTS.filter((project) => project.status === id).length,
    }))
    .filter((entry) => entry.count > 0);
}

/* Two digits, the way a drawing numbers its sheets. */
const pad = (n) => String(n).padStart(2, '0');

/* ============================================================
   2. COMPONENT
   ============================================================ */

/**
 * The full project register: one wide card per project, laid out as a
 * drawing's title block — the plate on the left, the copy and a row of
 * label/value cells on the right. It is the same plate the home row draws,
 * given the room to carry its metadata instead of just its name.
 */
export default function ProjectIndex() {
  const { eyebrow, headline, body, countLabel, fieldsEmpty, linkLabel } =
    PROJECT_INDEX;
  const sectionRef = useRef(null);
  const revealed = useRevealed(sectionRef, 0.02);
  const counts = statusCounts();

  return (
    <section
      className={revealed ? 'index is-revealed' : 'index'}
      id="projetos"
      ref={sectionRef}
    >
      <div className="wrap">
        <header className="index__head">
          <span className="overline index__eyebrow">{eyebrow}</span>
          <h1 className="index__headline">
            {headline.map((line) => (
              <span className="index__line" key={line}>
                {line}
              </span>
            ))}
          </h1>
          <p className="index__body">{body}</p>
        </header>

        {/* The register's own tally, in the title-block register the cards
            below repeat at card scale. */}
        <dl className="index__tally">
          <div className="index__tally-cell">
            <dt className="index__tally-label">{countLabel}</dt>
            <dd className="index__tally-value">{pad(PROJECTS.length)}</dd>
          </div>
          {counts.map((entry) => (
            <div className="index__tally-cell" key={entry.id}>
              <dt className="index__tally-label">{entry.label}</dt>
              <dd className="index__tally-value">{pad(entry.count)}</dd>
            </div>
          ))}
        </dl>

        <ul className="index__list">
          {PROJECTS.map((project, position) => {
            const fields = disclosedFields(project.fields);

            return (
              <li
                className="index__card plate-host"
                key={project.id}
                style={{ transitionDelay: `${0.1 + position * 0.08}s` }}
              >
                <div className="index__plate">
                  <ProjectPlate
                    image={project.image}
                    imageAlt={project.imageAlt}
                    status={project.status}
                  />
                </div>

                <div className="index__card-body">
                  <h2 className="index__card-title">
                    {project.href ? (
                      <a
                        className="index__card-link"
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {project.title}
                        <span className="index__arrow" aria-hidden="true">
                          ↗
                        </span>
                      </a>
                    ) : (
                      project.title
                    )}
                  </h2>

                  <p className="index__card-text">
                    {project.summary ?? project.description}
                  </p>

                  {fields.length > 0 ? (
                    <dl className="index__specs">
                      {fields.map((field) => (
                        <div className="index__spec" key={field.id}>
                          <dt className="index__spec-label">{field.label}</dt>
                          <dd className="index__spec-value">{field.value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <p className="index__specs-empty">{fieldsEmpty}</p>
                  )}

                  {project.href && (
                    <span className="index__card-foot">{linkLabel}</span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
