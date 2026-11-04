import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { EASE } from '../lib/ui'

export default function Preloader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion()
  const [count, setCount] = useState(0)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const total = reduce ? 350 : 1750
    const start = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / total)
      const eased = 1 - Math.pow(1 - p, 2.2)
      setCount(Math.round(eased * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else {
        setTimeout(() => {
          setGone(true)
          onDone()
        }, reduce ? 60 : 260)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone, reduce])

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-5 py-6 text-paper md:px-10 md:py-8"
          exit={{ y: '-100%' }}
          transition={{ duration: 1.15, ease: EASE }}
        >
          <div className="flex items-start justify-between">
            <span className="label text-paper/45">Shreyas Kapase — Portfolio</span>
            <span className="label text-paper/45">Est. Design Studio</span>
          </div>

          <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <div className="overflow-hidden">
              <motion.div
                className="display-xl text-[clamp(2.6rem,9vw,7rem)]"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
              >
                Shreyas
                <br />
                <span className="text-paper/35">Kapase</span>
              </motion.div>
            </div>
            <div className="font-mono text-[clamp(2.6rem,8vw,5.5rem)] leading-none tabular-nums text-paper/80">
              {String(count).padStart(3, '0')}
            </div>
          </div>

          <div className="space-y-4">
            <div className="h-px w-full overflow-hidden bg-paper/15">
              <motion.div className="h-full bg-paper" style={{ width: `${count}%` }} />
            </div>
            <div className="label flex justify-between text-paper/45">
              <span>Website Designer &amp; Developer</span>
              <span className="hidden md:inline">Loading the good stuff</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
