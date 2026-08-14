# AgoraSim — website

The AgoraSim landing site: React 19 + Vite, no backend, deployed as static
files on Cloudflare Pages. Copy is pt-PT.

## Running it

```bash
npm install
npm run dev     # dev server on :5173
npm run check   # lint + production build — the full pre-commit pass
```

Node 22 (`.nvmrc`). Always go through `npm run`, never a globally installed
`vite`.

## Environment

One variable, and the site builds without it:

| Variable | Required | What it does |
|---|---|---|
| `VITE_WEB3FORMS_KEY` | for the forms | Web3Forms access key. Without it both forms render with the submit disabled and a status line naming the missing variable. |

Copy `.env.example` to `.env` for local work. **`.env.example` must keep an
empty placeholder** — a real key there would hard-wire this inbox into every
fork.

The key is public by design: it names an inbox, not a sender, and Web3Forms
expects it in client code. It lives in the environment so a fork gets its own
inbox rather than inheriting ours. The recipient
(`projects@agorasimlab.com`) is configured at Web3Forms, not in this repo, so
changing it needs no deploy.

Vite reads `.env` only at server start — adding the key to a running
`npm run dev` needs a restart.

## Deploying to Cloudflare Workers

The site deploys as a **Worker serving static assets**, configured by
[wrangler.jsonc](wrangler.jsonc). It costs nothing: requests to static assets
are free and unlimited, and only Worker *invocations* are billed — this
Worker has no `main`, so no script runs on any request and there is nothing
to bill.

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Production branch | `main` |

`name` in `wrangler.jsonc` **must match the Worker in the dashboard**, or a
deploy creates a second Worker beside the one holding the custom domain.

Add `VITE_WEB3FORMS_KEY` under the project's build environment variables — it
is read at build time, so a variable added after a build needs a redeploy to
take effect.

Custom domain: add `agorasimlab.com` to the Worker. If `www` is also added,
redirect it to the apex so the site answers on a single hostname — every
absolute URL in this repo (`sitemap.xml`, `robots.txt`, the Open Graph tags)
names the apex.

Validate a config change without deploying:

```bash
npx wrangler deploy --dry-run
```

**SPA routing** is `assets.not_found_handling: "single-page-application"` in
`wrangler.jsonc`: the router uses real paths, so an unknown path is a client
route and gets `index.html` with a 200. There is deliberately **no
`_redirects` file** — that is the Pages mechanism, and on Workers a
`/* /index.html 200` line is a *proxy* rather than a rewrite, which serves
duplicate content at every path. Deploying this to Pages instead would mean
adding `_redirects` back.

**Files Cloudflare reads** live in `public/`, which Vite copies to `dist/`
verbatim. Workers parses them out of the assets directory and does not serve
them as assets:

- `_headers` — CSP and the other security headers, plus cache lifetimes.
  The CSP allowlist is exactly what the site loads: the two Google Fonts
  hosts and `api.web3forms.com`. Adding a third-party script, embed, or
  analytics tag means widening it in the same change, or the browser blocks
  the thing silently.
- `robots.txt`, `sitemap.xml` — the sitemap is hand-maintained. Adding a
  project to `src/content/projects.js` means adding its `/projetos/<id>`
  entry there too.
- `social-card.png` — the Open Graph preview image, referenced from
  `index.html`. Source in `src/assets/images/social-card.svg`; re-render with
  `rsvg-convert -w 1200 -h 630 src/assets/images/social-card.svg -o public/social-card.png`.

## Architecture

`CLAUDE.md` is the architecture and convention reference: the three-layer
split, where a new section or page goes, the design tokens, and the reasoning
behind the parts that look arbitrary. `docs/imagens.md` specifies every
image the site draws. Read those before adding anything.
