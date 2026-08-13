/* ============================================================
   0. IMPORTS
   ============================================================ */

import BlueprintBackground from './components/BlueprintBackground.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import Method from './components/Method.jsx';
import Navbar from './components/Navbar.jsx';
import Vision from './components/Vision.jsx';

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
      </main>
      <Footer />
    </>
  );
}
