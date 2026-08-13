/* ============================================================
   0. PROJECTS CONTENT
   Every string the projects section renders. Language: pt-PT.
   This is the file edited most often — see the note above
   `PROJECTS` for how to add one.
   ============================================================ */

/* --- 1. Status registry --- */

/* One entry per state, keyed by the `status` a project carries. Adding a
   state is an entry here plus a `.projects__status--<id>` rule; the card
   never branches on the string itself. */
export const PROJECT_STATUSES = {
  concluido: { label: 'Concluído' },
  desenvolvimento: { label: 'Em desenvolvimento' },
  planeado: { label: 'Planeado' },
};

/* --- 2. Section --- */

/* To add a project: append an entry below. Drop the banner image in
   `public/projects/` and point `image` at it (`/projects/nome.png`) with
   an `imageAlt`; leave `image` empty and the card draws an empty plate
   instead. `href` is optional — without one the card is inert, with one
   the title links out. Placeholder entries exist to be replaced. */
export const PROJECTS = {
  eyebrow: 'Projetos',
  headline: ['O que estamos a construir,', 'e o que vem a seguir.'],
  body:
    'Todos os nossos projetos abrangem várias dimensões da realidade Portuguesa. ' +
    'Alguns projetos serão relativos a novas ferramentas, outros a análise de soluções. ' +
    'Todos estão disponíveis e abertos a discussões e melhorias. ',
  items: [
    {
      id: 'simulador',
      image: 'src/assets/images/simulator_banner.png',
      imageAlt: '',
      status: 'desenvolvimento',
      title: 'Simulador',
      description:
        'Ferramenta para simular qualquer ambiente e apoiar a nossa investigação. ',
      href: 'https://github.com/Agora-Sim/Simulator',
    },
    {
      id: 'aguas',
      image: '',
      imageAlt: '',
      status: 'planeado',
      title: 'Água em Almada',
      description: 'Projeto de análise tanto de qual será o estado da rede de águas ' +
      'de Almada, bem como qual seria o impacto de cada possível solução ',
    },
    {
      id: 'rendas',
      image: '',
      imageAlt: '',
      status: 'planeado',
      title: 'A Fortuna das Rendas',
      description: 'Desmisitificar o verdadero impacto das diferentes medidas propostas ' +
      'para melhorar a situação das rendas. ',
    },
    {
      id: 'digital-twin',
      image: '',
      imageAlt: '',
      status: 'planeado',
      title: 'Portugal Digital',
      description: 'O quão exata consegue ser a simulação em relação ao panorama nacional? ' +
      'Um teste de stress da ferramenta',
    },
  ],
};
