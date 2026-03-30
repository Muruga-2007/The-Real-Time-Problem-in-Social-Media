import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useUIStore } from '../../store/uiStore.js'

function Toast({ toast }) {
  const dismissToast = useUIStore(s => s.dismissToast)

  useEffect(() => {
    const timer = setTimeout(() => dismissToast(toast.id), 3500)
    return () => clearTimeout(timer)
  }, [toast.id, dismissToast])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="
        flex items-center gap-3 px-4 py-3
        bg-accent text-text-inverse
        border-2 border-border-strong shadow-sharp-sm
        min-w-[240px] max-w-sm
      "
    >
      <span className="flex-1 text-sm font-body">{toast.message}</span>
      <button onClick={() => dismissToast(toast.id)} className="opacity-70 hover:opacity-100">
        <X size={14} />
      </button>
    </motion.div>
  )
}

export function ToastContainer() {
  const toasts = useUIStore(s => s.toasts)

  return (
    <div className="fixed bottom-24 lg:bottom-6 right-4 z-50 flex flex-col gap-2 items-end">
      <AnimatePresence>
        {toasts.map(toast => (
          <Toast key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  )
}
