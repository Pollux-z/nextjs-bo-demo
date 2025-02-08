import React, { useState } from "react";

import { GoSearch } from "react-icons/go";
import { RiTeamLine } from "react-icons/ri";

import { BiSort } from "react-icons/bi";

import { FaSortNumericDown, FaSortNumericDownAlt } from "react-icons/fa";

import { GrPowerReset } from "react-icons/gr";
import { useUsersJoinBillabilityProject } from "@/app/services/queries";
import { UsersType } from "@/interfaces/User";

interface IFilterBarBillability {
  searchQuery: string;
  searchTeam: string;
  searchManday: string;
  setSearchManday: (searchManday: string) => void;
  setSearchTeam: (searchTeam: string) => void;
  setSearchQuery: (searchQuery: string) => void;
}

const FilterBarBillability = ({
  searchQuery,
  searchTeam,
  searchManday,
  setSearchManday,
  setSearchQuery,
  setSearchTeam,
}: IFilterBarBillability) => {
  const [showTeam, setShowTeam] = useState<boolean>(false);
  const [showSort, setShowSort] = useState<boolean>(false);
  const [sortManday, setSortManday] = useState<string>("");

  const {
    data: getUsersJoinBillability,
    isLoading,
    isValidating,
    error,
  } = useUsersJoinBillabilityProject();

  const usersJoinBillability: UsersType[] = getUsersJoinBillability?.users;

  // const filteredUsersJoinBillability = usersJoinBillability?.filter(
  //   (user) => user.userBillability && user.userBillability.length > 0
  // );

  const queryTeam: string[] = [];

  if (usersJoinBillability) {
    for (let i = 0; i < usersJoinBillability.length; i++) {
      const userTeam = usersJoinBillability[i].employeeTeams;
      if (userTeam && !queryTeam.includes(userTeam)) {
        queryTeam.push(userTeam);
      }
    }
  }

  queryTeam.sort((a, b) => a.localeCompare(b));

  const handleReset = () => {
    setSearchQuery("");
    setSearchTeam("");
    setSearchManday("");
  };

  const handleSeletedTeam = (team: string) => {
    setShowTeam(false);
    setSearchTeam(team);
  };

  const handleSortManday = (clickSortManday: string) => {
    setShowSort(false);
    setSearchManday(clickSortManday);
  };

  const handleShowTeam = () => {
    setShowSort(false);
    setShowTeam(!showTeam);
  };

  const handleShowShort = () => {
    setShowTeam(false);
    setShowSort(!showSort);
  };

  return (
    <div className="flex space-x-2 justify-center items-center">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-md pl-10 pr-3 py-2 w-full  placeholder:text-sm"
          placeholder="Search billability"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
          <GoSearch size={18} className="text-gray-500" />
        </div>
      </div>
      <div className="">
        <button
          onClick={() => handleShowTeam()}
          type="button"
          className="text-sm text-gray-600 font-semibold hover:bg-gray-50 flex py-2 px-3  rounded-md border gap-1 transition-all duration-300"
        >
          <RiTeamLine size={18} className="text-gray-500" />
          Team
        </button>
        <div
          className={`transition-all duration-300 absolute z-10 shadow-md rounded-md  transform  bg-gray-50 text-gray-600 w-64 p-2 ${
            showTeam
              ? "visible scale-100 opacity-100"
              : "invisible scale-90 opacity-0"
          } right-10 mt-2 `}
        >
          <ul>
            <li className="py-1 px-2">
              <button
                onClick={() => handleSeletedTeam("")}
                className="hover:bg-gray-100 w-full text-left text-sm"
                type="button"
              >
                All
              </button>
            </li>
            {queryTeam.map((team, index) => (
              <li key={index} className="py-1 px-2">
                <button
                  onClick={() => handleSeletedTeam(team)}
                  className="hover:bg-gray-100 w-full text-left text-sm"
                  type="button"
                >
                  {team}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="">
        <button
          onClick={() => handleShowShort()}
          type="button"
          className="text-sm text-gray-600 font-semibold hover:bg-gray-50 flex py-2 px-3  rounded-md border gap-1 transition-all duration-300"
        >
          <BiSort size={18} className="text-gray-500" />
          Sort
        </button>
        <div
          className={`transition-all duration-300 absolute z-10 shadow-md rounded-md  transform  bg-gray-50 text-gray-600 min-w-32 max-w-52 p-2 ${
            showSort
              ? "visible scale-100 opacity-100"
              : "invisible scale-90 opacity-0"
          } right-10 mt-2 `}
        >
          <ul>
            <li className="py-1 px-2">
              <button
                onClick={() => handleSortManday("Most")}
                className="hover:bg-gray-100 w-full text-left text-sm flex items-center gap-1"
                type="button"
              >
                Total Most
                <FaSortNumericDownAlt />
              </button>
            </li>
            <li className="py-1 px-2">
              <button
                onClick={() => handleSortManday("Least")}
                className="hover:bg-gray-100 w-full text-left text-sm flex items-center gap-1"
                type="button"
              >
                Total Least
                <FaSortNumericDown />
              </button>
            </li>

            
          </ul>
        </div>
      </div>

      <div>
        <button
          disabled={
            searchQuery === "" && searchTeam === "" && searchManday === ""
          }
          onClick={() => handleReset()}
          type="button"
          className={`text-sm text-gray-600 font-semibold hover:bg-gray-50 flex py-2 px-3  rounded-md border gap-1 transition-all duration-300 
                  ${
                    searchQuery === "" && searchTeam === "" && searchManday === ""
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  } 
                  `}
        >
          <GrPowerReset size={18} className="" />
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterBarBillability;
