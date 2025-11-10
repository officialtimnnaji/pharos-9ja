import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [closing, setClosing] = useState(false);

  const handleLinkClick = () => setOpen(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user);
    });
    return () => unsubscribe();
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Content", path: "/content" },
    { name: "Community", path: "/community" },
    { name: "Announcements", path: "/announcements" },
  ];

  const adminItems = [
    { name: "Admin Approvals", path: "/admin/approvals" },
    { name: "Post Announcement", path: "/admin/announcements" },
  ];

  const customOrder = [
    "Home",
    "Content",
    "Community",
    "Announcements",
    "Admin Approvals",
    "Post Announcement",
  ];

  const allItems = [...navItems, ...adminItems];
  const sortedItems = allItems.sort(
    (a, b) => customOrder.indexOf(a.name) - customOrder.indexOf(b.name)
  );

  const desktopNavItems = sortedItems.filter((item) =>
    navItems.some((n) => n.name === item.name)
  );
  const desktopAdminItems = sortedItems.filter((item) =>
    adminItems.some((n) => n.name === item.name)
  );

  const toggleMenu = () => {
    if (open) {
      setClosing(true);
      setTimeout(() => {
        setOpen(false);
        setClosing(false);
      }, 250);
    } else {
      setOpen(true);
    }
  };

  return (
    <header className="fixed w-full z-50">
      {/* 🌈 Soft Halo Glow */}
      <div className="absolute inset-0 h-full blur-xl opacity-40 bg-gradient-to-r from-[#0c6be4] via-[#4e9bfa] to-[#0007b7] pointer-events-none"></div>

      {/* Navbar Background */}
      <div className="relative bg-gradient-to-r from-[#0c6be4]/80 via-[#4e9bfa]/80 to-[#0007b7]/80 backdrop-blur-lg shadow-[0_4px_20px_rgba(12,107,228,0.4)] border-b border-white/10">
        <nav className="flex justify-between items-center px-3 md:px-6 py-1 font-medium">
          
          {/* ✅ Logo / Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/images/logo/logo.webp"
              alt="Pharos Logo"
              className="w-9 h-9 object-cover rounded-full border-2 border-[#FFD700] shadow-md"
            />
            <span className="text-2xl font-extrabold text-[#f8e3cc] drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]">
              Pharos Connect
            </span>
          </Link>

          {/* ✅ Desktop Menu */}
          <ul className="hidden md:flex space-x-6 lg:space-x-9 justify-end ml-auto">
            {desktopNavItems.map(({ name, path }) => (
              <li key={name} className="relative group">
                <Link
                  to={path}
                  onClick={handleLinkClick}
                  className="text-black transition-colors duration-300 font-semibold group-hover:text-[#e23e57]"
                >
                  {name}
                </Link>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-[#9b1c31] via-[#e23e57] to-[#9b1c31] rounded-full shadow-[0_0_8px_#e23e57] transition-all duration-500 group-hover:w-full group-hover:shadow-[0_0_12px_#e23e57]"></span>
              </li>
            ))}

            {isAdmin &&
              desktopAdminItems.map(({ name, path }) => (
                <li key={name} className="relative group">
                  <Link
                    to={path}
                    onClick={handleLinkClick}
                    className="text-black transition-colors duration-300 font-semibold group-hover:text-[#e23e57]"
                  >
                    {name}
                  </Link>
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-[#9b1c31] via-[#e23e57] to-[#9b1c31] rounded-full shadow-[0_0_8px_#e23e57] transition-all duration-500 group-hover:w-full group-hover:shadow-[0_0_12px_#e23e57]"></span>
                </li>
              ))}
          </ul>

          {/* ✅ Mobile Menu Button */}
          <button
            className="md:hidden z-50 text-black"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* ✅ Mobile Dropdown */}
          {(open || closing) && (
            <ul
              className={`absolute top-full right-2 mt-1 flex flex-col items-end space-y-0.5 z-40 p-1 w-36 rounded-lg bg-transparent backdrop-blur-none transition-all duration-300
                ${open && !closing ? "animate-fadeInDown" : "animate-fadeOutUp"}`}
            >
              {sortedItems.map(({ name, path }) => (
                <li key={name}>
                  <Link
                    to={path}
                    onClick={handleLinkClick}
                    className="w-full text-right block font-semibold text-black hover:text-[#e23e57] transition-colors px-1 py-0.5"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </div>

      {/* ✅ Animations */}
      <style>{`
        @keyframes fadeInDown {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeOutUp {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.25s ease-out forwards;
        }

        .animate-fadeOutUp {
          animation: fadeOutUp 0.25s ease-in forwards;
        }
      `}</style>
    </header>
  );
}
