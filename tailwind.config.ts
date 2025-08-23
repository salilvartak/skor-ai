/** @type {import('tailwindcss').Config} */
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8',
        secondary: '#FBBF24',
        accent: '#EE5946',
        back: '#6E4A2A',
        card: '#353535',
      },
      fontFamily: {
        chakra: ['"Chakra Petch"', ...fontFamily.sans],
      },
      animation: {
        'slide-in': 'slideIn 0.7s ease-in-out forwards',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      perspective: {
        '1000': '1000px',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
