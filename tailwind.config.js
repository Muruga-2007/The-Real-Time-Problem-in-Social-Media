/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'surface-primary':   'var(--surface-primary)',
        'surface-secondary': 'var(--surface-secondary)',
        'surface-elevated':  'var(--surface-elevated)',
        'surface-overlay':   'var(--surface-overlay)',
        'text-primary':      'var(--text-primary)',
        'text-secondary':    'var(--text-secondary)',
        'text-muted':        'var(--text-muted)',
        'text-inverse':      'var(--text-inverse)',
        'border-default':    'var(--border-default)',
        'border-strong':     'var(--border-strong)',
        'border-subtle':     'var(--border-subtle)',
        'accent':            'var(--accent)',
        'accent-hover':      'var(--accent-hover)',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono:    ['"DM Mono"', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem,8vw,7rem)',   { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2rem,5vw,4rem)',    { lineHeight: '1.0',  letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.5rem,3vw,2.5rem)',{ lineHeight: '1.1'  }],
      },
      boxShadow: {
        'sharp-sm': '2px 2px 0px var(--border-strong)',
        'sharp-md': '4px 4px 0px var(--border-strong)',
        'sharp-lg': '8px 8px 0px var(--border-strong)',
      },
      keyframes: {
        'pulse-live': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.4', transform: 'scale(1.6)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'count-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'pulse-live': 'pulse-live 2s cubic-bezier(0.4,0,0.6,1) infinite',
        'slide-up':   'slide-up 0.3s ease-out',
        'count-in':   'count-in 0.4s ease-out',
      },
    },
  },
  plugins: [],
}
