import React, { useEffect, useState, useRef } from "react";
import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

export default function AdminContentApproval() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const prevSubmissionsRef = useRef([]);

  // ✅ Check if admin is logged in
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

  // ✅ Real-time listener for community content
  useEffect(() => {
    const q = query(collection(db, "communityContent"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      // Detect new submissions
      const previousIds = prevSubmissionsRef.current.map((item) => item.id);
      const newSubmissions = data.filter((item) => !previousIds.includes(item.id));

      if (newSubmissions.length > 0) {
        newSubmissions.forEach((item) => {
          toast(`🆕 New submission: ${item.title} by ${item.name}`, {
            icon: "✨",
            duration: 5000,
          });
        });
      }

      setSubmissions(data);
      prevSubmissionsRef.current = data;
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const pendingCount = submissions.filter((s) => s.status === "pending").length;

  // ✅ Admin actions
  const approveContent = async (id) => {
    try {
      await updateDoc(doc(db, "communityContent", id), { status: "approved" });
      toast.success("✅ Post approved successfully!");
    } catch {
      toast.error("❌ Error approving post");
    }
  };

  const rejectContent = async (id) => {
    if (!window.confirm("Reject this submission?")) return;
    try {
      await updateDoc(doc(db, "communityContent", id), { status: "rejected" });
      toast("🚫 Post rejected", { icon: "⚠️" });
    } catch {
      toast.error("❌ Error rejecting post");
    }
  };

  const deleteContent = async (id) => {
    if (!window.confirm("Delete this content permanently?")) return;
    try {
      await deleteDoc(doc(db, "communityContent", id));
      toast.success("🗑️ Post deleted successfully!");
    } catch {
      toast.error("❌ Error deleting post");
    }
  };

  const featureContent = async (id) => {
    try {
      await updateDoc(doc(db, "communityContent", id), { featured: true });
      toast.success("🌟 Content marked as featured!");
    } catch {
      toast.error("❌ Error featuring post");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/admin/login");
    } catch {
      toast.error("❌ Logout failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#00132B] text-[#FFD700]">
        <p>Loading community submissions...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#00132B] via-[#002B5B] to-[#001F3F] text-white">
      <Toaster position="top-right" />

      {/* ✅ Top Bar */}
      <div className="sticky top-0 z-50 bg-[#001F3F]/90 backdrop-blur-md flex justify-between items-center px-6 md:px-16 py-4 border-b border-[#004AAD]/40">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FFD700] to-[#004AAD] bg-clip-text text-transparent relative">
          Content Approvals
          {pendingCount > 0 && (
            <span className="absolute -top-2 -right-10 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-[#004AAD] rounded-full shadow-lg">
              {pendingCount}
            </span>
          )}
        </h2>

        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-[#004AAD] to-[#002B5B] hover:opacity-90 text-[#FFD700] font-semibold py-2 px-4 rounded-lg transition-all"
        >
          Logout
        </button>
      </div>

      {/* ✅ Submissions */}
      <div className="px-6 md:px-16 py-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {submissions.length === 0 ? (
          <p className="text-center text-gray-400 col-span-full">
            No submissions found.
          </p>
        ) : (
          submissions.map(({ id, name, title, link, status, featured }) => (
            <div
              key={id}
              className={`p-6 rounded-2xl shadow-lg border transition-all duration-300 ${
                status === "approved"
                  ? "border-[#00C6FF]/70 bg-[#001B3D]/60"
                  : status === "rejected"
                  ? "border-[#FF4E4E]/70 bg-[#2A0E0E]/40"
                  : "border-[#FFD700]/70 bg-[#2B2500]/40"
              }`}
            >
              <h3 className="text-2xl font-semibold mb-2 text-[#FFD700]">{title}</h3>
              <p className="text-sm text-gray-300 mb-2">By {name}</p>
              <p
                className={`mb-3 font-medium ${
                  status === "approved"
                    ? "text-[#00C6FF]"
                    : status === "rejected"
                    ? "text-[#FF4E4E]"
                    : "text-[#FFD700]"
                }`}
              >
                Status: {status}
              </p>

              {featured && (
                <span className="inline-block mb-3 text-sm text-[#FFD700] font-semibold">
                  🌟 Featured
                </span>
              )}

              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#AFCFFF] hover:text-[#FFD700] transition-colors mb-4 block"
                >
                  View on X →
                </a>
              )}

              <div className="flex flex-wrap justify-between gap-2 mt-4">
                {status !== "approved" && (
                  <button
                    onClick={() => approveContent(id)}
                    className="bg-gradient-to-r from-[#004AAD] to-[#0078D7] text-white px-3 py-2 rounded-lg shadow-md hover:scale-105 transition-all text-sm"
                  >
                    Approve
                  </button>
                )}
                {status !== "rejected" && (
                  <button
                    onClick={() => rejectContent(id)}
                    className="bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-black font-semibold px-3 py-2 rounded-lg shadow-md hover:scale-105 transition-all text-sm"
                  >
                    Reject
                  </button>
                )}
                <button
                  onClick={() => deleteContent(id)}
                  className="bg-gradient-to-r from-[#3A3A3A] to-[#1A1A1A] text-white px-3 py-2 rounded-lg shadow-md hover:scale-105 transition-all text-sm"
                >
                  Delete
                </button>
                {!featured && status === "approved" && (
                  <button
                    onClick={() => featureContent(id)}
                    className="bg-gradient-to-r from-[#FFD700] to-[#004AAD] text-black font-bold px-3 py-2 rounded-lg shadow-md hover:scale-105 transition-all text-sm"
                  >
                    🌟 Feature
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
