/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0a0e1a',
          card: '#131a2e',
          card2: '#1a2238',
        },
        border: {
          DEFAULT: '#2a3450',
        },
        fg: {
          DEFAULT: '#e5e7eb',
          muted: '#9ca3af',
          dim: '#6b7280',
        },
        accent: {
          green: '#34d399',
          violet: '#a78bfa',
          red: '#f87171',
          orange: '#fb923c',
          amber: '#fbbf24',
          blue: '#60a5fa',
        },
      },
      fontFamily: {
        sans: [
          'Pretendard Variable',
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'Roboto',
          '"Helvetica Neue"',
          '"Segoe UI"',
          '"Apple SD Gothic Neo"',
          '"Noto Sans KR"',
          'sans-serif',
        ],
        mono: ['ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #34d399 0%, #60a5fa 100%)',
      },
    },
  },
  plugins: [],
};
