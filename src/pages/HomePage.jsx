import { useEffect } from 'react'
import { PageTransition } from '../components/layout/PageTransition.jsx'
import { LiveIndicator } from '../components/feed/LiveIndicator.jsx'
import { NewPostsBanner } from '../components/feed/NewPostsBanner.jsx'
import { PostComposer } from '../components/feed/PostComposer.jsx'
import { FeedList } from '../components/feed/FeedList.jsx'
import { useFeedStore } from '../store/feedStore.js'
import { useRealTimeFeed } from '../hooks/useRealTimeFeed.js'

export function HomePage() {
  const loadInitialPosts = useFeedStore(s => s.loadInitialPosts)
  const posts = useFeedStore(s => s.posts)

  useEffect(() => {
    if (posts.length === 0) loadInitialPosts()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useRealTimeFeed()

  return (
    <PageTransition>
      <div className="sticky top-0 z-20 bg-surface-primary">
        <div className="px-5 py-4 border-b-2 border-border-default">
          <h1 className="font-display text-display-md font-bold text-text-primary">Feed</h1>
        </div>
        <LiveIndicator />
        <NewPostsBanner />
      </div>

      <PostComposer />
      <FeedList />
    </PageTransition>
  )
}
