import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0a',
        cream: '#fafaf7',
        cream2: '#f1f0ea',
        muted: '#71717a',
        line: '#d4d4d8',
        amber: '#f59e0b',
        blue: '#3b82f6',
        violet: '#8b5cf6',
        emerald: '#10b981',
        rose: '#f43f5e',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-instrument)', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'mono-eyebrow': ['11px', { lineHeight: '1.4', letterSpacing: '0.15em' }],
        'fluid-display': ['clamp(4rem, 12vw, 11.25rem)', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
        'fluid-h1': ['clamp(2.5rem, 6vw, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'fluid-h2': ['clamp(2rem, 4vw, 4rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'fluid-h3': ['clamp(1.5rem, 2.5vw, 2.25rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'tighter': '-0.03em',
        'tightish': '-0.02em',
        'widest-mono': '0.15em',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'in-out-expo': 'cubic-bezier(0.83, 0, 0.17, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'topo-morph': 'topoMorph 25s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        topoMorph: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(2%, -1%) scale(1.02)' },
          '66%': { transform: 'translate(-1%, 2%) scale(0.99)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
