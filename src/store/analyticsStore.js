import { create } from 'zustand'
import { engagementData, activityGrid, trendingTopics, statCards } from '../data/mockAnalytics.js'

export const useAnalyticsStore = create((set, get) => ({
  engagementData,
  activityGrid,
  trendingTopics,
  statCards,
  dateRange: '30d',

  setDateRange: (range) => set({ dateRange: range }),

  getFilteredData: () => {
    const { engagementData, dateRange } = get()
    const days = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90
    return engagementData.slice(-days)
  },
}))
