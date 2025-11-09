import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("✅ Welcome back, Admin!");
      navigate("/admin/approvals");
    } catch (error) {
      toast.error("❌ Invalid credentials or login error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#00132B] via-[#002B5B] to-[#001F3F] text-white">
      <Toaster position="top-right" />

      {/* Card */}
      <div className="w-[90%] max-w-md bg-[#001B3D]/70 backdrop-blur-lg border border-[#004AAD]/40 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-[#FFD700] to-[#004AAD] bg-clip-text text-transparent">
          Admin Login
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <div>
            <label className="block mb-1 text-[#FFD700] font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#001F3F]/60 border border-[#004AAD]/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-[#FFD700] font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#001F3F]/60 border border-[#004AAD]/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-4 rounded-lg font-semibold text-black transition-all duration-300 shadow-lg
              ${
                loading
                  ? "bg-gradient-to-r from-[#AFAFAF] to-[#5A5A5A] cursor-not-allowed"
                  : "bg-gradient-to-r from-[#FFD700] to-[#B8860B] hover:scale-105"
              }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Need help?{" "}
          <span className="text-[#FFD700] hover:underline cursor-pointer">
            Contact Super Admin
          </span>
        </p>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-sm text-gray-400">
        © {new Date().getFullYear()} Pharos Nigeria Admin Portal
      </footer>
    </div>
  );
}
