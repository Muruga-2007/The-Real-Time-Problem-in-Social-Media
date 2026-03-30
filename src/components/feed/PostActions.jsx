import { motion } from 'framer-motion'
import { Heart, MessageCircle, Repeat2, Share } from 'lucide-react'
import { useFeedStore } from '../../store/feedStore.js'
import { useAuthStore } from '../../store/authStore.js'
import { useUIStore } from '../../store/uiStore.js'
import { formatCount } from '../../utils/formatters.js'

export function PostActions({ post }) {
  const { toggleLike, toggleRepost, setActivePost, activePostId } = useFeedStore()
  const user = useAuthStore(s => s.user)
  const pushToast = useUIStore(s => s.pushToast)

  const liked = user ? post.likedBy.includes(user.id) : false
  const reposted = user ? post.repostedBy.includes(user.id) : false
  const isActive = activePostId === post.id

  function handleLike() {
    if (!user) return
    toggleLike(post.id, user.id)
  }

  function handleRepost() {
    if (!user) return
    toggleRepost(post.id, user.id)
    if (!reposted) pushToast('Reposted.')
  }

  function handleShare() {
    navigator.clipboard?.writeText(window.location.origin + `/post/${post.id}`)
    pushToast('Link copied.')
  }

  return (
    <div className="flex items-center gap-6 mt-3">
      {/* Like */}
      <motion.button
        onClick={handleLike}
        whileTap={{ scale: 1.25 }}
        className={`flex items-center gap-1.5 text-xs font-mono transition-colors duration-150 ${liked ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'}`}
        aria-label="Like"
      >
        <Heart size={15} className={liked ? 'fill-current' : ''} />
        <span>{formatCount(post.likes)}</span>
      </motion.button>

      {/* Comment */}
      <motion.button
        onClick={() => setActivePost(post.id)}
        whileTap={{ scale: 1.1 }}
        className={`flex items-center gap-1.5 text-xs font-mono transition-colors duration-150 ${isActive ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'}`}
        aria-label="Comment"
      >
        <MessageCircle size={15} />
        <span>{formatCount(post.comments.length)}</span>
      </motion.button>

      {/* Repost */}
      <motion.button
        onClick={handleRepost}
        whileTap={{ scale: 1.1 }}
        className={`flex items-center gap-1.5 text-xs font-mono transition-colors duration-150 ${reposted ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'}`}
        aria-label="Repost"
      >
        <Repeat2 size={15} />
        <span>{formatCount(post.reposts)}</span>
      </motion.button>

      {/* Share */}
      <motion.button
        onClick={handleShare}
        whileTap={{ scale: 1.1 }}
        className="flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-text-primary transition-colors duration-150 ml-auto"
        aria-label="Share"
      >
        <Share size={15} />
      </motion.button>
    </div>
  )
}
