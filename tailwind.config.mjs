/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      transitionProperty: {
        'transform': 'transform',
      },
      animation: {
        'spin-horizontal': 'spin-horizontal 8s linear infinite', // Horizontal spinning effect
        rotate: 'rotate 20s linear infinite',
      },
      keyframes: {
        'spin-horizontal': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        rotate: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      borderWidth: {
        '3': '3px', // Adds border-3 utility
      },
      fontFamily: {
        sans: ['"SF Pro Display"', 'system-ui', 'sans-serif'],
      },
      colors: {
        gold: "#ffe8ae"
      }
    },
  },
  plugins: [],
}
