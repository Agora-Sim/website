/* ============================================================
   0. IMPORTS
   ============================================================ */

import { useRef, useState } from 'react';

import { useRevealed } from '@/hooks';

import { ENDPOINT, SUGGEST, SUGGEST_FIELDS } from './content.js';
import './Suggest.css';

/* ============================================================
   1. CONSTANTS
   ============================================================ */

/* Web3Forms access keys are public by design — they identify the inbox, not
   the sender, and the service expects them in client code. It lives in the
   build environment anyway so a fork gets a working form without inheriting
   someone else's inbox. See `.env.example`. */
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY ?? '';

/* ============================================================
   2. COMPONENT
   ============================================================ */

/**
 * The suggestion slip at the foot of the register: the drawing's title block
 * turned into something fillable. Fields are underlined rather than boxed,
 * the way a form printed on a sheet is.
 *
 * Submits to Web3Forms, which forwards to the address its access key is
 * registered with. A missing key is reported in the form's own status line
 * rather than failing silently on submit.
 */
export default function Suggest() {
  const { eyebrow, headline, body, subject, submit, optional, progress, states } =
    SUGGEST;
  const sectionRef = useRef(null);
  const revealed = useRevealed(sectionRef, 0.1);
  const [status, setStatus] = useState(ACCESS_KEY ? 'idle' : 'unconfigured');
  /* Which fields currently hold something. Drives the filled underline and
     the progress count — both are feedback on the form's own state, so they
     are derived from it rather than tracked separately. */
  const [filled, setFilled] = useState({});

  const sending = status === 'sending';
  const filledCount = SUGGEST_FIELDS.filter((field) => filled[field.id]).length;

  function handleInput(event) {
    const { name, value } = event.target;
    const field = SUGGEST_FIELDS.find((entry) => entry.name === name);
    setFilled((current) => ({ ...current, [field.id]: value.trim() !== '' }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!ACCESS_KEY || sending) return;

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    setStatus('sending');

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, access_key: ACCESS_KEY, subject }),
      });

      /* The service answers 200 with `success: false` on a rejected
         submission, so the status code alone doesn't say it went through. */
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message);

      setStatus('ok');
      form.reset();
      /* The underlines and the count follow the fields, so clearing one
         without the other would leave the slip reading as still filled. */
      setFilled({});
    } catch {
      setStatus('error');
    }
  }

  return (
    <section
      className={[
        'suggest',
        revealed && 'is-revealed',
        /* Drives the card's tick, wash and meter colour. On the section
           rather than the card so a future sibling can respond too. */
        `suggest--${status}`,
      ]
        .filter(Boolean)
        .join(' ')}
      id="sugerir"
      ref={sectionRef}
    >
      <div className="wrap">
        <div className="suggest__panel">
          {/* The azulejo, drawn in blueprint ink on the paper. Masked
              rather than tinted: `azulejo.svg` is stroked white for the
              backdrop's use, and a mask reads its alpha, so one file
              serves both surfaces. */}
          <span className="suggest__azulejo" aria-hidden="true" />

          <div className="suggest__copy">
            <span className="overline suggest__eyebrow">{eyebrow}</span>
            <h2 className="suggest__headline">
              {headline.map((line) => (
                <span className="suggest__line" key={line}>
                  {line}
                </span>
              ))}
            </h2>
            <p className="suggest__body">{body}</p>

            {/* Counts up as the slip is filled — the register's own tally
                device, turned on the reader's own answers. Not a validity
                meter: optional fields count too, because it measures how
                much you've told us, not how much you owe. */}
            <dl className="suggest__progress">
              <dt className="suggest__progress-label">{progress}</dt>
              <dd className="suggest__progress-value">
                <span className="suggest__progress-count" key={filledCount}>
                  {String(filledCount).padStart(2, '0')}
                </span>
                <span className="suggest__progress-total">
                  {' / '}
                  {String(SUGGEST_FIELDS.length).padStart(2, '0')}
                </span>
              </dd>
              <div className="suggest__meter" aria-hidden="true">
                <span
                  className="suggest__meter-fill"
                  style={{ width: `${(filledCount / SUGGEST_FIELDS.length) * 100}%` }}
                />
              </div>
            </dl>
          </div>

          <form className="suggest__form" onSubmit={handleSubmit} noValidate={false}>
            {SUGGEST_FIELDS.map((field, index) => (
              <p
                className={[
                  'suggest__field',
                  field.type === 'area' && 'suggest__field--wide',
                  filled[field.id] && 'is-filled',
                ]
                  .filter(Boolean)
                  .join(' ')}
                key={field.id}
                /* Deals the fields out in order on reveal, so the slip
                   arrives as a form being filled rather than a block. */
                style={{ transitionDelay: `${0.18 + index * 0.07}s` }}
              >
                <label className="suggest__label" htmlFor={`suggest-${field.id}`}>
                  {field.label}
                  {!field.required && (
                    <span className="suggest__optional"> · {optional}</span>
                  )}
                </label>

                {field.type === 'area' ? (
                  <textarea
                    className="suggest__input suggest__input--area"
                    id={`suggest-${field.id}`}
                    name={field.name}
                    rows={3}
                    required={field.required}
                    placeholder={field.placeholder}
                    onInput={handleInput}
                  />
                ) : (
                  <input
                    className="suggest__input"
                    id={`suggest-${field.id}`}
                    type={field.type}
                    name={field.name}
                    required={field.required}
                    placeholder={field.placeholder}
                    onInput={handleInput}
                  />
                )}
              </p>
            ))}

            {/* Web3Forms' own honeypot: bots fill it, people never see it. */}
            <input
              className="suggest__botcheck"
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="suggest__actions">
              <button
                className="btn btn--primary suggest__submit"
                type="submit"
                disabled={sending || !ACCESS_KEY}
              >
                {sending ? states.sending : submit}
                {!sending && (
                  <span className="btn__arrow" aria-hidden="true">
                    →
                  </span>
                )}
              </button>

              {/* Announced when it changes, so the outcome reaches a screen
                  reader that never saw the button's label change. */}
              <p
                className={`suggest__status suggest__status--${status}`}
                role="status"
                aria-live="polite"
              >
                {states[status] ?? ''}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
