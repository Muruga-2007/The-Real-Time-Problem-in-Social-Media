import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-accent text-text-inverse border-2 border-border-strong hover:bg-accent-hover shadow-sharp-sm hover:shadow-sharp-md active:shadow-none active:translate-x-[2px] active:translate-y-[2px]',
  secondary: 'bg-surface-primary text-text-primary border-2 border-border-strong hover:bg-surface-secondary shadow-sharp-sm hover:shadow-sharp-md active:shadow-none active:translate-x-[2px] active:translate-y-[2px]',
  ghost: 'bg-transparent text-text-secondary border-2 border-transparent hover:border-border-default hover:text-text-primary',
  danger: 'bg-surface-primary text-text-primary border-2 border-border-strong hover:bg-surface-secondary',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs font-mono tracking-wide',
  md: 'px-5 py-2.5 text-sm font-body font-medium',
  lg: 'px-8 py-4 text-base font-body font-medium',
}

export function Button({ children, variant = 'primary', size = 'md', className = '', disabled, loading, onClick, type = 'button', ...props }) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileTap={{ scale: 0.97 }}
      className={`
        inline-flex items-center justify-center gap-2 cursor-pointer
        transition-all duration-150 font-body
        disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : children}
    </motion.button>
  )
}
