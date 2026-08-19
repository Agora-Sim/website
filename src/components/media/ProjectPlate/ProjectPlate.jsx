/* ============================================================
   0. IMPORTS
   ============================================================ */

import { PROJECT_STATUSES } from '@/content/projects.js';
import './ProjectPlate.css';

/* ============================================================
   1. COMPONENT
   ============================================================ */

/**
 * A project's banner, drawn as a plate on the sheet: its own pool of deep
 * blueprint under a millimetre grid, four registration brackets, and the
 * project's state stamped in the corner. State sits here rather than under
 * the title because it is what a reader needs before anything else.
 *
 * Shared by the home page's project row and the /projetos index, which draw
 * the same plate at two sizes.
 *
 * Hover states key off an ancestor carrying `plate-host` rather than off the
 * plate itself: the thing a reader hovers is the whole card, and the card
 * belongs to the feature, not here.
 *
 * A finished project (`status: 'concluido'`) also carries a corner seal —
 * the monogram in a tilted stamp-ring — and a mint frame ring, the drawing's
 * "approved" stamp. It is the one state that gets a second mark: the others
 * are stamped only by the status pill.
 *
 * @param {object} props
 * @param {string} [props.image] path under `public/`; empty draws an empty plate
 * @param {string} [props.imageAlt]
 * @param {string} props.status key into PROJECT_STATUSES
 */
export default function ProjectPlate({ image, imageAlt = '', status }) {
  const { label } = PROJECT_STATUSES[status];
  const complete = status === 'concluido';

  /* The frame brackets and the seal share the bottom-right corner, so the
     seal owns it and the brackets vacate — the same trade the status pill
     makes for the top-left. `plate--complete` is what drops that bracket. */
  const className = [
    'plate',
    image ? '' : 'plate--empty',
    complete ? 'plate--complete' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={className}>
      {image && (
        <img className="plate__image" src={image} alt={imageAlt} loading="lazy" />
      )}

      <span className="plate__frame" aria-hidden="true" />

      <span className={`plate__status plate__status--${status}`}>{label}</span>

      {complete && <span className="plate__seal" aria-hidden="true" />}
    </div>
  );
}
