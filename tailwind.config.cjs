/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#db3c26",
        "primary-100": "#eb3c26",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
