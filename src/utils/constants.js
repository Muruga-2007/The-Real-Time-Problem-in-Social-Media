export const APP_NAME = 'SIGNAL'
export const APP_TAGLINE = 'THE SIGNAL / THE NOISE'
export const APP_DESCRIPTION = 'Documenting the real-time problem in social media.'

export const ROUTES = {
  HOME: '/',
  EXPLORE: '/explore',
  DASHBOARD: '/dashboard',
  PROFILE: (username) => `/profile/${username}`,
  LOGIN: '/login',
  SIGNUP: '/signup',
}

export const FEED_INTERVAL_MIN = 8000
export const FEED_INTERVAL_MAX = 14000

export const DATE_RANGES = ['7d', '30d', '90d']

export const NAV_ITEMS = [
  { label: 'Feed',      icon: 'Home',        path: '/' },
  { label: 'Explore',   icon: 'Compass',     path: '/explore' },
  { label: 'Dashboard', icon: 'BarChart2',   path: '/dashboard' },
]
