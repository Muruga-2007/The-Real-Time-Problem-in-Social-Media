import { create } from 'zustand'
import { mockTrending } from '../data/mockTrending.js'
import { mockPosts } from '../data/mockPosts.js'

export const useExploreStore = create((set, get) => ({
  trendingTopics: mockTrending,
  searchQuery: '',
  searchResults: [],
  selectedHashtag: null,
  hashtagPosts: [],
  sortMode: 'hot', // 'hot' | 'top'

  setSearchQuery: (q) => set({ searchQuery: q }),

  search: (q) => {
    if (!q.trim()) {
      set({ searchResults: [], searchQuery: q })
      return
    }
    const lower = q.toLowerCase().replace('#', '')
    const results = mockPosts.filter(p =>
      p.content.toLowerCase().includes(lower) ||
      p.hashtags.some(h => h.includes(lower)) ||
      p.author.username.toLowerCase().includes(lower) ||
      p.author.displayName.toLowerCase().includes(lower)
    )
    set({ searchResults: results, searchQuery: q })
  },

  selectHashtag: (tag) => {
    if (!tag) {
      set({ selectedHashtag: null, hashtagPosts: [] })
      return
    }
    const posts = mockPosts.filter(p => p.hashtags.includes(tag.toLowerCase()))
    set({ selectedHashtag: tag, hashtagPosts: posts })
  },

  clearSearch: () => set({ searchQuery: '', searchResults: [], selectedHashtag: null, hashtagPosts: [] }),

  setSortMode: (mode) => set({ sortMode: mode }),

  getSortedTopics: () => {
    const { trendingTopics, sortMode } = get()
    return sortMode === 'hot'
      ? [...trendingTopics].sort((a, b) => b.growth - a.growth)
      : [...trendingTopics].sort((a, b) => b.postCount - a.postCount)
  },
}))
