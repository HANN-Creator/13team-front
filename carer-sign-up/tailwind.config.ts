import { GrPaypal } from "react-icons/gr";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'orange': "#FF8B14",
        'gray': {
          50: "#f9fafb", //background
          100: "#f3f4f6", //background
          200: "#D9D9D9", //border
          300: "#CBCBD1", //process bar
          350: "#999999", //additional text
          400: "#767676", //placehoder
          500: "#505050", //label, additional text
          600: "#111111" //default
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
