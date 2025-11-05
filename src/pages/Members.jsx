import React from "react";
import MemberCard from "../components/MemberCard";
import membersData from "../data/members.json";

export default function Members() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-pharosGold mb-8 text-center">
        Community Members
      </h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {membersData.map((member) => (
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
