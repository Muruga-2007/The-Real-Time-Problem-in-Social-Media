import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle.jsx'
import { APP_NAME } from '../../utils/constants.js'

const pageTitles = {
  '/':         'Feed',
  '/explore':  'Explore',
  '/dashboard':'Dashboard',
}

export function TopBar() {
  const location = useNavigate()
  const { pathname } = useLocation()

  const title = pageTitles[pathname] || (pathname.startsWith('/profile') ? 'Profile' : APP_NAME)
  const canGoBack = !pageTitles[pathname]

  return (
    <header className="
      lg:hidden sticky top-0 z-30
      flex items-center justify-between
      px-4 py-3
      bg-surface-primary border-b-2 border-border-default
    ">
      <div className="flex items-center gap-3">
        {canGoBack && (
          <button
            onClick={() => location(-1)}
            className="p-1 text-text-muted hover:text-text-primary transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={18} />
          </button>
        )}
        <span className="font-display font-bold text-lg text-text-primary">{title}</span>
      </div>
      <ThemeToggle />
    </header>
  )
}
