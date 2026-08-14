/* ============================================================
   0. SHARED CONTENT
   Copy used by more than one feature. Copy that belongs to a
   single section lives in that feature's `content.js` instead —
   see `src/features/<name>/content.js`. The projects themselves
   live in `src/content/projects.js`.

   Language: pt-PT. Figures must be real. The brand mockups use
   invented numbers for sizing, and those must not reach the site.
   ============================================================ */

/* --- 1. Navigation --- */

/* `to` is a router destination, always absolute, so the same link works
   from any page: a bare path routes, a path with a hash routes and then
   lands on that section. */
export const NAV_LINKS = [
  { id: 'projetos', label: 'Projetos', to: '/projetos' },
  { id: 'sobre', label: 'Sobre', to: '/#sobre' },
];

/* The bar's one action, kept apart from NAV_LINKS: those stay on the site,
   this one leaves it. Off-site, so it opens in a new tab. */
export const NAV_CTA = {
  label: 'Participar',
  href: 'https://github.com/Agora-Sim',
};

/* --- 2. Brand --- */

export const BRAND = {
  name: 'AgoraSim',
  logoAlt: 'AgoraSim',
  homeHref: '/',
};

/* --- 3. Footer --- */

export const FOOTER = {
  tagline:
    'Projeto open-source de análise de políticas públicas, sem filiação partidária.',
  repo: { label: 'GitHub', href: 'https://github.com/Agora-Sim/Website' },
};
