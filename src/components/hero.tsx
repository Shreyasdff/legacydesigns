import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { useRef } from 'react'
import { site } from '../config'
import { Button, EASE, Marquee, MaskLines } from '../lib/ui'
import { useSmooth } from '../lib/smooth'

function MockupCard() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rx = useSpring(py, { stiffness: 120, damping: 18 })
  const ry = useSpring(px, { stiffness: 120, damping: 18 })
  const rotateX = useTransform(rx, [-0.5, 0.5], ['7deg', '-7deg'])
  const rotateY = useTransform(ry, [-0.5, 0.5], ['-9deg', '9deg'])

  return (
    <motion.div
      ref={ref}
      className="relative [perspective:1400px]"
      initial={reduce ? undefined : { opacity: 0, y: 44 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4, ease: EASE, delay: 0.9 }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== 'mouse' || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        px.set((e.clientX - (r.left + r.width / 2)) / r.width)
        py.set((e.clientY - (r.top + r.height / 2)) / r.height)
      }}
      onPointerLeave={() => {
        px.set(0)
        py.set(0)
      }}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} className="relative">
        <div className="absolute -top-3 left-5 z-20 flex items-center gap-2 rounded-full bg-paper px-3.5 py-1.5 text-ink">
          <span className="live-dot size-1.5 rounded-full bg-leaf" />
          <span className="label text-[9px]">Featured — 01</span>
        </div>

        <div className="overflow-hidden rounded-lg border border-paper/12 bg-ink-2 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)]">
          <div className="flex items-center gap-2 border-b border-paper/10 px-3 py-2.5">
            <span className="flex gap-1">
              {['#e2665c', '#e3b455', '#77bf5a'].map((c) => (
                <span key={c} className="block size-1.5 rounded-full" style={{ backgroundColor: c }} />
              ))}
            </span>
            <span className="mx-auto rounded bg-paper/[0.06] px-2 py-0.5 font-mono text-[8.5px] tracking-wide text-paper/45">
              trimurtiit.in
            </span>
          </div>
          <img
            src="/work/hero-desktop.webp"
            alt="Trimurti IT Solutions website homepage shown in a desktop browser"
            className="block w-full"
            width={1600}
            height={1000}
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="label text-[9px] text-paper/40">Trimurti IT Solutions</span>
          <span className="label text-[9px] text-paper/40">Business Website</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Hero({ ready }: { ready: boolean }) {
  const { scrollTo } = useSmooth()
  const reduce = useReducedMotion()

  return (
    <section
      id="home"
      className="grain relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-ink text-paper"
    >
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 grid-lines-dark opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 78% 8%, rgba(30,63,150,0.30) 0%, rgba(11,11,10,0) 58%), radial-gradient(90% 60% at 0% 100%, rgba(140,198,63,0.10) 0%, rgba(11,11,10,0) 55%)',
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" aria-hidden />

      <div className="shell relative z-10 flex flex-1 flex-col justify-center pt-24 pb-8 md:pt-28 md:pb-10">
        {/* meta row */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-paper/10 pb-4 md:mb-10"
        >
          <span className="label flex items-center gap-2.5 text-paper/50">
            <span className="live-dot size-1.5 rounded-full bg-leaf" />
            {site.availability}
          </span>
          <span className="label hidden text-paper/35 md:block">{site.location}</span>
          <span className="label text-paper/35">Selected Work — 01</span>
        </motion.div>

        {/* headline */}
        <MaskLines
          as="h1"
          play={ready}
          delay={0.45}
          stagger={0.11}
          className="display-xl max-w-[22ch] text-[clamp(2.15rem,9.2vw,6.4rem)] sm:text-[clamp(2.15rem,7.4vw,6.4rem)] lg:text-[clamp(2rem,6.6vw,6.4rem)]"
          lines={[
            'I build websites',
            'that make businesses',
            <span key="l3" className="text-paper/45">
              impossible to ignore.
            </span>,
          ]}
        />

        {/* lower row */}
        <div className="mt-9 grid grid-cols-1 items-start gap-8 md:mt-12 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, ease: EASE, delay: 1.05 }}
            className="lg:col-span-7"
          >
            <p className="max-w-[34ch] text-[0.98rem] leading-relaxed text-paper/60 md:text-[1.05rem]">
              Crafting premium digital experiences that combine thoughtful design, seamless
              functionality, and business-focused strategy.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button variant="light" onClick={() => scrollTo('#work')} cursor="link">
                Explore my work
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollTo('#contact')}
                className="border-paper/30 text-paper"
                cursor="link"
              >
                Let&apos;s work together
              </Button>
            </div>
          </motion.div>

          <div className="w-full max-w-[420px] lg:col-span-5 lg:ml-auto">
            <MockupCard />
          </div>
        </div>
      </div>

      {/* bottom strip */}
      <div className="relative z-10 border-t border-paper/10">
        <div className="shell flex items-center gap-6 py-4">
          <span className="label hidden shrink-0 items-center gap-2 text-paper/40 md:flex">
            <span className="relative flex h-8 w-px overflow-hidden bg-paper/15">
              <span className="scroll-hint absolute inset-0" />
            </span>
            Scroll
          </span>
          <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
            <Marquee
              items={['Website Design', 'Development', 'Business Websites', 'Landing Pages', 'E-commerce', 'Redesign', 'Responsive']}
              speed={42}
              className="label text-paper/35"
              itemClassName="whitespace-nowrap"
            />
          </div>
          <span className="label hidden shrink-0 text-paper/40 lg:block">Kolhapur → Pune</span>
        </div>
      </div>
    </section>
  )
}
