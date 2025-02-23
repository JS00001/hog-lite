/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/*.{js,jsx,ts,tsx}",
    "./src/ui/**/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ink: {
          light: "#151515",
          dark: "#EEEFE9",
        },
        background: {
          light: "#EEEFE9",
          dark: "#151515",
        },
        accent: {
          light: "#E5E7E0",
          dark: "#2C2C2C",
        },
        divider: {
          light: "#D0D1C9",
          dark: "#4B4B4B",
        },
        red: {
          light: "#F54E00",
          dark: "#F54E00",
        },
        yellow: {
          light: "#DC9300",
          dark: "#F1A82C",
        },
        blue: {
          light: "#1D4AFF",
          dark: "#1D4AFF",
        },
        gray: {
          light: "#BFBFBC",
          dark: "#BFBFBC",
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
