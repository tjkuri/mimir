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
      'saffron': '#d97706',
      'saffronDark': '#b45309',
    },
    fontFamily: {
      'sans': ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      'cinzel': ['Space Grotesk', 'sans-serif'],
      'mono': ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
    },
    extend: {},
  },
  plugins: [],
}