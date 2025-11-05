import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Community from "./pages/Community";
import Events from "./pages/Events";
import Members from "./pages/Members";

export default function App() {
  return (
    <Router> {/* ONLY ONE Router */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/community" element={<Community />} />
        <Route path="/events" element={<Events />} />
        <Route path="/members" element={<Members />} />
      </Routes>
    </Router>
  );
}
