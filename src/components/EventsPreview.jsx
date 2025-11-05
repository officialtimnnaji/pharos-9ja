import React from "react";
import eventsData from "../data/events.json";

export default function EventsPreview() {
  const { ongoing, upcoming, past } = eventsData;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Ongoing Events */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-pharosGold mb-6">Ongoing Events</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {(ongoing || []).map((event) => (
            <div key={event.id} className="card">
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p className="text-gray-600">{event.date} | {event.time}</p>
              <p className="mt-2 text-gray-800"><strong>Host:</strong> {event.host}</p>
              <p className="mt-1">{event.guide}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-pharosBlue mb-6">Upcoming Events</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {(upcoming || []).map((event) => (
            <div key={event.id} className="card">
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p className="text-gray-600">{event.date} | {event.time}</p>
              <p className="mt-2 text-gray-800"><strong>Host:</strong> {event.host}</p>
              <p className="mt-1">{event.guide}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Past Events */}
      {past && past.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-pharosPurple mb-6">Past Events</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {past.map((event) => (
              <div key={event.id} className="card opacity-70">
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <p className="text-gray-600">{event.date} | {event.time}</p>
                <p className="mt-2 text-gray-800"><strong>Host:</strong> {event.host}</p>
                <p className="mt-1">{event.guide}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
