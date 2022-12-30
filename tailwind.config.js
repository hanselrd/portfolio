/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["public/**/*.html", "src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("tailwindcss-dir")(),
  ],
};
