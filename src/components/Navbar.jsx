import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Close mobile menu when a link is clicked
  const handleLinkClick = () => setOpen(false);

  return (
    <header className="fixed w-full z-50 backdrop-blur-md bg-pharos-gradient">
      <nav className="flex justify-between items-center px-6 md:px-12 py-4 text-white font-medium">
        <Link to="/" className="text-2xl font-bold">
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
          className="md:hidden z-50"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Dropdown */}
        {open && (
          <ul className="absolute top-full right-0 mt-2 w-48 bg-transparent flex flex-col items-start shadow-lg py-2 text-white space-y-2 px-4 rounded-lg">
            <li>
              <Link
                to="/"
                onClick={handleLinkClick}
                className="w-full block hover:text-pharosGold transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/community"
                onClick={handleLinkClick}
                className="w-full block hover:text-pharosGold transition-colors"
              >
                Community
              </Link>
            </li>
            <li>
              <Link
                to="/events"
                onClick={handleLinkClick}
                className="w-full block hover:text-pharosGold transition-colors"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/members"
                onClick={handleLinkClick}
                className="w-full block hover:text-pharosGold transition-colors"
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
