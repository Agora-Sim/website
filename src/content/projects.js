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

/* --- 0. Imports --- */

import { JOIN_PATH } from './site.js';

/* --- 1. Routing --- */

/* The register's own path, and the base every project page hangs off. Kept
   here rather than written into the features so the cards, the nav entry and
   the router all read one string. */
export const PROJECTS_PATH = '/projetos';

/** The path of a project's own page. */
export const projectPath = (id) => `${PROJECTS_PATH}/${id}`;

/** A project by `id`, or `undefined` for a URL that names no project. */
export const findProject = (id) => PROJECTS.find((project) => project.id === id);

/* The query parameter a project page hands `/participar` so the slip opens
   with that project already chosen. It carries the `id`, not the title: the
   id is already a published URL segment, and a title can be reworded without
   breaking a link someone shared. */
export const JOIN_PARAM = 'projeto';

/** The participation slip, with `project` preselected. */
export const joinPath = (project) =>
  `${JOIN_PATH}?${JOIN_PARAM}=${encodeURIComponent(project.id)}`;

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
   `public/projects/` and point `image` at it (`/projects/nome.png`) with a
   descriptive `imageAlt` — if `image` is set, `imageAlt` must describe it,
   for screen readers and image search; only an empty `image` (which draws
   the empty plate) leaves `imageAlt` empty. `links` is optional — the
   external destinations the project's own page links out to (repository,
   package registry, …), each `{ label, href, icon }`, drawn as a stacked
   list of ghost buttons in registry order; `icon` names a glyph in the
   project page's `BrandIcon` and is itself optional. The cards themselves
   always route to that page and never carry these. `fields` keys come
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

   `join: true` puts the "Participar neste projeto" button on the project's
   own page, which opens `/participar` with this project already chosen. It
   is opt-in and omitted by default, because a project that is not taking
   people yet should not ask for them: delete the key to close it again.

   `sections` is the project page's body — a list of
   `{ heading, paragraphs }`, drawn in order. It is optional and starts
   empty: a project with none gets a placeholder line rather than a page
   that ends at its own title. */
