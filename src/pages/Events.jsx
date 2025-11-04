import React from "react";
import { motion } from "framer-motion";
import eventsData from "../data/events.json";

export default function Events() {
  const ongoingEvents = eventsData.ongoing || [];
  const upcomingEvents = eventsData.upcoming || [];

  return (
    <main className="pt-24 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Page Heading */}
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Events
        </motion.h1>

        {/* Ongoing Events */}
        <section className="mb-20">
          <motion.h2
            className="text-3xl font-bold text-pharosGold mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ongoing Events
          </motion.h2>

          {ongoingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ongoingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg p-6 border border-gray-100 transition transform hover:-translate-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {event.date} • {event.time}
                  </p>
                  <p className="text-gray-700 mb-2">{event.guide}</p>
                  <p className="text-gray-500 text-sm italic">Host: {event.host}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">No ongoing events at the moment.</p>
          )}
        </section>

        {/* Upcoming Events */}
        <section className="mb-20">
          <motion.h2
            className="text-3xl font-bold text-pharosTeal mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Upcoming Events
          </motion.h2>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg p-6 border border-gray-100 transition transform hover:-translate-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {event.date} • {event.time}
                  </p>
                  <p className="text-gray-700 mb-2">{event.guide}</p>
                  <p className="text-gray-500 text-sm italic">Host: {event.host}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">No upcoming events at the moment.</p>
          )}
        </section>
      </div>
    </main>
  );
}
