import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { site } from '../../config'
import { Arrow, BrowserChrome, Reveal, SectionLabel } from '../../lib/ui'

export default function Result() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [0.94, 1, 0.97])

  return (
    <section id="result" className="grain relative overflow-hidden bg-ink py-20 text-paper md:py-28">
      <div className="pointer-events-none absolute inset-0 grid-lines-dark opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(80% 60% at 50% 100%, rgba(30,63,150,0.28), transparent 65%)' }}
        aria-hidden
      />

      <div className="shell relative">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-paper/15 pb-6">
          <SectionLabel index="05" tone="light">
            The Final Result
          </SectionLabel>
          <span className="label text-paper/35">Trimurti IT Solutions — Live</span>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:mt-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="display-xl text-[clamp(1.9rem,5.4vw,4.4rem)]">
              One website.
              <br />
              <span className="text-paper/40">Every service.</span>
              <br />
              One clear next step.
            </h2>
          </div>
          <Reveal delay={0.15} className="lg:col-span-4 lg:pt-2">
            <p className="text-[0.98rem] leading-relaxed text-paper/60">
              A fifteen-year-old IT business now has a digital storefront that matches its
              reputation: services that are easy to find, pricing that is transparent, and a route
              to the counter from every screen.
            </p>
          </Reveal>
        </div>
      </div>

      {/* full-width preview */}
      <div ref={ref} className="relative mt-12 md:mt-16">
        <motion.div style={{ scale }} className="shell">
          <div className="overflow-hidden rounded-lg border border-paper/15 bg-ink-2 shadow-[0_60px_140px_-60px_rgba(0,0,0,0.9)]">
            <BrowserChrome url="https://trimurtiit.in" dark />
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src="/work/hero-desktop.webp"
                alt="Final result — Trimurti IT Solutions homepage"
                className="size-full object-cover object-top"
                width={1600}
                height={1000}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="shell relative mt-10">
        <div className="grid grid-cols-2 gap-6 border-y border-paper/15 py-7 md:grid-cols-4">
          {[
            ['8', 'Equipment categories'],
            ['1', 'Live build configurator'],
            ['7', 'Core service pillars'],
            ['360px', 'Smallest supported width'],
          ].map(([k, v], i) => (
            <Reveal key={v} delay={i * 0.06}>
              <p className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-none tracking-tight">{k}</p>
              <p className="mt-2 text-[0.78rem] leading-snug text-paper/45">{v}</p>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 md:mt-16">
          <p className="label text-paper/35">Explore the finished product</p>
          <a
            href={site.project.url}
            target="_blank"
            rel="noreferrer noopener"
            data-cursor="view"
            className="group mt-5 flex flex-wrap items-center justify-between gap-6 border-y border-paper/20 py-6 md:py-9"
          >
            <span className="display-xl text-[clamp(1.9rem,6.6vw,6rem)] transition-colors duration-500 group-hover:text-paper/60">
              Explore live website
            </span>
            <span className="flex size-14 items-center justify-center rounded-full border border-paper/30 transition-all duration-500 group-hover:bg-paper group-hover:text-ink md:size-20">
              <Arrow className="scale-[1.6] md:scale-[2]" />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
