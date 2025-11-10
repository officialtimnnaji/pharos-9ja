// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public pages
import Home from "./pages/Home";
import Announcements from "./pages/Announcements";
import Content from "./pages/Content";
import Community from "./pages/Community";

import Events from "./pages/Events";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminApprovals from "./pages/admin/AdminApprovals";
import AdminAnnouncements from "./pages/admin/AdminAnnouncements";
import AdminContentApproval from "./pages/admin/AdminContentApproval";

function App() {
  return (
    <div className="pharos-bg min-h-screen text-white">
      <Navbar />

      <main className="pt-20">
        <Routes>
          {/* ✅ Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/content" element={<Content />} />
          <Route path="/community" element={<Community />} />

          <Route path="/events" element={<Events />} />

          {/* ✅ Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/approvals" element={<AdminApprovals />} />
          <Route path="/admin/announcements" element={<AdminAnnouncements />} />
          <Route path="/admin/content-approval" element={<AdminContentApproval />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
