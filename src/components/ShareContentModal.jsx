// src/components/ShareContentModal.jsx
import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function ShareContentModal({ open, onClose }) {
  const [form, setForm] = useState({ name: "", title: "", link: "" });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  if (!open) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    try {
      // Basic validation
      if (!form.name.trim() || !form.title.trim() || !form.link.trim()) {
        setFeedback({ type: "error", message: "Please fill name, title and link." });
        setSubmitting(false);
        return;
      }

      await addDoc(collection(db, "communityContent"), {
        name: form.name.trim(),
        title: form.title.trim(),
        link: form.link.trim(),
        status: "pending",
        timestamp: serverTimestamp(),
      });

      setFeedback({ type: "success", message: "Thanks — your submission is pending approval." });
      setForm({ name: "", title: "", link: "" });

      // Optionally auto-close after success:
      setTimeout(() => {
        setSubmitting(false);
        onClose();
      }, 1200);
    } catch (err) {
      console.error("Submit error:", err);
      setFeedback({ type: "error", message: "Submission failed. Try again." });
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      {/* backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* modal */}
      <div className="relative bg-[#0b0b0b] border border-red-900/30 rounded-2xl shadow-2xl w-full max-w-xl p-6 z-70">
        <header className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-white">Share Your Content</h3>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name / X handle"
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-700"
          />

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Short title / caption"
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-700"
          />

          <input
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="X / Twitter link (https://x.com/...)"
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-700"
            type="url"
          />

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={submitting}
              className="bg-gradient-to-r from-red-800 via-red-600 to-yellow-400 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:scale-105 transition transform"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="text-gray-300 hover:text-white"
            >
              Cancel
            </button>
          </div>

          {feedback && (
            <p
              className={`mt-2 text-sm ${feedback.type === "success" ? "text-green-400" : "text-red-400"}`}
            >
              {feedback.message}
            </p>
          )}

          <p className="text-xs text-gray-400 mt-2">
            Submissions are reviewed by admins. Approved posts will appear on the Content page.
          </p>
        </form>
      </div>
    </div>
  );
}
