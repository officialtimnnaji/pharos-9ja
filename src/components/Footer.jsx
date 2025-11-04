import React from "react";

export default function Footer() {
  return (
    <footer className="bg-pharosNavy text-white text-center py-6 mt-10">
      <p className="text-sm">
        © {new Date().getFullYear()} Pharos Nigeria Community – Built with 💚 and 🌍
      </p>
    </footer>
  );
}
