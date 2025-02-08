import { useUsers } from "@/app/services/queries";
import { UsersType } from "@/interfaces/User";
import React, { useRef, useEffect, useState } from "react";

import { AiOutlineTeam } from "react-icons/ai";
import { TbCategory } from "react-icons/tb";

interface OptionSearchTimerProps {
  searchQueryTeam: string;
  setSearchQueryTeam: (query: string) => void;
  searchQueryTitle: string;
  setSearchQueryTitle: (query: string) => void;
}

const OptionSearchTimer: React.FC<OptionSearchTimerProps> = ({
  searchQueryTeam,
  setSearchQueryTeam,
  searchQueryTitle,
  setSearchQueryTitle,
}) => {
  const { data: getUsers, isLoading, isValidating, error } = useUsers();
  const users: UsersType[] = getUsers?.totalUsers;

  const filterUser = users?.filter((user) => {
    const isValueMatchTeam = user?.employeeTeams
      ?.toLowerCase()
      .includes(searchQueryTeam.toLowerCase());

    const isValueMatchTitle = user?.employeeTitle
      ?.toLowerCase()
      .includes(searchQueryTitle.toLowerCase());

    if (!searchQueryTeam && !searchQueryTitle) return user;

    if (searchQueryTeam && !searchQueryTitle) return isValueMatchTeam;

    if (!searchQueryTeam && searchQueryTitle) return isValueMatchTitle;

    return user;
  });

  const queryTeams: string[] = [];

  for (let index = 0; index < filterUser?.length; index++) {
    const user = filterUser[index];
    if (!queryTeams.includes(user.employeeTeams)) {
      queryTeams.push(user.employeeTeams);
    }
  }

  const sortTeams = queryTeams.sort((a, b) => a.localeCompare(b));

  const queryTitles: string[] = [];

  for (let index = 0; index < filterUser?.length; index++) {
    const user = filterUser[index];
    if (!queryTitles.includes(user.employeeTitle)) {
      queryTitles.push(user.employeeTitle);
    }
  }

  const sortTitles = queryTitles.sort((a, b) => a.localeCompare(b));

  const handleReset = () => {
    setSearchQueryTeam("");
    setSearchQueryTitle("");
  }

  const handleOptionSelect = (event: React.MouseEvent<HTMLLIElement>) => {
    setShowTeamBox(false);
    setSearchQueryTeam(
      (event.target as HTMLLIElement).getAttribute("value") || ""
    );
  };

  const handleOptionSelectTitle = (event: React.MouseEvent<HTMLLIElement>) => {
    setShowTitleBox(false);
    setSearchQueryTitle(
      (event.target as HTMLLIElement).getAttribute("value") || ""
    );
  };

  const [showTeamBox, setShowTeamBox] = useState(false);
  const [showTitleBox, setShowTitleBox] = useState(false);

  const handleClickTeamBox = () => {
    setShowTitleBox(false);
    setShowTeamBox((prev) => !prev);
  };

  const handleClickTitleBox = () => {
    setShowTeamBox(false);
    setShowTitleBox((prev) => !prev);
  };

  return (
    <>
      <div className="">
        <div className="flex">
          <div className="flex flex-col ">
            <button
              type="button"
              onClick={handleClickTeamBox}
              className={`flex  rounded-md  px-3 py-2 text-sm items-center justify-center gap-1.5
            ${showTeamBox ? "bg-gray-100" : ""}
            transition-all duration-300 ease-in-out
            `}
            >
              <AiOutlineTeam size={15} />
              <p>Team</p>
            </button>
            <div
              className={`transition-all duration-500 ease-in-out ${
                showTeamBox
                  ? "max-h-40 opacity-100 transform scale-100"
                  : "max-h-0 opacity-0 transform scale-95"
              }`}
            >
                {showTeamBox && (
                <div className="absolute z-10 rounded-md bg-white shadow-md px-2 py-2 w-72 text-sm">
                  <ul>
                  <li
                    value={""}
                    onClick={handleOptionSelect}
                    className="hover:bg-gray-100 hover:rounded-md cursor-pointer py-1 px-2"
                  >
                    All
                  </li>
                  {sortTeams.map((team, index) => (
                    <li
                    key={index}
                    value={team}
                    onClick={handleOptionSelect}
                    className="hover:bg-gray-100 hover:rounded-md cursor-pointer py-1 px-2"
                    >
                    {team}
                    </li>
                  ))}
                  </ul>
                </div>
                )}
            </div>
          </div>

          <div className="flex flex-col ">
            <button
              type="button"
              onClick={handleClickTitleBox}
              className={`flex  rounded-md  px-3 py-2 text-sm items-center justify-center gap-1.5
            ${showTitleBox ? "bg-gray-100" : ""}
            transition-all duration-300 ease-in-out
            `}
            >
              <TbCategory size={15} aria-label="true" />
              <p>Title</p>
            </button>
            <div
              className={`transition-all duration-500 ease-in-out ${
                showTitleBox
                  ? "max-h-40 opacity-100 transform scale-100"
                  : "max-h-0 opacity-0 transform scale-95"
              }`}
            >
              {showTitleBox && (
                <div className="absolute z-10 rounded-md bg-white shadow-md px-2 py-2 min-w-max  max-h-80 overflow-y-auto text-sm ">
                  <ul>
                    <li
                      value={""}
                      onClick={handleOptionSelectTitle}
                      className="hover:bg-gray-100 hover:rounded-md cursor-pointer py-1 px-2"
                    >
                      All
                    </li>
                    {sortTitles.map((team, index) => (
                      <li
                        key={index}
                        value={team}
                        onClick={handleOptionSelectTitle}
                        className="hover:bg-gray-100 hover:rounded-md cursor-pointer py-1 px-2"
                      >
                        {team}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="mx-2">
            <button
              type="button"
              onClick={handleReset}
              className={`py-2 px-2 flex items-center text-sm font-normal transition-all duration-300 ease-in-out
              ${searchQueryTeam || searchQueryTitle ? "bg-orange-100 rounded-lg shadow-sm text-orange-500" : "cursor-not-allowed bg-gray-100 text-gray-400 rounded-lg shadow-sm"}
                `}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OptionSearchTimer;
