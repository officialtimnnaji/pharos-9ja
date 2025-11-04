import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Community from "./pages/Community";
import Events from "./pages/Events";
import Members from "./pages/Members";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-pharosGray">
      <Navbar />
      <main className="flex-grow pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/community" element={<Community />} />
          <Route path="/events" element={<Events />} />
          <Route path="/members" element={<Members />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
