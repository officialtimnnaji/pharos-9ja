// src/pages/Content.jsx
import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  where, // ✅ Added this import
} from "firebase/firestore";
import { db } from "../firebase";

export default function Content() {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    link: "",
  });
  const [loading, setLoading] = useState(false);

  // ✅ Fetch only APPROVED content safely
  useEffect(() => {
    // ✅ Only fetch docs that have a timestamp to avoid Firestore permission errors
    const q = query(
      collection(db, "communityContent"),
      where("timestamp", "!=", null),
      orderBy("timestamp", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .filter((p) => p.status === "approved")
      );
    });

    return () => unsub();
  }, []);

  // ✅ Submit new content (pending)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await addDoc(collection(db, "communityContent"), {
      name: formData.name.trim(),
      title: formData.title.trim(),
      link: formData.link.trim() || "",
      status: "pending",
      timestamp: serverTimestamp(), // ✅ Ensures every new doc has timestamp
    });

    setLoading(false);
    setFormData({ name: "", title: "", link: "" });
    setShowForm(false);
  };

  return (
    <section className="min-h-screen px-6 md:px-16 py-20 bg-[#f8e3cc] text-[#1a1a1a]">
      <h2
        className="text-4xl md:text-5xl font-bold text-center mb-12 
        bg-gradient-to-r from-[#6b0f1a] via-[#4e9bfa] to-[#6b0f1a]
        bg-clip-text text-transparent"
      >
        Community Content
      </h2>

      {/* Approved Content Cards */}
      <div className="max-w-4xl mx-auto space-y-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="relative bg-white/50 backdrop-blur-md border 
            border-[#6b0f1a]/30 rounded-2xl shadow-md overflow-hidden p-6 
            transition-transform hover:-translate-y-2 hover:shadow-xl group"
          >
            <h3 className="text-2xl font-semibold text-[#6b0f1a] mb-2">
              {post.title}
            </h3>

            <p className="text-sm text-gray-600 mb-3">
              By {post.name} •{" "}
              {post.timestamp?.seconds
                ? new Date(post.timestamp.seconds * 1000).toLocaleDateString()
                : "Unknown date"}
            </p>

            {post.link && (
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-20 text-[#4e9bfa] hover:text-[#6b0f1a] font-semibold"
              >
                View on X →
              </a>
            )}

            <div
              className="absolute inset-0 opacity-0 pointer-events-none
              group-hover:opacity-20 bg-gradient-to-br 
              from-[#6b0f1a]/40 to-[#4e9bfa]/40 transition-opacity duration-300"
            ></div>
          </div>
        ))}
      </div>

      {/* Share Button */}
      <div className="text-center mt-16">
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-[#6b0f1a] via-[#4e9bfa] to-[#6b0f1a]
                     text-white font-semibold px-8 py-3 rounded-full shadow-lg
                     hover:scale-105 transition-transform duration-300"
        >
          ✨ Share Your Content
        </button>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl w-96 relative border border-[#6b0f1a]/30">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-[#6b0f1a] font-bold text-xl"
            >
              ✕
            </button>

            <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-[#6b0f1a] to-[#4e9bfa] bg-clip-text text-transparent">
              Submit Your Content
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                placeholder="Your Name"
                className="w-full p-3 rounded-lg border border-[#6b0f1a]/40"
              />

              <input
                name="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                placeholder="Post Title"
                className="w-full p-3 rounded-lg border border-[#6b0f1a]/40"
              />

              <input
                name="link"
                value={formData.link}
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
                placeholder="Optional X Link"
                className="w-full p-3 rounded-lg border border-[#6b0f1a]/40"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#6b0f1a] via-[#4e9bfa] to-[#6b0f1a]
                           text-white font-semibold py-3 rounded-lg shadow-md hover:scale-105"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
