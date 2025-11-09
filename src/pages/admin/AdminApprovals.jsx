import React, { useEffect, useState, useRef } from "react";
import { collection, query, onSnapshot, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

export default function AdminApprovals() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const prevSubmissionsRef = useRef([]);

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

  // Real-time listener for submissions
  useEffect(() => {
  const q = query(collection(db, "communityContent"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setSubmissions(data);

    // Optional: toast new submissions
    const previousIds = prevSubmissionsRef.current.map((item) => item.id);
    const newSubmissions = data.filter((item) => !previousIds.includes(item.id));
    if (newSubmissions.length > 0) {
      newSubmissions.forEach((item) => toast(`🆕 New submission: ${item.title} by ${item.name}`, { icon: "🚀", duration: 5000 }));
    }

    prevSubmissionsRef.current = data;
    setLoading(false);
  });

  return () => unsubscribe();
}, []);

  // Count pending submissions
  const pendingCount = submissions.filter((s) => s.status === "pending").length;

  const approveContent = async (id) => {
    try {
      await updateDoc(doc(db, "communityContent", id), { status: "approved" });
      toast.success("✅ Post approved successfully!");
    } catch (error) {
      console.error(error);
      toast.error("❌ Error approving post");
    }
  };

  const rejectContent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this submission?")) return;
    try {
      await deleteDoc(doc(db, "communityContent", id));
      toast.success("🗑️ Post deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("❌ Error deleting post");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("❌ Logout failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black text-white">
        <p>Loading submissions...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white">
      <Toaster position="top-right" />

      {/* Sticky top bar */}
      <div className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-md flex justify-between items-center px-6 md:px-16 py-4 border-b border-gray-700">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 bg-clip-text text-transparent relative">
          Admin Approvals
          {pendingCount > 0 && (
            <span className="absolute -top-2 -right-10 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full shadow-lg">
              {pendingCount}
            </span>
          )}
        </h2>

        <button
          onClick={handleLogout}
          className="bg-red-700 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="px-6 md:px-16 py-12 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {submissions.length === 0 ? (
          <p className="text-center text-gray-400 col-span-full">No submissions found.</p>
        ) : (
          submissions.map(({ id, name, title, link, status }) => (
            <div
              key={id}
              className={`p-6 rounded-2xl shadow-lg border ${
                status === "approved"
                  ? "border-green-500 bg-green-900/20"
                  : "border-yellow-500 bg-yellow-900/20"
              }`}
            >
              <h3 className="text-2xl font-semibold mb-2 text-yellow-400">{title}</h3>
              <p className="text-sm text-gray-400 mb-2">By {name}</p>
              <p
                className={`mb-3 font-medium ${
                  status === "approved" ? "text-green-400" : "text-yellow-400"
                }`}
              >
                Status: {status}
              </p>
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-yellow-400 transition-colors mb-4 block"
                >
                  View on X →
                </a>
              )}
              <div className="flex justify-between mt-4">
                {status !== "approved" && (
                  <button
                    onClick={() => approveContent(id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition-all"
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={() => rejectContent(id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition-all"
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
