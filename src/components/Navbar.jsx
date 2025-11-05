import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 backdrop-blur-md bg-pharos-gradient">
      <nav className="flex justify-between items-center px-8 py-4 text-white font-medium">
        <Link to="/" className="text-2xl font-bold">Pharos Nigeria</Link>
        <ul className={`flex space-x-6 ${open ? "block" : "hidden md:flex"}`}>
          <li><Link to="/" className="hover:text-pharosGold">Home</Link></li>
          <li><Link to="/community" className="hover:text-pharosGold">Community</Link></li>
          <li><Link to="/events" className="hover:text-pharosGold">Events</Link></li>
          <li><Link to="/members" className="hover:text-pharosGold">Members</Link></li>
        </ul>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>
    </header>
  );
}
