export function Badge({ children, variant = 'default', className = '' }) {
  const styles = {
    default: 'bg-surface-secondary text-text-secondary border border-border-default',
    strong:  'bg-accent text-text-inverse border border-border-strong',
    outline: 'bg-transparent text-text-primary border border-border-strong',
    live:    'bg-accent text-text-inverse border border-border-strong animate-pulse',
    muted:   'bg-surface-secondary text-text-muted border border-border-subtle',
  }
  return (
    <span className={`
      inline-flex items-center px-2 py-0.5
      text-xs font-mono tracking-wider uppercase
      ${styles[variant]} ${className}
    `}>
      {children}
    </span>
  )
}
