/**
 * routes.ts — the single source of truth for SEO output.
 * Every page's title, description, H1, canonical path and sitemap entry lives here.
 * Import this in your pages, the <Seo /> component and the sitemap generator.
 */

export type SchemaType =
  | 'ProfessionalService'
  | 'WebSite'
  | 'Service'
  | 'BreadcrumbList'
  | 'FAQPage'
  | 'ContactPage'
  | 'CollectionPage'
  | 'CreativeWork'

export type Route = {
  /** URL path, always leading slash, no trailing slash (except "/") */
  path: string
  /** <title> — keep ≤ 60 characters */
  title: string
  /** meta description — 140–158 characters */
  description: string
  /** visible page headline — exactly one per page */
  h1: string
  /**
   * <meta name="keywords"> content for this page.
   * ⚠️ Google has ignored this tag since 2009 and Bing can treat it as a spam
   * signal. It is here because you asked for it — keep it short, accurate and
   * unique per page. It will not lift your rankings; the H1, title, body copy
   * and internal links do that job.
   */
  keywords?: string
  /** the one keyword this page owns (prevents cannibalisation) */
  primaryKeyword: string
  /** 0.0–1.0 for sitemap.xml */
  priority: number
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly'
  /** /og/<slug>.jpg — 1200×630 */
  ogImage?: string
  schema: SchemaType[]
  /** hide from search + sitemap */
  noindex?: boolean
}

/* ────────────────────────────── BUSINESS CONSTANTS ──────────────────────────────
 * Replace these with the real details. NAP (Name, Address, Phone) must match your
 * Google Business Profile character-for-character.
 * ────────────────────────────────────────────────────────────────────────────── */
export const SITE = {
  url: 'https://legacy-designs-kolhapur.netlify.app', // no trailing slash
  name: 'Legacy Designs',
  legalName: 'Legacy Designs',
  tagline: 'Website design, development and SEO in Kolhapur',
  description:
    'Legacy Designs builds fast, SEO-ready websites for businesses in Kolhapur — design, development and SEO management under one roof.',
  logo: '/logo.png', // 512×512 PNG
  defaultOgImage: '/og/home.jpg',
  phone: '+91-XXXXXXXXXX', // E.164-ish, digits + country code
  whatsapp: '91XXXXXXXXXX', // digits only, used for wa.me links
  email: 'hello.legacydesigns@gmail.com', // no custom domain yet → Gmail now, hello@yourdomain.in after migration
  address: {
    street: 'Office / Shop No, Building, Street',
    locality: 'Kolhapur',
    region: 'Maharashtra',
    postalCode: '416001',
    country: 'IN',
  },
  geo: { lat: '16.7050', lng: '74.2433' },
  hours: [
    // 0 = Sunday … 6 = Saturday
    { days: [1, 2, 3, 4, 5, 6], opens: '10:00', closes: '19:00' },
  ],
  priceRange: '₹₹',
  /** areaServed — used in LocalBusiness schema and for internal linking decisions */
  areasServed: [
    'Kolhapur',
    'Ichalkaranji',
    'Sangli',
    'Karad',
    'Jaysingpur',
    'Gadhinglaj',
    'Hatkanangle',
    'Kagal',
    'Shiroli MIDC',
    'Gokul Shirgaon',
  ],
  /** only real profiles you control — never invent these */
  sameAs: [] as string[],
  foundingDate: '2024',
  instagram: '', // e.g. 'https://www.instagram.com/legacydesigns'
  facebook: '',
  linkedin: '',
} as const

