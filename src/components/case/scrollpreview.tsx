import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { BrowserChrome } from '../../lib/ui'

/**
 * Cinematic scroll preview — a real full-length capture of trimurtiit.in
 * scrolls inside a browser frame, driven by the visitor's scroll position.
 */
export default function ScrollPreview() {
  const ref = useRef<HTMLDivElement>(null)
  const windowRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const reduce = useReducedMotion()
  const [maxShift, setMaxShift] = useState(0)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 })
  const y = useTransform(smooth, [0, 1], [0, -maxShift])
  const percent = useTransform(smooth, (v) => `${Math.round(v * 100)}%`)

  useEffect(() => {
    const measure = () => {
      const win = windowRef.current
      const img = imgRef.current
      if (!win || !img) return
      setMaxShift(Math.max(0, img.offsetHeight - win.clientHeight))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (windowRef.current) ro.observe(windowRef.current)
    if (imgRef.current) ro.observe(imgRef.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <section ref={ref} className="relative bg-paper-2/60" aria-label="Cinematic website preview">
      <div className="shell flex h-[250vh] flex-col justify-start pt-16 md:h-[290vh]">
        <div className="sticky top-[11vh] md:top-[9vh]">
          <div className="mx-auto mb-5 flex max-w-[1180px] flex-wrap items-center justify-between gap-3">
            <span className="label flex items-center gap-2 text-mut">
              <span className="live-dot size-1.5 rounded-full bg-brand" />
              Cinematic preview — the live page, in motion
            </span>
            <motion.span className="label text-mut-2 tabular-nums">{percent}</motion.span>
          </div>

          <div className="mx-auto max-w-[1180px] overflow-hidden rounded-lg border border-ink/15 bg-white shadow-[0_50px_120px_-50px_rgba(11,11,10,0.55)]">
            <BrowserChrome url="https://trimurtiit.in" />
            <div ref={windowRef} className="relative h-[54vh] overflow-hidden bg-white md:h-[66vh]">
              <motion.img
                ref={imgRef}
                src="/work/page-full.webp"
                alt="Full-length capture of the Trimurti IT Solutions website"
                style={{ y: reduce ? 0 : y, willChange: 'transform' }}
                className="absolute inset-x-0 top-0 w-full"
                width={1280}
                height={3572}
                loading="lazy"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/80 to-transparent" />
            </div>
          </div>

          <p className="mx-auto mt-4 max-w-[1180px] text-center text-[0.8rem] text-mut-2">
            Keep scrolling — the same scroll drives this preview.
          </p>
        </div>
      </div>
    </section>
  )
}
