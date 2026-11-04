/**
 * ──────────────────────────────────────────────────────────────
 *  SITE CONFIG — edit these values, everything else is wired up.
 * ──────────────────────────────────────────────────────────────
 */

export const site = {
  name: 'Shreyas Kapase',
  brand: 'Shreyas Kapase',
  role: 'Website Designer & Developer',
  location: 'Pune, Maharashtra — India',
  availability: 'Available for select projects',

  /* Contact routes ------------------------------------------------ */
  // WhatsApp number in international format, digits only (e.g. '919876543210').
  // Leave empty and the WhatsApp CTA will gracefully fall back to Instagram DM.
  whatsappNumber: '',
  // Contact email. Leave empty to fall back to Instagram DM.
  email: '',

  instagram: {
    handle: '@itsrey.in',
    url: 'https://www.instagram.com/itsrey.in',
  },

  /* The one and only featured project ------------------------------ */
  project: {
    name: 'Trimurti IT Solutions',
    url: 'https://trimurtiit.in',
    industry: 'IT Services & Technology',
    type: 'Business Website Design & Development',
    location: 'Kolhapur, Maharashtra',
    scope: 'Design, Development, SEO & Launch',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Interactive Configurator'],
  },
} as const

export const hasWhatsApp = site.whatsappNumber.replace(/\D/g, '').length >= 8
export const hasEmail = site.email.includes('@')

/** WhatsApp deep link with a pre-filled message. */
export function whatsappLink(message: string) {
  const digits = site.whatsappNumber.replace(/\D/g, '')
  if (!digits) return site.instagram.url
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

/** Mailto link with a subject + body, or Instagram fallback. */
export function mailLink(subject: string, body: string) {
  if (!hasEmail) return site.instagram.url
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Case Study', href: '#case-study' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]
