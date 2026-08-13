/* ============================================================
   0. IMPORTS
   ============================================================ */

import { BlueprintBackground } from '@/components/backdrop/BlueprintBackground';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/features/hero';
import { Method } from '@/features/method';
import { Projects } from '@/features/projects';
import { Vision } from '@/features/vision';

/* ============================================================
   1. COMPONENT
   ============================================================ */

/** Page composition. Sections are added here in the order they render. */
export default function App() {
  return (
    <>
      <BlueprintBackground />
      <Navbar />
      <main>
        <Hero />
        <Vision />
        <Method />
        <Projects />
      </main>
      <Footer />
    </>
  );
}
