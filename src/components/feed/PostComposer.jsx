import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar } from '../ui/Avatar.jsx'
import { Button } from '../ui/Button.jsx'
import { useFeedStore } from '../../store/feedStore.js'
import { useAuthStore } from '../../store/authStore.js'
import { useUIStore } from '../../store/uiStore.js'

const MAX_LENGTH = 280

export function PostComposer() {
  const [text, setText] = useState('')
  const [focused, setFocused] = useState(false)
  const { createPost } = useFeedStore()
  const { user } = useAuthStore()
  const pushToast = useUIStore(s => s.pushToast)
  const remaining = MAX_LENGTH - text.length
  const canPost = text.trim().length > 0 && remaining >= 0

  function handleSubmit() {
    if (!canPost || !user) return
    createPost(text.trim(), user)
    setText('')
    setFocused(false)
    pushToast('Post published.')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit()
  }

  return (
    <div className="px-5 py-4 border-b-2 border-border-default">
      <div className="flex gap-3">
        <Avatar src={user?.avatar} alt={user?.displayName} size="md" />
        <div className="flex-1 space-y-3">
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            onFocus={() => setFocused(true)}
            onKeyDown={handleKeyDown}
            placeholder="What's the signal today?"
            rows={focused ? 4 : 2}
            maxLength={MAX_LENGTH + 10}
            className="
              w-full bg-transparent border-0 outline-none resize-none
              text-sm font-body text-text-primary placeholder:text-text-muted
              transition-all duration-200
            "
          />

          <AnimatePresence>
            {focused && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center justify-between border-t border-border-subtle pt-3"
              >
                <span className={`text-xs font-mono ${remaining < 20 ? 'text-text-primary' : 'text-text-muted'}`}>
                  {remaining}
                </span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => { setText(''); setFocused(false) }}>
                    Cancel
                  </Button>
                  <Button size="sm" disabled={!canPost} onClick={handleSubmit}>
                    POST
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
