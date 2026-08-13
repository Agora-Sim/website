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
    /* Points at Vision, the section directly below, rather than the
       not-yet-built #sobre. */
    secondary: { label: 'Como calculamos', href: '#visao' },
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

/* --- 5. Method --- */

/* Card `lines` are methodology statements, not results — no invented
   figures. See the content warning at the top of this file: numbers that
   read as real output must actually be real. */
export const METHOD = {
  eyebrow: 'Método',
  headline: ['Uma ferramenta, muitos', 'problemas por resolver.'],
  body:
    'O simulador testa o impacto de uma política pública com o mesmo rigor com que ' +
    'testaria um gargalo numa autarquia, ou qualquer outro problema de gestão pública. ' +
    'Onde os dados não existem, uma investigação vai buscá-los — para que a ' +
    'transparência não dependa de quem já os tem.',
  cards: [
    {
      id: 'simulacao',
      icon: 'network',
      title: 'Impacto de uma política',
      subtitle: 'Simulação sobre dados abertos',
      badge: 'Simulador',
      lines: [
        'Testa o cenário antes da decisão',
        'Milhares de agentes sintéticos',
        'Isola a variável em análise',
        'Sem dados pessoais',
      ],
    },
    {
      id: 'gargalo',
      icon: 'flow',
      title: 'Gargalo organizacional',
      subtitle: 'Réplica de um processo público',
      lines: [
        'Mapeia cada etapa do processo',
        'Identifica onde o processo trava',
        'Compara alternativas de desenho',
        'Modelo aberto e auditável',
      ],
    },
    {
      id: 'investigacao',
      icon: 'search',
      title: 'Investigação aberta',
      subtitle: 'Quando os dados não existem',
      lines: [
        'Cruza fontes públicas dispersas',
        'Metodologia publicada',
        'Código e dados no GitHub',
      ],
    },
  ],
};

/* --- 6. Footer --- */

export const FOOTER = {
  tagline:
    'Projeto open-source de análise de políticas públicas, sem filiação partidária.',
  repo: { label: 'GitHub', href: 'https://github.com/Agora-Sim/Website' },
};
