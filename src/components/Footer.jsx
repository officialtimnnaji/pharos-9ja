import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-6 mt-16 text-center">
      <p className="text-sm font-semibold bg-gradient-to-r from-red-500 via-purple-500 to-yellow-500 bg-clip-text text-transparent">
        © {new Date().getFullYear()} Pharos Nigeria Community – Built by{" "}
        <a
          href="https://www.x.com/luxurynad"
          className="underline hover:text-pharosGold"
          target="_blank"
          rel="noopener noreferrer"
        >
          @luxurynad
        </a>{" "}
        💚
      </p>
    </footer>
  );
}
