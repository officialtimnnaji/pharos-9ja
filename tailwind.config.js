/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pharosGold: "#FFD700",       // Gold accent
        pharosNavy: "#1A1A40",       // Dark blue/navy background
        pharosBlue: "#3B82F6",       // For community leads
        pharosPurple: "#8B5CF6",     // For OG members
        pharosGreen: "#10B981",      // For contributors
        pharosTeal: "#14B8A6",       // For upcoming events
      },
      boxShadow: {
        card: "0 4px 6px rgba(0,0,0,0.1)",
        "card-hover": "0 8px 16px rgba(0,0,0,0.15)",
      },
      backgroundImage: {
        "pharos-gradient": "linear-gradient(90deg, #1A1A40, #3B82F6)",
      },
    },
  },
  plugins: [],
};
