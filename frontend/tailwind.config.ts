import type { Config } from "tailwindcss";

const config: Config = {
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
        "accent-blue": "#3b82f6",
        "accent-purple": "#8b5cf6",
        "dark": "#0a0a0f",
        "dark-section": "#0f0f18",
      },
    },
  },
  plugins: [],
};
export default config;
