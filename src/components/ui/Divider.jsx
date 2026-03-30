export function Divider({ label, className = '' }) {
  if (label) {
    return (
      <div className={`flex items-center gap-4 my-4 ${className}`}>
        <div className="flex-1 h-px bg-border-default" />
        <span className="text-xs font-mono tracking-widest uppercase text-text-muted">{label}</span>
        <div className="flex-1 h-px bg-border-default" />
      </div>
    )
  }
  return <div className={`h-px w-full bg-border-default ${className}`} />
}
