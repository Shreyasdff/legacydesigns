import { motion, useReducedMotion } from 'motion/react'
import { site } from '../../config'
import { Arrow, MaskLines, Reveal, SectionLabel } from '../../lib/ui'

export default function CaseIntro() {
  const reduce = useReducedMotion()

  return (
    <section id="case-study" className="relative bg-paper pt-24 md:pt-32">
      <div className="shell">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-6">
          <SectionLabel index="02">Case Study</SectionLabel>
          <a
            href={site.project.url}
            target="_blank"
            rel="noreferrer noopener"
            className="label group flex items-center gap-2 text-mut transition-colors hover:text-ink"
            data-cursor="link"
          >
            Live site
            <Arrow />
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 items-start gap-10 md:mt-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-6 flex items-center gap-4">
              <motion.img
                src="/work/trimurti-logo.webp"
                alt="Trimurti IT Solutions logo"
                width={415}
                height={415}
                className="size-12 rounded-full border border-line bg-white p-0.5 md:size-14"
                initial={reduce ? undefined : { opacity: 0, scale: 0.9, rotate: -8 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                loading="lazy"
              />
              <div>
                <span className="label block text-mut">Featured Project — 01</span>
                <span className="mt-2 block font-display text-sm tracking-tight">Kolhapur, Maharashtra</span>
              </div>
            </div>

            <MaskLines
              as="h2"
              className="display-xl text-[clamp(2.1rem,7vw,6rem)]"
              lines={[
                'Trimurti',
                <span key="2" className="text-mut-2">
                  IT Solutions
                </span>,
              ]}
            />
          </div>

          <Reveal delay={0.2} className="lg:col-span-4 lg:pt-4">
            <p className="text-[1rem] leading-relaxed text-mut">
              Designed and developed a professional digital presence for Trimurti IT Solutions,
              bringing IT services, computer solutions, and business technology offerings together
              through a modern, user-focused website.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Business Website', 'React', 'Responsive', 'SEO'].map((t) => (
                <span key={t} className="label rounded-full border border-line px-3 py-1.5 text-mut">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* meta grid */}
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-y border-line py-8 md:mt-20 md:grid-cols-3 lg:grid-cols-5">
          {[
            ['Client', site.project.name],
            ['Industry', 'IT Services & Technology'],
            ['Project Type', 'Business Website Design & Development'],
            ['Delivered', 'Design, Development, SEO, Launch'],
            ['Stack', 'React · TypeScript · Tailwind'],
          ].map(([k, v], i) => (
            <Reveal key={k} delay={i * 0.05}>
              <span className="label block text-mut-2">{k}</span>
              <span className="mt-2 block max-w-[16ch] text-[0.95rem] leading-snug md:max-w-none">{v}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
