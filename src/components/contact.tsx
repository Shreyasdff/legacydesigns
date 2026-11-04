import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { hasEmail, hasWhatsApp, mailLink, site, whatsappLink } from '../config'
import { Arrow, Button, MaskLines, Reveal, SectionLabel } from '../lib/ui'

type Fields = { name: string; business: string; email: string; requirements: string }

const empty: Fields = { name: '', business: '', email: '', requirements: '' }

export default function Contact() {
  const [fields, setFields] = useState<Fields>(empty)
  const [status, setStatus] = useState<'idle' | 'ready'>('idle')
  const [copied, setCopied] = useState(false)
  const reduce = useReducedMotion()

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((f) => ({ ...f, [k]: e.target.value }))

  const message = [
    `New project enquiry — ${site.name}`,
    ``,
    `Name: ${fields.name || '—'}`,
    `Business: ${fields.business || '—'}`,
    `Email: ${fields.email || '—'}`,
    ``,
    `Project requirements:`,
    fields.requirements || '—',
  ].join('\n')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fields.name.trim() || !fields.email.trim()) return

    if (hasWhatsApp) {
      window.open(whatsappLink(message), '_blank', 'noopener')
    } else if (hasEmail) {
      window.location.href = mailLink(`Project enquiry — ${fields.name}`, message)
    } else {
      // No number/email configured yet → Instagram DM, with the message ready to paste.
      window.open(site.instagram.url, '_blank', 'noopener')
    }
    setStatus('ready')
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section id="contact" className="grain relative overflow-hidden bg-ink text-paper">
      <div className="pointer-events-none absolute inset-0 grid-lines-dark opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(70% 60% at 15% 0%, rgba(30,63,150,0.32), transparent 60%)' }}
        aria-hidden
      />

      <div className="shell relative py-20 md:py-28">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-paper/15 pb-6">
          <SectionLabel index="06" tone="light">
            Contact
          </SectionLabel>
          <span className="label flex items-center gap-2 text-paper/40">
            <span className="live-dot size-1.5 rounded-full bg-leaf" />
            {site.availability}
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-12 md:mt-14 lg:grid-cols-12 lg:gap-16">
          {/* left */}
          <div className="lg:col-span-6">
            <MaskLines
              as="h2"
              className="display-xl text-[clamp(1.85rem,5.4vw,4.4rem)]"
              lines={[
                'Your business',
                'deserves a',
                <span key="3" className="text-paper/40">
                  better website.
                </span>,
              ]}
            />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-sm text-[1rem] leading-relaxed text-paper/60">
                Let&apos;s turn your vision into a beautiful digital experience.
              </p>
            </Reveal>

            <div className="mt-10 space-y-1 border-t border-paper/15">
              {[
                { label: 'Instagram', value: site.instagram.handle, href: site.instagram.url },
                ...(hasEmail ? [{ label: 'Email', value: site.email, href: `mailto:${site.email}` }] : []),
                ...(hasWhatsApp
                  ? [{ label: 'WhatsApp', value: `+${site.whatsappNumber.replace(/\D/g, '')}`, href: whatsappLink(`Hi ${site.name.split(' ')[0]}, I'd like to discuss a website.`) }]
                  : []),
                { label: 'Based in', value: site.location, href: undefined },
              ].map((row, i) => (
                <Reveal key={row.label} delay={i * 0.05}>
                  <div className="flex items-center justify-between gap-6 border-b border-paper/10 py-4">
                    <span className="label text-paper/40">{row.label}</span>
                    {row.href ? (
                      <a
                        href={row.href}
                        target={row.href.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer noopener"
                        data-cursor="link"
                        className="link-line inline-flex items-center gap-2 text-[0.95rem] text-paper/85"
                      >
                        {row.value} <Arrow />
                      </a>
                    ) : (
                      <span className="text-[0.95rem] text-paper/60">{row.value}</span>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* form */}
          <div className="lg:col-span-6">
            <Reveal delay={0.1}>
              <div className="rounded-xl border border-paper/15 bg-paper/[0.03] p-5 backdrop-blur-sm md:p-8">
                {status === 'idle' ? (
                  <form onSubmit={onSubmit} className="space-y-6" noValidate={false}>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <Field id="name" label="Your name" value={fields.name} onChange={set('name')} required placeholder="Shreyas Kapase" />
                      <Field id="business" label="Business name" value={fields.business} onChange={set('business')} placeholder="Trimurti IT Solutions" />
                    </div>
                    <Field id="email" label="Email" type="email" value={fields.email} onChange={set('email')} required placeholder="you@business.com" />
                    <div>
                      <label htmlFor="requirements" className="label mb-3 block text-paper/40">
                        Project requirements
                      </label>
                      <textarea
                        id="requirements"
                        value={fields.requirements}
                        onChange={set('requirements')}
                        rows={4}
                        placeholder="A 5-page business website with a service catalogue and enquiry forms…"
                        className="w-full resize-none rounded-md border border-paper/15 bg-transparent px-4 py-3 text-[0.95rem] text-paper placeholder:text-paper/25 focus:border-paper/40 focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <Button type="submit" variant="light" className="w-full justify-center sm:w-auto">
                        Send enquiry
                      </Button>
                      <a
                        href={site.instagram.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        data-cursor="link"
                        className="label flex items-center justify-center gap-2 rounded-full border border-paper/25 px-5 py-4 text-paper/70 transition-colors duration-500 hover:border-paper/60 hover:text-paper sm:w-auto"
                      >
                        <WhatsAppIcon />
                        {hasWhatsApp ? 'WhatsApp' : 'Instagram DM'}
                      </a>
                    </div>

                    <p className="text-[0.72rem] leading-relaxed text-paper/35">
                      {hasWhatsApp
                        ? 'Your enquiry opens directly in WhatsApp — nothing is stored on this site.'
                        : 'Your enquiry opens as a ready-to-send message in Instagram DM — nothing is stored on this site.'}
                    </p>
                  </form>
                ) : (
                  <motion.div
                    initial={reduce ? undefined : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="py-4"
                  >
                    <span className="label flex items-center gap-2 text-leaf">
                      <span className="live-dot size-1.5 rounded-full bg-leaf" /> Enquiry ready
                    </span>
                    <h3 className="mt-4 font-display text-[1.5rem] leading-tight tracking-tight">
                      Thanks, {fields.name.split(' ')[0]} — your message is prepared.
                    </h3>
                    <p className="mt-3 text-[0.9rem] leading-relaxed text-paper/55">
                      {hasWhatsApp || hasEmail
                        ? 'A new window should have opened with your enquiry. If it did not, use the links below.'
                        : 'Instagram DM should have opened. Copy your message below and paste it into the chat.'}
                    </p>

                    <pre className="mt-5 max-h-52 overflow-auto rounded-md border border-paper/12 bg-ink-2/70 p-4 font-mono text-[11px] leading-relaxed whitespace-pre-wrap text-paper/60">
                      {message}
                    </pre>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={copy}
                        className="label rounded-full border border-paper/25 px-4 py-3 transition-colors hover:border-paper/60"
                        data-cursor="link"
                      >
                        {copied ? 'Copied ✓' : 'Copy message'}
                      </button>
                      <a
                        href={site.instagram.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="label rounded-full bg-paper px-4 py-3 text-ink"
                        data-cursor="link"
                      >
                        Open Instagram
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setStatus('idle')
                          setFields(empty)
                        }}
                        className="label rounded-full px-4 py-3 text-paper/50 underline-offset-4 hover:underline"
                      >
                        Start again
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({
  id,
  label,
  value,
  onChange,
  type = 'text',
  required,
  placeholder,
}: {
  id: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="label mb-3 block text-paper/40">
        {label}
        {required && <span className="ml-1 text-leaf">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-md border border-paper/15 bg-transparent px-4 py-3 text-[0.95rem] text-paper placeholder:text-paper/25 focus:border-paper/40 focus:outline-none"
      />
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 18.15h-.01a8.2 8.2 0 01-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 01-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 012.41 5.83c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.01-.39.11-.51.13-.13.25-.29.37-.44.13-.14.17-.25.25-.41.09-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.42.06-.64.31-.22.25-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.17 1.69 2.58 4.1 3.62.57.25 1.02.39 1.37.5.58.19 1.1.16 1.52.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.47-.28z" />
    </svg>
  )
}
