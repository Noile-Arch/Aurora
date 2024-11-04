/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        DreamToBerich: ['"DreamToBerich", sans-serif'],
      },
      colors: {
        primary: "#a80000",
        chocolate: "#C34600",
        secondary: "#FFCED4",
        tertiery: "#A70000",
        black: "#000000",
        white: "#ffffff",
        greybg:"#0f0e0e",
      },
    },
  },
  plugins: [],
};
