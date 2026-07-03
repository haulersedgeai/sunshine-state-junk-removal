import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,js,jsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette
        sun: {
          50: '#FFF8EB',
          100: '#FFEDC7',
          200: '#FFDA8A',
          300: '#FFC24D',
          400: '#FFAB1F',
          500: '#F58A0A', // primary sunshine orange
          600: '#DB6E05',
          700: '#B4530A',
          800: '#8E410F',
          900: '#75360F',
        },
        navy: {
          50: '#F1F5FB',
          100: '#DDE7F3',
          200: '#BACEE8',
          300: '#8DAED6',
          400: '#5D89C0',
          500: '#3D6BA8',
          600: '#2E548A',
          700: '#284470',
          800: '#243A5D',
          900: '#0F1F3A', // deep navy
        },
        sky: {
          soft: '#F3F7FC',
        },
        ink: {
          DEFAULT: '#141C2A',
          soft: '#3B4658',
          muted: '#6B7688',
        },
        cream: '#FFFBF3',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px -2px rgba(20, 28, 42, 0.08), 0 8px 24px -8px rgba(20, 28, 42, 0.12)',
        cta: '0 10px 30px -10px rgba(245, 138, 10, 0.55)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(1200px 500px at 15% 10%, rgba(255,171,31,0.18) 0%, transparent 60%), radial-gradient(900px 500px at 90% 20%, rgba(61,107,168,0.18) 0%, transparent 55%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
