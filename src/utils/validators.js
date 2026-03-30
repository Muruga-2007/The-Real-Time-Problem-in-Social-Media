export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validateUsername(username) {
  return /^[a-z0-9_]{3,20}$/.test(username)
}

export function validatePassword(password) {
  return password && password.length >= 6
}

export function validateLoginForm({ username, password }) {
  const errors = {}
  if (!username || username.trim().length < 1) errors.username = 'Username is required'
  if (!password || password.length < 1) errors.password = 'Password is required'
  return errors
}

export function validateSignupForm({ displayName, username, email, password }) {
  const errors = {}
  if (!displayName || displayName.trim().length < 2) errors.displayName = 'Display name must be at least 2 characters'
  if (!validateUsername(username)) errors.username = 'Username must be 3–20 lowercase letters, numbers, or underscores'
  if (!validateEmail(email)) errors.email = 'Enter a valid email address'
  if (!validatePassword(password)) errors.password = 'Password must be at least 6 characters'
  return errors
}
