import { motion } from 'framer-motion'
import { useExploreStore } from '../../store/exploreStore.js'
import { formatCount } from '../../utils/formatters.js'

export function TrendingCard({ topic, rank }) {
  const selectHashtag = useExploreStore(s => s.selectHashtag)
  const selectedHashtag = useExploreStore(s => s.selectedHashtag)
  const isSelected = selectedHashtag === topic.tag

  return (
    <motion.button
      onClick={() => selectHashtag(isSelected ? null : topic.tag)}
      whileHover={{ x: 3 }}
      whileTap={{ scale: 0.98 }}
      className={`
        w-full text-left flex items-center gap-4 px-4 py-4
        border-b-2 border-border-default
        transition-all duration-150
        ${isSelected ? 'bg-accent text-text-inverse' : 'bg-surface-primary hover:bg-surface-secondary'}
      `}
    >
      {/* Rank */}
      <span className={`
        font-display font-bold flex-shrink-0 w-10
        ${isSelected ? 'text-text-inverse' : 'text-text-muted'}
        text-3xl leading-none
      `}>
        {String(rank).padStart(2, '0')}
      </span>

      {/* Tag info */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-mono font-medium truncate ${isSelected ? 'text-text-inverse' : 'text-text-primary'}`}>
          {topic.displayTag}
        </p>
        <p className={`text-xs font-mono mt-0.5 ${isSelected ? 'text-text-inverse opacity-70' : 'text-text-muted'}`}>
          {formatCount(topic.postCount)} posts · {topic.category}
        </p>
      </div>

      {/* Growth */}
      <span className={`
        text-xs font-mono flex-shrink-0
        ${isSelected ? 'text-text-inverse' : 'text-text-secondary'}
      `}>
        +{topic.growth}%
      </span>
    </motion.button>
  )
}
