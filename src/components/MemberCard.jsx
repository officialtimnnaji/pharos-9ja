import React from "react";
import { motion } from "framer-motion";

export default function MemberCard({ name, role, image }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 w-60 text-center"
    >
      <img
        src={image || "/images/members/placeholder.jpg"}
        alt={name}
        className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-4 border-pharosGold"
      />
      <h3 className="text-lg font-bold text-pharosNavy mb-1">{name}</h3>
      <p className="text-gray-600 text-sm">{role || "Member"}</p>
    </motion.div>
  );
}
