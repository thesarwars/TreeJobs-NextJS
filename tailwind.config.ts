import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2E7D32",
        accent: "#66BB6A",
        dark: "#263238",
        light: "#ECEFF1",
      },
    },
  },
  plugins: [],
};

export default config;
