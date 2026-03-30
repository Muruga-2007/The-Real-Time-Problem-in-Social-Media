import { motion } from 'framer-motion'

export function Card({ children, className = '', hover = false, onClick }) {
  const base = `
    bg-surface-primary border-2 border-border-default
    transition-all duration-150
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `
  if (hover) {
    return (
      <motion.div
        className={base}
        whileHover={{ x: 2, y: 2, boxShadow: 'none' }}
        style={{ boxShadow: '4px 4px 0px var(--border-strong)' }}
        onClick={onClick}
      >
        {children}
      </motion.div>
    )
  }
  return (
    <div className={base} onClick={onClick}>
      {children}
    </div>
  )
}
