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
  /* Split so the accent word can be set in Anzac without a nested parser. */
  headline: ['AgoraSim:', 'Engineering'],
  headlineAccent: 'Portugal',
  lede:
    'Projeto open-source com o objectivo de trazer o método científico ao discurso ' +
    'político. Para que não dependamos mais do discurso político para avaliarmos as ' +
    'soluções aos muitos problemas do país.',
  actions: {
    primary: { label: 'Ver os projetos', href: '#projetos' },
    secondary: { label: 'Como calculamos', href: '#sobre' },
  },
};

/* --- 3. Signature graph --- */

/* The figure carries no visible copy, so this is all screen readers get. */
export const GRAPH = {
  alt: 'Rede de nós, com o nó de origem à esquerda e a magnitude a diminuir para a direita',
};

/* --- 4. Vision --- */

export const VISION = {
  eyebrow: 'Visão',
  /* Split so the headline keeps its two-line break at every width. */
  headline: ['Queremos um país que decide', 'com evidência, não com slogans.'],
  body:
    'Em Portugal, quem tem formação para analisar uma política pública raramente ' +
    'tem tempo, e quem decide raramente espera pelos números. Juntamos estudantes ' +
    'de engenharia, direito, finanças e design a políticas concretas, com o rigor ' +
    'de uma tese e sem tomar partido.',
  cta: { label: 'Como analisamos', href: '#sobre' },
};
