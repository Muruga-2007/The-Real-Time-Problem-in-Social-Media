import { motion, AnimatePresence } from 'framer-motion'
import { useFeedStore } from '../../store/feedStore.js'

export function NewPostsBanner() {
  const queuedCount = useFeedStore(s => s.queuedPosts.length)
  const flushQueue = useFeedStore(s => s.flushQueue)

  return (
    <AnimatePresence>
      {queuedCount > 0 && (
        <motion.button
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          onClick={flushQueue}
          className="
            w-full px-5 py-3
            bg-accent text-text-inverse
            border-b-2 border-border-strong
            text-sm font-mono tracking-wider
            hover:bg-accent-hover transition-colors
            flex items-center justify-center gap-2
          "
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full bg-text-inverse opacity-75 rounded-full" />
            <span className="relative inline-flex h-1.5 w-1.5 bg-text-inverse rounded-full" />
          </span>
          {queuedCount} NEW {queuedCount === 1 ? 'POST' : 'POSTS'} — CLICK TO LOAD
        </motion.button>
      )}
    </AnimatePresence>
  )
}
