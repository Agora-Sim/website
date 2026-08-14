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
    'Possuímos vários projetos em mente, sendo que não estão limitados na sua ' +
    'natureza. Temos projetos computacionais, projetos económicos, ' +
    'projetos investigacionais, etc. Qualquer projeto que utilize ' +
    'métodos objetivos e que traga clareza a uma esfera da realidade ' +
    'portuguesa é muito bem-vindo. ',
  /* Suffix for the count strip under the header. The figures themselves are
     counted from the registry at render time, never written down here. */
  countLabel: 'no registo',
  /* Shown in place of the spec block on a project that discloses no
     fields — an empty title block would read as a rendering fault. */
  fieldsEmpty: 'Sem campos registados',
  /* Every card links to the project's own page, so this names that page
     rather than the repository — the repository is linked from it. */
  linkLabel: 'Ver projeto',
};
