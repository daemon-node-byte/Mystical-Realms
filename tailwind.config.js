import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        "new-dark": {
          extend: "dark",
          colors: {
            primary: {
              50: "#ede6ff",
              100: "#ece7fe",
              200: "#dacffd",
              300: "#c7b6fb",
              400: "#b59efa",
              500: "#a286f9",
              600: "#826bc7",
              700: "#615095",
              800: "#413664",
              900: "#201b32",
              DEFAULT: "#a286f9",
            },
            secondary: {
              50: "#dcf7ff",
              100: "#d3eefd",
              200: "#a8dcfa",
              300: "#7ccbf8",
              400: "#51b9f5",
              500: "#25a8f3",
              600: "#1e86c2",
              700: "#166592",
              800: "#0f4361",
              900: "#072231",
              DEFAULT: "#25a8f3",
            },
            success: {
              50: "#e3fce7",
              100: "#dbf5df",
              200: "#b8eabf",
              300: "#94e0a0",
              400: "#71d580",
              500: "#4dcb60",
              600: "#3ea24d",
              700: "#2e7a3a",
              800: "#1f5126",
              900: "#0f2913",
              DEFAULT: "#4dcb60",
            },
            warning: {
              50: "#fffedb",
              100: "#fdfcd3",
              200: "#fcf9a6",
              300: "#faf67a",
              400: "#f9f34d",
              500: "#f7f021",
              600: "#c6c01a",
              700: "#949014",
              800: "#63600d",
              900: "#313007",
              DEFAULT: "#f7f021",
            },
            danger: {
              50: "#ffe3e1",
              100: "#ffdcdb",
              200: "#ffbab8",
              300: "#ff9794",
              400: "#ff7571",
              500: "#ff524d",
              600: "#cc423e",
              700: "#99312e",
              800: "#66211f",
              900: "#33100f",
              DEFAULT: "#ff524d",
            },
          },
        },
      },
    }),
  ],
};
