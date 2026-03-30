export function Input({ label, error, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-mono tracking-widest uppercase text-text-muted">
          {label}
        </label>
      )}
      <input
        className={`
          w-full bg-surface-primary border-2 border-border-default
          px-4 py-3 text-sm font-body text-text-primary
          placeholder:text-text-muted
          focus:outline-none focus:border-border-strong
          transition-colors duration-150
          ${error ? 'border-border-strong' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <span className="text-xs font-mono text-text-secondary">{error}</span>
      )}
    </div>
  )
}

export function Textarea({ label, error, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-mono tracking-widest uppercase text-text-muted">
          {label}
        </label>
      )}
      <textarea
        className={`
          w-full bg-surface-primary border-2 border-border-default
          px-4 py-3 text-sm font-body text-text-primary
          placeholder:text-text-muted resize-none
          focus:outline-none focus:border-border-strong
          transition-colors duration-150
          ${error ? 'border-border-strong' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <span className="text-xs font-mono text-text-secondary">{error}</span>
      )}
    </div>
  )
}
