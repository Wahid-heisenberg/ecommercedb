/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blackPrimary: "#363738",
        whiteText: "#FAFAFA",
        grayText: "#7D8184",
        Dark: "#000000",
        input:"#F5F5F5"
      },
    },
  },
  plugins: [],
};
