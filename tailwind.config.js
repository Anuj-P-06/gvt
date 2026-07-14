/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        'ind-black': '#1a3a5c',
        'ind-orange': '#f47920',
        'ind-orange-hover': '#d4661a',
        'off-white': '#F4F6F9',
        'charcoal-card': '#162f4a',
        'grey-light': '#8899aa',
        'grey-dark': '#445566',
        'border-dark': '#2a4a6a',
        'border-light': '#D8E4EE',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      keyframes: {
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: { 'spin-slow': 'spin-slow 20s linear infinite' },
    },
  },
  plugins: [],
}
