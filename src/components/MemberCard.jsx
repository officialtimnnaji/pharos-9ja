import React from "react";

export default function MemberCard({ name, role, image }) {
  return (
    <div className="card flex flex-col items-center text-center">
      <img
        src={image}
        alt={name}
        className="w-24 h-24 mb-4 rounded-full border-4 border-pharosGold object-cover"
      />
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-gray-600">{role}</p>
    </div>
  );
}
