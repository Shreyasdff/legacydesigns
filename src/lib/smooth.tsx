import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import Lenis from 'lenis'

type Ctx = {
  scrollTo: (target: string | number | HTMLElement, opts?: { offset?: number }) => void
  stop: () => void
  start: () => void
  progress: number
}

const SmoothContext = createContext<Ctx>({
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
  progress: 0,
})

export function useSmooth() {
  return useContext(SmoothContext)
}

export function SmoothProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 1,
      touchMultiplier: 1.7,
      smoothWheel: true,
    })
    lenisRef.current = lenis

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    lenis.on('scroll', ({ progress: p }: { progress: number }) => setProgress(p))

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const ctx: Ctx = {
    scrollTo: (target, opts) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { offset: opts?.offset ?? 0, duration: 1.35 })
        return
      }
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' })
        return
      }
      const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
      if (el) {
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY + (opts?.offset ?? 0),
          behavior: 'smooth',
        })
      }
    },
    stop: () => lenisRef.current?.stop(),
    start: () => lenisRef.current?.start(),
    progress,
  }

  return <SmoothContext.Provider value={ctx}>{children}</SmoothContext.Provider>
}
