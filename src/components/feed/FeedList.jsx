import { motion, AnimatePresence } from 'framer-motion'
import { PostCard } from './PostCard.jsx'
import { PostSkeleton } from '../ui/Skeleton.jsx'
import { staggerContainer } from '../../hooks/useAnimationVariants.js'
import { useFeedStore } from '../../store/feedStore.js'

export function FeedList() {
  const { posts, isLoading } = useFeedStore()

  if (isLoading) {
    return (
      <div>
        {[...Array(4)].map((_, i) => <PostSkeleton key={i} />)}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-8">
        <p className="font-display text-display-md text-text-muted">Empty</p>
        <p className="text-sm font-body text-text-muted mt-2">The feed is quiet. For now.</p>
      </div>
    )
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <AnimatePresence initial={false}>
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
