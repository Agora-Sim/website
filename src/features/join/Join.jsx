/* ============================================================
   0. IMPORTS
   ============================================================ */

import { FormSlip } from '@/components/form/FormSlip';

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
 * It is the only thing on its page, so it carries top padding of its own —
 * the slip would otherwise open flush against the sticky bar.
 */
export default function Join() {
  return (
    <section className="join" id="participar">
      <div className="wrap">
        <FormSlip content={JOIN} fields={JOIN_FIELDS} />
      </div>
    </section>
  );
}
