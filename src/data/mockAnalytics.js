// Generate 90 days of time-series data
function generateEngagementData() {
  const data = []
  const base = new Date('2025-12-31')
  for (let i = 89; i >= 0; i--) {
    const date = new Date(base)
    date.setDate(base.getDate() - i)
    const dayOfWeek = date.getDay()
    const weekendFactor = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.6 : 1
    const trendFactor = 1 + (89 - i) * 0.008
    const noise = () => 0.85 + Math.random() * 0.3

    data.push({
      date: date.toISOString().split('T')[0],
      likes: Math.floor(800 * weekendFactor * trendFactor * noise()),
      comments: Math.floor(220 * weekendFactor * trendFactor * noise()),
      reposts: Math.floor(140 * weekendFactor * trendFactor * noise()),
      reach: Math.floor(12000 * weekendFactor * trendFactor * noise()),
    })
  }
  return data
}

// Generate 365 days of activity grid data
function generateActivityGrid() {
  const data = []
  const base = new Date('2025-01-01')
  for (let i = 0; i < 365; i++) {
    const date = new Date(base)
    date.setDate(base.getDate() + i)
    const count = Math.random() < 0.2 ? 0 : Math.floor(Math.random() * 8)
    data.push({
      date: date.toISOString().split('T')[0],
      count,
      intensity: count === 0 ? 0 : Math.min(1, count / 7),
    })
  }
  return data
}

export const engagementData = generateEngagementData()

export const activityGrid = generateActivityGrid()

export const trendingTopics = [
  { tag: 'algorithm',    displayTag: '#Algorithm',    category: 'Technology', postCount: 48200, growth: 28, rank: 1 },
  { tag: 'realtime',     displayTag: '#RealTime',     category: 'Technology', postCount: 35100, growth: 22, rank: 2 },
  { tag: 'surveillance', displayTag: '#Surveillance', category: 'Society',    postCount: 29800, growth: 19, rank: 3 },
  { tag: 'signal',       displayTag: '#Signal',       category: 'Technology', postCount: 24600, growth: 15, rank: 4 },
  { tag: 'attention',    displayTag: '#Attention',    category: 'Psychology', postCount: 21400, growth: 31, rank: 5 },
  { tag: 'loop',         displayTag: '#Loop',         category: 'Technology', postCount: 18900, growth: 12, rank: 6 },
  { tag: 'burnout',      displayTag: '#Burnout',      category: 'Health',     postCount: 17200, growth: 24, rank: 7 },
  { tag: 'noise',        displayTag: '#Noise',        category: 'Society',    postCount: 15600, growth: 9,  rank: 8 },
  { tag: 'viral',        displayTag: '#Viral',        category: 'Media',      postCount: 14100, growth: 7,  rank: 9 },
  { tag: 'platform',     displayTag: '#Platform',     category: 'Technology', postCount: 12800, growth: 14, rank: 10 },
]

export const statCards = {
  totalPosts: 8912,
  totalLikes: 284000,
  totalReach: 1240000,
  followerGrowth: '+12.4%',
}
