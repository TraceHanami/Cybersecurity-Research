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
          DEFAULT: '#0A0A0C',
          secondary: '#161B22',
          tertiary: '#161B22',
          elevated: '#161B22',
          surface: '#161B22',
          card: '#161B22',
          code: '#161B22',
        },
        accent: {
          green: '#00FF66',
          cyan: '#00E5FF',
        },
        border: {
          subtle: 'rgba(230, 237, 243, 0.08)',
          DEFAULT: 'rgba(230, 237, 243, 0.08)',
          accent: 'rgba(230, 237, 243, 0.08)',
        },
        text: {
          primary: '#E6EDF3',
          secondary: '#8B949E',
          muted: '#8B949E',
          faint: '#8B949E',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', 'monospace'],
        display: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        'tightest': '-0.035em',
        'wider-code': '0.04em',
      },
      fontSize: {
        body: ['17px', { lineHeight: '1.7' }],
      },
    },
  },
  plugins: [],
};
