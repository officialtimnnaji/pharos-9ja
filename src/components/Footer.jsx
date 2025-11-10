// src/components/Footer.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Footer() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // You can replace this with a proper admin check, e.g., user email or a custom claim
        const adminEmails = ["admin@example.com"]; 
        setIsAdmin(adminEmails.includes(user.email));
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <footer className="bg-gray-900 py-6 mt-16 text-center">
      <p className="text-sm font-semibold bg-gradient-to-r from-red-500 via-purple-500 to-yellow-500 bg-clip-text text-transparent">
        © {new Date().getFullYear()} Pharos Community Connect – Built by{" "}
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

      <div className="mt-4 flex justify-center space-x-6">
        <Link
          to="/content"
          className="text-red-500 hover:text-yellow-400 transition-colors font-medium"
        >
          Community Content
        </Link>
        <Link
          to="/announcements"
          className="text-red-500 hover:text-yellow-400 transition-colors font-medium"
        >
          Announcements
        </Link>
        {isAdmin && (
          <Link
            to="/admin/approvals"
            className="text-red-500 hover:text-yellow-400 transition-colors font-medium"
          >
            Admin
          </Link>
        )}
      </div>
    </footer>
  );
}
