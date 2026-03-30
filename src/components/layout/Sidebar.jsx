import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Compass, BarChart2, User, LogOut, Radio } from 'lucide-react'
import { useAuthStore } from '../../store/authStore.js'
import { useUIStore } from '../../store/uiStore.js'
import { ThemeToggle } from './ThemeToggle.jsx'
import { Avatar } from '../ui/Avatar.jsx'
import { APP_NAME } from '../../utils/constants.js'

const navItems = [
  { path: '/',           label: 'Feed',      Icon: Home },
  { path: '/explore',    label: 'Explore',   Icon: Compass },
  { path: '/dashboard',  label: 'Dashboard', Icon: BarChart2 },
]

export function Sidebar() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <aside className="
      hidden lg:flex flex-col
      w-64 h-screen sticky top-0
      bg-surface-primary border-r-2 border-border-default
      overflow-y-auto
    ">
      {/* Logo */}
      <div className="px-6 py-6 border-b-2 border-border-default">
        <span className="font-display text-display-md font-bold text-text-primary tracking-tight">
          {APP_NAME}
        </span>
        <p className="text-xs font-mono text-text-muted mt-0.5 tracking-widest">THE SIGNAL / THE NOISE</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map(({ path, label, Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) => `
              group flex items-center gap-3 px-3 py-3
              border-2 transition-all duration-150
              font-body font-medium text-sm
              ${isActive
                ? 'bg-accent text-text-inverse border-border-strong shadow-sharp-sm'
                : 'bg-transparent text-text-secondary border-transparent hover:border-border-default hover:text-text-primary'
              }
            `}
          >
            {({ isActive }) => (
              <motion.div
                className="flex items-center gap-3 w-full"
                whileHover={!isActive ? { x: 3 } : {}}
              >
                <Icon size={18} />
                <span>{label}</span>
              </motion.div>
            )}
          </NavLink>
        ))}

        {user && (
          <NavLink
            to={`/profile/${user.username}`}
            className={({ isActive }) => `
              group flex items-center gap-3 px-3 py-3
              border-2 transition-all duration-150
              font-body font-medium text-sm
              ${isActive
                ? 'bg-accent text-text-inverse border-border-strong shadow-sharp-sm'
                : 'bg-transparent text-text-secondary border-transparent hover:border-border-default hover:text-text-primary'
              }
            `}
          >
            {({ isActive }) => (
              <motion.div
                className="flex items-center gap-3 w-full"
                whileHover={!isActive ? { x: 3 } : {}}
              >
                <User size={18} />
                <span>Profile</span>
              </motion.div>
            )}
          </NavLink>
        )}
      </nav>

      {/* Bottom — user + controls */}
      <div className="px-4 py-4 border-t-2 border-border-default space-y-3">
        {user && (
          <div className="flex items-center gap-3 px-2 py-2">
            <Avatar src={user.avatar} alt={user.displayName} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-body font-medium text-text-primary truncate">{user.displayName}</p>
              <p className="text-xs font-mono text-text-muted truncate">@{user.username}</p>
            </div>
          </div>
        )}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={handleLogout}
            className="
              flex-1 flex items-center gap-2 px-3 py-2
              text-xs font-mono tracking-wider text-text-muted
              border-2 border-transparent hover:border-border-default hover:text-text-primary
              transition-colors duration-150
            "
          >
            <LogOut size={14} />
            LOGOUT
          </button>
        </div>
      </div>
    </aside>
  )
}
