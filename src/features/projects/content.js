/* ============================================================
   0. PROJECTS CONTENT
   The home row's own copy. Language: pt-PT. The projects it
   renders live in `@/content/projects.js`, shared with the
   /projetos page — add a project there, not here.
   ============================================================ */

/* --- 1. Section --- */

export const PROJECTS_SECTION = {
  eyebrow: 'Projetos',
  headline: ['O que estamos a construir,', 'e o que vem a seguir.'],
  body:
    'Todos os nossos projetos abrangem várias dimensões da realidade Portuguesa. ' +
    'Alguns projetos são relativos a novas ferramentas, outros à análise de soluções. ' +
    'Todos estão disponíveis e abertos a discussões e melhorias. ',
  /* The row is a summary — the four in HOME_PROJECT_IDS — and the register
     is the whole of it; this link is what makes the split legible. */
  more: { label: 'Ver o registo completo', to: '/projetos' },
};
