import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import leadsData from "../data/communityLeads.json";

export default function CommunityLeadsPreview() {
  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-10">Meet Our Community Leads</h2>

      {/* Regional Moderators */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold text-pharosGold mb-6">Regional Moderators</h3>
        <div className="flex flex-wrap justify-center gap-8">
          {leadsData.regionalModerators.map((lead, index) => (
            <motion.div
              key={lead.id}
              className="bg-gray-50 rounded-2xl shadow-md hover:shadow-lg p-6 w-60 transition transform"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src={lead.image}
                alt={lead.name}
                className="w-24 h-24 object-cover rounded-full mx-auto mb-4 border-4 border-pharosGold"
              />
              <h4 className="text-lg font-semibold text-gray-900">{lead.name}</h4>
              <p className="text-gray-600 text-sm">{lead.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* OGs */}
      <div>
        <h3 className="text-xl font-semibold text-pharosTeal mb-6">OGs</h3>
        <div className="flex flex-wrap justify-center gap-8">
          {leadsData.ogs.map((og, index) => (
            <motion.div
              key={og.id}
              className="bg-gray-50 rounded-2xl shadow-md hover:shadow-lg p-6 w-60 transition transform"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src={og.image}
                alt={og.name}
                className="w-24 h-24 object-cover rounded-full mx-auto mb-4 border-4 border-pharosTeal"
              />
              <h4 className="text-lg font-semibold text-gray-900">{og.name}</h4>
              <p className="text-gray-600 text-sm">{og.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <Link
          to="/community"
          className="px-6 py-3 bg-pharosGold text-white font-semibold rounded-xl shadow hover:bg-pharosTeal transition"
        >
          Meet the Full Community →
        </Link>
      </div>
    </section>
  );
}
