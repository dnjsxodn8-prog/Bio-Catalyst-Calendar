/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Surfaces (CSS-var-backed so the light/dark toggle can swap them)
        bg: {
          DEFAULT: 'var(--bg)',
          2: 'var(--bg-2)',
          card: 'var(--panel)',
          card2: 'var(--panel-2)',
        },
        panel: {
          DEFAULT: 'var(--panel)',
          2: 'var(--panel-2)',
          3: 'var(--panel-3)',
        },
        line: {
          DEFAULT: 'var(--line)',
          2: 'var(--line-2)',
        },
        border: {
          DEFAULT: 'var(--line)',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          2: 'var(--ink-2)',
          3: 'var(--ink-3)',
          4: 'var(--ink-4)',
        },
        fg: {
          DEFAULT: 'var(--ink)',
          muted: 'var(--ink-2)',
          dim: 'var(--ink-3)',
        },
        // Accents stay as concrete hex — same in both themes.
        acc: {
          DEFAULT: '#6EE7B7',
          2: '#34D399',
        },
        accent: {
          green: '#6EE7B7',
          blue: '#60A5FA',
          violet: '#C084FC',
          red: '#F87171',
          amber: '#FBBF24',
          orange: '#FB923C',
        },
        pdufa: '#FBBF24',
        readout: '#C084FC',
        conf: '#60A5FA',
        regulatory: '#F472B6',
        danger: '#F87171',
        positive: '#34D399',
        core: '#6EE7B7',
        watch: '#FBBF24',
        spec: '#F472B6',
      },
      fontFamily: {
        sans: [
          'Inter',
          'Pretendard Variable',
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          '"Apple SD Gothic Neo"',
          '"Noto Sans KR"',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '10px',
        lg: '14px',
        xl: '20px',
      },
      boxShadow: {
        panel: '0 1px 0 rgba(255,255,255,0.04) inset, 0 0 0 1px #1F2531',
        'panel-2':
          '0 1px 0 rgba(255,255,255,0.05) inset, 0 0 0 1px #1F2531, 0 12px 30px -12px rgba(0,0,0,0.6)',
        'glow-acc':
          '0 0 0 1px rgba(110,231,183,0.18), 0 0 24px -6px rgba(110,231,183,0.35)',
      },
      backgroundImage: {
        'panel-grad': 'linear-gradient(180deg, #11141B 0%, #0C0E13 100%)',
        'btn-primary': 'linear-gradient(180deg, #6EE7B7 0%, #34D399 100%)',
      },
      keyframes: {
        blip: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(248,113,113,0.30)' },
          '50%': { boxShadow: '0 0 0 4px rgba(248,113,113,0)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'none' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
      },
      animation: {
        blip: 'blip 2.4s ease-in-out infinite',
        'fade-up': 'fade-up 0.4s ease both',
        pulse: 'pulse 1.6s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};
