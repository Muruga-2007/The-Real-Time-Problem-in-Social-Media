import { Radio } from 'lucide-react'

export function LiveIndicator() {
  return (
    <div className="flex items-center gap-2 px-5 py-3 border-b-2 border-border-default">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full bg-text-primary opacity-50 rounded-full" />
        <span className="relative inline-flex h-2 w-2 bg-text-primary rounded-full" />
      </span>
      <span className="text-xs font-mono tracking-widest uppercase text-text-muted">Live feed</span>
    </div>
  )
}
