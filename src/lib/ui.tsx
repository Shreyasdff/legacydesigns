import {
  motion,
  useInView,
  useSpring,
  useReducedMotion,
} from 'motion/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'

export const EASE = [0.16, 1, 0.3, 1] as const

/* ────────────────────────────── Reveal ────────────────────────────── */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className = '',
  once = true,
  amount = 0.4,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  once?: boolean
  amount?: number
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? undefined : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/* ───────────────────────── Masked line reveal ─────────────────────── */
export function MaskLines({
  lines,
  className = '',
  lineClassName = '',
  delay = 0,
  stagger = 0.09,
  play = true,
  as: Tag = 'h1',
}: {
  lines: (string | ReactNode)[]
  className?: string
  lineClassName?: string
  delay?: number
  stagger?: number
  play?: boolean
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div'
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[Tag] as typeof motion.h1
  return (
    <MotionTag
      className={className}
      initial={reduce ? undefined : 'hidden'}
      whileInView={reduce ? undefined : 'show'}
      animate={play && !reduce ? 'show' : undefined}
      viewport={{ once: true, amount: 0.35 }}
      variants={{ show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {lines.map((line, i) => (
        <span key={i} className={`block overflow-hidden ${lineClassName}`}>
          <motion.span
            className="block will-change-transform"
            variants={{
              hidden: { y: '110%', opacity: 0.2 },
              show: { y: '0%', opacity: 1, transition: { duration: 1.15, ease: EASE } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}

/* ─────────────────────── Character-level reveal ───────────────────── */
export function SplitChars({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((c, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block will-change-transform"
          initial={reduce ? undefined : { y: '0.6em', opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.028 }}
        >
          {c === ' ' ? '\u00A0' : c}
        </motion.span>
      ))}
    </span>
  )
}

/* ─────────────────────────── Magnetic ─────────────────────────────── */
export function Magnetic({
  children,
  strength = 0.28,
  className = '',
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const x = useSpring(0, { stiffness: 180, damping: 18, mass: 0.4 })
  const y = useSpring(0, { stiffness: 180, damping: 18, mass: 0.4 })

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== 'mouse' || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

/* ───────────────────────────── Button ─────────────────────────────── */
type BtnProps = {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'solid' | 'ghost' | 'light'
  className?: string
  external?: boolean
  arrow?: boolean
  cursor?: string
  type?: 'submit' | 'button'
  disabled?: boolean
}

export function Button({
  children,
  href,
  onClick,
  variant = 'solid',
  className = '',
  external,
  arrow = true,
  cursor = 'link',
  type = 'button',
  disabled,
}: BtnProps) {
  const base =
    'group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-7 py-4 label transition-colors duration-500 disabled:opacity-50'
  const styles = {
    solid: 'bg-ink text-paper hover:text-ink',
    ghost: 'border border-ink/25 text-ink hover:text-paper',
    light: 'bg-paper text-ink hover:text-paper',
  }[variant]

  const inner = (
    <>
      <span
        aria-hidden
        className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 ${
          variant === 'solid' ? 'bg-paper' : variant === 'ghost' ? 'bg-ink' : 'bg-ink'
        }`}
      />
      <span className="relative z-10 flex items-center gap-2.5 whitespace-nowrap">
        {children}
        {arrow && <Arrow />}
      </span>
    </>
  )

  const cls = `${base} ${styles} ${className}`

  if (href) {
    return (
      <Magnetic>
        <a
          href={href}
          className={cls}
          data-cursor={cursor}
          {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        >
          {inner}
        </a>
      </Magnetic>
    )
  }
  return (
    <Magnetic>
      <button type={type} onClick={onClick} className={cls} data-cursor={cursor} disabled={disabled}>
        {inner}
      </button>
    </Magnetic>
  )
}

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className={`transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${className}`}
    >
      <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

/* ────────────────────────── Section label ─────────────────────────── */
export function SectionLabel({
  index,
  children,
  tone = 'dark',
}: {
  index?: string
  children: ReactNode
  tone?: 'dark' | 'light'
}) {
  return (
    <div className={`label flex items-center gap-3 ${tone === 'dark' ? 'text-mut' : 'text-paper/50'}`}>
      {index && (
        <span className={tone === 'dark' ? 'text-ink' : 'text-paper'} data-num>
          {index}
        </span>
      )}
      <span className={`h-px w-8 ${tone === 'dark' ? 'bg-line' : 'bg-paper/25'}`} aria-hidden />
      <span>{children}</span>
    </div>
  )
}

/* ──────────────────────────── Marquee ─────────────────────────────── */
export function Marquee({
  items,
  speed = 34,
  reverse = false,
  separator = '✳',
  className = '',
  itemClassName = '',
}: {
  items: string[]
  speed?: number
  reverse?: boolean
  separator?: string
  className?: string
  itemClassName?: string
}) {
  const row = [...items, ...items]
  return (
    <div className={`marquee-host relative overflow-hidden ${className}`} aria-hidden>
      <div
        className={`marquee-track ${reverse ? 'reverse' : ''}`}
        style={{ ['--dur' as string]: `${speed}s` }}
      >
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center">
            {row.map((it, i) => (
              <span key={`${dup}-${i}`} className={`flex items-center ${itemClassName}`}>
                <span>{it}</span>
                <span className="mx-6 opacity-40 md:mx-9">{separator}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ───────────────────── In-view helper hook ────────────────────────── */
export function useOnceInView<T extends HTMLElement>(amount = 0.3) {
  const ref = useRef<T>(null)
  const inView = useInView(ref, { once: true, amount })
  return { ref, inView }
}

/* ─────────────────────────── Parallax ─────────────────────────────── */
export function Parallax({
  children,
  distance = 40,
  className = '',
}: {
  children: ReactNode
  distance?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (reduce) return
    const el = ref.current
    if (!el) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const progress = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight
        setOffset(Math.max(-1, Math.min(1, progress)) * distance)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [distance, reduce])

  return (
    <div ref={ref} className={className}>
      <div style={{ transform: `translate3d(0, ${offset}px, 0)`, willChange: 'transform' }}>{children}</div>
    </div>
  )
}

/* ──────────────────────── Browser mockup frame ────────────────────── */
export function BrowserChrome({ url, dark = false }: { url: string; dark?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 border-b px-4 py-3 ${
        dark ? 'border-white/10 bg-[#17171a]' : 'border-line/80 bg-[#edebe4]'
      }`}
    >
      <div className="flex items-center gap-1.5">
        {['#e2665c', '#e3b455', '#77bf5a'].map((c) => (
          <span key={c} className="block size-2 rounded-full" style={{ backgroundColor: c }} />
        ))}
      </div>
      <div
        className={`mx-auto flex w-full max-w-[280px] items-center justify-center gap-1.5 rounded-md px-2 py-1 ${
          dark ? 'bg-white/5 text-white/45' : 'bg-white/70 text-mut'
        }`}
      >
        <svg width="8" height="9" viewBox="0 0 8 9" fill="none" aria-hidden>
          <rect x="0.6" y="3.6" width="6.8" height="4.8" rx="1.2" stroke="currentColor" strokeWidth="1" />
          <path d="M2.2 3.6V2.4a1.8 1.8 0 013.6 0v1.2" stroke="currentColor" strokeWidth="1" />
        </svg>
        <span className="truncate font-mono text-[9px] tracking-wide">{url}</span>
      </div>
      <div className="w-6" />
    </div>
  )
}
