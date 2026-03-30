import { useEffect, useRef } from 'react'
import { useFeedStore } from '../store/feedStore.js'
import { generatePost } from '../data/postGenerator.js'
import { FEED_INTERVAL_MIN, FEED_INTERVAL_MAX } from '../utils/constants.js'

export function useRealTimeFeed() {
  const enqueuePost = useFeedStore(s => s.enqueuePost)
  const timerRef = useRef(null)

  function scheduleNext() {
    const delay = FEED_INTERVAL_MIN + Math.random() * (FEED_INTERVAL_MAX - FEED_INTERVAL_MIN)
    timerRef.current = setTimeout(() => {
      enqueuePost(generatePost())
      scheduleNext()
    }, delay)
  }

  useEffect(() => {
    scheduleNext()
    return () => clearTimeout(timerRef.current)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}
