/* ============================================================
   0. IMPORTS
   ============================================================ */

import { useSearchParams } from 'react-router-dom';

import { FormSlip } from '@/components/form/FormSlip';
import { JOIN_PARAM, findProject } from '@/content/projects.js';

import { JOIN, JOIN_FIELDS } from './content.js';
import './Join.css';

/* ============================================================
   1. COMPONENT
   ============================================================ */

/**
 * The participation slip, and the whole of `/participar`. The card is
 * `FormSlip`, shared with the register's suggestion form; this section
 * supplies its copy and its fields.
 *
 * A project page links here with `?projeto=<id>`, and the slip opens with
 * that project chosen. The parameter carries the id, so it is resolved back
 * to the title the select actually offers; an id that names no project, or a
 * project the list leaves out, falls through to the empty placeholder rather
 * than to an option that isn't there.
 *
 * It is the only thing on its page, so it carries top padding of its own —
 * the slip would otherwise open flush against the sticky bar.
 */
export default function Join() {
  const [params] = useSearchParams();
  const project = findProject(params.get(JOIN_PARAM) ?? '');
  const preselected = project && !project.placeholder ? project.title : '';

  return (
    <section className="join" id="participar">
      <div className="wrap">
        <FormSlip
          content={JOIN}
          fields={JOIN_FIELDS}
          defaults={{ projeto: preselected }}
        />
      </div>
    </section>
  );
}
