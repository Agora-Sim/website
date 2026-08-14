/* ============================================================
   0. IMPORTS
   ============================================================ */

import { Hero } from '@/features/hero';
import { Method } from '@/features/method';
import { Projects } from '@/features/projects';
import { Vision } from '@/features/vision';

/* ============================================================
   1. COMPONENT
   ============================================================ */

/** The landing page. Sections are ordered here and nowhere else. */
export default function Home() {
  return (
    <>
      <Hero />
      <Vision />
      <Method />
      <Projects />
    </>
  );
}
