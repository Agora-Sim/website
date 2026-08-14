/* ============================================================
   0. PROJECT REGISTRY
   The projects themselves, shared by the home page's Projects
   section and the /projetos page. Section copy (eyebrows,
   headlines) stays in each feature's own `content.js`; only the
   projects live here, because two features render them.

   Language: pt-PT. Figures must be real — the brand mockups use
   invented numbers for sizing, and those must not reach the site.
   ============================================================ */

/* --- 1. Status registry --- */

/* One entry per state, keyed by the `status` a project carries. Adding a
   state is an entry here plus a `.plate__status--<id>` rule; the card
   never branches on the string itself. */
export const PROJECT_STATUSES = {
  concluido: { label: 'Concluído' },
  desenvolvimento: { label: 'Em desenvolvimento' },
  planeado: { label: 'Planeado' },
};

/* --- 2. Spec-field registry --- */

/* The title-block fields a project card can carry, in the order they are
   drawn. Every one is optional: a project omits any field it has no real
   value for, or does not want to disclose, and the cell simply isn't
   rendered. Order lives here rather than on each project so the same field
   lands in the same column on every card. */
export const PROJECT_FIELDS = [
  { id: 'version', label: 'Versão' },
  { id: 'started', label: 'Início' },
  { id: 'team', label: 'Equipa' },
  { id: 'scope', label: 'Âmbito' },
  { id: 'license', label: 'Licença' },
];

/* --- 3. Projects --- */

/* To add a project: append an entry below. Drop the banner image in
   `public/projects/` and point `image` at it (`/projects/nome.png`) with an
   `imageAlt`; leave `image` empty and the card draws an empty plate
   instead. `href` is optional — without one the card is inert, with one the
   title links out. `fields` keys come from PROJECT_FIELDS above and are all
   optional. `summary` is the longer paragraph only the /projetos page
   shows; `description` is the one-liner the home row shows. */
export const PROJECTS = [
  {
    id: 'simulador',
    image: '/projects/simulador.png',
    imageAlt: '',
    status: 'desenvolvimento',
    title: 'Simulador',
    description:
      'Ferramenta para simular qualquer ambiente e apoiar a nossa investigação. ',
    summary:
      'O motor sobre o qual todos os outros projetos assentam: um simulador ' +
      'de agentes que replica um ambiente — uma rede, um serviço, um ' +
      'mercado — e permite medir o que acontece quando se muda uma regra. ' +
      'Desenvolvido em aberto, com o código e as decisões de modelação à ' +
      'vista de quem quiser contestá-las.',
    href: 'https://github.com/Agora-Sim/Simulator',
    fields: {
      started: '2025',
      scope: 'Ferramenta',
      license: 'MIT',
    },
  },
  {
    id: 'aguas',
    image: '',
    imageAlt: '',
    status: 'planeado',
    title: 'Água em Almada',
    description:
      'Projeto de análise tanto de qual será o estado da rede de águas ' +
      'de Almada, bem como qual seria o impacto de cada possível solução ',
    summary:
      'Um caso concreto e local: perceber em que estado está a rede de ' +
      'abastecimento de Almada e o que cada solução proposta mudaria, em ' +
      'perdas, em custo e em tempo. Começa por levantar os dados públicos ' +
      'que existem — e por documentar os que não existem.',
    fields: {
      scope: 'Política pública',
    },
  },
  {
    id: 'rendas',
    image: '',
    imageAlt: '',
    status: 'planeado',
    title: 'A Fortuna das Rendas',
    description:
      'Desmisitificar o verdadero impacto das diferentes medidas propostas ' +
      'para melhorar a situação das rendas. ',
    summary:
      'As medidas propostas para a habitação são muitas e o debate sobre ' +
      'elas é quase todo qualitativo. Este projeto modela cada uma no ' +
      'simulador e publica o que cada uma faz ao mercado de arrendamento, ' +
      'com os pressupostos declarados.',
    fields: {
      scope: 'Política pública',
    },
  },
  {
    id: 'digital-twin',
    image: '',
    imageAlt: '',
    status: 'planeado',
    title: 'Portugal Digital',
    description:
      'O quão exata consegue ser a simulação em relação ao panorama nacional? ' +
      'Um teste de stress da ferramenta',
    summary:
      'O teste de stress do simulador: até onde é possível aproximar o país ' +
      'inteiro num único modelo, e onde é que essa aproximação deixa de ser ' +
      'útil. Vale tanto pelo que conseguir reproduzir como pelos limites que ' +
      'expuser.',
    fields: {
      scope: 'Investigação',
    },
  },
];
