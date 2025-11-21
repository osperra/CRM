// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["system-ui", "sans-serif"],
      },
      colors: {
        osperra: {
          primary: "#7B3CFF",
          primarySoft: "#EFE4FF",
        },
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15,23,42,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
