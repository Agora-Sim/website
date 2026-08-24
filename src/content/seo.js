/* ============================================================
   0. SEO METADATA
   The per-route <head> the build stamps into one HTML file per
   route (scripts/prerender.mjs), so every URL carries its own
   title, description and canonical before any JavaScript runs —
   which is what search engines and social-card scrapers read.

   Single source of truth: the prerender script imports this, and
   the block it produces replaces the SEO:start…SEO:end region in
   index.html. The home values here must match that region's
   hand-written defaults, which are what the dev server shows.

   Pure data (imports only the project registry, itself pure), so
   a plain Node build script can import it without the `@` alias
   or Vite. Language: pt-PT.
   ============================================================ */

/* --- 0. Imports --- */

import { PROJECTS, projectPath } from './projects.js';

/* --- 1. Site constants --- */

/* The apex origin, no `www`, matching sitemap.xml and the OG tags. Every
   canonical and og:url is built from it, so a domain change is one edit. */
export const SITE = {
  origin: 'https://agorasimlab.com',
  name: 'AgoraSim',
  image: 'https://agorasimlab.com/social-card.png',
};

/* --- 2. Route metadata --- */

/* The fixed routes, in sitemap order. `path` is the served URL, `title` the
   tab and search headline, `description` the meta and social summary. The
   home entry's values are also index.html's defaults — keep them in step. */
export const STATIC_ROUTES = [
  {
    path: '/',
    title: 'AgoraSim: Projetar Portugal',
    description:
      'O AgoraSim é uma plataforma de análise objetiva e científica de soluções aos problemas de Portugal.',
  },
  {
    path: '/projetos',
    title: 'Projetos — AgoraSim',
    description:
      'O registo de projetos da AgoraSim: modelação computacional, económica ' +
      'e de política pública, com métodos objetivos e em código aberto.',
  },
  {
    path: '/participar',
    title: 'Participar — AgoraSim',
    description:
      'Candidata-te a um projeto da AgoraSim ou propõe o teu, e contribui ' +
      'para a análise de políticas públicas sem entrar na vida política.',
  },
];

/**
 * One route per project, drawn from the registry so a new project brings its
 * own prerendered page with no edit here. The title is the project's name,
 * the description its summary — the fuller paragraph, which reads at meta
 * length better than the home row's one-liner.
 */
export const projectRoutes = () =>
  PROJECTS.map((project) => ({
    path: projectPath(project.id),
    title: `${project.title} — ${SITE.name}`,
    description: project.summary || project.description,
  }));

/** Every route the build prerenders: the fixed pages and one per project. */
export const allRoutes = () => [...STATIC_ROUTES, ...projectRoutes()];

/* --- 3. Head-block builder --- */

/* Escapes the five characters that would break an HTML attribute or text
   node, so a description with an ampersand or quote survives stamping. */
const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/**
 * The per-route <head> fragment, wrapped in the SEO:start…SEO:end markers
 * the prerender script swaps on. Holds only what changes per route; the
 * invariant tags (charset, og:image, fonts, JSON-LD) stay in index.html.
 *
 * @param {{path: string, title: string, description: string}} route
 */
export const seoHeadBlock = (route) => {
  const url = `${SITE.origin}${route.path}`;
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  return `<!-- SEO:start — per-route head, stamped by scripts/prerender.mjs.
         These are the home defaults, and what the dev server shows. -->
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <!-- SEO:end -->`;
};
