import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-pharosPurple via-pharosBlue to-pharosGold py-12 mt-20 text-center relative overflow-hidden">
      {/* Decorative soft circles */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-48 h-48 bg-white rounded-full absolute -top-16 -left-16"></div>
        <div className="w-72 h-72 bg-white rounded-full absolute -bottom-24 -right-24"></div>
      </div>

      <p className="text-sm text-white relative z-10 px-4 md:px-0">
        © {new Date().getFullYear()} Pharos Nigeria Community – Built by{" "}
        <a
          href="https://www.x.com/luxurynad"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-400 to-green-400 hover:scale-105 transition-transform inline-block"
        >
          @luxurynad
        </a>{" "}
        💚
      </p>
    </footer>
  );
}
