import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    fontFamily: {
      sans: "var(--font-sans)",
      rajdhani: "var(--font-rajdhani)"
    },
    extend: {
      backgroundImage: {
        wallpaper: "url('/wallpaper.jpg')"
      },
      colors: {
        ["primary-black"]: "#181818",
        ["secondary-black"]: "#282828",
        ["primary-gray"]: "#8C8C8C",
        primary: "#5858FA"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};
export default config;
