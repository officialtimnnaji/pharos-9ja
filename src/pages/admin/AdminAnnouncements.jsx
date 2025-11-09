// src/pages/admin/AdminAnnouncements.jsx
import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

export default function AdminAnnouncements() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Check if admin is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/admin/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Live fetch announcements from Firestore
  useEffect(() => {
    const q = query(collection(db, "announcements"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAnnouncements(data);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/admin/login");
    } catch (err) {
      console.error(err);
      toast.error("❌ Logout failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "announcements"), {
        title,
        description,
        link: link || "",
        date: serverTimestamp(),
      });
      setTitle("");
      setDescription("");
      setLink("");
      toast.success("✅ Announcement posted!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to post announcement");
    } finally {
      setLoading(false);
    }
  };

  const deleteAnnouncement = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?")) return;
    try {
      await deleteDoc(doc(db, "announcements", id));
      toast.success("🗑️ Announcement deleted!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to delete announcement");
    }
  };

  return (
    <section className="min-h-screen px-6 md:px-16 py-24 bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white">
      <Toaster position="top-right" />

      {/* Logout button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleLogout}
          className="bg-red-700 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>

      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 bg-clip-text text-transparent">
        Post Announcement
      </h2>

      {/* Post form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto space-y-4 bg-white/10 p-8 rounded-2xl shadow-lg"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-500 outline-none"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-500 outline-none"
        />
        <input
          type="url"
          placeholder="Optional link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-500 outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-500 hover:bg-red-600 text-black font-semibold py-3 rounded-lg shadow-md transition-all duration-300"
        >
          {loading ? "Posting..." : "Post Announcement"}
        </button>
      </form>

      {/* Announcements list */}
      <div className="max-w-3xl mx-auto mt-12 space-y-6">
        {announcements.length === 0 ? (
          <p className="text-center text-gray-400">No announcements yet.</p>
        ) : (
          announcements.map((ann) => (
            <div
              key={ann.id}
              className="relative bg-white rounded-2xl p-[2px] overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 hover:scale-105"
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B81]/30 via-[#FFD700]/30 to-[#14B8A6]/30 opacity-0 hover:opacity-50 rounded-2xl transition-opacity duration-300"></div>

              <div className="relative bg-white rounded-[0.7rem] p-6 border border-gray-100">
                <h3 className="font-semibold text-2xl text-yellow-400 mb-2">{ann.title}</h3>
                <p className="text-gray-300 mb-3">{ann.description}</p>
                {ann.link && (
                  <a
                    href={ann.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Read more →
                  </a>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  {ann.date ? new Date(ann.date.seconds * 1000).toLocaleDateString() : "Unknown date"}
                </p>

                {/* Delete button */}
                <button
                  onClick={() => deleteAnnouncement(ann.id)}
                  className="mt-3 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
