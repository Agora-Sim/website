/* ============================================================
   0. JOIN CONTENT
   Every string the participation slip renders, including its
   field labels, its placeholder hints and all four of its
   states. Language: pt-PT.
   ============================================================ */

/* --- 0. Imports --- */

import { PROJECTS } from '@/content/projects.js';

/* --- 1. Options --- */

/* The project choices, read from the registry so a new project appears here
   the moment it is added, with no edit in this file. The last entry is the
   way out of the list: someone who wants to start something takes it and
   describes it in the field below. Unannounced slots are left out: they all
   carry the same title, so they would offer the reader identical choices —
   and duplicate React keys with them. */
export const NEW_PROJECT_OPTION = 'Um projeto novo';

const PROJECT_OPTIONS = [
  ...PROJECTS.filter((project) => !project.placeholder).map(
    (project) => project.title,
  ),
  NEW_PROJECT_OPTION,
];

/* --- 2. Fields --- */

/* One entry per field, in the order they are drawn. `type` picks the
   control: `text`, `email`, `select`, or `area` for a textarea. `name` is
   what arrives in the email, so it doubles as the label in the message. */
export const JOIN_FIELDS = [
  {
    id: 'nome',
    name: 'Nome',
    label: 'O teu nome',
    type: 'text',
    required: true,
    placeholder: 'Como te tratamos',
  },
  {
    id: 'email',
    name: 'Email',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'Para te respondermos',
  },
  {
    id: 'area',
    name: 'Área',
    label: 'Área',
    type: 'text',
    required: true,
    /* Free text rather than a list: the areas the work needs are not
       settled, and a closed list would turn anyone outside it away. */
    placeholder: 'Engenharia, direito, dados, design…',
  },
  {
    id: 'projeto',
    name: 'Projeto',
    label: 'Onde queres entrar',
    type: 'select',
    required: true,
    /* Placeholder, not a default: the empty option is disabled, so an
       unanswered select cannot arrive looking like a choice. */
    placeholder: 'Escolhe um projeto',
    options: PROJECT_OPTIONS,
  },
  {
    id: 'contributo',
    name: 'Contributo',
    label: 'O que trazes',
    type: 'area',
    required: true,
    placeholder: 'Área, ferramentas que usas, e quanto tempo tens por semana.',
  },
  {
    id: 'contexto',
    name: 'Contexto',
    label: 'Mais alguma coisa',
    type: 'area',
    required: false,
    placeholder:
      'Opcional. Se escolheste um projeto novo, descreve-o aqui: que questão ' +
      'é que responde.',
  },
];

/* --- 3. Section --- */

export const JOIN = {
  eyebrow: 'Participar',
  headline: ['Escolhe um projeto,', 'ou traz o teu.'],
  body:
    'Trabalhamos em aberto e a equipa é quem aparece. Não é preciso ser ' +
    'investigador nem programador — modelação, dados, direito, desenho, ' +
    'revisão de texto e trabalho de terreno cabem todos. Diz onde queres ' +
    'entrar e respondemos com o próximo passo.',
  /* The subject line the email arrives with, so a candidacy is
     recognisable in the inbox without opening it. */
  subject: 'Participação — agorasimlab.com',
  submit: 'Enviar candidatura',
  optional: 'Opcional',
  /* Label for the live count of filled fields. The figures are counted from
     the form as it is typed, never written down. */
  progress: 'Campos preenchidos',
  states: {
    sending: 'A enviar…',
    ok: 'Recebido. Respondemos ao email que deixaste.',
    /* Says what to do next, not just that it broke. */
    error:
      'Não foi possível enviar. Tenta outra vez, ou escreve directamente ' +
      'para projects@agorasimlab.com.',
    /* Shown when the build has no access key. Only reachable by a
       misconfigured deploy, so it names the fix rather than apologising. */
    unconfigured:
      'Formulário por configurar. Define VITE_WEB3FORMS_KEY no ambiente de ' +
      'build. Entretanto, escreve para projects@agorasimlab.com.',
  },
};
