/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E44E51',
          50: '#FCE9E9',
          100: '#F9D4D5',
          200: '#F2AAAC',
          300: '#EC8083',
          400: '#E5575A',
          500: '#E44E51',
          600: '#D62C2F',
          700: '#AC2326',
          800: '#821A1C',
          900: '#571112'
        }
      }
    },
  },
  plugins: [],
};