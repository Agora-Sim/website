/* ============================================================
   0. IMPORTS
   ============================================================ */

import { Navigate, useParams } from 'react-router-dom';

import { PROJECTS_PATH, findProject } from '@/content/projects.js';
import { ProjectDetail } from '@/features/project-detail';

/* ============================================================
   1. COMPONENT
   ============================================================ */

/**
 * The `/projetos/:id` page. One page serves every project: the segment
 * names an entry in `@/content/projects.js` and the feature draws it, so
 * adding a project adds its page.
 *
 * Resolving the segment is route wiring rather than logic — a URL that
 * names no project is a stale link, and lands on the register that lists
 * the ones that exist.
 */
export default function ProjectPage() {
  const { id } = useParams();
  const project = findProject(id);

  if (!project) return <Navigate to={PROJECTS_PATH} replace />;

  return <ProjectDetail project={project} />;
}
