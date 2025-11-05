import React from "react";
import { communityData } from "../data/community";
import MemberCard from "../components/MemberCard";

export default function Community() {
  const { leads, ogs, contributors } = communityData;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-pharosGold mb-8 text-center">
        Meet Our Community
      </h1>

      {/* Leads */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-pharosBlue mb-6">Community Leads</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {(leads || []).map((lead) => (
            <MemberCard
              key={lead.id}
              name={lead.name}
              role={lead.role}
              image={lead.image}
            />
          ))}
        </div>
      </section>

      {/* OGs */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-pharosPurple mb-6">OG Members</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {(ogs || []).map((og) => (
            <MemberCard
              key={og.id}
              name={og.name}
              role={og.role}
              image={og.image}
            />
          ))}
        </div>
      </section>

      {/* Contributors */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-pharosGreen mb-6">Contributors</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {(contributors || []).map((contributor) => (
            <MemberCard
              key={contributor.id}
              name={contributor.name}
              role={contributor.role}
              image={contributor.image}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
