import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Input } from '../ui/Input.jsx'
import { Button } from '../ui/Button.jsx'
import { useAuthStore } from '../../store/authStore.js'
import { validateSignupForm } from '../../utils/validators.js'

export function SignupForm() {
  const [fields, setFields] = useState({ displayName: '', username: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const { signup, isLoading, error, clearError } = useAuthStore()
  const navigate = useNavigate()

  function handleChange(e) {
    setFields(f => ({ ...f, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }))
    if (error) clearError()
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validateSignupForm(fields)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    const ok = signup(fields)
    if (ok) navigate('/', { replace: true })
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="space-y-4"
    >
      <div>
        <h2 className="font-display text-display-md font-bold text-text-primary">Create Account</h2>
        <p className="text-sm font-body text-text-muted mt-1">Join the signal.</p>
      </div>

      {error && (
        <div className="px-4 py-3 border-2 border-border-strong bg-surface-secondary">
          <p className="text-sm font-mono text-text-primary">{error}</p>
        </div>
      )}

      <Input
        label="Display Name"
        name="displayName"
        type="text"
        placeholder="The Observer"
        value={fields.displayName}
        onChange={handleChange}
        error={errors.displayName}
      />

      <Input
        label="Username"
        name="username"
        type="text"
        placeholder="the_observer"
        value={fields.username}
        onChange={handleChange}
        error={errors.username}
      />

      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="you@signal.io"
        value={fields.email}
        onChange={handleChange}
        error={errors.email}
      />

      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="6+ characters"
        value={fields.password}
        onChange={handleChange}
        error={errors.password}
      />

      <Button type="submit" size="lg" loading={isLoading} className="w-full">
        JOIN
      </Button>

      <p className="text-sm font-body text-text-muted text-center">
        Already in?{' '}
        <Link to="/login" className="text-text-primary underline underline-offset-2 hover:no-underline">
          Sign in
        </Link>
      </p>
    </motion.form>
  )
}
