"use client";

import React, { useState } from "react";
import { CiGrid41, CiPen } from "react-icons/ci";
import {
  FcGraduationCap,
  FcKindle,
  FcReading,
  FcBullish,
  FcHeatMap,
  FcIdea,
  FcProcess,
} from "react-icons/fc";

export const teams = [
  {
    id: 1,
    team_name: "Business Assessment & Research",
    value: "Business Assessment & Research",
  },
  {
    id: 2,
    team_name: "Disrupttech & Technical Businees",
    value: "Disrupttech & Technical Businees",
  },
  {
    id: 3,
    team_name: "Digital Transformation",
    value: "Digital Transformation",
  },
  {
    id: 4,
    team_name: "Digital Innovation & Organization",
    value: "Digital Innovation & Organization",
  },
  {
    id: 5,
    team_name: "Strategic Planning",
    value: "Strategic Planning",
  },
  {
    id: 6,
    team_name: "Telecom Media & Technology",
    value: "Telecom Media & Technology",
  },
];

function FilterKnowledge({ setSortCategory }) {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="flex justify-center">
        <button
          onClick={() => setSortCategory("All")}
          className="flex justify-center items-center gap-2 bg-violet-100 text-violet-600 px-3 py-3 rounded-full shadow-md hover:bg-violet-600 hover:text-white"
        >
          <CiGrid41 />
          <p className="text-sm">All</p>
        </button>
      </div>

      {teams.map((team) => (
        <div className="flex justify-center" key={team}>
          <button
            onClick={() => setSortCategory(team)}
            className={
              team.id === 1
                ? "flex justify-center items-center gap-2 bg-emerald-100 text-emerald-600 px-2 py-3 rounded-full shadow-md hover:bg-emerald-600 hover:text-white"
                : team.id === 2
                ? "flex justify-center items-center gap-2 bg-stone-100 text-stone-600 px-2 py-3 rounded-full shadow-md hover:bg-stone-600 hover:text-white"
                : team.id === 3
                ? "flex justify-center items-center gap-2 bg-orange-100 text-orange-600 px-2 py-3 rounded-full shadow-md hover:bg-orange-600 hover:text-white"
                : team.id === 4
                ? "flex justify-center items-center gap-2 bg-amber-100 text-amber-600 px-2 py-3 rounded-full shadow-md hover:bg-amber-600 hover:text-white"
                : team.id === 5
                ? "flex justify-center items-center gap-2 bg-cyan-100 text-cyan-600 px-2 py-3 rounded-full shadow-md hover:bg-cyan-600 hover:text-white"
                : team.id === 6
                ? "flex justify-center items-center gap-2 bg-pink-100 text-pink-600 px-2 py-3 rounded-full shadow-md hover:bg-pink-600 hover:text-white"
                : null
            }
          >
            {team.id === 1 ? (
              <FcGraduationCap size={20} />
            ) : team.id === 2 ? (
              <FcKindle size={20} />
            ) : team.id === 3 ? (
              <FcReading size={20} />
            ) : team.id === 4 ? (
              <FcProcess size={20} />
            ) : team.id === 5 ? (
              <FcHeatMap size={20} />
            ) : team.id === 6 ? (
              <FcIdea size={20} />
            ) : null}

            <p className="text-sm">{team.team_name}</p>
          </button>
        </div>
      ))}
      {/* <div className="flex justify-center">
        <button className="flex justify-center items-center gap-2 bg-cyan-100 text-cyan-600 px-2 py-3 rounded-full shadow-md hover:bg-cyan-600 hover:text-white">
          <FcGraduationCap size={20} />
          <p className="text-sm">Knowledge Sharing</p>
        </button>
      </div>

      <div className="flex justify-center">
        <button className="flex justify-center items-center gap-2 bg-green-100 text-green-600 px-2 py-3 rounded-full shadow-md hover:bg-green-600 hover:text-white">
          <FcKindle size={20} />
          <p className="text-sm">Documentation</p>
        </button>
      </div>

      <div className="flex justify-center">
        <button className="flex justify-center items-center gap-2 bg-yellow-100 text-yellow-600 px-2 py-3 rounded-full shadow-md hover:bg-yellow-600 hover:text-white">
          <FcReading size={20} />
          <p className="text-sm">Onboarding</p>
        </button>
      </div>
      <div className="flex justify-center">
        <button className="flex justify-center items-center gap-2 bg-blue-100 text-blue-600 px-2  py-3 rounded-full shadow-md hover:bg-blue-600 hover:text-white">
          <FcProcess size={20} />
          <p className="text-sm">Continuous Improvement</p>
        </button>
      </div>
      <div className="flex justify-center">
        <button className="flex justify-center items-center gap-2 bg-teal-100 text-teal-600 px-2 py-3 rounded-full shadow-md hover:bg-teal-600 hover:text-white">
          <FcHeatMap size={20} />
          <p className="text-sm">Work Process</p>
        </button>
      </div>
      <div className="flex justify-center">
        <button className="flex justify-center items-center gap-2 bg-orange-100 text-orange-600 px-2 py-3 rounded-full shadow-md hover:bg-orange-600 hover:text-white">
          <FcIdea size={20} />
          <p className="text-sm">KM Tools and Technology</p>
        </button>
      </div> */}
    </div>
  );
}

export default FilterKnowledge;
