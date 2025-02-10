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
      screens: {
        phone: { max: '640px' }, // Define a custom max breakpoint for phones
      },
      transitionProperty: {
        'transform': 'transform',
      },
      animation: {
        'spin-horizontal': 'spin-horizontal 8s linear infinite', // Horizontal spinning effect
        rotate: 'rotate 20s linear infinite',
        fadeInUp: 'fadeInUp 1s ease-out forwards',
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
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
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
        // sans: ['Inter', 'sans-serif'],
        // inter: ['Inter', 'sans-serif'],
      },
      colors: {
        gold: "#ffe8ae",
        darkGold: "#b5a36a"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    // ...
  ],
}
