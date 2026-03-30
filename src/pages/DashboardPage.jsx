import { PageTransition } from '../components/layout/PageTransition.jsx'
import { StatCard } from '../components/analytics/StatCard.jsx'
import { EngagementChart } from '../components/analytics/EngagementChart.jsx'
import { TrendingTopicsChart } from '../components/analytics/TrendingTopicsChart.jsx'
import { ActivityHeatmap } from '../components/analytics/ActivityHeatmap.jsx'
import { useAnalyticsStore } from '../store/analyticsStore.js'

export function DashboardPage() {
  const statCards = useAnalyticsStore(s => s.statCards)

  return (
    <PageTransition>
      <div className="px-5 py-4 border-b-2 border-border-default sticky top-0 z-10 bg-surface-primary">
        <h1 className="font-display text-display-md font-bold text-text-primary">Dashboard</h1>
      </div>

      <div className="p-5 space-y-5">
        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard label="Total Posts"      value={statCards.totalPosts}     index={0} />
          <StatCard label="Total Likes"      value={statCards.totalLikes}     index={1} />
          <StatCard label="Total Reach"      value={statCards.totalReach}     index={2} />
          <StatCard label="Follower Growth"  value={statCards.followerGrowth} index={3} />
        </div>

        {/* Engagement chart */}
        <EngagementChart />

        {/* Trending topics chart */}
        <TrendingTopicsChart />

        {/* Activity heatmap */}
        <ActivityHeatmap />
      </div>
    </PageTransition>
  )
}
