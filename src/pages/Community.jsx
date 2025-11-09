// src/pages/Community.jsx
import React, { useState } from "react";
import communityData from "../data/Community.json";

export default function Community() {
  const {
    officialTeam = [],
    moderators = [],
    regionalModerators = [],
    underwaterMonsters = [],
    ogs = [],
    contributors = [],
    storytellers = [],
    communityMembers = [],
  } = communityData || {};

  const allMembers = [
    ...officialTeam,
    ...moderators,
    ...regionalModerators,
    ...underwaterMonsters,
    ...ogs,
    ...contributors,
    ...storytellers,
    ...communityMembers,
  ];

  const [selectedIndex, setSelectedIndex] = useState(null);
  const selectedMember =
    selectedIndex !== null ? allMembers[selectedIndex] : null;

  const goNext = () =>
    setSelectedIndex((prev) =>
      prev === allMembers.length - 1 ? 0 : prev + 1
    );

  const goPrev = () =>
    setSelectedIndex((prev) =>
      prev === 0 ? allMembers.length - 1 : prev - 1
    );

  // ✅ Modal Component
  const Modal = ({ member, onClose }) => {
    if (!member) return null;

    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex justify-center items-center z-50">

        {/* ✅ Wallpaper (dimmed & softened) */}
        <div
          className="absolute inset-0 bg-cover bg-center  brightness-50 blur-sm"
          style={{
            backgroundImage: "url('/images/modalwall.jpg')",
          }}
        ></div>

        {/* ✅ Modal Box */}
        <div
          className="relative rounded-2xl shadow-2xl p-8 w-11/12 md:w-1/2 lg:w-[40%]
                     animate-[popIn_0.3s_ease] overflow-hidden bg-white/80 backdrop-blur-xl"
        >
          {/* ✅ Glowing Border */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none border-2 border-[#6b0f1a]/60 shadow-[0_0_25px_rgba(107,15,26,0.5)]"></div>

          {/* ✅ Content */}
          <div className="relative z-20">
            {/* Close */}
            <button
              className="absolute top-4 right-6 text-gray-700 hover:text-[#6b0f1a] text-2xl"
              onClick={onClose}
            >
              ✕
            </button>

            {/* Prev */}
            <button
              onClick={goPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 
                         bg-[#6b0f1a]/40 hover:bg-[#6b0f1a]/60 text-white 
                         font-bold text-xl w-10 h-10 flex items-center justify-center 
                         rounded-full shadow-md"
            >
              ‹
            </button>

            {/* Next */}
            <button
              onClick={goNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 
                         bg-[#6b0f1a]/40 hover:bg-[#6b0f1a]/60 text-white 
                         font-bold text-xl w-10 h-10 flex items-center justify-center 
                         rounded-full shadow-md"
            >
              ›
            </button>

            {/* CONTENT */}
            <div className="flex flex-col items-center text-center mt-8">

              {/* Avatar */}
              <div className="w-32 h-32 mb-4 rounded-full overflow-hidden 
                              border-4 border-[#6b0f1a]/70 shadow-xl">
                <img
                  src={member.image || "/images/placeholder-profile.png"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* ✅ Clickable Name */}
              {member.twitter ? (
                <a
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-4xl font-extrabold text-[#1a1a1a] 
                             drop-shadow-sm hover:text-[#6b0f1a] transition-colors"
                >
                  {member.name}
                </a>
              ) : (
                <h2 className="text-4xl font-extrabold text-[#1a1a1a] drop-shadow-sm">
                  {member.name}
                </h2>
              )}

              {/* ✅ Stronger Role Text */}
              <p className="text-[#6b0f1a] font-semibold text-lg mt-2 drop-shadow">
                {member.role}
              </p>

              {/* ✅ Improved BIO (stronger background & clarity) */}
              {member.bio && (
                <p
                  className="mt-5 text-[#1a1a1a] font-medium leading-relaxed px-5 py-4
                             bg-white/90 backdrop-blur-md rounded-xl 
                             border border-[#6b0f1a]/30 shadow-md text-base"
                >
                  {member.bio}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ✅ Section (cards)
  const Section = ({ title, members }) => {
    if (!members.length) return null;

    return (
      <section className="mb-16">
        <h3 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r 
                       from-[#6b0f1a] via-[#4e9bfa] to-[#6b0f1a] 
                       bg-clip-text text-transparent">
          {title}
        </h3>

        <div className="max-w-5xl mx-auto grid gap-10 
                        sm:grid-cols-2 lg:grid-cols-3 place-items-center">
          {members.map((m) => {
            const globalIndex = allMembers.findIndex(
              (mem) => mem.id === m.id
            );

            return (
              <div
                key={m.id}
                onClick={() => setSelectedIndex(globalIndex)}
                className="relative group bg-white/40 backdrop-blur-md border 
                           border-[#6b0f1a]/30 rounded-2xl shadow-md 
                           overflow-hidden p-6 w-72 cursor-pointer 
                           transition-transform hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden 
                                border-4 border-[#6b0f1a]/50 shadow">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h4 className="text-xl font-semibold text-center text-[#1a1a1a] 
                               relative group-hover:text-[#6b0f1a]">
                  {m.name}
                  <span className="absolute left-1/2 -bottom-1 w-0 h-[2px] 
                                   bg-[#6b0f1a] transition-all duration-300 
                                   group-hover:w-full group-hover:left-0"></span>
                </h4>

                <p className="text-sm text-center text-[#6b0f1a] font-medium mt-1">
                  {m.role}
                </p>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 
                                bg-gradient-to-br from-[#6b0f1a]/40 to-[#4e9bfa]/40 
                                transition-opacity"></div>
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  return (
    <section className="min-h-screen px-6 md:px-16 py-20 bg-[#f8e3cc] text-[#1a1a1a]">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 
                     bg-gradient-to-r from-[#6b0f1a] via-[#4e9bfa] to-[#6b0f1a] 
                     bg-clip-text text-transparent">
        Meet Our Community
      </h2>

      <p className="text-center text-[#6b0f1a]/80 mb-16 max-w-2xl mx-auto">
        The vibrant minds and leaders driving Pharos Nigeria forward — 
        building, connecting, and inspiring our blockchain ecosystem.
      </p>

      <Section title="Pharos Team" members={officialTeam} />
      <Section title="Moderators" members={moderators} />
      <Section title="Regional Moderators" members={regionalModerators} />
      <Section title="Underwater Monsters" members={underwaterMonsters} />
      <Section title="OGs" members={ogs} />
      <Section title="Contributors" members={contributors} />
      <Section title="Storytellers" members={storytellers} />
      <Section title="Community Members" members={communityMembers} />

      <Modal member={selectedMember} onClose={() => setSelectedIndex(null)} />
    </section>
  );
};
