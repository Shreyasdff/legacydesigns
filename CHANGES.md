# CHANGES — what to copy, where, and why

Everything in this zip is an **edit to the existing pack**, not a new project. Copy each file to the same
relative path in your repo. Two files are documentation/data — read them, don't deploy them.

```
legacy-designs-edited/
├─ index.html                              → repo root  (REPLACES your homepage file — check the script src line)
├─ src/
│  ├─ lib/routes.ts                        → src/lib/routes.ts     (adds `keywords` to all 17 routes + type)
│  └─ components/
│     ├─ Seo.tsx                           → src/components/Seo.tsx        (renders meta keywords)
│     └─ SeoClient.tsx                     → src/components/SeoClient.tsx   (zero-dependency variant)
├─ scripts/seo-build.mjs                   → scripts/seo-build.mjs  (injects keywords at build time)
└─ docs/
   ├─ 14-gap-analysis-and-gbp.md           → read: downgrade analysis + GBP diagnosis + keyword map
   └─ keywords-kolhapur-maharashtra-ichalkaranji.csv → read: 82 keywords, 5 clusters
```

---

## 1. `index.html` — homepage file

- GSC verification token `QOjRKMcYq_fazu33FYDXZ1Kw3OfNHOIa_3vqg0tx6ao` is the **first** tag in `<head>`.
- Added `meta keywords` (as requested — Google ignores this tag; see §5).
- Title, description, robots, 9 OG tags, Twitter card, OG image 1200×630, favicon/manifest links,
  Organization JSON-LD, `<noscript>` fallback H1.
- **Check line ~110:** `<script type="module" src="/src/main.tsx">` must match your real entry file.
- If your current `index.html` has Google Analytics, fonts or a stylesheet link, carry it across.

## 2. `src/lib/routes.ts` — meta keywords for all 17 pages

New field on the `Route` type:

```ts
keywords?: string
```

Added to every route, e.g.:

```ts
{
  path: '/hospital-website-design-kolhapur',
  title: 'Hospital Website Design in Kolhapur | Legacy Designs',
  h1: 'Hospital and clinic websites in Kolhapur that patients trust',
  keywords:
    'hospital website design kolhapur, clinic website design kolhapur, doctor website design kolhapur, healthcare website development kolhapur, appointment booking website kolhapur',
  ...
}
```

Rules used (keep them if you edit): 4–6 page-specific terms, no repeated city-stuffing, one Marathi term on
the Kannada/Marathi-relevant pages. Verified: **17/17 pages**, and the file typechecks under `strict` TS.

## 3. `Seo.tsx` + `SeoClient.tsx` — emit the tag at runtime

Both now output `<meta name="keywords" content={route.keywords} />` when the route has keywords. Use `Seo.tsx`
if you have `@unhead/react` (v2 on React 18, v3 on React 19), `SeoClient.tsx` if you don't.

## 4. `scripts/seo-build.mjs` — emit the tag at build time

The post-build step now also patches in `keywords` for any page that doesn't have it. Tested output:

```
✔ /contact  +lang, viewport, description, keywords, robots, canonical, 9 open graph, twitter card, json-ld
✔ /        +lang, viewport, description, keywords, robots, canonical, 9 open graph, twitter card, json-ld
```

Second run reports *"every page already has complete tags"* — it is idempotent, safe to run on every deploy.

Make sure `package.json` has:

```json
"build": "vite build && node scripts/seo-build.mjs"
```

## 5. About the keywords tag (read once, then stop worrying about it)

Google stopped using `<meta name="keywords">` in **2009** and has never reversed it. Bing has treated it as a
spam signal at times. **It will not change a single ranking.** It's included because you asked, it's harmless
at ~10 accurate terms per page, and it costs nothing to ship. The things that actually move rankings are in
`11-ranking-playbook.md` §1 — page–query match, indexability, GBP, reviews, internal links.

## 6. Two things only you can do

1. **Google Business Profile** — it's invisible (see `docs/14` §1 for the diagnosis tree). This is worth more
   than everything else combined. Most likely cause: not verified, or suspended.
2. **Real NAP** — `SITE.phone` and `SITE.address` in `routes.ts` are still placeholders. Mismatched NAP between
   GBP, the website and citations weakens local rankings directly.

## 7. After deploying

```bash
node scripts/doctor.mjs
curl -I https://legacy-designs-kolhapur.netlify.app/sitemap.xml     # expect 200 + application/xml
node scripts/validate-seo.mjs https://legacy-designs-kolhapur.netlify.app
```

Sitemap URL to submit in Search Console: **`https://legacy-designs-kolhapur.netlify.app/sitemap.xml`**
