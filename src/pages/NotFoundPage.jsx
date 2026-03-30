import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme.js'

export function NotFoundPage() {
  useTheme()
  return (
    <div className="min-h-screen bg-surface-primary flex flex-col items-center justify-center text-center px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-display text-[clamp(6rem,20vw,14rem)] font-bold text-text-primary leading-none select-none">
          404
        </h1>
        <p className="font-display text-display-md text-text-muted -mt-4">Signal lost.</p>
        <p className="text-sm font-body text-text-muted mt-4 max-w-xs">
          The page you're looking for has drifted out of range.
        </p>
        <Link
          to="/"
          className="
            inline-flex items-center gap-2 mt-8 px-8 py-4
            bg-accent text-text-inverse
            border-2 border-border-strong shadow-sharp-sm
            font-mono text-sm tracking-wider
            hover:shadow-sharp-md hover:translate-x-[2px] hover:translate-y-[2px]
            transition-all duration-150
          "
        >
          RETURN TO SIGNAL →
        </Link>
      </motion.div>
    </div>
  )
}
