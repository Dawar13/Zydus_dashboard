import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        background: {
          light: "#f5f6f8",
          dark: "#0f172a",
        },
        status: {
          green: "#16a34a",
          yellow: "#facc15",
          red: "#dc2626",
        },
      },
    },
  },
  plugins: [],
};

export default config;
