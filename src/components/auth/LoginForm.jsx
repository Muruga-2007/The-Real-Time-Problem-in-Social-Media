import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Input } from '../ui/Input.jsx'
import { Button } from '../ui/Button.jsx'
import { useAuthStore } from '../../store/authStore.js'
import { validateLoginForm } from '../../utils/validators.js'

export function LoginForm() {
  const [fields, setFields] = useState({ username: '', password: '' })
  const [errors, setErrors] = useState({})
  const { login, isLoading, error, clearError } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  function handleChange(e) {
    setFields(f => ({ ...f, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }))
    if (error) clearError()
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validateLoginForm(fields)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    const ok = login(fields.username, fields.password)
    if (ok) navigate(from, { replace: true })
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="space-y-5"
    >
      <div>
        <h2 className="font-display text-display-md font-bold text-text-primary">Sign In</h2>
        <p className="text-sm font-body text-text-muted mt-1">Access the signal.</p>
      </div>

      {error && (
        <div className="px-4 py-3 border-2 border-border-strong bg-surface-secondary">
          <p className="text-sm font-mono text-text-primary">{error}</p>
        </div>
      )}

      <Input
        label="Username"
        name="username"
        type="text"
        autoComplete="username"
        placeholder="editorial_void"
        value={fields.username}
        onChange={handleChange}
        error={errors.username}
      />

      <Input
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        value={fields.password}
        onChange={handleChange}
        error={errors.password}
      />

      <Button type="submit" size="lg" loading={isLoading} className="w-full">
        ENTER
      </Button>

      <p className="text-sm font-body text-text-muted text-center">
        No account?{' '}
        <Link to="/signup" className="text-text-primary underline underline-offset-2 hover:no-underline">
          Create one
        </Link>
      </p>

      <div className="pt-2 border-t border-border-subtle">
        <p className="text-xs font-mono text-text-muted">Demo: editorial_void / signal123</p>
      </div>
    </motion.form>
  )
}
