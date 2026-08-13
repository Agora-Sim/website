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
