import { NavLink } from 'react-router-dom'
import { Home, Compass, BarChart2, User } from 'lucide-react'
import { useAuthStore } from '../../store/authStore.js'

const navItems = [
  { path: '/',          label: 'Feed',    Icon: Home },
  { path: '/explore',   label: 'Explore', Icon: Compass },
  { path: '/dashboard', label: 'Stats',   Icon: BarChart2 },
]

export function BottomNav() {
  const user = useAuthStore(s => s.user)

  const allItems = [
    ...navItems,
    ...(user ? [{ path: `/profile/${user.username}`, label: 'Profile', Icon: User }] : []),
  ]

  return (
    <nav className="
      lg:hidden fixed bottom-0 left-0 right-0 z-40
      bg-surface-primary border-t-2 border-border-default
      flex items-stretch
    ">
      {allItems.map(({ path, label, Icon }) => (
        <NavLink
          key={path}
          to={path}
          end={path === '/'}
          className={({ isActive }) => `
            flex-1 flex flex-col items-center justify-center gap-1
            py-3 text-xs font-mono tracking-wider
            transition-colors duration-150
            ${isActive
              ? 'text-text-primary border-t-2 border-border-strong -mt-[2px]'
              : 'text-text-muted hover:text-text-secondary'
            }
          `}
        >
          <Icon size={18} />
          <span className="text-[10px] uppercase tracking-widest">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
