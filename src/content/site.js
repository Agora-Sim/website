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
  /* Two cards, not three — the reference stages exactly two, and a third
     diluted the "one engine, staggered" composition. The investigation
     angle stays in `body` above rather than getting its own card. */
  cards: [
    {
      id: 'simulacao',
      icon: 'network',
      /* Only this card is stamped: it names the tool itself. Stamping both
         would read as two products instead of one engine on two problems. */
      stamp: 'Simulador',
      title: 'Impacto de uma política',
      subtitle: 'Simulação sobre dados abertos',
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
  ],
  /* The stamp on the first card is the link to the tool it names, so the
     label here is what a screen reader gets, not visible copy. */
  repo: {
    label: 'Ver o simulador no GitHub',
    href: 'https://github.com/Agora-Sim/Simulator',
  },
};

/* --- 6. Projects --- */

/* One entry per state, keyed by the `status` a project carries. Adding a
   state is an entry here plus a `.projects__status--<id>` rule; the card
   never branches on the string itself. */
export const PROJECT_STATUSES = {
  concluido: { label: 'Concluído' },
  desenvolvimento: { label: 'Em desenvolvimento' },
  planeado: { label: 'Planeado' },
};

/* To add a project: append an entry below. Drop the banner image in
   `public/projects/` and point `image` at it (`/projects/nome.png`) with
   an `imageAlt`; leave `image` empty and the card draws an empty plate
   instead. `href` is optional — without one the card is inert, with one
   the title links out. Placeholder entries exist to be replaced. */
export const PROJECTS = {
  eyebrow: 'Projetos',
  headline: ['O que estamos a construir,', 'e o que vem a seguir.'],
  body:
    'Cada projeto é público desde o primeiro dia — o código, o modelo e os ' +
    'pressupostos. O estado de cada um está indicado para que ninguém tenha de ' +
    'adivinhar o que já é utilizável.',
  items: [
    {
      id: 'simulador',
      image: '',
      imageAlt: '',
      status: 'desenvolvimento',
      title: 'Simulador',
      description:
        'Ferramenta para simular qualquer ambiente e apoiar a nossa investigação. ' +
        'Reproduz um sistema em agentes sintéticos e mede o efeito de uma alteração.',
      href: 'https://github.com/Agora-Sim/Simulator',
    },
    /* Placeholders — substituir por projetos reais. */
    {
      id: 'projeto-2',
      image: '',
      imageAlt: '',
      status: 'planeado',
      title: 'Por anunciar',
      description: 'Espaço reservado para o próximo projeto.',
    },
    {
      id: 'projeto-3',
      image: '',
      imageAlt: '',
      status: 'planeado',
      title: 'Por anunciar',
      description: 'Espaço reservado para o próximo projeto.',
    },
    {
      id: 'projeto-4',
      image: '',
      imageAlt: '',
      status: 'planeado',
      title: 'Por anunciar',
      description: 'Espaço reservado para o próximo projeto.',
    },
  ],
};

/* --- 7. Footer --- */

export const FOOTER = {
  tagline:
    'Projeto open-source de análise de políticas públicas, sem filiação partidária.',
  repo: { label: 'GitHub', href: 'https://github.com/Agora-Sim/Website' },
};
