import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'

type Mode = 'default' | 'link' | 'view' | 'drag'

export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [mode, setMode] = useState<Mode>('default')
  const [visible, setVisible] = useState(false)
  const [pressed, setPressed] = useState(false)

  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  const x = useSpring(mx, { stiffness: 900, damping: 60, mass: 0.35 })
  const y = useSpring(my, { stiffness: 900, damping: 60, mass: 0.35 })
  const rx = useSpring(mx, { stiffness: 170, damping: 20, mass: 0.5 })
  const ry = useSpring(my, { stiffness: 170, damping: 20, mass: 0.5 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)

    const move = (e: PointerEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      setVisible(true)
    }
    const over = (e: PointerEvent) => {
      const el = (e.target as HTMLElement)?.closest?.('[data-cursor]') as HTMLElement | null
      const next = (el?.getAttribute('data-cursor') as Mode) || 'default'
      setMode(next)
    }
    const leave = () => setVisible(false)
    const down = () => setPressed(true)
    const up = () => setPressed(false)

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    document.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      document.removeEventListener('pointerleave', leave)
    }
  }, [mx, my])

  if (!enabled) return null

  const ringSize = mode === 'view' ? 92 : mode === 'link' ? 58 : mode === 'drag' ? 74 : 34

  return (
    <div className="cursor-layer pointer-events-none fixed inset-0 z-[90]">
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center rounded-full border border-paper/70 mix-blend-difference"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.85 : 1,
          backgroundColor: mode === 'view' ? 'rgba(242,240,234,1)' : 'rgba(242,240,234,0)',
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      >
        <motion.span
          className="label text-[9px] whitespace-nowrap text-ink"
          animate={{ opacity: mode === 'view' ? 1 : 0, y: mode === 'view' ? 0 : 6 }}
          transition={{ duration: 0.25 }}
        >
          View ↗
        </motion.span>
      </motion.div>
      <motion.div
        className="absolute top-0 left-0 size-[5px] rounded-full bg-paper mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible && mode !== 'view' ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  )
}
