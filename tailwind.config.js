/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pharosGreen: "#00B074",
        pharosGold: "#FFD700",
        pharosNavy: "#003C43",
        pharosWhite: "#FFFFFF",
        pharosGray: "#F5F5F5",
      },
      backgroundImage: {
        "pharos-gradient":
          "linear-gradient(135deg, #003C43 0%, #00B074 35%, #FFD700 85%)",
      },
      boxShadow: {
        glow: "0 0 20px rgba(0, 176, 116, 0.4)",
        gold: "0 0 15px rgba(255, 215, 0, 0.3)",
      },
      keyframes: {
        gradientFlow: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        gradientFlow: "gradientFlow 8s ease infinite",
      },
    },
  },
  plugins: [],
};
