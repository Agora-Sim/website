/* ============================================================
   0. HERO CONTENT
   Every string the hero renders. Language: pt-PT.
   ============================================================ */

/* --- 1. Section --- */

export const HERO = {
  /* Split so the accent word can be set in Anzac without a nested parser. */
  headline: ['AgoraSim:', 'Engineering'],
  headlineAccent: 'Portugal',
  lede:
    'Projeto open-source com o objectivo de trazer o método científico ao discurso ' +
    'político. Para que não dependamos mais do discurso político para avaliarmos as ' +
    'soluções aos muitos problemas do país.',
  actions: {
    /* Leaves the page for the full register, so it is a route rather than
       an anchor — the home row below is a summary of it, not the thing. */
    primary: { label: 'Ver os projetos', to: '/projetos' },
    /* Points at Vision, the section directly below. Same page, so a plain
       anchor: the browser scrolls to it without the router involved. */
    secondary: { label: 'Como calculamos', href: '#visao' },
  },
};

/* --- 2. Signature graph --- */

/* The figure carries no visible copy, so this is all screen readers get. */
export const GRAPH = {
  alt: 'Rede de nós, com o nó de origem à esquerda e a magnitude a diminuir para a direita',
};
