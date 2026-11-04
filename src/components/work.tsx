import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { useRef } from 'react'
import { site } from '../config'
import { Arrow, BrowserChrome, MaskLines, Reveal, SectionLabel } from '../lib/ui'
import { useSmooth } from '../lib/smooth'

export default function Work() {
  const cardRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollTo } = useSmooth()
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] })
  const y = useSpring(useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]), {
    stiffness: 90,
    damping: 24,
  })

  return (
    <section id="work" className="relative bg-paper pt-20 pb-6 md:pt-28">
      <div className="shell">
        <div className="flex flex-wrap items-start justify-between gap-6 border-b border-line pb-6">
          <SectionLabel index="01">Selected Work</SectionLabel>
          <span className="label text-mut">(01) Project — Full Case Study</span>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-8 md:mt-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <MaskLines
              as="h2"
              className="display-xl text-[clamp(2rem,6vw,4.6rem)]"
              lines={['A website that had', 'to earn trust', 'before the sale.']}
            />
          </div>
          <Reveal delay={0.15} className="lg:col-span-5 lg:pt-2">
            <p className="max-w-md text-[0.98rem] leading-relaxed text-mut">
              Instead of a grid of thumbnails, here is one project examined end to end — the
              strategy behind it, the interface system, the build, and the result. Every screen
              below is the live website.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Project card */}
      <div ref={cardRef} className="shell mt-12 md:mt-16">
        <motion.div style={{ y }} className="relative">
          <button
            onClick={() => scrollTo('#case-study')}
            className="group relative block w-full overflow-hidden rounded-xl border border-line bg-ink-2 text-left"
            data-cursor="view"
            aria-label="Open the Trimurti IT Solutions case study"
          >
            <BrowserChrome url="trimurtiit.in" dark />
            <div className="relative aspect-[16/10] overflow-hidden">
              <motion.img
                src="/work/hero-desktop.webp"
                alt="Trimurti IT Solutions homepage — desktop website design by Shreyas Kapase"
                className="size-full object-cover object-top transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                width={1600}
                height={1000}
                loading="lazy"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/95 via-ink/45 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-5 md:p-8">
                <div>
                  <span className="label text-paper/50">Featured Project — 01</span>
                  <h3 className="mt-2 font-display text-[clamp(1.5rem,3.2vw,2.6rem)] leading-none text-paper">
                    {site.project.name}
                  </h3>
                </div>
                <span className="label flex items-center gap-0 rounded-full border border-paper/30 bg-ink/40 px-4 py-2.5 text-paper backdrop-blur-md transition-colors duration-500 group-hover:bg-paper group-hover:text-ink">
                  View case study <Arrow />
                </span>
              </div>
            </div>
          </button>
        </motion.div>

        {/* meta row */}
        <div className="mt-5 grid grid-cols-2 gap-5 border-b border-line pb-8 md:grid-cols-4 md:gap-8">
          {[
            ['Client', site.project.name],
            ['Industry', site.project.industry],
            ['Scope', 'Design, Build & Launch'],
            ['Live', 'trimurtiit.in ↗'],
          ].map(([k, v], i) => (
            <Reveal key={k} delay={i * 0.06}>
              <span className="label block text-mut">{k}</span>
              <a
                href={i === 3 ? site.project.url : '#case-study'}
                {...(i === 3 ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                onClick={(e) => {
                  if (i !== 3) {
                    e.preventDefault()
                    scrollTo('#case-study')
                  }
                }}
                className="link-line mt-2 block font-display text-[0.98rem] tracking-tight md:text-[1.05rem]"
                data-cursor="link"
              >
                {v}
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
