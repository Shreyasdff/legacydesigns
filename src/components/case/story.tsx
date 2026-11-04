import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState, type ReactNode } from 'react'
import { Arrow, EASE, Reveal } from '../../lib/ui'

/* ─────────────────────────── shared shell ─────────────────────────── */
function StoryShell({
  index,
  kicker,
  title,
  children,
  last = false,
}: {
  index: string
  kicker: string
  title: ReactNode
  children: ReactNode
  last?: boolean
}) {
  return (
    <section className={`relative bg-paper py-20 md:py-28 ${last ? '' : 'border-t border-line'}`}>
      <div className="shell grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <div className="flex items-start gap-4">
              <span className="font-display text-[clamp(2.6rem,6vw,4.6rem)] leading-none tracking-tight text-ink/15">
                {index}
              </span>
              <span className="label mt-2 text-mut-2">{kicker}</span>
            </div>
            <Reveal delay={0.05}>
              <h3 className="mt-6 max-w-[18ch] font-display text-[clamp(1.5rem,2.9vw,2.35rem)] leading-[1.05]">
                {title}
              </h3>
            </Reveal>
          </div>
        </div>
        <div className="lg:col-span-8">{children}</div>
      </div>
    </section>
  )
}

/* ───────────────────────────── 01 — Challenge ─────────────────────── */
export function Challenge() {
  const cards = [
    {
      t: 'Trust, at a glance',
      d: 'Fifteen years of workshop expertise had to become legible in the first five seconds of a visit.',
    },
    {
      t: 'One business, many offers',
      d: 'Repairs, refurbished sales, rentals, CCTV, biometrics, AMC and custom builds — all needing a clear home.',
    },
    {
      t: 'Friction before enquiry',
      d: 'Visitors arrive wanting a price, a route or a call. Every dead end costs a customer.',
    },
  ]

  return (
    <StoryShell index="01" kicker="The Challenge" title="A local reputation that had no digital proof.">
      <div className="space-y-6 text-[1rem] leading-relaxed text-mut md:text-[1.06rem]">
        <Reveal>
          <p className="text-ink">
            Trimurti IT Solutions has been solving technology problems in Kolhapur since 2010 —
            chip-level laptop repair, refurbished machines, CCTV installations, rentals and
            corporate IT support. The reputation was built in person, at the counter.
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <p>
            For a service business, a website is the first handshake. Before someone calls about a
            dead laptop or a CCTV quote, they search, skim and judge credibility. Without a
            professional digital presence, that judgement happens on someone else&apos;s platform —
            a marketplace listing, a directory, a competitor&apos;s site.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p>
            The brief was never &ldquo;make it prettier&rdquo;. It was to translate an
            experienced, multi-service IT business into a digital experience that feels
            established, organised and easy to act on.
          </p>
        </Reveal>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={c.t} delay={i * 0.07} className="bg-paper">
            <div className="h-full p-5 md:p-6">
              <span className="label text-mut-2">0{i + 1}</span>
              <h4 className="mt-3 font-display text-[1.05rem] leading-snug tracking-tight">{c.t}</h4>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-mut">{c.d}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <blockquote className="mt-10 border-l border-ink/25 pl-5 md:pl-7">
          <p className="font-display text-[clamp(1.2rem,2.4vw,1.75rem)] leading-[1.2] tracking-tight text-ink">
            &ldquo;The goal wasn&apos;t a prettier website. It was credibility you could feel before
            the first phone call.&rdquo;
          </p>
        </blockquote>
      </Reveal>
    </StoryShell>
  )
}

