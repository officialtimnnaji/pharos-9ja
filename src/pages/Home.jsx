import React from "react";
import Slider from "../components/Slider";
import AboutSection from "../components/AboutSection";
import EventsPreview from "../components/EventsPreview";
import CommunityLeadsPreview from "../components/CommunityLeadsPreview";

export default function Home() {
  return (
    <main className="pt-20">
      <Slider />
      <AboutSection />
      <EventsPreview />
      <CommunityLeadsPreview />
    </main>
  );
}
