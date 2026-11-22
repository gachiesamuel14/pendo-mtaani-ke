/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kenyan: {
          green: '#006600',
          red: '#BB0000',
          black: '#000000',
          gold: '#FFD700',
        },
        primary: '#E11D48',
        secondary: '#0EA5E9',
      }
    },
  },
  plugins: [],
}
