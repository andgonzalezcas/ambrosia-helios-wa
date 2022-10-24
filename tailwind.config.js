const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-background': "url('/images/bogota3.jpg')"
      },
      colors: {
        'white-sesqui': '#F7EED3',
        'red-sesqui': '#E6313F',
        'yellow-sesqui': '#F8B72E',
        'orange-sesqui': '#E85437',
        'cyan-sesqui': '#009A85',
        'purple-sesqui': '#511747',
        'blue-sesqui': '#0083A9',
        'indigo-sesqui': '#38254C',
        'dark-sesqui': '#2D2036'
      }
    },
  },
  plugins: [],
})