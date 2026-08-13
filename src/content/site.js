/* ============================================================
   0. SITE CONTENT
   Every string the page renders lives here. Components read from
   this file and never hold copy of their own, so a wording change
   is one edit in one place.

   Language: pt-PT. Figures must be real. The brand mockups use
   invented numbers for sizing, and those must not reach the site.
   ============================================================ */

/* --- 1. Navigation --- */

export const NAV_LINKS = [
  { id: 'projetos', label: 'Projetos', href: '#projetos' },
  { id: 'sobre', label: 'Sobre', href: '#sobre' },
];

export const BRAND = {
  name: 'AgoraSim',
  logoAlt: 'AgoraSim',
  homeHref: '#topo',
};

/* --- 2. Hero --- */

export const HERO = {
  eyebrow: 'Investigação independente · Portugal',
  /* Split so the accent word can be set in Anzac without a nested parser. */
  headline: ['A política', 'também se'],
  headlineAccent: 'calcula',
  lede:
    'Modelamos o impacto de medidas de política pública antes de o país as viver. ' +
    'Dados abertos, métodos revistos por pares e todos os pressupostos à vista. ' +
    'Sem partido e sem opinião.',
  actions: {
    primary: { label: 'Ver os projetos', href: '#projetos' },
    secondary: { label: 'Como calculamos', href: '#sobre' },
  },
};

/* --- 3. Signature graph annotations --- */

/* Drawing metadata, not claims about the work. Keep it that way. */
export const GRAPH = {
  alt: 'Rede de nós desenhada como peça técnica',
  top: 'Modelo base — diagrama 02',
  side: 'Esc. 1 : 1',
  primary: 'nó de origem',
  bottom: 'AgoraSim · des. 002 · rev 00',
};
