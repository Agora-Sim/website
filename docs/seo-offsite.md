# Off-site SEO checklist

Everything that improves the site's search visibility but lives **outside
this repo** — in a browser, in Cloudflare DNS, or in other people's sites.
The in-repo work (structured data, per-route metadata, sitemap, social card)
is done; this is the ongoing, human half.

Ordered by impact. The first four are the ones that matter most; the rest are
slower and optional.

## 1. Google Search Console — do this first

The control panel where you tell Google the site exists and see how it's
doing. Everything else depends on it.

- [ ] Add the property at [search.google.com/search-console](https://search.google.com/search-console).
- [ ] Verify ownership by **DNS** — paste the TXT record it gives you into
      Cloudflare (domain → DNS → add record). Verifies the whole domain.
- [ ] Submit the sitemap: **Sitemaps → add** `https://agorasimlab.com/sitemap.xml`.
- [ ] Check back weekly: which search terms bring people in, which pages are
      indexed, any crawl errors. If people find you for the wrong words, that
      becomes a `content:` task back in the repo.

## 2. Get legitimate backlinks

A link from another trusted site is a vote in Google's eyes. This is the
biggest factor Google can't see inside your own site, and the slowest. Only
real, earned links — never buy or spam them; Google penalizes that.

- [ ] GitHub org profile → set website to `https://agorasimlab.com`.
- [ ] Each repo's **About → website** field → the site (or the relevant page).
- [ ] Repo READMEs → link the site.
- [ ] PyPI page for `agorasimulator` → set its homepage URL to the site.
- [ ] Portuguese open-source / open-data / civic-tech directories and
      communities → get listed, with a link (not just a name mention).
- [ ] Any university or research association → a link from a `.pt`/`.edu`
      page is a strong vote.

The repo's JSON-LD already declares the GitHub org as the same entity, so
these links close the loop rather than creating a stray one.

## 3. Bing Webmaster Tools — second engine

Powers Bing, DuckDuckGo, and a growing share of AI search. Ten minutes.

- [ ] Add the site at [bing.com/webmasters](https://www.bing.com/webmasters).
- [ ] **Import from Google Search Console** in one click, or verify by DNS.
- [ ] Confirm the sitemap came across.

## 4. Test the social-share previews

The per-page titles and the social card are built; this makes sure the
sharing sites show the current version, not a cached old one.

- [ ] [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) —
      paste a URL, check the card, hit **Scrape Again** to clear a stale cache.
      (Facebook, LinkedIn, and WhatsApp all read the same Open Graph tags.)
- [ ] [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) — same.
- [ ] Do this for `/`, `/projetos`, and a project page after any title or
      card change — the sharing sites cache aggressively.

## 5. Validate the structured data

A sanity check that Implementation 1's Organization/WebSite JSON-LD is
readable and error-free.

- [ ] [Google Rich Results Test](https://search.google.com/test/rich-results)
      → paste `https://agorasimlab.com`.
- [ ] [schema.org validator](https://validator.schema.org) → same URL.

## 6. Confirm indexing over time

Google won't index instantly; a new site takes weeks to a few months.

- [ ] In Search Console, paste each important URL → **Request indexing**.
- [ ] Search Google for `site:agorasimlab.com` to see what's indexed. Empty
      early on is normal — recheck weekly.

## 7. Consistent social profiles (optional, ongoing)

Each profile that links back adds a small "this entity = this website"
signal. Keep the name, logo, and URL identical everywhere.

- [ ] Put the exact URL `https://agorasimlab.com` in every profile bio.
- [ ] When profiles exist, add their URLs to the JSON-LD `sameAs` list in
      `index.html` — a small in-repo change; the reasoning lives in
      [`CLAUDE.md`](../CLAUDE.md) under the deployment/SEO section.

## 8. Google Business Profile — only if applicable

Built for real-world businesses with an address, and gets you the Maps/info
box. **Skip it** if AgoraSim is a purely online project with no public
address — forcing it reads as odd, and the JSON-LD Organization data already
covers "who is this entity" for a non-local project.

---

**If you only do four things:** 1 (Search Console + sitemap), 2 (GitHub +
PyPI links), 3 (Bing), 4 (test the previews — they're freshly changed).
