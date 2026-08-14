/* ============================================================
   0. IMPORTS
   ============================================================ */

import { useRef, useState } from 'react';

import { useRevealed } from '@/hooks';

import './FormSlip.css';

/* ============================================================
   1. CONSTANTS
   ============================================================ */

/* Web3Forms takes the POST and forwards it to the address the access key
   was registered with — projects@agorasimlab.com is configured there, not
   here, which is why no recipient appears anywhere in this repo. */
const ENDPOINT = 'https://api.web3forms.com/submit';

/* Web3Forms access keys are public by design — they identify the inbox, not
   the sender, and the service expects them in client code. It lives in the
   build environment anyway so a fork gets a working form without inheriting
   someone else's inbox. See `.env.example`. */
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY ?? '';

/* ============================================================
   2. COMPONENT
   ============================================================ */

/**
 * The slip: a white card laid on the blueprint, the drawing's title block
 * turned into something fillable. Fields are underlined rather than boxed,
 * the way a form printed on a sheet is.
 *
 * It holds the form's state and its delivery; the copy and the field list
 * come from the feature that draws it, so two slips differ only in their
 * `content.js`. Submits to Web3Forms, which forwards to the address its
 * access key is registered with. A missing key is reported in the slip's
 * own status line rather than failing silently on submit.
 *
 * @param {object} props
 * @param {object} props.content Copy for this slip, shaped like SUGGEST.
 * @param {Array} props.fields The fields to draw, in order.
 * @param {Record<string, string>} [props.defaults] Values a field opens
 *   with, keyed by field id — how a project page hands the slip the project
 *   the reader came from. Uncontrolled: the reader can change any of them.
 */
export default function FormSlip({ content, fields, defaults = {} }) {
  const { eyebrow, headline, body, subject, submit, optional, progress, states } =
    content;
  const rootRef = useRef(null);
  const revealed = useRevealed(rootRef, 0.1);
  const [status, setStatus] = useState(ACCESS_KEY ? 'idle' : 'unconfigured');
  /* A preselected field is already filled, so the count and its underline
     have to open agreeing with the control rather than at zero. */
  const filledDefaults = Object.fromEntries(
    Object.entries(defaults).map(([id, value]) => [id, value.trim() !== '']),
  );
  /* Which fields currently hold something. Drives the filled underline and
     the progress count — both are feedback on the form's own state, so they
     are derived from it rather than tracked separately. */
  const [filled, setFilled] = useState(filledDefaults);

  const sending = status === 'sending';
  const filledCount = fields.filter((field) => filled[field.id]).length;

  function handleInput(event) {
    const { name, value } = event.target;
    const field = fields.find((entry) => entry.name === name);
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
         without the other would leave the slip reading as still filled.
         `form.reset()` restores the defaults rather than emptying, so the
         count has to come back to them and not to zero. */
      setFilled(filledDefaults);
    } catch {
      setStatus('error');
    }
  }

  return (
    <div
      className={[
        'slip',
        revealed && 'is-revealed',
        /* Drives the card's tick, wash and meter colour. */
        `slip--${status}`,
      ]
        .filter(Boolean)
        .join(' ')}
      ref={rootRef}
    >
      <div className="slip__panel">
        {/* The azulejo, drawn in blueprint ink on the paper. Masked rather
            than tinted: `azulejo.svg` is stroked white for the backdrop's
            use, and a mask reads its alpha, so one file serves both
            surfaces. */}
        <span className="slip__azulejo" aria-hidden="true" />

        <div className="slip__copy">
          <span className="overline slip__eyebrow">{eyebrow}</span>
          <h2 className="slip__headline">
            {headline.map((line) => (
              <span className="slip__line" key={line}>
                {line}
              </span>
            ))}
          </h2>
          <p className="slip__body">{body}</p>

          {/* Counts up as the slip is filled — the register's own tally
              device, turned on the reader's own answers. Not a validity
              meter: optional fields count too, because it measures how much
              you've told us, not how much you owe. */}
          <dl className="slip__progress">
            <dt className="slip__progress-label">{progress}</dt>
            <dd className="slip__progress-value">
              <span className="slip__progress-count" key={filledCount}>
                {String(filledCount).padStart(2, '0')}
              </span>
              <span className="slip__progress-total">
                {' / '}
                {String(fields.length).padStart(2, '0')}
              </span>
            </dd>
            <div className="slip__meter" aria-hidden="true">
              <span
                className="slip__meter-fill"
                style={{ width: `${(filledCount / fields.length) * 100}%` }}
              />
            </div>
          </dl>
        </div>

        <form className="slip__form" onSubmit={handleSubmit}>
          {fields.map((field, index) => (
            <p
              className={[
                'slip__field',
                (field.type === 'area' || field.wide) && 'slip__field--wide',
                filled[field.id] && 'is-filled',
              ]
                .filter(Boolean)
                .join(' ')}
              key={field.id}
              /* Deals the fields out in order on reveal, so the slip
                 arrives as a form being filled rather than a block. */
              style={{ transitionDelay: `${0.18 + index * 0.07}s` }}
            >
              <label className="slip__label" htmlFor={`slip-${field.id}`}>
                {field.label}
                {!field.required && <span className="slip__optional"> · {optional}</span>}
              </label>

              {field.type === 'area' && (
                <textarea
                  className="slip__input slip__input--area"
                  id={`slip-${field.id}`}
                  name={field.name}
                  rows={3}
                  required={field.required}
                  placeholder={field.placeholder}
                  defaultValue={defaults[field.id] ?? ''}
                  onInput={handleInput}
                />
              )}

              {field.type === 'select' && (
                <select
                  className="slip__input slip__input--select"
                  id={`slip-${field.id}`}
                  name={field.name}
                  required={field.required}
                  defaultValue={defaults[field.id] ?? ''}
                  onChange={handleInput}
                >
                  {/* Empty and disabled, so the placeholder can't be sent
                      back as an answer. */}
                  <option value="" disabled>
                    {field.placeholder}
                  </option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}

              {field.type !== 'area' && field.type !== 'select' && (
                <input
                  className="slip__input"
                  id={`slip-${field.id}`}
                  type={field.type}
                  name={field.name}
                  required={field.required}
                  placeholder={field.placeholder}
                  defaultValue={defaults[field.id] ?? ''}
                  onInput={handleInput}
                />
              )}
            </p>
          ))}

          {/* Web3Forms' own honeypot: bots fill it, people never see it. */}
          <input
            className="slip__botcheck"
            type="checkbox"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="slip__actions">
            <button
              className="btn btn--primary slip__submit"
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
              className={`slip__status slip__status--${status}`}
              role="status"
              aria-live="polite"
            >
              {states[status] ?? ''}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
