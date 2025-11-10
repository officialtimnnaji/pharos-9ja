// header.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Community", path: "/community" },
    { name: "Events", path: "/events" },
    // ✅ REMOVED Members (that page no longer exists)
  ];

  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-md sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/images/pharos-logo.png"
            alt="Pharos logo"
            className="w-8 h-8"
          />
          <span className="text-xl font-bold text-pharosGreen">
            Pharos Connect
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `font-medium transition-colors ${
                    isActive
                      ? "text-pharosGreen"
                      : "text-pharosText hover:text-pharosTeal"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile menu icon */}
        <div className="md:hidden text-pharosText text-2xl">☰</div>
      </nav>
    </header>
  );
}
