import React from "react";
import members from "../data/members.json"; // default import for JSON
import MemberCard from "../components/MemberCard";

export default function Members() {
  return (
    <div className="pt-28 p-8 max-w-6xl mx-auto"> {/* pt-28 to avoid header overlap */}
      <h1 className="text-4xl font-bold text-pharosGold mb-8 text-center">
        Community Members
      </h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {members.map((member) => (
          <MemberCard
            key={member.id}
            name={member.name}
            role={member.role}
            image={member.image}
          />
        ))}
      </div>
    </div>
  );
}
