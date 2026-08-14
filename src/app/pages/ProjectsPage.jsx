/* ============================================================
   0. IMPORTS
   ============================================================ */

import { ProjectIndex } from '@/features/project-index';
import { Suggest } from '@/features/suggest';

/* ============================================================
   1. COMPONENT
   ============================================================ */

/**
 * The `/projetos` page: the full register, then the slip for adding to it.
 * The suggestion form lives here rather than on the home page because the
 * reader most likely to have one has just finished the register.
 */
export default function ProjectsPage() {
  return (
    <>
      <ProjectIndex />
      <Suggest />
    </>
  );
}
