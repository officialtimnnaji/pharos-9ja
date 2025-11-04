import React from "react";
import { motion } from "framer-motion";
import membersData from "../data/members.json";

export default function Members() {
  const members = membersData || [];

  return (
    <main className="pt-24 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Members
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg p-6 border border-gray-100 transition transform hover:-translate-y-1 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 object-cover rounded-full mx-auto mb-4 border-4 border-pharosGold"
              />
              <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
              <p className="text-gray-600 text-sm">
                {member.role || "Member"}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
