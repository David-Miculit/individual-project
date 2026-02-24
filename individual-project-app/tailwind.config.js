/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        f1red: '#b91c1c',
      },
      fontFamily: {
        rubik: ['Rubik'],
      },
    },
  },
    plugins: [
    require('tailwind-scrollbar-hide')
  ]
}