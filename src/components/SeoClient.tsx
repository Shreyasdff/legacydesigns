/**
 * SeoClient.tsx — ZERO-DEPENDENCY alternative to Seo.tsx.
 *
 * Use this if you don't want to install `@unhead/react` (or you're on React 18 and
 * hit the peer-dependency error described in README → "Dependency matrix").
 *
 * It writes the head tags with a plain useEffect. That works for:
 *   ✓ client-rendered pages (browser)
 *   ✓ prerendering with @prerenderer/rollup-plugin — the prerenderer serialises the
 *     whole DOM *after* the page has loaded, so effect-set head tags are captured
 *   ✗ vite-react-ssg string rendering (effects never run) → use Seo.tsx there
 *
 * It is idempotent: tags are keyed by data-seo and replaced on every navigation,
 * so you don't accumulate 30 canonical tags after 5 route changes.
 *
 * Usage is identical to Seo.tsx:
 *   const route = getRoute('/website-design-kolhapur')!
 *   <SeoClient route={route} faqs={faqs} />
 */
import { useEffect } from 'react'
import { SITE, absoluteUrl, type Route } from '../lib/routes'
import { buildGraph, type Faq } from '../lib/schema'

type SeoClientProps = {
  route: Route
  faqs?: Faq[]
  noindex?: boolean
}

const MANAGED = 'data-seo'

function upsert(selector: string, create: () => HTMLElement, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = create()
    el.setAttribute(MANAGED, '')
    document.head.appendChild(el)
  }
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v)
  return el
}

function clearManaged() {
  document.head.querySelectorAll(`[${MANAGED}]`).forEach((el) => el.remove())
}

export default function SeoClient({ route, faqs, noindex }: SeoClientProps) {
  const canonical = absoluteUrl(route.path)
  const ogImage = absoluteUrl(route.ogImage ?? SITE.defaultOgImage)

  useEffect(() => {
    if (typeof document === 'undefined') return

    document.title = route.title
    document.documentElement.setAttribute('lang', 'en-IN')
    clearManaged()

    const meta = (key: string, content: string, attr: 'name' | 'property' = 'name') =>
      upsert(`meta[${attr}="${key}"]`, () => document.createElement('meta'), { [attr]: key, content })

    meta('description', route.description)
    meta('robots', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large')
    meta('author', SITE.name)
    // Google ignores meta keywords; included because it was requested.
    if (route.keywords) meta('keywords', route.keywords)
    meta('theme-color', '#0b0b0a')

    meta('og:type', 'website', 'property')
    meta('og:site_name', SITE.name, 'property')
    meta('og:locale', 'en_IN', 'property')
    meta('og:locale:alternate', 'mr_IN', 'property')
    meta('og:title', route.title, 'property')
    meta('og:description', route.description, 'property')
    meta('og:url', canonical, 'property')
    meta('og:image', ogImage, 'property')
    meta('og:image:width', '1200', 'property')
    meta('og:image:height', '630', 'property')
    meta('og:image:alt', route.h1, 'property')

    meta('twitter:card', 'summary_large_image')
    meta('twitter:title', route.title)
    meta('twitter:description', route.description)
    meta('twitter:image', ogImage)

    const gscToken = import.meta.env.VITE_GSC_TOKEN
    if (gscToken) meta('google-site-verification', gscToken)

    upsert('link[rel="canonical"]', () => document.createElement('link'), { rel: 'canonical', href: canonical })

    upsert('script[type="application/ld+json"][data-schema-graph]', () => document.createElement('script'), {
      type: 'application/ld+json',
      'data-schema-graph': 'true',
    }).textContent = JSON.stringify(buildGraph(route, { faqs }))
  }, [route, faqs, canonical, ogImage, noindex])

  // Nothing to render: the tags live in <head>.
  return null
}
