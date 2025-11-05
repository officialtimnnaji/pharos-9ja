import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Close mobile menu when a link is clicked
  const handleLinkClick = () => setOpen(false);

  return (
    <header className="fixed w-full z-50 backdrop-blur-md bg-pharos-gradient">
      <nav className="flex justify-between items-center px-6 md:px-12 py-4 font-medium">
        <Link to="/" className="text-2xl font-bold text-white">
          Pharos Nigeria
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-white">
          <li>
            <Link
              to="/"
              onClick={handleLinkClick}
              className="text-white hover:text-pharosGold transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/community"
              onClick={handleLinkClick}
              className="text-white hover:text-pharosGold transition-colors"
            >
              Community
            </Link>
          </li>
          <li>
            <Link
              to="/events"
              onClick={handleLinkClick}
              className="text-white hover:text-pharosGold transition-colors"
            >
              Events
            </Link>
          </li>
          <li>
            <Link
              to="/members"
              onClick={handleLinkClick}
              className="text-white hover:text-pharosGold transition-colors"
            >
              Members
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-50 text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Dropdown */}
        {open && (
          <ul className="absolute top-full right-1 mt-0.1 flex flex-col items-start space-y-0 z-40 bg-transparent">
            <li>
              <Link
                to="/"
                onClick={handleLinkClick}
                className="w-auto block text-red-900 font-semibold hover:text-pharosGold transition-colors px-1 py-0.5 rounded"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/community"
                onClick={handleLinkClick}
                className="w-auto block text-red-900 font-semibold hover:text-pharosGold transition-colors px-1 py-0.5 rounded"
              >
                Community
              </Link>
            </li>
            <li>
              <Link
                to="/events"
                onClick={handleLinkClick}
                className="w-auto block text-red-900 font-semibold hover:text-pharosGold transition-colors px-1 py-0.5 rounded"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/members"
                onClick={handleLinkClick}
                className="w-auto block text-red-900 font-semibold hover:text-pharosGold transition-colors px-1 py-0.5 rounded"
              >
                Members
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
