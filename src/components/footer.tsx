import { site } from '../config'
import { Arrow, Marquee } from '../lib/ui'
import { useSmooth } from '../lib/smooth'

export default function Footer() {
  const { scrollTo } = useSmooth()
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-paper/12 bg-ink text-paper">
      <div className="border-b border-paper/12 py-5">
        <Marquee
          items={['Shreyas Kapase', 'Website Design', 'Development', 'Brand-first thinking', 'Built in India']}
          speed={46}
          itemClassName="display-xl text-[clamp(1.6rem,4vw,3rem)]"
          className="text-paper/25"
        />
      </div>

      <div className="shell grid grid-cols-1 gap-8 py-10 md:grid-cols-3 md:items-start">
        <div>
          <p className="font-display text-lg tracking-tight">{site.name}</p>
          <p className="mt-1 text-[0.85rem] text-paper/45">{site.role}</p>
          <p className="mt-4 max-w-xs text-[0.82rem] leading-relaxed text-paper/35">
            Designing and building websites that make businesses impossible to ignore.
          </p>
        </div>

        <div className="flex flex-col items-start gap-3">
          <span className="label block text-paper/30">Elsewhere</span>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noreferrer noopener"
            data-cursor="link"
            className="link-line inline-flex w-fit items-center gap-2 text-[0.9rem] text-paper/70"
          >
            Instagram {site.instagram.handle} <Arrow />
          </a>
          <a
            href={site.project.url}
            target="_blank"
            rel="noreferrer noopener"
            data-cursor="link"
            className="link-line inline-flex w-fit items-center gap-2 text-[0.9rem] text-paper/70"
          >
            Trimurti IT Solutions <Arrow />
          </a>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <span className="label text-paper/30">Navigate</span>
          <button
            onClick={() => scrollTo('#home')}
            data-cursor="link"
            className="link-line label text-paper/70"
          >
            Back to top ↑
          </button>
          <span className="text-[0.72rem] text-paper/25">
            © {year} {site.name}. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
