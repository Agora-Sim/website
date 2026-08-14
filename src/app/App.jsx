/* ============================================================
   0. IMPORTS
   ============================================================ */

import { Route, Routes } from 'react-router-dom';

import { BlueprintBackground } from '@/components/backdrop/BlueprintBackground';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';

import ScrollManager from './ScrollManager.jsx';
import Home from './pages/Home.jsx';
import JoinPage from './pages/JoinPage.jsx';
import ProjectPage from './pages/ProjectPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';

/* ============================================================
   1. COMPONENT
   ============================================================ */

/**
 * Site composition: the chrome every route shares — backdrop, bar, footer —
 * wrapped around the routed page. Pages live in `./pages/` and only order
 * the feature sections they are made of.
 *
 * Routes are real paths, not hashes, because in-page anchors already own the
 * hash. Cloudflare Pages serves `index.html` for unknown paths via
 * `public/_redirects`; any other host needs the equivalent rewrite.
 */
export default function App() {
  return (
    <>
      <BlueprintBackground />
      <ScrollManager />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projetos" element={<ProjectsPage />} />
          <Route path="/participar" element={<JoinPage />} />
          <Route path="/projetos/:id" element={<ProjectPage />} />
          {/* Nothing else is published yet, so an unknown path is a stale
              link rather than a missing page — send it home. */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
