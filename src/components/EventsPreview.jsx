import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import eventsData from "../data/events.json";

export default function EventsPreview() {
  // Ensure eventsData is an array
  const eventsArray = Array.isArray(eventsData)
    ? eventsData
    : eventsData.events || [];

  const upcomingEvents = eventsArray.slice(0, 3); // Only show first 3

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white via-gray-50 to-pharosGradient">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Upcoming Events
        </motion.h2>

        {/* Event Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div
                  className="h-48 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${event.image || "/images/event-placeholder.jpg"})`,
                  }}
                ></div>
                <div className="p-6 text-left">
                  <h3 className="text-xl font-bold text-pharosGold mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {event.date} • {event.time}
                  </p>
                  <p className="text-gray-700 line-clamp-3 mb-4">
                    {event.description}
                  </p>
                  <Link
                    to="/events"
                    className="text-pharosGreen font-semibold hover:underline"
                  >
                    View Details →
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-600 text-lg">
              No upcoming events at the moment. Stay tuned!
            </p>
          )}
        </div>

        {/* View All Button */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Link
            to="/events"
            className="inline-block bg-gradient-to-r from-pharosGreen to-pharosGold text-white py-3 px-8 rounded-full font-semibold shadow-md hover:opacity-90 transition"
          >
            View All Events
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
