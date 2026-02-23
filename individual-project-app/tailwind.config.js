/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik'],
      },
    },
  },
    plugins: [
    require('tailwind-scrollbar-hide')
  ]
}