/* ──────────────────────────────── PAGE MANIFEST ─────────────────────────────── */
export const routes: Route[] = [
  {
    path: '/',
    title: 'Website Design & SEO Agency in Kolhapur | Legacy Designs',
    description:
      'Legacy Designs builds fast, SEO-ready websites for Kolhapur businesses — design, development and SEO under one roof. Get a free quote on WhatsApp today.',
    h1: 'Websites that turn Kolhapur browsers into paying customers',
    keywords:
      'website design kolhapur, website development kolhapur, seo company kolhapur, web designer kolhapur, digital marketing kolhapur, website design agency kolhapur',
    primaryKeyword: 'website design agency in kolhapur',
    priority: 1.0,
    changefreq: 'monthly',
    ogImage: '/og/home.jpg',
    schema: ['ProfessionalService', 'WebSite', 'BreadcrumbList'],
  },
  {
    path: '/website-design-kolhapur',
    title: 'Website Design in Kolhapur | Custom, SEO-Ready Sites',
    description:
      'Custom website design in Kolhapur for hospitals, restaurants, boutiques and manufacturers. Mobile-first, fast, SEO-ready — with clear pricing upfront.',
    h1: 'Website design in Kolhapur, built to be found and trusted',
    keywords:
      'website design in kolhapur, website designer kolhapur, web designer kolhapur, website design company kolhapur, responsive website design kolhapur, website design charges kolhapur, वेबसाइट डिझाईन कोल्हापूर',
    primaryKeyword: 'website design in kolhapur',
    priority: 0.95,
    changefreq: 'monthly',
    ogImage: '/og/website-design-kolhapur.jpg',
    schema: ['Service', 'FAQPage', 'BreadcrumbList'],
  },
  {
    path: '/website-development-kolhapur',
    title: 'Website Development Company in Kolhapur | Legacy',
    description:
      'React, WordPress and custom development in Kolhapur. Fast, secure, scalable builds with clean code, CMS handover and post-launch support you can reach.',
    h1: 'Website development in Kolhapur — clean code, no black boxes',
    keywords:
      'website development company in kolhapur, web development kolhapur, website developer kolhapur, react website development kolhapur, custom website development kolhapur, website development cost kolhapur',
    primaryKeyword: 'website development company in kolhapur',
    priority: 0.95,
    changefreq: 'monthly',
    ogImage: '/og/website-development-kolhapur.jpg',
    schema: ['Service', 'FAQPage', 'BreadcrumbList'],
  },
  {
    path: '/seo-management-kolhapur',
    title: 'SEO Company in Kolhapur | Local SEO & Google Ranking',
    description:
      'SEO management in Kolhapur: technical fixes, local SEO, Google Business Profile and content that ranks. Monthly reports in plain language, no lock-in.',
    h1: 'SEO management in Kolhapur that reports in plain language',
    keywords:
      'seo services in kolhapur, seo company kolhapur, local seo kolhapur, google business profile setup kolhapur, seo agency kolhapur, seo packages kolhapur',
    primaryKeyword: 'seo company in kolhapur',
    priority: 0.95,
    changefreq: 'monthly',
    ogImage: '/og/seo-management-kolhapur.jpg',
    schema: ['Service', 'FAQPage', 'BreadcrumbList'],
  },
  {
    path: '/ecommerce-website-development-kolhapur',
    title: 'Ecommerce Website Development in Kolhapur | Stores',
    description:
      'Online stores built in Kolhapur — catalogue, payments, shipping and SEO done right. Sell Kolhapuri chappals, textiles or products across India.',
    h1: 'Ecommerce websites built in Kolhapur, ready to sell on day one',
    keywords:
      'ecommerce website development kolhapur, online store development kolhapur, shopify developer kolhapur, woocommerce development kolhapur, ecommerce website design kolhapur',
    primaryKeyword: 'ecommerce website development in kolhapur',
    priority: 0.9,
    changefreq: 'monthly',
    ogImage: '/og/ecommerce-website-development-kolhapur.jpg',
    schema: ['Service', 'FAQPage', 'BreadcrumbList'],
  },
  {
    path: '/website-maintenance-kolhapur',
    title: 'Website Maintenance in Kolhapur | AMC & Speed Fixes',
    description:
      'Website maintenance and AMC in Kolhapur: updates, backups, security, speed and Core Web Vitals fixes. Keep an existing site fast, safe and ranking.',
    h1: 'Website maintenance & AMC in Kolhapur',
    keywords:
      'website maintenance kolhapur, website amc kolhapur, website support services kolhapur, website security kolhapur, website speed optimization kolhapur',
    primaryKeyword: 'website maintenance in kolhapur',
    priority: 0.85,
    changefreq: 'monthly',
    ogImage: '/og/website-maintenance-kolhapur.jpg',
    schema: ['Service', 'FAQPage', 'BreadcrumbList'],
  },
  {
    path: '/hospital-website-design-kolhapur',
    title: 'Hospital Website Design in Kolhapur | Doctors & Clinics',
    description:
      'Patient-first hospital and clinic websites in Kolhapur — departments, doctors, appointments and local SEO. Fast, mobile-ready and compliant.',
    h1: 'Hospital and clinic website design in Kolhapur',
    keywords:
      'hospital website design kolhapur, clinic website design kolhapur, doctor website design kolhapur, healthcare website development kolhapur, appointment booking website kolhapur',
    primaryKeyword: 'hospital website design in kolhapur',
    priority: 0.9,
    changefreq: 'monthly',
    ogImage: '/og/hospital-website-design-kolhapur.jpg',
    schema: ['Service', 'FAQPage', 'BreadcrumbList'],
  },
  {
    path: '/restaurant-website-design-kolhapur',
    title: 'Restaurant Website Design in Kolhapur | Menus & Booking',
    description:
      'Restaurant and café websites in Kolhapur: menus, table booking, photo galleries, Zomato/Swiggy links and Google Maps visibility for local diners.',
    h1: 'Restaurant and café website design in Kolhapur',
    keywords:
      'restaurant website design kolhapur, cafe website design kolhapur, hotel website design kolhapur, food ordering website kolhapur, menu website design kolhapur',
    primaryKeyword: 'restaurant website design in kolhapur',
    priority: 0.9,
    changefreq: 'monthly',
    ogImage: '/og/restaurant-website-design-kolhapur.jpg',
    schema: ['Service', 'FAQPage', 'BreadcrumbList'],
  },
  {
    path: '/clothing-store-website-design-kolhapur',
    title: 'Clothing Store Website Design in Kolhapur | Boutiques',
    description:
      'Lookbook-style websites for clothing stores, boutiques and bridal studios in Kolhapur — catalogue, WhatsApp orders and local SEO that brings walk-ins.',
    h1: 'Clothing store and boutique website design in Kolhapur',
    keywords:
      'clothing store website design kolhapur, boutique website design kolhapur, saree shop website kolhapur, fashion ecommerce website kolhapur, kolhapuri chappal online store',
    primaryKeyword: 'clothing store website design in kolhapur',
    priority: 0.85,
    changefreq: 'monthly',
    ogImage: '/og/clothing-store-website-design-kolhapur.jpg',
    schema: ['Service', 'FAQPage', 'BreadcrumbList'],
  },
  {
    path: '/industrial-website-development-kolhapur',
    title: 'Industrial Website Design in Kolhapur | Manufacturers',
    description:
      'Websites for Kolhapur manufacturers, foundries and exporters — product catalogues, capability pages, RFQ forms and visibility for B2B buyers.',
    h1: 'Industrial and manufacturing website design in Kolhapur',
    keywords:
      'industrial website design kolhapur, manufacturer website kolhapur, foundry website design kolhapur, engineering company website kolhapur, b2b website development kolhapur',
    primaryKeyword: 'industrial website design in kolhapur',
    priority: 0.85,
    changefreq: 'monthly',
    ogImage: '/og/industrial-website-development-kolhapur.jpg',
    schema: ['Service', 'FAQPage', 'BreadcrumbList'],
  },
  {
    path: '/portfolio',
    title: 'Portfolio | Website Design Work in Kolhapur',
    description:
      'Real websites built for Kolhapur businesses — with the design thinking, the build and the result behind each one. Explore the work, not just screenshots.',
    h1: 'Work',
    keywords:
      'website design portfolio kolhapur, web design work kolhapur, website examples kolhapur, legacy designs portfolio',
    primaryKeyword: 'website design portfolio kolhapur',
    priority: 0.8,
    changefreq: 'weekly',
    ogImage: '/og/portfolio.jpg',
    schema: ['CollectionPage', 'BreadcrumbList'],
  },
  {
    path: '/contact',
    title: 'Contact Legacy Designs | Website Design in Kolhapur',
    description:
      "Talk to Legacy Designs about your website. WhatsApp, call or send your requirements — you'll get a clear scope and price within one working day.",
    h1: 'Tell us what your business needs',
    keywords:
      'contact website designer kolhapur, website design enquiry kolhapur, website quote kolhapur, website design consultation kolhapur',
    primaryKeyword: 'website design enquiry kolhapur',
    priority: 0.9,
    changefreq: 'yearly',
    ogImage: '/og/contact.jpg',
    schema: ['ContactPage', 'BreadcrumbList'],
  },
  {
    path: '/website-redesign-kolhapur',
    title: 'Website Redesign in Kolhapur | Modernise & Rank',
    description:
      'Redesign an outdated Kolhapur website without losing rankings — UX, speed, mobile and SEO rebuilt with a safe redirect and migration plan in place.',
    h1: 'Website redesign in Kolhapur, without losing your rankings',
    keywords:
      'website redesign kolhapur, website revamp services kolhapur, old website redesign kolhapur, website redesign cost kolhapur',
    primaryKeyword: 'website redesign in kolhapur',
    priority: 0.8,
    changefreq: 'monthly',
    ogImage: '/og/website-redesign-kolhapur.jpg',
    schema: ['Service', 'FAQPage', 'BreadcrumbList'],
  },
  {
    path: '/wordpress-website-design-kolhapur',
    title: 'WordPress Website Design in Kolhapur | Legacy',
    description:
      'WordPress websites for Kolhapur businesses: fast themes or custom builds, easy editing, SEO plugins configured properly and training so you stay in control.',
    h1: 'WordPress website design in Kolhapur',
    keywords:
      'wordpress website design kolhapur, wordpress developer kolhapur, wordpress website cost kolhapur, woocommerce kolhapur',
    primaryKeyword: 'wordpress website design in kolhapur',
    priority: 0.75,
    changefreq: 'monthly',
    ogImage: '/og/wordpress-website-design-kolhapur.jpg',
    schema: ['Service', 'FAQPage', 'BreadcrumbList'],
  },
  {
    path: '/digital-marketing-agency-kolhapur',
    title: 'Digital Marketing Agency in Kolhapur | Legacy',
    description:
      'Digital marketing for Kolhapur businesses: SEO, Google Ads, Meta ads and content that work together — measured on enquiries, not impressions.',
    h1: 'Digital marketing in Kolhapur, measured in enquiries',
    keywords:
      'digital marketing agency kolhapur, digital marketing company kolhapur, social media marketing kolhapur, google ads kolhapur, performance marketing kolhapur',
    primaryKeyword: 'digital marketing agency in kolhapur',
    priority: 0.75,
    changefreq: 'monthly',
    ogImage: '/og/digital-marketing-agency-kolhapur.jpg',
    schema: ['Service', 'FAQPage', 'BreadcrumbList'],
  },
  {
    path: '/website-design-ichalkaranji',
    title: 'Website Design in Ichalkaranji | Textile Brands',
    description:
      'Website design in Ichalkaranji for textile, powerloom and export businesses — product catalogues, buyer enquiries and visibility beyond local markets.',
    h1: 'Website design in Ichalkaranji for textile businesses',
    keywords:
      'website design ichalkaranji, web designer ichalkaranji, website development ichalkaranji, textile website design ichalkaranji, ecommerce website ichalkaranji, वेबसाइट डिझाईन इचलकरंजी',
    primaryKeyword: 'website design in ichalkaranji',
    priority: 0.7,
    changefreq: 'monthly',
    ogImage: '/og/website-design-ichalkaranji.jpg',
    schema: ['Service', 'FAQPage', 'BreadcrumbList'],
  },
  {
    path: '/website-design-sangli',
    title: 'Website Design Company in Sangli | Legacy Designs',
    description:
      'Website design and SEO in Sangli for hospitals, schools, traders and retailers — fast, mobile-first builds with local search visibility built in.',
    h1: 'Website design in Sangli',
    keywords:
      'website design sangli, web designer sangli, website development sangli, website design karad, website design miraj',
    primaryKeyword: 'website design company in sangli',
    priority: 0.7,
    changefreq: 'monthly',
    ogImage: '/og/website-design-sangli.jpg',
    schema: ['Service', 'FAQPage', 'BreadcrumbList'],
  },
]

/* ────────────────────────────────── HELPERS ────────────────────────────────── */
export function absoluteUrl(path: string) {
  const clean = path === '/' ? '/' : `/${path.replace(/^\/|\/$/g, '')}`
  return `${SITE.url}${clean === '/' ? '/' : clean}`
}

export function getRoute(path: string): Route | undefined {
  const clean = path === '/' ? '/' : `/${path.replace(/^\/|\/$/g, '')}`
  return routes.find((r) => r.path === clean)
}

/** Breadcrumb trail for a service page: Home → Services → Page */
export function breadcrumbsFor(route: Route) {
  const trail = [{ name: 'Home', path: '/' }]
  if (route.path !== '/' && route.path !== '/contact' && route.path !== '/portfolio') {
    trail.push({ name: 'Services', path: '/#services' })
  }
  if (route.path !== '/') trail.push({ name: route.h1, path: route.path })
  return trail
}
