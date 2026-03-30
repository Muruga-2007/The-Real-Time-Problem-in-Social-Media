import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Sidebar } from './Sidebar.jsx'
import { BottomNav } from './BottomNav.jsx'
import { TopBar } from './TopBar.jsx'
import { useTheme } from '../../hooks/useTheme.js'
import { ToastContainer } from './ToastContainer.jsx'

export function AppShell() {
  useTheme()
  const location = useLocation()

  return (
    <div className="min-h-screen bg-surface-primary flex">
      <Sidebar />

      <div className="flex-1 flex flex-col min-h-screen lg:max-w-2xl xl:max-w-3xl border-r-2 border-border-default">
        <TopBar />

        <main className="flex-1 pb-20 lg:pb-0">
          <AnimatePresence mode="wait">
            <Outlet key={location.pathname} />
          </AnimatePresence>
        </main>
      </div>

      {/* Right panel placeholder (desktop) */}
      <div className="hidden xl:block flex-1 px-8 py-6">
        <div className="sticky top-6">
          <p className="text-xs font-mono tracking-widest uppercase text-text-muted mb-4">Signal Index</p>
          <div className="space-y-3">
            {['#Algorithm','#RealTime','#Surveillance','#Signal','#Attention'].map(tag => (
              <div key={tag} className="flex items-center justify-between py-2 border-b border-border-subtle">
                <span className="text-sm font-mono text-text-secondary">{tag}</span>
                <span className="text-xs text-text-muted">TRENDING</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
      <ToastContainer />
    </div>
  )
}
