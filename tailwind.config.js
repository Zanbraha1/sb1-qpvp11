/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f3f8',
          100: '#d9e1ed',
          200: '#b3c3db',
          300: '#8da5c9',
          400: '#6687b7',
          500: '#4069a5',
          600: '#334f84', // Primary brand color
          700: '#263b63',
          800: '#1a2742',
          900: '#0d1321',
        },
      },
    },
  },
  plugins: [],
};