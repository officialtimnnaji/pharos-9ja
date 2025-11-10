// src/pages/Announcements.jsx
import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // ✅ Track admin login (still needed for future admin-only UI features)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || null);
    });
    return () => unsub();
  }, []);

  // ✅ Real-time Firestore listener
  useEffect(() => {
    const q = query(collection(db, "announcements"), orderBy("date", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setAnnouncements(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-[#6b0f1a]">
        Loading announcements...
      </div>
    );
  }

  return (
    <section className="min-h-screen px-6 md:px-16 py-20 bg-[#f8e3cc] text-[#1a1a1a]">

      {/* ✅ Page Header */}
      <h2
        className="text-4xl md:text-5xl font-bold text-center mb-12
        bg-gradient-to-r from-[#6b0f1a] via-[#4e9bfa] to-[#6b0f1a]
        bg-clip-text text-transparent"
      >
        Announcements
      </h2>

      {/* ✅ Announcements List */}
      <div className="max-w-4xl mx-auto space-y-10">
        {announcements.length === 0 ? (
          <p className="text-center text-[#6b0f1a]">No announcements yet.</p>
        ) : (
          announcements.map((a) => (
            <div
              key={a.id}
              className="pharos-soft-hover bg-white/60 backdrop-blur-xl 
              border border-[#6b0f1a]/20 rounded-2xl p-8 shadow-md relative"
            >
              {/* ✅ Title */}
              <h3 className="text-2xl font-semibold text-[#6b0f1a] mb-2">
                {a.title}
              </h3>

              {/* ✅ Date */}
              <p className="text-sm text-gray-600 mb-3">
                {a.date?.seconds
                  ? new Date(a.date.seconds * 1000).toLocaleDateString()
                  : "Unknown date"}
              </p>

              {/* ✅ Body */}
              <p className="text-[#1a1a1a] mb-4 leading-relaxed">
                {a.description}
              </p>

              {/* ✅ Optional Link */}
              {a.link && (
                <a
                  href={a.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[#4e9bfa] hover:text-[#6b0f1a] 
                  font-semibold transition-all"
                >
                  Read more →
                </a>
              )}

              {/* ❌ DELETE BUTTON REMOVED COMPLETELY */}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
