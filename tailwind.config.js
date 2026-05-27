/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          base: '#09090B',
          surface: '#141416',
          elevated: '#1C1C1F',
          subtle: '#27272A',
          border: '#27272A',
          'border-strong': '#3F3F46',
          'border-subtle': '#1E1E20',
          text: '#FAFAFA',
          'text-secondary': '#A1A1AA',
          'text-tertiary': '#71717A',
        },
        light: {
          base: '#FAFAFA',
          surface: '#FFFFFF',
          elevated: '#F4F4F5',
          subtle: '#E4E4E7',
          border: '#E4E4E7',
          'border-strong': '#D4D4D8',
          'border-subtle': '#F4F4F5',
          text: '#09090B',
          'text-secondary': '#52525B',
          'text-tertiary': '#A1A1AA',
        },
        accent: {
          DEFAULT: '#818CF8',
          hover: '#6366F1',
          muted: 'rgba(129, 140, 248, 0.1)',
          ring: 'rgba(129, 140, 248, 0.3)',
        },
        success: {
          DEFAULT: '#34D399',
          muted: 'rgba(52, 211, 153, 0.1)',
        },
        warning: {
          DEFAULT: '#FBBF24',
          muted: 'rgba(251, 191, 36, 0.1)',
        },
        danger: {
          DEFAULT: '#F87171',
          muted: 'rgba(248, 113, 113, 0.1)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'monospace'],
      },
      fontSize: {
        'timer': ['56px', { lineHeight: '1', letterSpacing: '-0.04em', fontWeight: '600' }],
      },
      borderRadius: {
        'component': '10px',
        'card': '14px',
        'container': '12px',
      },
      transitionDuration: {
        '150': '150ms',
      },
      transitionTimingFunction: {
        'default': 'ease',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 200ms ease-out forwards',
        'scale-in': 'scale-in 150ms ease-out forwards',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
