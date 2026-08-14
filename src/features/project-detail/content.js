/* ============================================================
   0. PROJECT DETAIL CONTENT
   The chrome around a project's own page — every string that is
   the same on all of them. The project's own copy (title,
   summary, fields, sections) comes from `@/content/projects.js`,
   the single registry the home row and the register also read.

   Language: pt-PT. Nothing invented: a project page states only
   what its entry in the registry discloses.
   ============================================================ */

/* --- 1. Page chrome --- */

export const PROJECT_DETAIL = {
  eyebrow: 'Projeto',
  back: 'Voltar ao registo',
  /* The title block's own heading, above the fields the project discloses. */
  specsLabel: 'Ficha do projeto',
  /* The one field every project has, so the block is never empty here the
     way a card's can be — no replacement line is needed. */
  statusLabel: 'Estado',
  repo: 'Ver repositório',
  /* Project pages start with no `sections` and are filled over time; until
     then the body says so rather than ending at the summary. */
  bodyEmpty:
    'Ainda não há registo escrito deste projeto para além do resumo acima. ' +
    'Esta página é atualizada à medida que o trabalho avança.',
};
