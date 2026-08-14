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
    'político. Para que não dependamos mais do apelo à autoridade para avaliarmos as ' +
    'soluções aos muitos problemas do país.',
  actions: {
    /* The hero's one action. It leaves the page for the full register, so
       it is a route rather than an anchor — the home row below is a summary
       of it, not the thing. There is no second button: the fold already
       carries the bar's "Participar", and a ghost link down to Vision only
       offered the scroll the reader was about to make anyway. */
    primary: { label: 'Ver os projetos', to: '/projetos' },
  },
};

/* --- 2. Signature graph --- */

/* The figure carries no visible copy, so this is all screen readers get. */
export const GRAPH = {
  alt: 'Rede de nós, com o nó de origem à esquerda e a magnitude a diminuir para a direita',
};
