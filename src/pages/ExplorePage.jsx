import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { PageTransition } from '../components/layout/PageTransition.jsx'
import { SearchBar } from '../components/explore/SearchBar.jsx'
import { TrendingList } from '../components/explore/TrendingList.jsx'
import { HashtagFeed } from '../components/explore/HashtagFeed.jsx'
import { PostCard } from '../components/feed/PostCard.jsx'
import { useExploreStore } from '../store/exploreStore.js'
import { staggerContainer, cardVariants } from '../hooks/useAnimationVariants.js'
import { motion } from 'framer-motion'

export function ExplorePage() {
  const { searchQuery, searchResults, selectedHashtag, clearSearch } = useExploreStore()

  // Listen for hashtag explore events from PostCard
  useEffect(() => {
    function handleExploreHashtag(e) {
      useExploreStore.getState().selectHashtag(e.detail)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    window.addEventListener('explore-hashtag', handleExploreHashtag)
    return () => window.removeEventListener('explore-hashtag', handleExploreHashtag)
  }, [])

  return (
    <PageTransition>
      <div className="px-5 py-4 border-b-2 border-border-default sticky top-0 z-20 bg-surface-primary">
        <h1 className="font-display text-display-md font-bold text-text-primary mb-3">Explore</h1>
        <SearchBar />
      </div>

      <AnimatePresence mode="wait">
        {/* Search results */}
        {searchQuery && searchResults.length > 0 && (
          <motion.div
            key="search-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="px-5 py-3 border-b border-border-subtle">
              <p className="text-xs font-mono text-text-muted tracking-wider">
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
              </p>
            </div>
            <motion.div variants={staggerContainer} initial="initial" animate="animate">
              {searchResults.map(post => (
                <motion.div key={post.id} variants={cardVariants}>
                  <PostCard post={post} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* No search results */}
        {searchQuery && searchResults.length === 0 && (
          <motion.div
            key="no-results"
            className="py-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="font-display text-display-md text-text-muted">No signal found.</p>
            <p className="text-sm font-body text-text-muted mt-2">Try a different query.</p>
          </motion.div>
        )}

        {/* Hashtag feed */}
        {!searchQuery && selectedHashtag && (
          <HashtagFeed key="hashtag-feed" />
        )}

        {/* Default: trending list */}
        {!searchQuery && !selectedHashtag && (
          <motion.div key="trending">
            <div className="px-5 pt-4 pb-1">
              <p className="text-xs font-mono tracking-widest uppercase text-text-muted">Trending Now</p>
            </div>
            <TrendingList />
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  )
}
