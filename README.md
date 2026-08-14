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

## Deploying to Cloudflare Pages

Free tier covers this entirely: unlimited static requests and bandwidth, 500
builds a month.

**One-time setup** — Workers & Pages → Create → Pages → connect the GitHub
repo:

| Setting | Value |
|---|---|
| Framework preset | Vite |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Production branch | `main` |

Then add `VITE_WEB3FORMS_KEY` under Settings → Environment variables, for
**both** Production and Preview — it is read at build time, so a variable
added after a build needs a redeploy to take effect.

Custom domain: Settings → Custom domains → add `agorasimlab.com`. If `www`
is also added, make one of them canonical with a bulk redirect so the site
answers on a single hostname — every absolute URL in this repo
(`sitemap.xml`, `robots.txt`, the Open Graph tags) names the apex.

**Files Cloudflare reads.** All live in `public/`, which Vite copies to
`dist/` verbatim:

- `_redirects` — `/* /index.html 200`. The router uses real paths, so an
  unknown path must serve the app shell, not a 404. Static assets are matched
  before this rule. **A different host needs its own equivalent or every
  route but `/` 404s on refresh.**
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
