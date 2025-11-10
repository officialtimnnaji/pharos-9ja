// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B81",          // Fun pink/red
        secondary: "#FFD6E0",        // Soft romantic
        accent: "#FFB3C6",           // Highlight gradient
        upcoming: "#14B8A6",
        background: "#FFF5F8",       // Light background
        "background-light": "#FFF0F4", // Light variant for sections
        darkText: "#1F2937",         // Almost black text
      },
      boxShadow: {
        card: "0 4px 6px rgba(0,0,0,0.1)",
        "card-hover": "0 8px 20px rgba(255,107,129,0.3)",
      },
    },
  },
  plugins: [],
};
