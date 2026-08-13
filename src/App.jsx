/* ============================================================
   0. IMPORTS
   ============================================================ */

import BlueprintBackground from './components/BlueprintBackground.jsx';
import Hero from './components/Hero.jsx';
import Navbar from './components/Navbar.jsx';

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
      </main>
    </>
  );
}
