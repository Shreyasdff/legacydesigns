import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { useRef } from 'react'
import { EASE, MaskLines, Reveal, SectionLabel } from '../lib/ui'

const steps = [
  ['01', 'Discover', "Understand the client's business, goals, and requirements."],
  ['02', 'Strategize', 'Plan the website structure and user experience.'],
  ['03', 'Design', 'Create an attractive, professional, and user-focused interface.'],
  ['04', 'Develop', 'Build a responsive, functional, and optimized website.'],
  ['05', 'Launch', 'Test, refine, and launch the final website.'],
] as const

export default function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26 })

  return (
    <section id="process" className="relative overflow-hidden bg-paper-2/70 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-60" aria-hidden />
      <div className="shell relative">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-ink/10 pb-6">
          <SectionLabel index="05">The Process</SectionLabel>
          <span className="label text-mut-2">Five steps — no surprises</span>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-12 md:mt-14 lg:grid-cols-12 lg:gap-14">
          {/* sticky intro */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <MaskLines
                as="h2"
                className="display-xl text-[clamp(1.9rem,4.6vw,3.6rem)]"
                lines={['From first call', <span key="2" className="text-mut-2">to going live.</span>]}
              />
              <Reveal delay={0.15}>
                <p className="mt-6 max-w-sm text-[0.96rem] leading-relaxed text-mut">
                  A short, structured process keeps the work honest and the timeline predictable.
                  You always know what&apos;s happening next — and what I need from you.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-8 flex flex-wrap gap-2">
                  {['Fixed scope', 'Weekly updates', 'No handoffs'].map((t) => (
                    <span key={t} className="label rounded-full border border-ink/15 px-3 py-1.5 text-mut">
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>

          {/* timeline */}
          <div ref={ref} className="relative lg:col-span-7">
            <div className="absolute top-2 bottom-2 left-[13px] w-px bg-ink/12 md:left-[17px]" aria-hidden>
              <motion.div
                className="h-full w-full origin-top bg-ink"
                style={{ scaleY: reduce ? 1 : scaleY }}
              />
            </div>

            <ol className="space-y-2">
              {steps.map(([n, title, desc], i) => (
                <motion.li
                  key={n}
                  initial={reduce ? undefined : { opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.9, ease: EASE, delay: i * 0.05 }}
                  className="group relative flex gap-5 pb-8 pl-0 last:pb-0 md:gap-7"
                >
                  <span className="relative z-10 mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-ink/25 bg-paper text-[10px] font-medium transition-colors duration-500 group-hover:bg-ink group-hover:text-paper md:size-9 md:text-[11px]">
                    {n}
                  </span>
                  <div className="flex-1 border-b border-ink/10 pb-8 last:border-0">
                    <h3 className="font-display text-[clamp(1.2rem,2.6vw,1.7rem)] leading-none tracking-tight">
                      {title}
                    </h3>
                    <p className="mt-3 max-w-md text-[0.9rem] leading-relaxed text-mut">{desc}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
