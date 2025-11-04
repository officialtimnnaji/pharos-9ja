import React from "react";
import { motion } from "framer-motion";

export default function EventCard({ title, date, time, host, guide }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 w-80 text-left border border-gray-100"
    >
      <h3 className="text-xl font-bold text-pharosNavy mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-1">
        <span className="font-semibold">Date:</span> {date}
      </p>
      <p className="text-sm text-gray-500 mb-1">
        <span className="font-semibold">Time:</span> {time}
      </p>
      <p className="text-sm text-gray-500 mb-3">
        <span className="font-semibold">Host:</span> {host}
      </p>
      <p className="text-gray-700">{guide}</p>
    </motion.div>
  );
}
