import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { nav, site } from '../config'
import { Arrow, EASE } from '../lib/ui'
import { useSmooth } from '../lib/smooth'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 })
  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 z-[80] h-[2px] w-full origin-left bg-brand"
      style={{ scaleX }}
    />
  )
}

export default function Nav({ ready }: { ready: boolean }) {
  const [overHero, setOverHero] = useState(true)
  const [open, setOpen] = useState(false)
  const { scrollTo, stop, start } = useSmooth()
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById('home')
      const limit = hero ? hero.offsetHeight - 90 : 400
      setOverHero(window.scrollY < limit)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    if (open) {
      stop()
      document.documentElement.style.overflow = 'hidden'
    } else {
      start()
      document.documentElement.style.overflow = ''
    }
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open, start, stop])

  const inverted = overHero && !open

  const go = (href: string) => {
    setOpen(false)
    setTimeout(() => scrollTo(href, { offset: -10 }), open ? 520 : 0)
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[75] transition-colors duration-700 ${
          inverted ? 'text-paper' : 'text-ink'
        }`}
      >
        <motion.div
          initial={reduce ? undefined : { y: -80, opacity: 0 }}
          animate={ready ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          className={`${
            inverted ? '' : 'border-b border-line/70 bg-paper/85 backdrop-blur-xl'
          } transition-colors duration-700`}
        >
          <div className="shell flex items-center justify-between py-4 md:py-5">
            {/* identity */}
            <button
              onClick={() => go('#home')}
              className="group flex items-center gap-3 text-left"
              data-cursor="link"
              aria-label="Back to top"
            >
              <span
                className={`relative block size-9 shrink-0 overflow-hidden rounded-full border transition-all duration-500 md:size-10 ${
                  inverted
                    ? 'border-paper/35 group-hover:border-paper'
                    : 'border-ink/20 group-hover:border-ink/60'
                }`}
              >
                <img
                  src="/profile/avatar.webp"
                  alt="Shreyas Kapase"
                  width={360}
                  height={360}
                  className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                  loading="eager"
                  decoding="async"
                />
              </span>
              <span className="block">
                <span className="block font-display text-[15px] leading-none tracking-tight">{site.name}</span>
                <span className="mt-1 block text-[10.5px] tracking-wide opacity-55">{site.role}</span>
              </span>
            </button>

            {/* links */}
            <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
              {nav.slice(0, 5).map((item) => (
                <button
                  key={item.href}
                  onClick={() => go(item.href)}
                  className="label link-line opacity-70 transition-opacity duration-300 hover:opacity-100"
                  data-cursor="link"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2.5 md:gap-4">
              <span className="label hidden items-center gap-2 opacity-60 xl:flex">
                <span className={`live-dot size-1.5 rounded-full ${inverted ? 'bg-leaf' : 'bg-leaf'}`} />
                Available
              </span>
              <button
                onClick={() => go('#contact')}
                className={`label group relative hidden overflow-hidden rounded-full border px-5 py-3 transition-colors duration-500 sm:inline-flex ${
                  inverted
                    ? 'border-paper/35 text-paper hover:text-ink'
                    : 'border-ink/25 text-ink hover:text-paper'
                }`}
                data-cursor="link"
              >
                <span
                  aria-hidden
                  className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 ${
                    inverted ? 'bg-paper' : 'bg-ink'
                  }`}
                />
                <span className="relative z-10 flex items-center gap-2">
                  Let&apos;s talk <Arrow />
                </span>
              </button>

              <button
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                className={`relative z-[95] flex size-11 items-center justify-center rounded-full border transition-colors duration-500 lg:hidden ${
                  open || !inverted ? 'border-ink/25 text-ink' : 'border-paper/35 text-paper'
                }`}
                data-cursor="link"
              >
                <span className="relative block h-3 w-4">
                  <motion.span
                    className="absolute left-0 block h-px w-full bg-current"
                    animate={open ? { top: '50%', rotate: 45 } : { top: 0, rotate: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                  <motion.span
                    className="absolute left-0 block h-px w-full bg-current"
                    animate={open ? { top: '50%', rotate: -45 } : { top: '100%', rotate: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </header>

      {/* mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[85] flex flex-col justify-between bg-ink px-5 pt-24 pb-8 text-paper"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {nav.map((item, i) => (
                <motion.button
                  key={item.href}
                  onClick={() => go(item.href)}
                  className="group flex items-baseline justify-between border-b border-paper/12 py-4 text-left"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + i * 0.06, duration: 0.7, ease: EASE }}
                >
                  <span className="display-xl text-[clamp(1.9rem,8vw,2.6rem)]">{item.label}</span>
                  <span className="label text-paper/35">0{i + 1}</span>
                </motion.button>
              ))}
            </nav>
            <div className="space-y-4">
              <a href={site.instagram.url} target="_blank" rel="noreferrer" className="label link-line inline-block">
                Instagram — {site.instagram.handle}
              </a>
              <p className="text-xs text-paper/40">{site.location}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
