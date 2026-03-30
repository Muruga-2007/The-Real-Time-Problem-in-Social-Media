import { Navigate } from 'react-router-dom'
import { SignupForm } from '../components/auth/SignupForm.jsx'
import { ThemeToggle } from '../components/layout/ThemeToggle.jsx'
import { useAuthStore } from '../store/authStore.js'
import { useTheme } from '../hooks/useTheme.js'
import { APP_NAME } from '../utils/constants.js'

export function SignupPage() {
  useTheme()
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)
  if (isAuthenticated) return <Navigate to="/" replace />

  return (
    <div className="min-h-screen bg-surface-primary flex">
      {/* Left — editorial panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-accent p-12">
        <div>
          <span className="font-mono text-xs tracking-widest text-text-inverse opacity-60">{APP_NAME}</span>
        </div>
        <div>
          <h1 className="font-display text-display-xl font-bold text-text-inverse leading-[0.9] text-balance">
            JOIN<br />THE<br /><span className="italic opacity-60">SIGNAL</span>
          </h1>
        </div>
        <div>
          <p className="font-body text-sm text-text-inverse opacity-70 max-w-xs">
            Add your voice to the feed. Document the collapse. Signal over noise.
          </p>
        </div>
      </div>

      {/* Right — form panel */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center p-6">
          <span className="lg:hidden font-display font-bold text-xl text-text-primary">{APP_NAME}</span>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-sm">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  )
}
