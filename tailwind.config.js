/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'spaceCadet': '#1c2541',
      'verdigris': '#48a9a6',
      'naplesYellow': '#f4d35e',
      'ghostWhite': '#fbf9ff',
      'bittersweet': '#f25f5c',
    },
    fontFamily: {},
    extend: {},
  },
  plugins: [],
}