const sizes = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-20 h-20 text-2xl',
  '2xl': 'w-28 h-28 text-3xl',
}

export function Avatar({ src, alt, size = 'md', className = '' }) {
  return (
    <div className={`
      ${sizes[size]} rounded-none border-2 border-border-default
      overflow-hidden flex-shrink-0 bg-surface-secondary
      ${className}
    `}>
      {src ? (
        <img
          src={src}
          alt={alt || ''}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none' }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-surface-secondary text-text-muted font-display font-bold">
          {alt ? alt[0].toUpperCase() : '?'}
        </div>
      )}
    </div>
  )
}
