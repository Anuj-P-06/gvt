/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        'ind-black': '#0A0A0A',
        'ind-orange': '#295e8e',
        'ind-orange-hover': '#1d4263',
        'off-white': '#F4F4F2',
        'charcoal-card': '#1A1A1A',
        'grey-light': '#888888',
        'grey-dark': '#555555',
        'border-dark': '#2A2A2A',
        'border-light': '#E5E5E3',
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
