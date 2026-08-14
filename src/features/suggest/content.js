/* ============================================================
   0. SUGGEST CONTENT
   Every string the suggestion form renders, including its field
   labels, its placeholder hints and all four of its states.
   Language: pt-PT.
   ============================================================ */

/* --- 1. Endpoint --- */

/* Web3Forms takes the POST and forwards it to the address the access key
   was registered with — projects@agorasimlab.com is configured there, not
   here, which is why no recipient appears in this file. */
export const ENDPOINT = 'https://api.web3forms.com/submit';

/* --- 2. Fields --- */

/* One entry per field, in the order they are drawn. `type` picks the
   control: `text`, `email`, or `area` for a textarea. The form maps over
   this list, so adding a field is an entry here and nothing else. `name` is
   what arrives in the email, so it doubles as the label in the message. */
export const SUGGEST_FIELDS = [
  {
    id: 'projeto',
    name: 'Projeto',
    label: 'Projeto',
    type: 'text',
    required: true,
    placeholder: 'Um nome de trabalho chega',
  },
  {
    id: 'questao',
    name: 'Questão',
    label: 'O que é preciso perceber',
    type: 'area',
    required: true,
    placeholder: 'Que decisão é que este projeto ajudaria a tomar?',
  },
  {
    id: 'dados',
    name: 'Dados',
    label: 'Dados ou fontes que conheças',
    type: 'area',
    required: false,
    placeholder: 'Opcional. Um link, um relatório, um contacto.',
  },
  {
    id: 'nome',
    name: 'Nome',
    label: 'O teu nome',
    type: 'text',
    required: false,
    placeholder: 'Opcional',
  },
  {
    id: 'email',
    name: 'Email',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'Para te respondermos',
  },
];

/* --- 3. Section --- */

export const SUGGEST = {
  eyebrow: 'Sugerir',
  headline: ['Há um problema que', 'devíamos estar a medir?'],
  body:
    'O registo acima não é uma lista fechada. Se há uma medida, um serviço ' +
    'ou um número que ninguém está a verificar, diz-nos — não precisas de ' +
    'trazer o método, só a questão.',
  /* The subject line the email arrives with, so a suggestion is
     recognisable in the inbox without opening it. */
  subject: 'Sugestão de projeto — agorasimlab.com',
  submit: 'Enviar sugestão',
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
