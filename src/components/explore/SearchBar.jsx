import { useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { useExploreStore } from '../../store/exploreStore.js'
import { useDebounce } from '../../hooks/useDebounce.js'

export function SearchBar() {
  const { searchQuery, setSearchQuery, search, clearSearch } = useExploreStore()
  const debouncedQuery = useDebounce(searchQuery, 300)

  useEffect(() => {
    search(debouncedQuery)
  }, [debouncedQuery, search])

  return (
    <div className="relative">
      <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
      <input
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Search posts, people, hashtags…"
        className="
          w-full bg-surface-secondary border-2 border-border-default
          pl-10 pr-10 py-3 text-sm font-body text-text-primary
          placeholder:text-text-muted
          focus:outline-none focus:border-border-strong focus:bg-surface-primary
          transition-all duration-150
        "
      />
      {searchQuery && (
        <button
          onClick={clearSearch}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}
