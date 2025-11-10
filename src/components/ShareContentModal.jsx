// src/components/ShareContentModal.jsx
import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function ShareContentModal({ open, onClose }) {
  const [form, setForm] = useState({ name: "", title: "", link: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (!form.name.trim() || !form.title.trim() || !form.link.trim()) {
        setSubmitting(false);
        alert("Please fill in name, title and link.");
        return;
      }

      await addDoc(collection(db, "communityContent"), {
        ...form,
        name: form.name.trim(),
        title: form.title.trim(),
        link: form.link.trim(),
        status: "pending",
        timestamp: serverTimestamp(),
      });

      // ✅ Success animation trigger
      setSuccess(true);
      setForm({ name: "", title: "", link: "" });

      setTimeout(() => {
        setSubmitting(false);
        setSuccess(false);
        onClose();
      }, 1500);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
      {/* ✅ Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-md animate-fadeIn"
      />

      {/* ✅ Modal Wrapper */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-[10000] w-full max-w-xl rounded-2xl p-[2px] bg-gradient-to-br from-red-800/40 via-yellow-400/40 to-red-600/40 shadow-xl animate-popIn"
      >
        {/* ✅ Glass Card */}
        <div className="rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 p-6 shadow-2xl relative overflow-hidden">

          {/* ✅ Glow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

          {/* ✅ Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-yellow-300 text-xl"
          >
            ✕
          </button>

          {/* ✅ Success Animation */}
          {success ? (
            <div className="flex flex-col items-center justify-center py-16 animate-fadeIn">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center animate-scaleIn shadow-lg">
                  <span className="text-white text-5xl">✔</span>
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-green-300 animate-ping"></div>
              </div>

              <p className="text-green-300 text-lg font-semibold mt-4">
                Submitted Successfully!
              </p>
            </div>
          ) : (
            <>
              {/* Header */}
              <h3 className="text-2xl font-bold text-yellow-300 mb-4 drop-shadow-lg">
                Share Your Content
              </h3>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name / X handle"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />

                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Short title / caption"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />

                <input
                  name="link"
                  value={form.link}
                  onChange={handleChange}
                  placeholder="X / Twitter link (https://x.com/...)"
                  type="url"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />

                {/* Buttons */}
                <div className="flex justify-between items-center pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-gradient-to-r from-red-700 via-red-500 to-yellow-400 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:scale-105 transition-transform"
                  >
                    {submitting ? "Submitting..." : "Submit"}
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="text-gray-200 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>

                <p className="text-xs text-gray-300">
                  Submissions are reviewed by admins. Approved posts appear on the content page.
                </p>
              </form>
            </>
          )}
        </div>
      </div>

      {/* ✅ Animations */}
      <style>{`
        @keyframes popIn {
          0% { transform: scale(0.85); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-popIn {
          animation: popIn 0.25s ease-out forwards;
        }

        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }

        @keyframes scaleIn {
          0% { transform: scale(0.4); }
          100% { transform: scale(1); }
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
