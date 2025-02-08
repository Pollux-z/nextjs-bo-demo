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

import { GoSearch } from "react-icons/go";
import { RiTeamLine } from "react-icons/ri";

import { BiSort } from "react-icons/bi";

import { FaSortNumericDown, FaSortNumericDownAlt } from "react-icons/fa";

import { GrPowerReset } from "react-icons/gr";
import { useUsersJoinBillabilityProject } from "@/app/services/queries";
import { UsersType } from "@/interfaces/User";

import { CategorysShare } from "@/app/db/option";

type FilterType = {
  handleSearch: (search: string) => void;
  handleFilter: (category: string) => void;
};

const FilterKnowledge: React.FC<FilterType> = ({
  handleSearch,
  handleFilter,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("All");

  console.log(filterStatus);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    handleSearch(value);
  };

  const handleInputFilter = (category: string) => {
    handleFilter(category);
    setFilterStatus(category);
  };

  return (
    <div className="flex justify-between items-center">
      <div className="">
        <ul className="flex gap-1 bg-gray-100 rounded-md p-2 justify-center items-center font-semibold">
          {CategorysShare.map((category, index: number) => (
            <li key={index}>
              <button
                type="button"
                value={filterStatus}
                onClick={() => handleInputFilter(category)}
                className={`text-xs py-2 px-2 min-w-24 max-w-32 hover:bg-white hover:rounded-md hover:shadow-sm ${
                  filterStatus === category
                    ? "bg-white rounded-md shadow-md"
                    : ""
                } transition-all`}
              >
                {category}
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => {
                handleFilter("All");
                setFilterStatus("All");
              }}
              className={`text-xs py-2 px-2 min-w-16 max-w-20 hover:bg-white hover:rounded-md hover:shadow-sm ${
                filterStatus === "All" ? "bg-white rounded-md shadow-md" : ""
              } transition-all`}
            >
              All
            </button>
          </li>
        </ul>
      </div>

      <div className="flex gap-2">
        <div className="relative  rounded-md">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            className="border rounded-md pl-10 pr-3 py-2.5 placeholder:text-sm  focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="Search billability"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
            <GoSearch size={18} className="text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterKnowledge;
