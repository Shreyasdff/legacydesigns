import { site } from '../config'
import { Arrow, MaskLines, Reveal, SectionLabel } from '../lib/ui'

export default function About() {
  return (
    <section id="about" className="relative bg-paper py-20 md:py-28">
      <div className="shell">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-6">
          <SectionLabel index="03">About</SectionLabel>
          <span className="label text-mut-2">{site.role}</span>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 md:mt-14 lg:grid-cols-12 lg:gap-14">
          {/* portrait */}
          <div className="lg:col-span-4">
            <Reveal>
              <figure
                className="group relative overflow-hidden rounded-lg border border-line bg-paper-2"
                data-cursor="link"
              >
                <img
                  src="/profile/portrait.webp"
                  alt="Shreyas Kapase, website designer and developer"
                  className="aspect-[4/5] w-full object-cover object-top grayscale-[1] contrast-[1.04] transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-hover:grayscale-0"
                  width={760}
                  height={950}
                  loading="lazy"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-ink via-ink/45 to-transparent p-4">
                  <figcaption className="label text-paper">Shreyas Kapase</figcaption>
                  <span className="label text-paper/70">Pune, IN</span>
                </div>
              </figure>
            </Reveal>
          </div>

          {/* statement */}
          <div className="lg:col-span-8">
            <MaskLines
              as="h2"
              className="display-xl text-[clamp(1.75rem,4.7vw,4rem)]"
              lines={[
                "I don't just design",
                'websites. I create',
                <span key="3" className="text-mut-2">
                  digital experiences.
                </span>,
              ]}
            />

            <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Reveal delay={0.1}>
                <p className="text-[1rem] leading-relaxed text-mut">
                  I&apos;m Shreyas Kapase, a website designer and developer. I build websites for
                  businesses that have outgrown their first one — work that looks considered, loads
                  fast, and turns visitors into enquiries.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="text-[1rem] leading-relaxed text-mut">
                  Design and code are the same craft to me. That means no handoffs, no
                  &ldquo;the developer will fix it later&rdquo; — just one person owning the
                  detail from first sketch to launch.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noreferrer noopener"
                className="label link-line mt-8 inline-flex items-center gap-2"
                data-cursor="link"
              >
                Instagram — {site.instagram.handle} <Arrow />
              </a>
            </Reveal>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line md:mt-16 md:grid-cols-3">
          {[
            ['Clarity over decoration', 'Every section earns its place. If it does not help a visitor decide, it goes.'],
            ['Design and build, together', 'I design in the browser — so what gets approved is what gets shipped.'],
            ['Built for the business', 'A beautiful site that generates no enquiries is a poster, not a portfolio piece.'],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.06} className="bg-paper">
              <div className="h-full p-6 md:p-7">
                <span className="label text-mut-2">0{i + 1}</span>
                <h3 className="mt-3 font-display text-[1.1rem] tracking-tight">{t}</h3>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-mut">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
