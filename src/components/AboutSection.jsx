// src/sections/AboutSection.jsx
import React from "react";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="relative py-24 px-6 text-center overflow-hidden bg-gradient-to-b from-[#f8e3cc] via-[#c9ddef] to-[#4e9bfa]/20">
      {/* Animated soft background gradient */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(12,107,228,0.25),_transparent_70%),radial-gradient(ellipse_at_bottom_right,_rgba(107,15,26,0.25),_transparent_70%)] animate-[pulse_10s_ease-in-out_infinite]"
      ></div>

      {/* Content container */}
      <div className="relative max-w-5xl mx-auto text-center z-10">
        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-[#6b0f1a] via-[#0c6be4] to-[#4e9bfa] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          About Pharos Connect
        </motion.h2>

        {/* Divider */}
        <motion.div
          className="w-24 h-1 mx-auto mb-10 rounded-full bg-gradient-to-r from-[#6b0f1a] via-[#f8e3cc] to-[#0c6be4]"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        />

        {/* About paragraph */}
        <motion.p
          className="text-gray-800 leading-relaxed text-lg md:text-xl font-medium mb-8"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <span className="font-semibold text-[#6b0f1a]">Pharos Connect</span> is a
          collaborative platform under the{" "}
          <span className="font-semibold text-[#0c6be4]">Pharos Network</span>,
          where sailors, creators, and the wider community converge to share ideas,
          collaborate, and stay informed about everything happening across our vibrant
          ecosystem. It serves as the bridge connecting people, innovation, and
          opportunities across the Pharos world.
        </motion.p>

        {/* Mission header */}
        <motion.h3
          className="text-3xl md:text-4xl font-bold mt-14 mb-5 bg-gradient-to-r from-[#0c6be4] via-[#4e9bfa] to-[#6b0f1a] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Our Mission
        </motion.h3>

        {/* Mission paragraph */}
        <motion.p
          className="text-gray-800 leading-relaxed text-lg md:text-xl font-medium max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          To drive the next wave of adoption for the{" "}
          <span className="text-[#0c6be4] font-semibold">Pharos Network</span> —
          the fastest Layer-1 solution for Real World Asset finance and cross-chain
          liquidity. By creating a unified space where everyone can stay updated,
          engage, and grow together, Pharos Connect empowers the community to lead
          innovation and collaboration within the local andglobal Pharos ecosystem.
        </motion.p>
      </div>
    </section>
  );
}