/* ─────────────────────── 02 — Design Direction ────────────────────── */
export function DesignDirection() {
  const swatches = [
    { name: 'Ink', hex: '#1A1A16', note: 'Primary text' },
    { name: 'Paper', hex: '#FAF9F6', note: 'Surface' },
    { name: 'Trust Blue', hex: '#1E3F96', note: 'Brand / action' },
    { name: 'Leaf', hex: '#8CC63F', note: 'Accent / status' },
    { name: 'Slate', hex: '#4A4940', note: 'Supporting text' },
  ]

  return (
    <StoryShell index="02" kicker="The Design Direction" title="An engineering identity, drawn from the shop itself.">
      <div className="space-y-6 text-[1rem] leading-relaxed text-mut md:text-[1.06rem]">
        <Reveal>
          <p className="text-ink">
            The visual system starts with the existing brand: a deep trust blue, a leaf green, and
            the circular Trimurti mark that customers recognise from the storefront. Those two
            colours do the heavy lifting — everything around them stays quiet.
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <p>
            A faint engineering grid runs behind the page, a nod to the precision of chip-level
            repair. Content sits on warm paper-white cards with hairline borders, pill-shaped
            labels and generous spacing, so dense technical information stays calm and scannable.
          </p>
        </Reveal>
      </div>

      {/* colour system */}
      <Reveal delay={0.08} className="mt-9">
        <div className="overflow-hidden rounded-lg border border-line bg-paper-2/50">
          <div className="flex items-center justify-between border-b border-line px-5 py-3">
            <span className="label text-mut">Colour system</span>
            <span className="label text-mut-2">05 tokens</span>
          </div>
          <div className="grid grid-cols-5">
            {swatches.map((s) => (
              <div key={s.name} className="group">
                <div className="h-16 border-r border-line/60 last:border-r-0 md:h-24" style={{ backgroundColor: s.hex }} />
                <div className="border-t border-line/60 px-2 py-3 md:px-3">
                  <p className="text-[0.72rem] font-medium md:text-[0.8rem]">{s.name}</p>
                  <p className="mt-0.5 font-mono text-[9px] text-mut-2 md:text-[10px]">{s.hex}</p>
                  <p className="mt-1 hidden text-[10px] text-mut-2 md:block">{s.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* type specimen */}
        <Reveal delay={0.05}>
          <div className="h-full rounded-lg border border-line p-5">
            <span className="label text-mut">Typography</span>
            <div className="mt-4 flex items-end gap-4">
              <span className="font-pjs text-[3.2rem] leading-none font-bold tracking-tight">Aa</span>
              <div className="pb-1">
                <p className="font-pjs text-[0.9rem] font-bold">Plus Jakarta Sans</p>
                <p className="text-[0.78rem] text-mut-2">Headlines · 600 / 700</p>
              </div>
            </div>
            <div className="mt-5 flex items-end gap-4 border-t border-line pt-4">
              <span className="font-inter text-[3rem] leading-none font-normal">Aa</span>
              <div className="pb-1">
                <p className="font-inter text-[0.9rem]">Inter</p>
                <p className="text-[0.78rem] text-mut-2">Interface &amp; body · 300–600</p>
              </div>
            </div>
            <p className="mt-4 text-[0.82rem] leading-relaxed text-mut">
              Neutral, engineered typefaces keep long service descriptions readable on any screen.
            </p>
          </div>
        </Reveal>

        {/* identity card */}
        <Reveal delay={0.12}>
          <div className="flex h-full flex-col justify-between rounded-lg border border-line p-5">
            <div>
              <span className="label text-mut">Identity</span>
              <div className="mt-4 grid place-items-center rounded-md border border-line bg-white p-6">
                <img
                  src="/work/trimurti-logo.webp"
                  alt="Trimurti IT Solutions brand mark"
                  className="size-24 md:size-28"
                  width={415}
                  height={415}
                  loading="lazy"
                />
              </div>
            </div>
            <p className="mt-4 text-[0.82rem] leading-relaxed text-mut">
              The circular mark leads every screen — instant recognition for walk-in customers,
              instant credibility for first-time visitors.
            </p>
          </div>
        </Reveal>
      </div>

      {/* layout principles */}
      <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
        {[
          ['Grid backdrop', 'A precision grid echoes the repair bench.'],
          ['Card modules', 'Dense information, calmly grouped.'],
          ['Pill labels', 'Micro-context without visual noise.'],
        ].map(([t, d], i) => (
          <Reveal key={t} delay={i * 0.06} className="bg-paper">
            <div className="h-full p-5">
              <h4 className="font-display text-[0.95rem] tracking-tight">{t}</h4>
              <p className="mt-1.5 text-[0.82rem] leading-relaxed text-mut">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </StoryShell>
  )
}

/* ───────────────────────── 03 — The Experience ────────────────────── */
const experience = [
  {
    n: '01',
    t: 'Navigation that mirrors the business',
    d: 'Sales, Services, Rentals, Corporate, Projects, Team Portal, Enquiry. The menu follows how customers actually ask for things — not an internal org chart.',
    img: '/work/hero-desktop.webp',
    alt: 'Homepage navigation of the Trimurti IT Solutions website',
  },
  {
    n: '02',
    t: 'Service discovery, not a catalogue',
    d: 'Eight product families — laptops, desktops, printers, scanners, CCTV, projectors, smart boards, security — presented through one interactive showcase.',
    img: '/work/showcase-radial.webp',
    alt: 'Interactive equipment showcase',
  },
  {
    n: '03',
    t: 'Answers where decisions happen',
    d: 'A build estimator with live pricing and power-safety checks, clear store hours, map directions and a phone number within reach at every scroll depth.',
    img: '/work/estimator.webp',
    alt: 'Custom PC build estimator interface',
  },
  {
    n: '04',
    t: 'Mobile-first, walk-in ready',
    d: 'Most local searches happen on a phone in one hand. Tap-to-call, thumb-reachable enquiry and layouts that stay readable at 360px.',
    img: '/work/mobile-hero.webp',
    alt: 'Mobile version of the Trimurti IT Solutions website',
    phone: true,
  },
]

export function Experience() {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const current = experience[active]

  return (
    <StoryShell index="03" kicker="The Experience" title="Built around the way customers actually ask.">
      <Reveal>
        <p className="max-w-xl text-[1rem] leading-relaxed text-mut md:text-[1.06rem]">
          Trimurti&apos;s customers arrive with a problem, not a product in mind. The experience is
          structured to answer the question behind the question — then remove every step between
          interest and contact.
        </p>
      </Reveal>

      <div className="mt-9 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
        {/* list */}
        <div className="border-t border-line">
          {experience.map((item, i) => (
            <button
              key={item.n}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              data-cursor="link"
              className={`group flex w-full items-start gap-4 border-b border-line py-4 text-left transition-colors duration-500 ${
                i === active ? 'text-ink' : 'text-mut-2 hover:text-ink'
              }`}
            >
              <span className="label mt-1 text-[9px] opacity-60">{item.n}</span>
              <span className="flex-1">
                <span className="block font-display text-[1.02rem] leading-snug tracking-tight md:text-[1.12rem]">
                  {item.t}
                </span>
                <span
                  className={`grid overflow-hidden text-[0.84rem] leading-relaxed text-mut transition-all duration-700 md:text-[0.88rem] ${
                    i === active ? 'mt-2 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <span className="overflow-hidden">{item.d}</span>
                </span>
              </span>
              <span className={`mt-1 transition-opacity duration-500 ${i === active ? 'opacity-100' : 'opacity-0'}`}>
                <Arrow />
              </span>
            </button>
          ))}
        </div>

        {/* preview */}
        <div className="md:sticky md:top-28">
          <div
            className={`overflow-hidden rounded-lg border shadow-[0_24px_60px_-36px_rgba(11,11,10,0.5)] ${
              current.phone ? 'border-ink/12 bg-ink-3' : 'border-ink/12 bg-white'
            }`}
          >
            {current.phone ? (
              <div className="flex aspect-[16/10] items-end justify-center gap-4 overflow-hidden px-4">
                <PhoneShot
                  src="/work/mobile-full.webp"
                  alt="Mobile homepage of the Trimurti IT Solutions website, scrolled"
                  className="w-[27%] translate-y-4"
                />
                <PhoneShot
                  src="/work/mobile-hero.webp"
                  alt="Mobile hero of the Trimurti IT Solutions website"
                  className="w-[31%]"
                />
              </div>
            ) : (
              <div className="relative aspect-[16/10] overflow-hidden bg-white">
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={current.img}
                    src={current.img}
                    alt={current.alt}
                    className="absolute inset-0 size-full object-cover object-top"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    loading="lazy"
                    decoding="async"
                  />
                </AnimatePresence>
              </div>
            )}
          </div>
          <p className="mt-3 text-[0.78rem] text-mut-2">
            Original captures from the live website — {current.n}/04
          </p>
        </div>
      </div>
    </StoryShell>
  )
}

/* ──────────────────────── 04 — The Development ────────────────────── */
export function Development() {
  const stack = ['React', 'TypeScript', 'Tailwind CSS', 'Component system', 'Semantic HTML', 'SEO & metadata', 'Responsive layout', 'Optimised assets']

  const pillars = [
    ['Component-driven UI', 'Reusable cards, pills and section primitives keep 20+ modules consistent.'],
    ['A real configurator', 'Stateful component selection, live price maths and PSU headroom diagnostics.'],
    ['Responsive from 360px', 'Every layout tested from small phones through ultrawide displays.'],
    ['Search-ready structure', 'One H1 per page, semantic sections, meta + Open Graph, LocalBusiness schema.'],
    ['Performance hygiene', 'Optimised imagery, minimal dependencies and no layout-thrashing animation.'],
    ['Conversion paths everywhere', 'Call, enquiry, directions and quote requests within one tap at any depth.'],
  ]

  return (
    <section className="relative bg-paper py-20 md:py-28">
      <div className="shell">
        <div className="grain relative overflow-hidden rounded-xl bg-ink px-6 py-12 text-paper md:px-12 md:py-16">
          <div className="pointer-events-none absolute inset-0 grid-lines-dark opacity-60" aria-hidden />
          <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(90% 70% at 90% 0%, rgba(30,63,150,0.30), transparent 60%)' }} aria-hidden />

          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <div className="flex items-start gap-4">
                  <span className="font-display text-[clamp(2.6rem,6vw,4.6rem)] leading-none tracking-tight text-paper/20">04</span>
                  <span className="label mt-2 text-paper/45">The Development</span>
                </div>
                <h3 className="mt-6 max-w-[18ch] font-display text-[clamp(1.5rem,2.9vw,2.35rem)] leading-[1.05]">
                  Engineered as carefully as it was designed.
                </h3>
                <div className="mt-6 flex flex-wrap gap-2">
                  {stack.map((s) => (
                    <span key={s} className="label rounded-full border border-paper/20 px-3 py-1.5 text-paper/60">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-paper/12 bg-paper/12 sm:grid-cols-2">
                {pillars.map(([t, d], i) => (
                  <Reveal key={t} delay={i * 0.05} className="bg-ink-2">
                    <div className="h-full p-5">
                      <span className="label text-paper/30">{String(i + 1).padStart(2, '0')}</span>
                      <h4 className="mt-3 font-display text-[1rem] tracking-tight text-paper">{t}</h4>
                      <p className="mt-2 text-[0.84rem] leading-relaxed text-paper/50">{d}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* responsive bands */}
              <div className="mt-6 rounded-lg border border-paper/12 p-5">
                <div className="flex items-center justify-between">
                  <span className="label text-paper/45">Responsive coverage</span>
                  <span className="label text-paper/30">360 → 1920+</span>
                </div>
                <div className="mt-4 space-y-2.5">
                  {[
                    ['Mobile', '360 – 639', 28],
                    ['Tablet', '640 – 1023', 52],
                    ['Laptop', '1024 – 1439', 74],
                    ['Desktop', '1440 +', 100],
                  ].map(([label, range, w]) => (
                    <div key={label as string} className="flex items-center gap-4">
                      <span className="w-16 shrink-0 text-[0.75rem] text-paper/60">{label}</span>
                      <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-paper/10">
                        <motion.span
                          className="absolute inset-y-0 left-0 rounded-full bg-paper/70"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${w}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.3, ease: EASE, delay: 0.15 }}
                        />
                      </span>
                      <span className="w-20 shrink-0 text-right font-mono text-[10px] text-paper/35">{range}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* device composition */}
              <div className="mt-6 flex items-end gap-4 overflow-hidden rounded-lg border border-paper/12 bg-ink-2 p-5">
                <div className="flex-1 overflow-hidden rounded-md border border-paper/10 bg-white">
                  <img
                    src="/work/capabilities.webp"
                    alt="Capabilities section of the website on desktop"
                    className="block w-full"
                    width={1600}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="w-[92px] shrink-0 overflow-hidden rounded-[1.1rem] border-[3px] border-paper/25 bg-ink shadow-xl sm:w-[112px]">
                  <img
                    src="/work/mobile-hero.webp"
                    alt="Mobile view of the Trimurti website"
                    className="block w-full"
                    width={480}
                    height={1039}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


/* ─────────────────────── phone frame (real captures) ──────────────── */
function PhoneShot({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div
      className={`relative aspect-[9/17] shrink-0 overflow-hidden rounded-[1.15rem] border border-paper/25 bg-ink shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)] ${className}`}
    >
      <img src={src} alt={alt} className="absolute inset-0 size-full object-cover object-top" loading="lazy" decoding="async" />
      <span className="absolute left-1/2 top-1.5 h-1 w-7 -translate-x-1/2 rounded-full bg-paper/30" aria-hidden />
    </div>
  )
}
