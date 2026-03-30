import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useUIStore } from '../../store/uiStore.js'

export function ThemeToggle({ size = 20 }) {
  const { theme, toggleTheme } = useUIStore()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="
        relative w-9 h-9 flex items-center justify-center
        border-2 border-border-default hover:border-border-strong
        text-text-muted hover:text-text-primary
        transition-colors duration-150 overflow-hidden
      "
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute"
          >
            <Sun size={size} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute"
          >
            <Moon size={size} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
