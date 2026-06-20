import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        siyoni: {
          cream: "#F7F3EE",
          card: "#FDFAF6",
          brown: "#1C1008",
          mid: "#5C3D1E",
          ochre: "#C4882A",
          border: "#E8E0D5",
        },
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 8px rgba(28,16,8,0.06)",
        "card-hover": "0 4px 16px rgba(28,16,8,0.10)",
        nav: "0 2px 12px rgba(28,16,8,0.08)",
      },
      borderRadius: {
        card: "12px",
      },
    },
  },
  plugins: [],
};
export default config;
