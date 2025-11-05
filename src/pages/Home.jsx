import React from "react";
import Slider from "../components/Slider";
import AboutSection from "../components/AboutSection";
import EventsPreview from "../components/EventsPreview";
import CommunityLeadsPreview from "../components/CommunityLeadsPreview";

export default function Home() {
  return (
    <main className="pt-20">
      <Slider />

      <section className="px-6 py-12 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-8
                       bg-gradient-to-r from-red-500 via-yellow-500 to-green-500
                       bg-clip-text text-transparent">
          Welcome to Pharos Nigeria
        </h1>
        <AboutSection />
      </section>

      <EventsPreview />
      <CommunityLeadsPreview />
    </main>
  );
}
