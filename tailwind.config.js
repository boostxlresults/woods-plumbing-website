/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      colors: {
        navy: {
          50: '#e8eef5',
          100: '#c5d4e6',
          200: '#9eb7d5',
          300: '#7799c4',
          400: '#5a82b7',
          500: '#3d6baa',
          600: '#2f5a99',
          700: '#123b76',
          800: '#0e2d5a',
          900: '#0a1f3e',
          950: '#051426',
        },
        red: {
          50: '#fef2f5',
          100: '#fde3e9',
          200: '#fac7d4',
          300: '#f69bb3',
          400: '#f16f92',
          500: '#e84371',
          600: '#c10e42',
          700: '#9d0b35',
          800: '#790829',
          900: '#55061d',
          950: '#310311',
        },
        copper: {
          50: '#fef2f5',
          100: '#fde3e9',
          200: '#fac7d4',
          300: '#f69bb3',
          400: '#f16f92',
          500: '#e84371',
          600: '#c10e42',
          700: '#9d0b35',
          800: '#790829',
          900: '#55061d',
          950: '#310311',
        },
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 25px -5px rgba(0, 0, 0, 0.04)',
        'large': '0 20px 50px -12px rgba(0, 0, 0, 0.15)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
