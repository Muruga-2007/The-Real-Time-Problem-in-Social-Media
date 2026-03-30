import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import { Avatar } from '../ui/Avatar.jsx'
import { Badge } from '../ui/Badge.jsx'
import { PostActions } from './PostActions.jsx'
import { CommentThread } from './CommentThread.jsx'
import { useFeedStore } from '../../store/feedStore.js'
import { timeAgo } from '../../utils/formatters.js'
import { cardVariants } from '../../hooks/useAnimationVariants.js'

export function PostCard({ post, compact = false }) {
  const activePostId = useFeedStore(s => s.activePostId)
  const isActive = activePostId === post.id

  return (
    <motion.article
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
      className="
        border-b-2 border-border-default
        transition-all duration-150
        hover:bg-surface-secondary
      "
      style={{ paddingInline: compact ? '1rem' : '1.25rem', paddingBlock: compact ? '0.75rem' : '1.25rem' }}
    >
      <div className="flex gap-3">
        {/* Avatar */}
        <Link to={`/profile/${post.author?.username}`} className="flex-shrink-0">
          <Avatar src={post.author?.avatar} alt={post.author?.displayName} size={compact ? 'sm' : 'md'} />
        </Link>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              to={`/profile/${post.author?.username}`}
              className="flex items-center gap-1 hover:underline underline-offset-2"
            >
              <span className={`font-body font-semibold text-text-primary ${compact ? 'text-xs' : 'text-sm'}`}>
                {post.author?.displayName}
              </span>
              {post.author?.verified && (
                <CheckCircle size={12} className="text-text-muted" />
              )}
            </Link>
            <span className={`font-mono text-text-muted ${compact ? 'text-[10px]' : 'text-xs'}`}>
              @{post.author?.username}
            </span>
            <span className={`font-mono text-text-muted ${compact ? 'text-[10px]' : 'text-xs'}`}>
              · {timeAgo(post.createdAt)}
            </span>
            {post.isLive && (
              <Badge variant="live" className="ml-auto">LIVE</Badge>
            )}
          </div>

          {/* Content */}
          <p className={`mt-2 font-body text-text-primary leading-relaxed ${compact ? 'text-xs' : 'text-sm'}`}>
            {post.content.split(/(#[\w]+)/g).map((part, i) =>
              part.startsWith('#') ? (
                <button
                  key={i}
                  onClick={() => window.dispatchEvent(new CustomEvent('explore-hashtag', { detail: part.slice(1) }))}
                  className="text-text-secondary hover:text-text-primary font-medium transition-colors"
                >
                  {part}
                </button>
              ) : part
            )}
          </p>

          {/* Actions */}
          {!compact && <PostActions post={post} />}

          {/* Comment thread */}
          {!compact && (
            <AnimatePresence>
              {isActive && <CommentThread post={post} />}
            </AnimatePresence>
          )}
        </div>
      </div>
    </motion.article>
  )
}
