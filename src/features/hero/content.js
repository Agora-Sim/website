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
    primary: { label: 'Ver os projetos', href: '#projetos' },
    /* Points at Vision, the section directly below, rather than the
       not-yet-built #sobre. */
    secondary: { label: 'Como calculamos', href: '#visao' },
  },
};

/* --- 2. Signature graph --- */

/* The figure carries no visible copy, so this is all screen readers get. */
export const GRAPH = {
  alt: 'Rede de nós, com o nó de origem à esquerda e a magnitude a diminuir para a direita',
};
