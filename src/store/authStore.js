import { create } from 'zustand'
import { findUser, mockUsers } from '../data/mockUsers.js'

function loadPersistedUser() {
  try {
    const data = localStorage.getItem('signal_user')
    return data ? JSON.parse(data) : null
  } catch { return null }
}

const persistedUser = loadPersistedUser()

let localUsers = [...mockUsers]

export const useAuthStore = create((set, get) => ({
  user: persistedUser,
  isAuthenticated: !!persistedUser,
  isLoading: false,
  error: null,
  followedUsers: new Set(),

  login: (username, password) => {
    set({ isLoading: true, error: null })
    const found = localUsers.find(u => u.username === username && u.password === password)
    if (found) {
      const user = { ...found }
      try { localStorage.setItem('signal_user', JSON.stringify(user)) } catch { /* */ }
      set({ user, isAuthenticated: true, isLoading: false, error: null })
      return true
    } else {
      set({ isLoading: false, error: 'Invalid username or password' })
      return false
    }
  },

  signup: (userData) => {
    set({ isLoading: true, error: null })
    const exists = localUsers.some(u => u.username === userData.username || u.email === userData.email)
    if (exists) {
      set({ isLoading: false, error: 'Username or email already taken' })
      return false
    }
    const newUser = {
      id: `u_${Date.now()}`,
      username: userData.username,
      displayName: userData.displayName,
      avatar: `https://api.dicebear.com/9.x/shapes/svg?seed=${userData.username}&backgroundColor=09090b`,
      bio: '',
      followers: 0,
      following: 0,
      postsCount: 0,
      verified: false,
      joinedAt: new Date().toISOString(),
      password: userData.password,
      email: userData.email,
    }
    localUsers = [...localUsers, newUser]
    try { localStorage.setItem('signal_user', JSON.stringify(newUser)) } catch { /* */ }
    set({ user: newUser, isAuthenticated: true, isLoading: false, error: null })
    return true
  },

  logout: () => {
    try { localStorage.removeItem('signal_user') } catch { /* */ }
    set({ user: null, isAuthenticated: false, error: null })
  },

  updateProfile: (patch) => set((s) => {
    const updated = { ...s.user, ...patch }
    try { localStorage.setItem('signal_user', JSON.stringify(updated)) } catch { /* */ }
    localUsers = localUsers.map(u => u.id === updated.id ? updated : u)
    return { user: updated }
  }),

  toggleFollow: (userId) => set((s) => {
    const next = new Set(s.followedUsers)
    if (next.has(userId)) next.delete(userId)
    else next.add(userId)
    return { followedUsers: next }
  }),

  clearError: () => set({ error: null }),

  getLocalUsers: () => localUsers,
}))
