const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["src/{pages,components,containers}/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      "xs": "480px",
      "sm": "640px",
      "md": "768px",
      "lg": "1024px",
      "xl": "1280px",
      "2xl": "1536px",
      "portrait": { raw: "(orientation: portrait)" },
      "landscape": { raw: "(orientation: landscape)" },
      "print": { raw: "print" },
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
        lato: ["Lato", ...defaultTheme.fontFamily.sans],
        montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        gray: colors.trueGray,
      },
      typography: (theme) => ({
        dark: {
          css: {
            color: "white",
            h1: {
              color: "white",
            },
            h2: {
              color: "white",
            },
            h3: {
              color: "white",
            },
            h4: {
              color: "white",
            },
            h5: {
              color: "white",
            },
            h6: {
              color: "white",
            },
            p: {
              color: "white",
            },
            a: {
              "color": "white",
              "&:hover": {
                color: "white",
              },
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      animation: ["motion-safe", "motion-reduce"],
      divideWidth: ["direction"],
      space: ["direction"],
      typography: ["dark"],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("tailwindcss-dir")(),
  ],
};