export const PROJECTS = [
  {
    id: 'simulador',
    image: '/projects/simulador.png',
    imageAlt:
      'Rede de nós vermelhos ligados por arestas amarelas sobre fundo azul, o motivo do simulador.',
    cover: '/projects/simulator_image.png',
    coverAlt:
      'Cartão do simulator.py: à esquerda, uma janela com o logótipo e o ' +
      'motivo de nós ligados; à direita, um gráfico da métrica de idade ao ' +
      'longo do tempo e um mapa de calor da distribuição de idades.',
    status: 'concluido',
    title: 'Simulador',
    description:
      'Ferramenta para simular qualquer ambiente e apoiar a nossa investigação. ',
    summary:
      'O motor sobre o qual todos os outros projetos assentam: um simulador ' +
      'flexível capaz de, nas mãos de pessoas experientes, simular variados problemas. ' +
      'Acompanhado de ferramentas de análise, permite ter respostas objetivas sobre ' +
      'as questões portuguesas mais prevalentes na discussão pública. ' +
      'Desenvolvido em código aberto, está disponível para qualquer um a utilizar.',
    links: [
      {
        label: 'Ver no GitHub',
        href: 'https://github.com/Agora-Sim/Simulator',
        icon: 'github',
      },
      {
        label: 'Ver no PyPI',
        href: 'https://pypi.org/project/agorasimulator/',
        icon: 'pypi',
      },
    ],
    join: false,
    cardField: 'scope',
    fields: {
      started: '2026',
      scope: 'Ferramenta',
      license: 'AGPL-3.0',
      team: 'Guilherme Costa-Ferreira',
      version: '1.0.1',
    },
    sections: [
      {
        heading: 'O que é',
        paragraphs: [
          'O agorasimulator é um pacote de Python para simular sistemas ' +
            'complexos como redes de nós que interagem entre si. Permite ' +
            'descrever as especificações da simulação de forma simples e ' +
            'flexível num ficheiro de configuração YAML, onde se define que ' +
            'tipos de nós existem (os atores da simulação), que atributos ' +
            'têm e como se ligam entre si. O simulador corre depois esse ' +
            'ambiente tantas vezes quantas as necessárias para estudar o que ' +
            'emerge ao longo das corridas.',
          'Qualquer sistema que caiba nesta estrutura cabe aqui: cidadãos ' +
            'sob um governo, colaboradores numa organização, uma rede de ' +
            'abastecimento de água. Porque cada cenário corre muitas vezes, ' +
            'o resultado é uma distribuição de desfechos e não uma única ' +
            'corrida ajustada à narrativa.',
        ],
      },
      {
        heading: 'Como funciona',
        paragraphs: [
          'Sempre que se quer criar uma nova simulação, começa-se pelo ' +
            'ficheiro YAML inicial. Depois de o preencher, a simulação corre ' +
            'e fica guardada em formato HDF5.',
          'Terminada a simulação, é possível extrair um relatório da mesma. ' +
            'Mais uma vez a flexibilidade impera: definindo no código de ' +
            'visualização (no futuro também um ficheiro YAML) os diferentes ' +
            'gráficos, estes são gerados e guardados junto dos restantes ' +
            'dados. Para além de uma análise mais refinada, é ainda possível ' +
            'analisar cada corrida da simulação para verificar se a rede está ' +
            'bem ligada e observar dinâmicas que possam escapar à análise já ' +
            'feita — esta última gera um HTML dinâmico.',
        ],
      },
      {
        heading: 'Código aberto',
        paragraphs: [
          'O simulador está publicado no PyPI como agorasimulator, sob a ' +
            'licença AGPL-3.0-or-later, disponível para qualquer pessoa ' +
            'usar. Corre em Python 3.13 ou superior, é gerido com Poetry e ' +
            'tem cerca de 97% de cobertura entre testes unitários e de ' +
            'integração.',
          'A arquitetura separa-se em três camadas (serviço, domínio e ' +
            'adaptadores), com o domínio independente do I/O e fácil de ' +
            'acompanhar graças a um UML completo na pasta docs/. Módulos, ' +
            'efeitos, métricas e regras de ligação estendem-se todos pelo ' +
            'mesmo padrão, por subclasse, de modo que o motor cresce sem se ' +
            'reescrever.',
        ],
      },
    ],
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
      'perdas, em custo e em tempo.',
    join: true,
    fields: {
      scope: 'Recursos',
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
      'Desmistificar o verdadeiro impacto das diferentes medidas propostas ' +
      'para melhorar a situação das rendas. ',
    summary:
      'As medidas propostas para a habitação são muitas e o debate sobre ' +
      'elas é quase todo qualitativo. Este projeto modela cada uma no ' +
      'simulador e publica o que cada uma faz ao mercado de arrendamento. ',
    join: true,
    fields: {
      scope: 'Política Pública',
    },
  },
  {
    id: 'digital-twin',
    image: '',
    imageAlt: '',
    cover: '',
    coverAlt: '',
    status: 'desenvolvimento',
    title: 'Portugal Digital',
    description:
      'O quão exata consegue ser a simulação em relação ao panorama nacional? ' +
      'Um teste de stress do simulador',
    summary:
      'O teste de stress do simulador: até onde é possível aproximar o país ' +
      'inteiro num único modelo, e onde é que essa aproximação deixa de ser ' +
      'útil. Vale tanto pelo que conseguir reproduzir como pelos limites que ' +
      'expuser.',
    join: true,
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
    /* Marks a slot rather than a project: the register and the row draw it
       like any other card, but nothing that asks the reader to pick a
       project should offer four identical unnamed ones. */
    placeholder: false,
    title: 'Por anunciar',
    description: 'Um projeto ainda por anunciar.',
    summary:
      'Este lugar está reservado para um projeto que ainda não foi ' +
      'anunciado. Quando estiver, é aqui que fica, com o âmbito, o estado ' +
      'e o método à vista, como os restantes.',
  })),
];

/* --- 5b. Registry order ---
   The /projetos register draws projects grouped by state — Concluído, then Em
   desenvolvimento, then Planeado, the order PROJECT_STATUSES declares above —
   and within a state by each project's optional numeric `order` (ascending,
   lower sits higher). A project with no `order` keeps its authored position
   among its equals, so the field is only needed where you want to override
   that; the placeholders, all `planeado`, sink to the bottom on their own.
   The home row and the project pages are unaffected — the row resolves
   HOME_PROJECT_IDS by id and the pages resolve the URL segment, both
   independent of this order — so only the register reads it. */
const STATUS_RANK = Object.fromEntries(
  Object.keys(PROJECT_STATUSES).map((id, rank) => [id, rank]),
);

/** PROJECTS grouped by state and sorted by `order` within each state. */
export const registryProjects = () =>
  PROJECTS.map((project, index) => ({ project, index }))
    .sort((a, b) => {
      const byState =
        (STATUS_RANK[a.project.status] ?? Infinity) -
        (STATUS_RANK[b.project.status] ?? Infinity);
      if (byState !== 0) return byState;
      const byOrder = (a.project.order ?? Infinity) - (b.project.order ?? Infinity);
      if (byOrder !== 0) return byOrder;
      return a.index - b.index;
    })
    .map(({ project }) => project);

/* --- 6. The home row's selection --- */

/* The four projects the home page shows, by `id`, in the order they appear
   there. The row is a summary, not the register — it holds four cards on one
   line, so changing what the home page features is editing this list and
   nothing else. Order here wins over registry order; the /projetos register
   keeps drawing every project either way. */
export const HOME_PROJECT_IDS = [
  'simulador',
  'digital-twin',
  'aguas',
  'rendas',
];

/**
 * The projects the home row draws, in HOME_PROJECT_IDS order. An id that
 * names no project is dropped rather than rendered as a hole — that happens
 * when a project is renamed or removed and this list is not updated with it.
 */
export const homeProjects = () =>
  HOME_PROJECT_IDS.map(findProject).filter(Boolean);
