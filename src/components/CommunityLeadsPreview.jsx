import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import leadsData from "../data/communityLeads.json";

export default function CommunityLeadsPreview() {
  return (
    <section className="py-16 bg-background-light text-center">
      <h2 className="text-3xl font-bold text-darkText mb-10">
        Meet Our Community Leads
      </h2>

      {/* Regional Moderators */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold text-primary mb-6">
          
        </h3>
        <div className="flex flex-wrap justify-center gap-8">
          {leadsData.regionalModerators.map((lead, index) => (
            <motion.div
              key={lead.id}
              className="relative card w-60"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src={lead.image}
                alt={lead.name}
                className="w-24 h-24 object-cover rounded-full mx-auto mb-4 border-4 border-secondary"
              />
              <h4 className="text-lg font-semibold text-darkText">{lead.name}</h4>
              <p className="text-gray-500 text-sm">{lead.role}</p>
            </motion.div>
          ))}
        </div>
      </div>



      {/* OGs */}
      <div>
        <h3 className="text-xl font-semibold text-upcoming mb-6">
          
          



        </h3>
        <div className="flex flex-wrap justify-center gap-8">
          {leadsData.ogs.map((og, index) => (
            <motion.div
              key={og.id}
              className="relative card w-60"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src={og.image}
                alt={og.name}
                className="w-24 h-24 object-cover rounded-full mx-auto mb-4 border-4 border-secondary"
              />
              <h4 className="text-lg font-semibold text-darkText">{og.name}</h4>
              <p className="text-gray-500 text-sm">{og.role}</p>
            </motion.div>
          ))}
        </div>
      </div>


      {/* Call to Action */}
      <div className="mt-12">
        <Link
          to="/community"
          className="px-6 py-3 bg-primary text-white font-semibold rounded-xl shadow hover:bg-upcoming transition-colors duration-300"
        >
          Meet the Full Community →
        </Link>
      </div>
    </section>
  );
}
