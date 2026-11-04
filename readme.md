# Shreyas Kapase — Portfolio

A premium, single-project portfolio site for **Shreyas Kapase**, Website Designer & Developer.
The entire site is built around one featured project: **Trimurti IT Solutions** — [trimurtiit.in](https://trimurtiit.in).

Built with **React + TypeScript + Tailwind CSS v4 + Motion (Framer Motion) + Lenis**.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → /dist
npm run preview  # preview the production build
```

---

## 1. Fill in your contact details (30 seconds)

Everything contact-related lives in **`src/config.ts`**:

```ts
whatsappNumber: '',   // ← e.g. '919876543210' (country code, digits only)
email: '',            // ← e.g. 'hello@shreyaskapase.com'
```

- Leave both empty → the enquiry form opens **Instagram DM** (`@itsrey.in`) with a ready-to-paste message.
- Fill in `whatsappNumber` → the form and the WhatsApp button open a pre-filled `wa.me` chat.
- Fill in `email` → email routes and the mail CTA light up automatically.
- No code changes are needed anywhere else — all buttons, labels and fallbacks react to this config.

Also update the canonical URL / sitemap if you deploy on a different domain:
`index.html` (`<link rel="canonical">`, OG tags) and `public/sitemap.xml`.

---

## 2. Structure

```
src/
  config.ts                 ← all editable content: contact routes, project meta
  index.css                 ← design tokens (@theme), self-hosted fonts, texture, utilities
  lib/
    smooth.tsx              ← Lenis smooth-scroll provider (respects prefers-reduced-motion)
    ui.tsx                  ← Reveal, MaskLines, SplitChars, Magnetic, Button, Marquee, BrowserChrome…
  components/
    Preloader.tsx           ← 000→100 counter + curtain exit
    Cursor.tsx              ← custom desktop cursor (dot + ring, "View ↗" state)
    Nav.tsx                 ← inverted-over-hero nav, scroll progress bar, mobile overlay menu
    Hero.tsx                ← oversized masked headline, tilting live mockup, marquee strip
    Work.tsx                ← selected work + featured project card
    case/
      CaseIntro.tsx          ← project intro + meta grid
      ScrollPreview.tsx      ← cinematic scroll-driven preview of the real page
      InteractivePreview.tsx ← 5-tab interactive browser preview
      Story.tsx              ← 01 Challenge, 02 Design Direction, 03 Experience, 04 Development
      Result.tsx             ← 05 Final Result + "Explore live website ↗"
    About.tsx / Services.tsx / Process.tsx / Contact.tsx / Footer.tsx
```

## 3. Profile imagery

Your photo lives in **`public/profile/`** and is used in the navigation avatar, the About portrait
and the favicon:

| File | Where it appears |
| --- | --- |
| `profile/avatar.webp` (360²) | circular avatar beside your name in the nav |
| `profile/avatar-180.webp` | apple-touch-icon |
| `profile/portrait.webp` (4:5) | About section portrait (grayscale → colour on hover) |
| `favicon.png` (128²) | browser tab icon |

To swap the photo: drop a new square crop into `avatar.webp`, a 4:5 crop into `portrait.webp`
and a 128² PNG into `favicon.png` — keep the filenames and nothing else needs to change.

## 4. Website imagery

Every image in `public/work/` is a **real capture of the live website** (Playwright, 2× DPI),
compressed to WebP. The brand logo in `public/work/trimurti-logo.webp` is the client's own mark.
Nothing is stock, AI-generated or invented.

| File | Used for |
| --- | --- |
| `hero-desktop.webp` | hero mockup, work card, interactive preview, final result |
| `page-full.webp` | cinematic scroll preview (tall page capture) |
| `showcase-radial.webp`, `estimator.webp`, `capabilities.webp`, `storefront.webp`, `faq.webp` | interactive preview tabs |
| `mobile-hero.webp`, `mobile-full.webp` | responsive/development sections |

To refresh the captures later, re-run your screenshot script and overwrite these files —
the layout adapts automatically.

## 5. Motion & performance

- Scroll-driven reveals, masked line reveals, staggered cards, magnetic buttons, parallax, 3D tilt.
- Lenis smooth scrolling; all animation honours `prefers-reduced-motion`.
- Custom cursor only on fine pointers (disabled on touch).
- Fonts self-hosted (Clash Display, Satoshi, JetBrains Mono) — no external font requests, no FOUT.
- Images lazy-loaded, sized with explicit `width`/`height`, ~1.1 MB total for all project imagery.

## 6. Accessibility & SEO

- Single `<h1>`, landmark sections, skip link, focus-visible rings, labelled form fields.
- `aria-selected` tab pattern for the interactive preview, `aria-label`s on icon buttons.
- Meta title/description, Open Graph, canonical, JSON-LD `Person` + `workExample`, `robots.txt`, `sitemap.xml`.

---

© Shreyas Kapase. Case study content and imagery refer to Trimurti IT Solutions.
