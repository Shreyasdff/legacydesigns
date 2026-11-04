import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { BrowserChrome, EASE, Reveal, SectionLabel } from '../../lib/ui'

const screens = [
  {
    n: '01',
    label: 'Homepage',
    url: 'trimurtiit.in',
    img: '/work/hero-desktop.webp',
    caption: 'Positioning, proof and service entry points in the first screen.',
  },
  {
    n: '02',
    label: 'Equipment showcase',
    url: 'trimurtiit.in/#showcase',
    img: '/work/showcase-radial.webp',
    caption: 'Eight product categories, explorable from a single interactive hub.',
  },
  {
    n: '03',
    label: 'PC configurator',
    url: 'trimurtiit.in/#estimator',
    img: '/work/estimator.webp',
    caption: 'A live build estimator with real-time pricing and power-draw safety checks.',
  },
  {
    n: '04',
    label: 'Capabilities',
    url: 'trimurtiit.in/#capabilities',
    img: '/work/capabilities.webp',
    caption: 'Service pillars presented as scannable, benefit-led modules.',
  },
  {
    n: '05',
    label: 'Storefront',
    url: 'trimurtiit.in/#store',
    img: '/work/storefront.webp',
    caption: 'Physical store details, hours and a one-tap route to the shop.',
  },
]

export default function InteractivePreview() {
  const [active, setActive] = useState(0)
  const current = screens[active]

  return (
    <section className="relative bg-paper py-20 md:py-28" aria-label="Interactive website preview">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
          <div>
            <SectionLabel>Interactive preview</SectionLabel>
            <h3 className="mt-5 max-w-lg font-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[1.02]">
              Click through the build.
            </h3>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-mut">
            Five screens from the live website. No mockups, no renders — these are the shipped
            interfaces.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* tabs */}
          <div className="lg:col-span-3">
            <div role="tablist" aria-label="Website screens" className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible hide-scrollbar">
              {screens.map((s, i) => {
                const isActive = i === active
                return (
                  <button
                    key={s.label}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(i)}
                    data-cursor="link"
                    className={`group flex shrink-0 items-center justify-between gap-6 border-b px-1 py-3 text-left transition-colors duration-500 lg:shrink lg:border-line ${
                      isActive ? 'text-ink' : 'text-mut-2 hover:text-ink'
                    }`}
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="label text-[9px] opacity-60">{s.n}</span>
                      <span className="whitespace-nowrap font-display text-[0.95rem] tracking-tight md:text-base">
                        {s.label}
                      </span>
                    </span>
                    <span
                      className={`hidden size-1.5 shrink-0 rounded-full transition-all duration-500 lg:block ${
                        isActive ? 'bg-brand' : 'bg-transparent'
                      }`}
                    />
                  </button>
                )
              })}
            </div>
            <div className="mt-5 hidden border-t border-line pt-4 lg:block">
              <p className="text-[0.82rem] leading-relaxed text-mut">{current.caption}</p>
            </div>
          </div>

          {/* stage */}
          <Reveal className="lg:col-span-9" y={30}>
            <div className="overflow-hidden rounded-lg border border-ink/12 bg-white shadow-[0_30px_80px_-40px_rgba(11,11,10,0.45)]">
              <BrowserChrome url={current.url} />
              <div className="relative aspect-[16/10] overflow-hidden bg-white">
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={current.img}
                    src={current.img}
                    alt={`${current.label} screen of the Trimurti IT Solutions website`}
                    className="absolute inset-0 size-full object-cover object-top"
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.75, ease: EASE }}
                    width={1600}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                  />
                </AnimatePresence>
              </div>
            </div>
            <p className="mt-3 text-[0.82rem] text-mut lg:hidden">{current.caption}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
