// src/pages/Home.jsx
import React from "react";
import Slider from "../components/Slider";
import AboutSection from "../components/AboutSection";
import EventsPreview from "../components/EventsPreview";
import CommunityLeadsPreview from "../components/CommunityLeadsPreview";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="min-h-screen">

      <Slider />

      {/* About Section */}
      <section className="px-6 py-16 max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-8 bg-gradient-to-r from-[#0c6be4] via-[#4e9bfa] to-[#f8e3cc] bg-clip-text text-transparent">
          Welcome to Pharos Connect
        </h1>

        <AboutSection />
      </section>

      {/* Events + Leads */}
      <EventsPreview />
      <CommunityLeadsPreview />

      {/* CTA */}
      <section className="py-20 text-center mt-20 bg-gradient-to-r from-[#0007b7]/40 via-[#0c6be4]/40 to-[#4e9bfa]/40 backdrop-blur-lg border-t border-[#4e9bfa]/20">
        <h2 className="text-3xl md:text-4xl font-bold text-[#f8e3cc] mb-4">
          Share Your Content With Pharos
        </h2>

        <p className="text-[#c9ddef] mb-8">
          Got an X/Twitter post the Pharos community should see? Submit it for review!
        </p>

        <Link
          to="/content"
          className="bg-gradient-to-r from-[#0c6be4] via-[#4e9bfa] to-[#f8e3cc] text-white font-semibold px-10 py-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
        >
          𝕏 Share Your Content
        </Link>
      </section>

    </section>
  );
}
