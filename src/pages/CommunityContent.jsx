// src/pages/CommunityContent.jsx
import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"; // make sure you export auth in firebase.js

export default function CommunityContent() {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", title: "", link: "" });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null); // admin user check

  // Track admin login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Real-time fetch of posts
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "communityContent"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(data);
    });
    return () => unsubscribe();
  }, []);

  // User form handlers
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "communityContent"), {
        ...formData,
        status: "pending",
        likes: 0,
        timestamp: serverTimestamp(),
      });
      setFormData({ name: "", title: "", link: "" });
      setShowForm(false);
      alert("✅ Submitted for approval!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to submit content.");
    } finally {
      setLoading(false);
    }
  };

  // Admin approval
  const handleApprove = async (id) => {
    const postRef = doc(db, "communityContent", id);
    await updateDoc(postRef, { status: "approved" });
  };

  const handleReject = async (id) => {
    const postRef = doc(db, "communityContent", id);
    await updateDoc(postRef, { status: "rejected" });
  };

  return (
    <section className="min-h-screen px-6 md:px-16 py-24 bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 bg-clip-text text-transparent">
        Community Content
      </h2>

      {/* Posts Display */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {posts.filter(p => p.status === "approved").map((post) => (
          <div key={post.id} className="bg-gray-900 p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-400 mb-2">By {post.name}</p>
            {post.link && (
              <a href={post.link} target="_blank" rel="noopener noreferrer" className="text-yellow-500">
                View Link
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Share Button */}
      <div className="text-center mb-12">
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-red-700 via-red-600 to-yellow-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-yellow-500/40 transition-all duration-300"
        >
          🚀 Share Your Content
        </button>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-11/12 md:w-1/2 lg:w-1/3 relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-800"
              />
              <input
                type="text"
                name="title"
                placeholder="Post Title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-800"
              />
              <input
                type="url"
                name="link"
                placeholder="Optional Link"
                value={formData.link}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-500 text-black py-3 rounded-lg font-semibold"
              >
                {loading ? "Submitting..." : "Submit for Approval"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Admin Panel for Pending Posts */}
      {user && (
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-yellow-400">Admin Pending Approvals</h3>
          {posts.filter(p => p.status === "pending").map((post) => (
            <div key={post.id} className="bg-gray-800 p-4 rounded-lg mb-4 flex justify-between items-center">
              <div>
                <p className="font-semibold">{post.title}</p>
                <p className="text-sm text-gray-400">By {post.name}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleApprove(post.id)}
                  className="bg-green-500 px-3 py-1 rounded-lg font-semibold"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(post.id)}
                  className="bg-red-600 px-3 py-1 rounded-lg font-semibold"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
          {posts.filter(p => p.status === "pending").length === 0 && (
            <p className="text-gray-400">No pending posts.</p>
          )}
        </div>
      )}
    </section>
  );
}
