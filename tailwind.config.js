const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["src/{pages,components,containers}/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xs: "480px",
        portrait: { raw: "(orientation: portrait)" },
        landscape: { raw: "(orientation: landscape)" },
        print: { raw: "print" }
      },
      fontFamily: {
        poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
        lato: ["Lato", ...defaultTheme.fontFamily.sans],
        montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        gray: colors.trueGray
      }
    }
  },
  variants: {
    extend: {
      animation: ["motion-safe", "motion-reduce"]
    }
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")]
};
