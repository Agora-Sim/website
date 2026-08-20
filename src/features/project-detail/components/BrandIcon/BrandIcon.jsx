/* ============================================================
   0. BRAND ICON
   The small glyph a project link carries on its left. A link in
   the registry names one by string (`icon: 'github'`); this maps
   that string to an inline SVG, so `content.js` stays free of JSX
   and a new destination is one entry here plus one in the map.

   All glyphs draw in `currentColor` at 1em, so they inherit the
   button's text colour and size with no extra styling.
   ============================================================ */

/* --- 1. Glyphs --- */

/* Keyed by the `icon` string a link carries. GitHub is the brand mark
   (filled); PyPI is a package glyph (stroked) — an honest stand-in for the
   registry rather than a trademark path. Add a destination by adding a key. */
const GLYPHS = {
  github: (
    <path
      fill="currentColor"
      d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
    />
  ),
  pypi: (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16.5 9.4 7.5 4.21" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path d="M3.27 6.96 12 12.01l8.73-5.05" />
      <path d="M12 22.08V12" />
    </g>
  ),
};

/* --- 2. Component --- */

/**
 * The glyph for a link's `icon` string, or nothing for one that names none —
 * so a link without an icon simply draws its label.
 *
 * @param {object} props
 * @param {string} [props.name] the `icon` key from a project link
 */
export default function BrandIcon({ name }) {
  const glyph = name && GLYPHS[name];
  if (!glyph) return null;

  return (
    <svg
      className="detail__link-glyph"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      aria-hidden="true"
    >
      {glyph}
    </svg>
  );
}
