import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar } from '../ui/Avatar.jsx'
import { Button } from '../ui/Button.jsx'
import { useFeedStore } from '../../store/feedStore.js'
import { useAuthStore } from '../../store/authStore.js'
import { timeAgo } from '../../utils/formatters.js'
import { Heart, CheckCircle } from 'lucide-react'

export function CommentThread({ post }) {
  const [text, setText] = useState('')
  const { addComment } = useFeedStore()
  const user = useAuthStore(s => s.user)

  function handleSubmit(e) {
    e.preventDefault()
    if (!text.trim() || !user) return
    addComment(post.id, text.trim(), user)
    setText('')
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden"
    >
      <div className="pt-3 pl-10 space-y-4 border-t border-border-subtle mt-3">
        {/* Comments list */}
        {post.comments.length > 0 && (
          <div className="space-y-3">
            <AnimatePresence>
              {post.comments.map((comment) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2"
                >
                  <Avatar src={comment.author?.avatar} alt={comment.author?.displayName} size="xs" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-body font-medium text-text-primary">
                        {comment.author?.displayName}
                      </span>
                      {comment.author?.verified && (
                        <CheckCircle size={10} className="text-text-muted" />
                      )}
                      <span className="text-xs font-mono text-text-muted">{timeAgo(comment.createdAt)}</span>
                    </div>
                    <p className="text-xs font-body text-text-secondary mt-0.5">{comment.text}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Heart size={11} className="text-text-muted" />
                      <span className="text-[10px] font-mono text-text-muted">{comment.likes}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Comment input */}
        {user && (
          <form onSubmit={handleSubmit} className="flex gap-2 items-start">
            <Avatar src={user.avatar} alt={user.displayName} size="xs" />
            <div className="flex-1 flex gap-2">
              <input
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Reply…"
                className="
                  flex-1 bg-transparent border-b border-border-default
                  text-xs font-body text-text-primary placeholder:text-text-muted
                  outline-none py-1
                  focus:border-border-strong transition-colors
                "
              />
              <Button type="submit" size="sm" disabled={!text.trim()}>
                →
              </Button>
            </div>
          </form>
        )}
      </div>
    </motion.div>
  )
}
