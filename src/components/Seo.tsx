/**
 * Seo.tsx — one component renders every head tag + the JSON-LD graph for a route.
 *
 * Works with:
 *   • vite-react-ssg  → import { useHead } from '@unhead/react'      (recommended, prerendered)
 *   • react-helmet-async → swap useHead() for <Helmet>…</Helmet> (CSR fallback)
 *
 * Usage in a page:
 *   const route = getRoute('/website-design-kolhapur')!
 *   <Seo route={route} faqs={faqs} />
 */
import { useHead } from '@unhead/react'
import { SITE, absoluteUrl, type Route } from '../lib/routes'
import { buildGraph, type Faq } from '../lib/schema'

/** Narrow union — matches the HTML `as` attribute. Widening this to `string`
 *  breaks the @unhead/react Link type (TS2322) and the Vite build with it. */
export type PreloadAs = 'image' | 'script' | 'style' | 'font' | 'fetch' | 'document' | 'audio' | 'video' | 'track' | 'worker' | 'embed' | 'object'

type SeoProps = {
  route: Route
  /** FAQs that are VISIBLE on the page — required for FAQPage schema */
  faqs?: Faq[]
  /** force noindex (thank-you pages, filters, deploy previews) */
  noindex?: boolean
  /** extra preloads, e.g. the hero image: { href, as: 'image' } */
  preload?: { href: string; as: PreloadAs; type?: string; crossorigin?: boolean }[]
}

export default function Seo({ route, faqs, noindex, preload = [] }: SeoProps) {
  const canonical = absoluteUrl(route.path)
  const ogImage = absoluteUrl(route.ogImage ?? SITE.defaultOgImage)
  const graph = buildGraph(route, { faqs })

  useHead({
    title: route.title,
    htmlAttrs: { lang: 'en-IN' },
    meta: [
      { name: 'description', content: route.description },
      { name: 'robots', content: noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large' },
      { name: 'author', content: SITE.name },
      // You asked for this explicitly. Google ignores meta keywords (since 2009)
      // and Bing can treat it as noise — it is emitted for your own records and
      // for the rare tool that still reads it. It does not move rankings.
      ...(route.keywords ? [{ name: 'keywords', content: route.keywords }] : []),
      { name: 'theme-color', content: '#0b0b0a' },

      // Open Graph
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: SITE.name },
      { property: 'og:locale', content: 'en_IN' },
      { property: 'og:locale:alternate', content: 'mr_IN' },
      { property: 'og:title', content: route.title },
      { property: 'og:description', content: route.description },
      { property: 'og:url', content: canonical },
      { property: 'og:image', content: ogImage },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: route.h1 },

      // Twitter / X
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: route.title },
      { name: 'twitter:description', content: route.description },
      { name: 'twitter:image', content: ogImage },

      // Google Search Console verification (set VITE_GSC_TOKEN in Netlify env vars)
      ...(import.meta.env.VITE_GSC_TOKEN
        ? [{ name: 'google-site-verification', content: import.meta.env.VITE_GSC_TOKEN as string }]
        : []),
    ],
    link: [
      { rel: 'canonical', href: canonical },
      // hreflang pairs — only add these once the /mr/ pages actually exist
      // { rel: 'alternate', hreflang: 'en-IN', href: canonical },
      // { rel: 'alternate', hreflang: 'mr-IN', href: `${SITE.url}/mr${route.path}` },
      // { rel: 'alternate', hreflang: 'x-default', href: canonical },
      ...preload.map((p) => ({
        rel: 'preload' as const,
        href: p.href,
        as: p.as,
        ...(p.type ? { type: p.type } : {}),
        // fonts need crossorigin; preloading images with it wastes a second fetch
        ...(p.crossorigin === false ? {} : { crossorigin: 'anonymous' as const }),
      })),
    ],
  })

  // JSON-LD rendered as a real script element (valid in <body>, parsed by every crawler)
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
