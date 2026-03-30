import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'

function useCountUp(target, duration = 1.2) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    const v = { val: 0 }
    const controls = animate(v.val, target, {
      duration,
      ease: 'easeOut',
      onUpdate(latest) { setDisplay(Math.floor(latest)) },
    })
    return () => controls.stop()
  }, [target, duration])
  return display
}

export function StatCard({ label, value, unit = '', sub, index = 0 }) {
  const numericValue = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^0-9.]/g, '')) || 0
  const count = useCountUp(numericValue, 1.0 + index * 0.1)

  function formatDisplay(n) {
    if (numericValue >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
    if (numericValue >= 1_000) return (n / 1_000).toFixed(1) + 'K'
    return String(n)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="
        bg-surface-primary border-2 border-border-default p-5
        hover:shadow-sharp-md hover:translate-x-[2px] hover:translate-y-[2px]
        transition-all duration-150
      "
    >
      <p className="text-xs font-mono tracking-widest uppercase text-text-muted mb-3">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className="font-display text-display-lg font-bold text-text-primary">
          {typeof value === 'string' && value.startsWith('+')
            ? value
            : formatDisplay(count)
          }
        </span>
        {unit && <span className="text-sm font-mono text-text-muted">{unit}</span>}
      </div>
      {sub && <p className="text-xs font-body text-text-muted mt-1">{sub}</p>}
    </motion.div>
  )
}
