import React from "react";
import { motion } from "framer-motion";
import communityData from "../data/community.json";
import MemberCard from "../components/MemberCard";

export default function Community() {
  return (
    <section className="p-8 text-center bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-pharosGold mb-10"
      >
        Meet Our Community
      </motion.h2>

      {/* Community Leads */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-16"
      >
        <h3 className="text-2xl font-bold text-pharosNavy mb-6">
          Community Leads
        </h3>
        <div className="flex flex-wrap justify-center gap-6">
          {(communityData.leads || []).map((lead, index) => (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <MemberCard {...lead} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Community OGs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-pharosNavy mb-6">
          Community OGs
        </h3>
        <div className="flex flex-wrap justify-center gap-6">
          {(communityData.ogs || []).map((og, index) => (
            <motion.div
              key={og.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 + 0.4, duration: 0.5 }}
            >
              <MemberCard {...og} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
