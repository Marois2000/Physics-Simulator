/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat Alternates"]
      },
      colors: {
        black: "#121212"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
 }
