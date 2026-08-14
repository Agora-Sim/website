/* ============================================================
   0. IMPORTS
   ============================================================ */

import { FormSlip } from '@/components/form/FormSlip';

import { SUGGEST, SUGGEST_FIELDS } from './content.js';
import './Suggest.css';

/* ============================================================
   1. COMPONENT
   ============================================================ */

/**
 * The suggestion slip at the foot of the register. The card itself is
 * `FormSlip`, shared with `/participar`; this section supplies its copy,
 * its fields and its place on the page.
 */
export default function Suggest() {
  return (
    <section className="suggest" id="sugerir">
      <div className="wrap">
        <FormSlip content={SUGGEST} fields={SUGGEST_FIELDS} />
      </div>
    </section>
  );
}
