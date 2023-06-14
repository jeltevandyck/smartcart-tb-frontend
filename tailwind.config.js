/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    colors: {
      'fes-blue': '#010d6b',
      'black': colors.black,
      'white': colors.white,
      'gray': colors.gray,
      'emerald': colors.emerald,
      'indigo': colors.indigo,
      'yellow': colors.yellow,
      'blue': colors.blue,
      'green': colors.green,
      'red': colors.red,
      'orange': colors.orange,
      'gold': colors.gold,
    }
  },
  plugins: [],
}

