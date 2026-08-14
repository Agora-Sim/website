/* ============================================================
   0. PROJECT INDEX CONTENT
   Every string the /projetos page's own chrome renders. Language:
   pt-PT. The projects themselves live in `@/content/projects.js`,
   because the home page renders them too.
   ============================================================ */

/* --- 1. Page header --- */

export const PROJECT_INDEX = {
  eyebrow: 'Registo de projetos',
  headline: ['Tudo o que está', 'em cima da mesa.'],
  body:
    'Cada projeto abre com o que já se sabe sobre ele e fecha com o que ainda ' +
    'falta decidir. Os campos abaixo são os que cada equipa quis registar — ' +
    'um projeto que ainda não tem versão, data ou equipa fixada não inventa ' +
    'nenhuma das três.',
  /* Suffix for the count strip under the header. The figures themselves are
     counted from the registry at render time, never written down here. */
  countLabel: 'no registo',
  /* Shown in place of the spec block on a project that discloses no
     fields — an empty title block would read as a rendering fault. */
  fieldsEmpty: 'Sem campos registados',
  linkLabel: 'Repositório',
};
