/* ============================================================
   0. IMPORTS
   ============================================================ */

import { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { ProjectPlate } from '@/components/media/ProjectPlate';
import {
  PROJECTS,
  PROJECT_STATUSES,
  disclosedFields,
  leadField,
  projectPath,
} from '@/content/projects.js';
import { useRevealed } from '@/hooks';

import { StatusDonut } from './components/StatusDonut';
import { PROJECT_INDEX } from './content.js';
import './ProjectIndex.css';

/* ============================================================
   1. HELPERS
   ============================================================ */

/**
 * Every state the registry knows, in its own order, with how many projects
 * sit in each — states at zero included, because the key draws them to say
 * what the registry has not reached yet. Counted from the data on every
 * render rather than written into content, so the ring can never contradict
 * the list below it.
 */
function statusCounts() {
  return Object.entries(PROJECT_STATUSES).map(([id, { label }]) => ({
    id,
    label,
    count: PROJECTS.filter((project) => project.status === id).length,
  }));
}

/* The expansion is a pointer affordance: on a touch screen there is no
   hover, and `mouseenter` fires on tap, which would open a panel the reader
   never asked for on the way to following the link. */
const canHover = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

/* ============================================================
   2. COMPONENT
   ============================================================ */

/**
 * The full project register: four cards across, each a plate over a title
 * block. Approaching a card lifts it out of its cell and over the row as a
 * full-width panel carrying the project's summary and its whole title block
 * — the cards themselves never move, so the grid cannot shuffle under the
 * pointer while it is being aimed.
 */
export default function ProjectIndex() {
  const { eyebrow, headline, body, countLabel, fieldsEmpty, linkLabel } =
    PROJECT_INDEX;
  const sectionRef = useRef(null);
  const revealed = useRevealed(sectionRef, 0.02);
  const counts = statusCounts();

  /* The open card, with the geometry measured at the moment it opened: the
     panel leaves the flow, so the cell has to be held at the height it had
     and the panel placed at the row's own offset. Measuring on open rather
     than tracking every card avoids an observer per card. */
  const [open, setOpen] = useState(null);

  const openCard = useCallback((event, id) => {
    if (!canHover()) return;
    const cell = event.currentTarget;
    setOpen({ id, top: cell.offsetTop, height: cell.offsetHeight });
  }, []);

  const closeCard = useCallback(() => setOpen(null), []);

  return (
    <section
      className={revealed ? 'index is-revealed' : 'index'}
      id="projetos"
      ref={sectionRef}
    >
      <div className="wrap">
        <header className="index__head">
          <div className="index__intro">
            <span className="overline index__eyebrow">{eyebrow}</span>
            <h1 className="index__headline">
              {headline.map((line) => (
                <span className="index__line" key={line}>
                  {line}
                </span>
              ))}
            </h1>
            <p className="index__body">{body}</p>
          </div>

          {/* The count sits beside the title, not under it: a drawing keeps
              its revision block in the corner of the title block. */}
          <StatusDonut
            entries={counts}
            total={PROJECTS.length}
            totalLabel={countLabel}
            revealed={revealed}
          />
        </header>

        <ul className="index__grid">
          {PROJECTS.map((project, position) => {
            const fields = disclosedFields(project.fields);
            /* Which field the closed card shows is the project's own call;
               the panel shows the block whole either way. */
            const lead = leadField(project);
            const isOpen = open?.id === project.id;

            return (
              <li
                className={
                  isOpen
                    ? 'index__card plate-host is-open'
                    : 'index__card plate-host'
                }
                key={project.id}
                style={{
                  transitionDelay: `${0.1 + position * 0.08}s`,
                  ...(isOpen ? { height: open.height } : null),
                }}
                onMouseEnter={(event) => openCard(event, project.id)}
                onMouseLeave={closeCard}
                onFocus={(event) => openCard(event, project.id)}
                onBlur={closeCard}
              >
                <div
                  className="index__panel"
                  style={
                    isOpen ? { top: open.top, minHeight: open.height } : null
                  }
                >
                  <div className="index__plate">
                    <ProjectPlate
                      image={project.image}
                      imageAlt={project.imageAlt}
                      status={project.status}
                    />
                  </div>

                  <div className="index__card-body">
                    {/* Every project has a page, so every card links to one.
                        The repository is linked from that page, not here. */}
                    <h2 className="index__card-title">
                      <Link
                        className="index__card-link"
                        to={projectPath(project.id)}
                      >
                        {project.title}
                      </Link>
                    </h2>

                    {/* The one-liner at rest, the summary once open: the card
                        gets the reader to the page, the panel is where the
                        project gets to argue for itself. */}
                    <p className="index__card-text">{project.description}</p>

                    {project.summary && (
                      <p className="index__card-summary">{project.summary}</p>
                    )}

                    {/* One field on the closed card, the whole title block on
                        the open panel — at a quarter of the grid the block
                        can only stack, and stacked rows read as a table
                        pushed into a card. */}
                    <div className="index__card-foot">
                      {fields.length > 0 ? (
                        <dl className="index__specs">
                          {fields.map((field) => (
                            <div
                              className={
                                field.id === lead.id
                                  ? 'index__spec is-lead'
                                  : 'index__spec'
                              }
                              key={field.id}
                            >
                              <dt className="index__spec-label">
                                {field.label}
                              </dt>
                              <dd className="index__spec-value">
                                {field.value}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      ) : (
                        <p className="index__spec-empty">{fieldsEmpty}</p>
                      )}

                      <span className="index__action">
                        {linkLabel}
                        <span className="index__arrow" aria-hidden="true">
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
