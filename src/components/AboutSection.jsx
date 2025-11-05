import React from "react";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="relative py-20 px-6 text-center bg-gradient-to-b from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Background Overlay Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage:
            "url('/images/pharos-bg-pattern.jpg')", // use a soft pattern or placeholder
        }}
      ></div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          About Pharos Nigeria
        </motion.h2>

        <motion.p
          className="text-gray-700 leading-relaxed text-lg md:text-xl mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Pharos Nigeria is a regional community under the{" "}
          <span className="text-pharosGold font-semibold">
            Pharos Network
          </span>
          , dedicated to opening doors to the future of blockchain, leveraging the fastest EVM Layer 1 for trade and Real-World Asset (RWA) finance. Our mission is to create a strong, inclusive ecosystem that inspires innovation and collaboration.
        </motion.p>

        <motion.p
          className="text-gray-700 leading-relaxed text-lg md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Through weekly events, X-Spaces, and learning sessions, we’re
          connecting talented individuals, nurturing creativity, and driving
          the next wave of blockchain adoption in Nigeria and beyond.
        </motion.p>
      </div>
    </section>
  );
}
