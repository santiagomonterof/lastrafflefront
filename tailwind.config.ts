import withMT from "@material-tailwind/react/utils/withMT";
const { nextui } = require("@nextui-org/react");

const config = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          blue: "#0f172a",
        }
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()]
})

export default config;