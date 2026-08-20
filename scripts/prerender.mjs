/* ============================================================
   PRERENDER
   Stamps one static HTML file per route into dist/, each with its
   own <head>, so search engines and social-card scrapers — which
   read the raw HTML and do not run the app's JavaScript — see the
   right title, description and canonical for every URL.

   Runs after `vite build`. The app is still a single-page app: the
   body of every file is the same shell, and React renders the
   matching page client-side. Only the <head> differs per file, and
   Cloudflare serves the file whose path matches the request.

   The per-route metadata and the head block it produces both live
   in src/content/seo.js, so this script holds no copy of its own.
   ============================================================ */

/* --- 0. Imports --- */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { allRoutes, seoHeadBlock } from '../src/content/seo.js';

/* --- 1. Constants --- */

const DIST = fileURLToPath(new URL('../dist', import.meta.url));
const SHELL = join(DIST, 'index.html');

/* The region index.html marks for per-route head. Matched by its comment
   delimiters rather than by the tags inside, so the swap is robust to how
   the tags are formatted. */
const SEO_BLOCK = /<!-- SEO:start[\s\S]*?SEO:end -->/;

/* --- 2. Output path --- */

/* The file a route is written to. The root is index.html itself; every other
   route becomes `<path>/index.html`, so `/projetos` is served from
   `dist/projetos/index.html` with no rewrite. */
const outFile = (path) =>
  path === '/' ? SHELL : join(DIST, path, 'index.html');

/* --- 3. Prerender --- */

const shell = await readFile(SHELL, 'utf8');

if (!SEO_BLOCK.test(shell)) {
  throw new Error(
    'prerender: no SEO:start…SEO:end block in dist/index.html — did index.html lose its markers?',
  );
}

const routes = allRoutes();
for (const route of routes) {
  const html = shell.replace(SEO_BLOCK, seoHeadBlock(route));
  const file = outFile(route.path);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}

console.log(`prerender: wrote ${routes.length} routes`);
