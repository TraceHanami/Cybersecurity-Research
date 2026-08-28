/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#090d16',
          secondary: '#0e1424',
          tertiary: '#141c30',
          elevated: '#1a243d',
          surface: '#111827',
          card: '#0f172a',
        },
        accent: {
          blue: {
            DEFAULT: '#38bdf8',
            light: '#7dd3fc',
            dark: '#0284c7',
            glow: 'rgba(56, 189, 248, 0.15)',
          },
          purple: {
            DEFAULT: '#a855f7',
            light: '#c084fc',
            dark: '#7e22ce',
            glow: 'rgba(168, 85, 247, 0.15)',
          },
          red: {
            DEFAULT: '#f43f5e',
            light: '#fb7185',
            dark: '#be123c',
            glow: 'rgba(244, 63, 94, 0.15)',
          },
          cyan: {
            DEFAULT: '#06b6d4',
            light: '#22d3ee',
            dark: '#0e7490',
            glow: 'rgba(6, 182, 212, 0.15)',
          },
          emerald: {
            DEFAULT: '#10b981',
            light: '#34d399',
            dark: '#047857',
            glow: 'rgba(16, 185, 129, 0.15)',
          },
          amber: {
            DEFAULT: '#f59e0b',
            light: '#fbbf24',
            dark: '#b45309',
            glow: 'rgba(245, 158, 11, 0.15)',
          }
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.07)',
          DEFAULT: 'rgba(255, 255, 255, 0.12)',
          accent: 'rgba(56, 189, 248, 0.3)',
        },
        text: {
          primary: '#f8fafc',
          secondary: '#94a3b8',
          muted: '#64748b',
          faint: '#475569',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', 'monospace'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 25px -5px rgba(56, 189, 248, 0.25)',
        'glow-purple': '0 0 25px -5px rgba(168, 85, 247, 0.25)',
        'glow-red': '0 0 25px -5px rgba(244, 63, 94, 0.25)',
        'card-subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.4)',
        'card-elevated': '0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(255, 255, 255, 0.05)',
      },
      letterSpacing: {
        'tightest': '-0.035em',
        'wider-code': '0.04em',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
};
