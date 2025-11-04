import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/10 border-b border-white/20 transition-all duration-300">
      <nav className="flex justify-between items-center px-6 py-4 md:px-12 text-white">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl md:text-3xl font-bold tracking-tight"
          onClick={() => setIsOpen(false)}
        >
          Pharos<span className="text-pharosGold">Nigeria</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-8 text-lg font-medium">
          <li><Link to="/" className="hover:text-pharosGold transition-colors">Home</Link></li>
          <li><Link to="/community" className="hover:text-pharosGold transition-colors">Community</Link></li>
          <li><Link to="/events" className="hover:text-pharosGold transition-colors">Events</Link></li>
          <li><Link to="/members" className="hover:text-pharosGold transition-colors">Members</Link></li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Dropdown */}
        <div
          className={`absolute top-16 left-0 w-full bg-black/60 backdrop-blur-2xl border-t border-white/10 flex flex-col items-center space-y-6 text-lg font-medium py-6 transition-all duration-500 ease-in-out transform ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"
          }`}
        >
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-pharosGold">Home</Link>
          <Link to="/community" onClick={() => setIsOpen(false)} className="hover:text-pharosGold">Community</Link>
          <Link to="/events" onClick={() => setIsOpen(false)} className="hover:text-pharosGold">Events</Link>
          <Link to="/members" onClick={() => setIsOpen(false)} className="hover:text-pharosGold">Members</Link>
        </div>
      </nav>
    </header>
  );
}
