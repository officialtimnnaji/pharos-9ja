// src/components/EventsPreview.jsx
import React from "react";
import eventsData from "../data/events.json";

export default function EventsPreview() {
  const { ongoing, upcoming, past } = eventsData;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-20">

      {/* ✅ ONGOING EVENTS */}
      <section className="rounded-3xl p-8 bg-gradient-to-br from-[#f8e3cc]/60 via-[#ffe9d6]/40 to-[#f8e3cc]/30 shadow-lg backdrop-blur-xl">
        <h2 className="text-3xl font-bold text-[#b10f0f] mb-8">
          🔥 Ongoing Events
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {(ongoing || []).map((event) => (
            <div
              key={event.id}
              className="pharos-soft-hover bg-white/70 rounded-2xl border border-[#b10f0f]/20 p-6 shadow-md relative"
            >
              <h3 className="text-xl font-semibold text-[#b10f0f]">
                {event.title}
              </h3>
              <p className="text-gray-700">{event.date} | {event.time}</p>
              <p className="mt-2 text-gray-900">
                <strong>Host:</strong> {event.host}
              </p>
              <p className="mt-1 text-gray-800">{event.guide}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ UPCOMING EVENTS */}
      <section className="rounded-3xl p-8 bg-gradient-to-br from-[#c9ddef]/60 via-[#dbe9ff]/40 to-[#c9ddef]/20 shadow-lg backdrop-blur-xl">
        <h2 className="text-3xl font-bold text-[#0c6be4] mb-8">
          📅 Upcoming Events
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {(upcoming || []).map((event) => (
            <div
              key={event.id}
              className="pharos-soft-hover bg-white/70 rounded-2xl border border-[#0c6be4]/20 p-6 shadow-md relative"
            >
              <h3 className="text-xl font-semibold text-[#0c6be4]">
                {event.title}
              </h3>

              <p className="text-gray-700">{event.date} | {event.time}</p>

              <p className="mt-2 text-gray-900">
                <strong>Host:</strong> {event.host}
              </p>

              <p className="mt-1 text-gray-800">{event.guide}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ PAST EVENTS */}
      {past && past.length > 0 && (
        <section className="rounded-3xl p-8 bg-gradient-to-br from-[#0007b7]/15 via-[#4e9bfa]/10 to-[#c9ddef]/10 shadow-lg backdrop-blur-xl">
          <h2 className="text-3xl font-bold text-[#4e9bfa] mb-8">
            ⏳ Past Events
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {past.map((event) => (
              <div
                key={event.id}
                className="pharos-soft-hover opacity-70 bg-white/50 rounded-2xl border border-[#4e9bfa]/20 p-6 shadow-md relative"
              >
                <h3 className="text-xl font-semibold text-[#4e9bfa]">
                  {event.title}
                </h3>

                <p className="text-gray-700">{event.date} | {event.time}</p>

                <p className="mt-2 text-gray-900">
                  <strong>Host:</strong> {event.host}
                </p>

                <p className="mt-1 text-gray-800">{event.guide}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
