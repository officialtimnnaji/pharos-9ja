/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        pharosGold: '#FFD700',
        pharosGreen: '#00B894',
        pharosBlue: '#0984e3',
        pharosPurple: '#6c5ce7'
      },
      backgroundImage: {
        'pharos-gradient': 'linear-gradient(90deg, #00B894 0%, #6c5ce7 50%, #FFD700 100%)'
      },
      boxShadow: {
        'card': '0 10px 20px rgba(0,0,0,0.1)',
        'card-hover': '0 15px 30px rgba(0,0,0,0.2)'
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem'
      }
    },
  },
  plugins: [],
}
