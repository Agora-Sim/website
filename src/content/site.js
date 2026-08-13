/* ============================================================
   0. SHARED CONTENT
   Copy used by more than one feature. Copy that belongs to a
   single section lives in that feature's `content.js` instead —
   see `src/features/<name>/content.js`.

   Language: pt-PT. Figures must be real. The brand mockups use
   invented numbers for sizing, and those must not reach the site.
   ============================================================ */

/* --- 1. Navigation --- */

export const NAV_LINKS = [
  { id: 'projetos', label: 'Projetos', href: '#projetos' },
  { id: 'sobre', label: 'Sobre', href: '#sobre' },
];

/* --- 2. Brand --- */

export const BRAND = {
  name: 'AgoraSim',
  logoAlt: 'AgoraSim',
  homeHref: '#topo',
};

/* --- 3. Footer --- */

export const FOOTER = {
  tagline:
    'Projeto open-source de análise de políticas públicas, sem filiação partidária.',
  repo: { label: 'GitHub', href: 'https://github.com/Agora-Sim/Website' },
};
