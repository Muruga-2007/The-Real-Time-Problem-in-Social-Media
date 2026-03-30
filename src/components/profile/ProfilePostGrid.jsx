import { motion } from 'framer-motion'
import { useFeedStore } from '../../store/feedStore.js'
import { PostCard } from '../feed/PostCard.jsx'
import { staggerContainer } from '../../hooks/useAnimationVariants.js'

export function ProfilePostGrid({ userId }) {
  const posts = useFeedStore(s => s.posts)
  const userPosts = posts.filter(p => p.authorId === userId)

  if (userPosts.length === 0) {
    return (
      <div className="py-16 text-center px-8">
        <p className="font-display text-display-md text-text-muted">No posts yet.</p>
        <p className="text-sm font-body text-text-muted mt-2">The signal is waiting.</p>
      </div>
    )
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {userPosts.map(post => (
        <PostCard key={post.id} post={post} compact />
      ))}
    </motion.div>
  )
}
