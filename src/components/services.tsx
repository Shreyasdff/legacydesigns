import { useState } from 'react'
import { Arrow, MaskLines, Reveal, SectionLabel } from '../lib/ui'

const services = [
  ['Website Design', 'Art direction, layout systems and interfaces that make a business look as credible as it actually is.'],
  ['Website Development', 'Clean, maintainable front-end builds in React, TypeScript and Tailwind — fast by default.'],
  ['Business Websites', 'Multi-page sites that organise services, proof and enquiries into one clear pathway.'],
  ['Landing Pages', 'Focused, single-goal pages built for campaigns, launches and paid traffic.'],
  ['E-commerce Websites', 'Product catalogues, cart and checkout experiences designed to remove hesitation.'],
  ['Website Redesign', 'Modernise an outdated site without losing the equity and search visibility it already earned.'],
  ['Responsive Development', 'Every layout verified from 360px to ultrawide — one codebase, no broken breakpoints.'],
] as const

export default function Services() {
  const [active, setActive] = useState(0)

  return (
    <section id="services" className="relative bg-paper pb-20 md:pb-28">
      <div className="shell">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-6">
          <SectionLabel index="04">Services</SectionLabel>
          <span className="label text-mut-2">End-to-end — design &amp; build</span>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:mt-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <MaskLines as="h2" className="display-xl text-[clamp(2rem,5.6vw,4.6rem)]" lines={['What I build.']} />
          </div>
          <Reveal delay={0.15} className="lg:col-span-5">
            <p className="max-w-md text-[0.98rem] leading-relaxed text-mut">
              One person, one process, no handoffs. You work directly with the designer and the
              developer — because on this scale, they&apos;re the same person.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 md:mt-16">
          {services.map(([name, desc], i) => {
            const isActive = i === active
            return (
              <Reveal key={name} delay={i * 0.03} y={14}>
                <div
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  tabIndex={0}
                  data-cursor="link"
                  className={`group relative grid grid-cols-1 items-center gap-3 border-t border-line px-1 py-5 transition-colors duration-500 md:grid-cols-12 md:gap-6 md:py-6 ${
                    i === services.length - 1 ? 'border-b' : ''
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute inset-0 -z-0 origin-bottom bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive ? 'scale-y-100' : 'scale-y-0'
                    }`}
                  />
                  <span
                    className={`relative z-10 label transition-colors duration-500 md:col-span-1 ${
                      isActive ? 'text-paper/50' : 'text-mut-2'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3
                    className={`relative z-10 font-display text-[clamp(1.25rem,3.2vw,2.1rem)] leading-tight tracking-tight transition-colors duration-500 md:col-span-5 ${
                      isActive ? 'text-paper' : 'text-ink'
                    }`}
                  >
                    {name}
                  </h3>
                  <p
                    className={`relative z-10 text-[0.86rem] leading-relaxed transition-all duration-500 md:col-span-5 md:text-[0.92rem] ${
                      isActive ? 'text-paper/65 md:translate-y-0 md:opacity-100' : 'text-mut md:translate-y-1.5 md:opacity-0'
                    }`}
                  >
                    {desc}
                  </p>
                  <span
                    className={`relative z-10 ml-auto hidden transition-all duration-500 md:col-span-1 md:block ${
                      isActive ? 'translate-x-0 text-paper opacity-100' : 'text-mut-2 opacity-100 md:-translate-x-2 md:opacity-30'
                    }`}
                  >
                    <Arrow />
                  </span>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
