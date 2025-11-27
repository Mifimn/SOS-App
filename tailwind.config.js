
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          DEFAULT: '#003d5c',
          light: '#005580',
        },
        leaf: {
          DEFAULT: '#22c55e',
          dark: '#16a34a',
        },
        'slate-text': '#1e293b',
      },
    },
  },
  plugins: [],
}
