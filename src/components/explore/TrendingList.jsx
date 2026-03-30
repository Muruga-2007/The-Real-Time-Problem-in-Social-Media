import { useExploreStore } from '../../store/exploreStore.js'
import { TrendingCard } from './TrendingCard.jsx'
import { motion } from 'framer-motion'
import { staggerContainer, cardVariants } from '../../hooks/useAnimationVariants.js'

export function TrendingList() {
  const { getSortedTopics, sortMode, setSortMode } = useExploreStore()
  const topics = getSortedTopics()

  return (
    <div>
      {/* Sort tabs */}
      <div className="flex border-b-2 border-border-default">
        {[['hot', 'Hot'], ['top', 'Top']].map(([mode, label]) => (
          <button
            key={mode}
            onClick={() => setSortMode(mode)}
            className={`
              flex-1 py-3 text-xs font-mono tracking-widest uppercase
              border-b-2 -mb-[2px] transition-colors duration-150
              ${sortMode === mode
                ? 'border-border-strong text-text-primary'
                : 'border-transparent text-text-muted hover:text-text-secondary'
              }
            `}
          >
            {label}
          </button>
        ))}
      </div>

      <motion.div variants={staggerContainer} initial="initial" animate="animate">
        {topics.map((topic, i) => (
          <motion.div key={topic.id} variants={cardVariants}>
            <TrendingCard topic={topic} rank={i + 1} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
