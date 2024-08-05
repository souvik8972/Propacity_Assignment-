/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "inFile":"#4F46E5"
      },
      fontFamily:{
        'bebas':['Bebas Neue', 'cursive'],
        'marcellus':['Marcellus', 'serif'],
        'rubik':['Rubik', 'sans-serif']
      }
    },
  },
  plugins: [],
}