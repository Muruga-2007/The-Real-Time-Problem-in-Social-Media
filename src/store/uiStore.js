import { create } from 'zustand'

function getInitialTheme() {
  try {
    const stored = localStorage.getItem('signal_theme')
    if (stored) return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  } catch {
    return 'dark'
  }
}

let toastId = 0

export const useUIStore = create((set) => ({
  theme: getInitialTheme(),
  sidebarOpen: true,
  toasts: [],

  toggleTheme: () => set((s) => {
    const next = s.theme === 'dark' ? 'light' : 'dark'
    try { localStorage.setItem('signal_theme', next) } catch { /* */ }
    return { theme: next }
  }),

  setTheme: (theme) => set(() => {
    try { localStorage.setItem('signal_theme', theme) } catch { /* */ }
    return { theme }
  }),

  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

  pushToast: (message, type = 'info') => set((s) => ({
    toasts: [...s.toasts, { id: ++toastId, message, type }]
  })),

  dismissToast: (id) => set((s) => ({
    toasts: s.toasts.filter(t => t.id !== id)
  })),
}))
