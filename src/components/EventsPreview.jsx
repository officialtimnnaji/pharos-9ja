// src/components/EventsPreview.jsx
import React from "react";
import jsonEvents from "../data/events.json";

export default function EventsPreview() {
  // ✅ 1. Your hard-coded Ongoing Event
  const hardcodedOngoing = [
    {
      id: "hardcoded-1",
      title: "Week1 Pathfinder Campaign",
      date: "6–12th November, 2025",
      time: "",
      host: "Pharos Team",
      guide: `
Make a 1-page guide or X thread that explains AquaFlux’s three tokens: P, C & S and who they help.

How:
1. Create the guide.
2. Post it on X.
3. Tag official Pharos Network and Aquaflux.
4. Add #PharosPathfinders & #Week1 hashtags.
5. Also post it in the Discord channel.

Rewards:
• Top 10 go to a community vote.
• 5 winners.
• Top 3 each week get a special “Pathfinder” role, spotlight on Pharos, merch, and a chance to become Campaign Champion.

Good luck!`,
    },
  ];

  // ✅ 2. Load events from events.json
  const { ongoing = [], upcoming = [], past = [] } = jsonEvents;

  // ✅ 3. Merge hard-coded + json (remove duplicates by ID)
  const mergedOngoing = [
    ...hardcodedOngoing,
    ...ongoing.filter((event) => event.id !== "hardcoded-1"),
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-20">

      {/* ✅ ONGOING EVENTS */}
      <section className="rounded-3xl p-8 bg-gradient-to-br from-[#f8e3cc]/60 via-[#ffe9d6]/40 to-[#f8e3cc]/30 shadow-lg backdrop-blur-xl">
        <h2 className="text-3xl font-bold text-[#b10f0f] mb-8">🔥 Ongoing Events</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {mergedOngoing.map((event) => (
            <div
              key={event.id}
              className="pharos-soft-hover bg-white/70 rounded-2xl border border-[#b10f0f]/20 p-6 shadow-md relative"
            >
              <h3 className="text-xl font-semibold text-[#b10f0f]">{event.title}</h3>
              <p className="text-gray-700">{event.date} {event.time}</p>
              <p className="mt-2 text-gray-900"><strong>Host:</strong> {event.host}</p>

              <p className="mt-3 whitespace-pre-line text-gray-800">{event.guide}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ UPCOMING EVENTS */}
      <section className="rounded-3xl p-8 bg-gradient-to-br from-[#c9ddef]/60 via-[#dbe9ff]/40 to-[#c9ddef]/20 shadow-lg backdrop-blur-xl">
        <h2 className="text-3xl font-bold text-[#0c6be4] mb-8">📅 Upcoming Events</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {upcoming.length > 0 ? (
            upcoming.map((event) => (
              <div
                key={event.id}
                className="pharos-soft-hover bg-white/70 rounded-2xl border border-[#0c6be4]/20 p-6 shadow-md"
              >
                <h3 className="text-xl font-semibold text-[#0c6be4]">{event.title}</h3>
                <p className="text-gray-700">{event.date} {event.time}</p>
                <p className="mt-2 text-gray-900"><strong>Host:</strong> {event.host}</p>
                <p className="mt-1 whitespace-pre-line text-gray-800">{event.guide}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No upcoming events yet.</p>
          )}
        </div>
      </section>

      {/* ✅ PAST EVENTS */}
      {past.length > 0 && (
        <section className="rounded-3xl p-8 bg-gradient-to-br from-[#0007b7]/15 via-[#4e9bfa]/10 to-[#c9ddef]/10 shadow-lg backdrop-blur-xl">
          <h2 className="text-3xl font-bold text-[#4e9bfa] mb-8">⏳ Past Events</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {past.map((event) => (
              <div
                key={event.id}
                className="pharos-soft-hover opacity-70 bg-white/50 rounded-2xl border border-[#4e9bfa]/20 p-6 shadow-md relative"
              >
                <h3 className="text-xl font-semibold text-[#4e9bfa]">{event.title}</h3>
                <p className="text-gray-700">{event.date} {event.time}</p>
                <p className="mt-2 text-gray-900"><strong>Host:</strong> {event.host}</p>
                <p className="mt-1 whitespace-pre-line text-gray-800">{event.guide}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
