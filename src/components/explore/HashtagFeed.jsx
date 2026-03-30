import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { PostCard } from '../feed/PostCard.jsx'
import { useExploreStore } from '../../store/exploreStore.js'
import { staggerContainer, cardVariants } from '../../hooks/useAnimationVariants.js'

export function HashtagFeed() {
  const { selectedHashtag, hashtagPosts, selectHashtag } = useExploreStore()

  if (!selectedHashtag) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center gap-3 px-5 py-4 border-b-2 border-border-default sticky top-0 bg-surface-primary z-10">
        <button
          onClick={() => selectHashtag(null)}
          className="p-1 text-text-muted hover:text-text-primary transition-colors"
          aria-label="Back"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <p className="text-sm font-mono font-medium text-text-primary">#{selectedHashtag}</p>
          <p className="text-xs font-mono text-text-muted">{hashtagPosts.length} posts</p>
        </div>
      </div>

      {hashtagPosts.length === 0 ? (
        <div className="py-16 text-center">
          <p className="font-display text-display-md text-text-muted">No posts found.</p>
        </div>
      ) : (
        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          <AnimatePresence>
            {hashtagPosts.map(post => (
              <motion.div key={post.id} variants={cardVariants}>
                <PostCard post={post} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  )
}
