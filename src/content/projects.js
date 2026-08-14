/* ============================================================
   0. PROJECT REGISTRY
   The projects themselves, shared by the three views that draw
   them: the home page's Projects row, the /projetos register and
   each project's own page. Section copy (eyebrows, headlines)
   stays in each feature's own `content.js`; only the projects
   live here, because more than one feature renders them.

   Language: pt-PT. Figures must be real — the brand mockups use
   invented numbers for sizing, and those must not reach the site.
   ============================================================ */

/* --- 1. Routing --- */

/* The register's own path, and the base every project page hangs off. Kept
   here rather than written into the features so the cards, the nav entry and
   the router all read one string. */
export const PROJECTS_PATH = '/projetos';

/** The path of a project's own page. */
export const projectPath = (id) => `${PROJECTS_PATH}/${id}`;

/** A project by `id`, or `undefined` for a URL that names no project. */
export const findProject = (id) => PROJECTS.find((project) => project.id === id);

/* --- 2. Figure formats --- */

/* The two figures a project can carry, and the shape each is drawn at. They
   are different pictures, not one picture at two sizes: `image` is the card
   banner, cropped to be legible at thumbnail size, and `cover` is the
   project page's own figure — a drawing of the model, a map, a chart — which
   is still to be made for every project here.

   The ratios live here rather than in the CSS because they are what someone
   needs before drawing the file. The cover's is also what the page lays out
   at, so the brief and the layout stay one number; the banner's is the
   file's shape, which the two card sizes then crop. */
export const PROJECT_FIGURES = {
  /* Card banner, `public/projects/<id>.png`. Drawn at 1600 × 900, and cropped
     two ways: the register's closed card shows it whole at 16/9, its open
     panel shows only the central column of it. Keep the subject inside the
     middle 55% of the width. Full brief: `docs/imagens.md`. */
  image: { ratio: '16 / 9' },
  /* Project page figure, `public/projects/covers/<id>.png`. 1600 × 1000. */
  cover: { ratio: '8 / 5' },
};

/* --- 3. Status registry --- */

/* One entry per state, keyed by the `status` a project carries. Adding a
   state is an entry here plus a `.plate__status--<id>` rule; the card
   never branches on the string itself. */
export const PROJECT_STATUSES = {
  concluido: { label: 'Concluído' },
  desenvolvimento: { label: 'Em desenvolvimento' },
  planeado: { label: 'Planeado' },
};

/* --- 4. Spec-field registry --- */

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

/**
 * The spec cells a project actually discloses, in registry order, each with
 * its value attached. Every field is optional — a project omits any it has
 * no real value for — so the missing ones are dropped rather than drawn
 * empty. Lives here rather than in a feature because the register and the
 * project page both draw the block, and the order is this file's to own.
 *
 * @param {Record<string, string>} [fields] a project's `fields` object
 */
export const disclosedFields = (fields = {}) =>
  PROJECT_FIELDS.filter((field) => Boolean(fields[field.id])).map((field) => ({
    ...field,
    value: fields[field.id],
  }));

/**
 * The single field the register's closed card shows, since one cell is all
 * that fits at a quarter of the grid. Which one is the project's own call —
 * the licence is the point of one and an afterthought on the next — so it
 * names a `cardField`; a project that names none falls back to the first
 * field it discloses, in registry order.
 *
 * @param {object} project an entry from PROJECTS
 */
export const leadField = (project) => {
  const fields = disclosedFields(project.fields);
  return fields.find((field) => field.id === project.cardField) ?? fields[0];
};

/* --- 5. Projects --- */

/* To add a project: append an entry below. Drop the banner image in
   `public/projects/` and point `image` at it (`/projects/nome.png`) with an
   `imageAlt`; leave `image` empty and the card draws an empty plate
   instead. `href` is optional — the repository the project's own page links
   out to; the cards themselves always route to that page. `fields` keys come
   from PROJECT_FIELDS above and are all optional. `summary` is the longer
   paragraph the /projetos register and the project page show;
   `description` is the one-liner the home row shows.

   `id` is the URL segment: the project's page is `/projetos/<id>`, so
   changing one breaks every link already published to it.

   `cover`/`coverAlt` is the figure the project's own page draws, and it is
   a different picture from `image`: the banner is a thumbnail, the cover is
   the project's own drawing at page width (see PROJECT_FIGURES for both
   shapes). None exists yet — every project carries an empty `cover`, which
   draws the empty plate, and filling one is dropping the file in
   `public/projects/covers/` and naming it here.

   `cardField` names which of `fields` the register's closed card shows —
   the one cell that fits at a quarter of the grid. It is optional: without
   it the first disclosed field stands in. The open panel shows them all.

   `sections` is the project page's body — a list of
   `{ heading, paragraphs }`, drawn in order. It is optional and starts
   empty: a project with none gets a placeholder line rather than a page
   that ends at its own title. */
export const PROJECTS = [
  {
    id: 'simulador',
    image: '/projects/simulador.png',
    imageAlt: '',
    cover: '',
    coverAlt: '',
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
    cardField: 'scope',
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
    cover: '',
    coverAlt: '',
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
    cover: '',
    coverAlt: '',
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
    cover: '',
    coverAlt: '',
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

  /* --- Placeholders ---
     Slots held open for projects not yet announced. They carry no invented
     title, summary or figures — the content warning at the top of this file
     applies to placeholders too — so each says only that it is a slot.
     Delete an entry as the real project replaces it; the register's tally
     counts these, so leaving them in overstates the registry. */
  ...[1, 2, 3, 4].map((n) => ({
    id: `por-anunciar-${n}`,
    image: '',
    imageAlt: '',
    cover: '',
    coverAlt: '',
    status: 'planeado',
    title: 'Por anunciar',
    description: 'Um projeto ainda por anunciar.',
    summary:
      'Este lugar está reservado para um projeto que ainda não foi ' +
      'anunciado. Quando estiver, é aqui que fica — com o âmbito, o estado ' +
      'e o método à vista, como os restantes.',
  })),
];
