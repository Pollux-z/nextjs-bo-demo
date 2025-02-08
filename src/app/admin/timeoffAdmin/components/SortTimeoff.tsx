import { useTimeOffJoinUsers } from "@/app/services/queries";
import { TimeOff } from "@/interfaces/TimeOff";
import React, { useState } from "react";

import { GrSort } from "react-icons/gr";

import { BsSortAlphaDown } from "react-icons/bs";
import { BsSortAlphaUpAlt } from "react-icons/bs";

interface SortTimeoffProps {
  searchMonth: string;
  searchYear: string;
  sortName: string;
  searchStatus: string;
  setSearchMonth: (query: string) => void;
  setSearchYear: (query: string) => void;
  setSearchStatus: (query: string) => void;
  setSortName: (query: string) => void;
}

const SortTimeoff: React.FC<SortTimeoffProps> = ({
  searchMonth,
  searchYear,
  searchStatus,
  sortName,
  setSearchMonth,
  setSearchYear,
  setSearchStatus,
  setSortName,
}) => {
  const { data: getTimeOffs } = useTimeOffJoinUsers();

  const timeOffs: TimeOff[] = getTimeOffs?.timeOff;

  const getYearTimeOff: number[] = [];

  for (let index = 0; index < timeOffs?.length; index++) {
    const elementTimeOff = timeOffs[index].issueDate;
    for (let index = 0; index < elementTimeOff.length; index++) {
      const elementIssueDate = elementTimeOff[index];
      const issueDate = new Date(elementIssueDate).getFullYear();
      if (!getYearTimeOff.includes(issueDate)) {
        getYearTimeOff.push(issueDate);
      }
    }
  }

  const getMonthTimeOff: string[] = [];

  for (let index = 0; index < timeOffs?.length; index++) {
    const elementTimeOff = timeOffs[index].issueDate;
    for (let index = 0; index < elementTimeOff.length; index++) {
      const elementIssueDate = elementTimeOff[index];
      if (
        searchYear &&
        new Date(elementIssueDate).getFullYear().toString() === searchYear
      ) {
        const issueDate = new Date(elementIssueDate).toLocaleString("default", {
          month: "long",
        });
        if (!getMonthTimeOff.includes(issueDate)) {
          getMonthTimeOff.push(issueDate);
        }
      } else if (!searchYear) {
        const issueDate = new Date(elementIssueDate).toLocaleString("default", {
          month: "long",
        });
        if (!getMonthTimeOff.includes(issueDate)) {
          getMonthTimeOff.push(issueDate);
        }
      }
    }
  }

  getMonthTimeOff.sort((a, b) => {
    const dateA = new Date(`${a} 1, 2000`);
    const dateB = new Date(`${b} 1, 2000`);
    return dateA.getTime() - dateB.getTime();
  });

  const getStatusTimeOff: string[] = [];

  for (let index = 0; index < timeOffs?.length; index++) {
    const elementTimeOff = timeOffs[index].status;
    if (!getStatusTimeOff.includes(elementTimeOff)) {
      getStatusTimeOff.push(elementTimeOff);
    }
  }

  getStatusTimeOff.sort((a, b) => a.localeCompare(b));

  const [sortOption, setSortOption] = useState(false);
  const [sortYear, setSortYear] = useState(false);

  const handleOptionSelect = (e: any) => {
    setSortOption(false);
  };

  const handleClickMonthOption = () => {
    setSortOption(!sortOption);
  };

  const handleClear = () => {
    setSearchMonth("");
    setSearchYear("");
    setSearchStatus("");
    setSortName("");
  };

  return (
    <div>
      <div className="">
        <button
          type="button"
          onClick={handleClickMonthOption}
          className={`flex  rounded-md  text-sm items-center justify-center py-2 px-3 gap-1
                       ${sortOption ? "bg-gray-100" : ""}
                       transition-all duration-300 ease-in-out
                       `}
        >
          <GrSort />
          <p>Filter</p>
        </button>
        <div
          className={`flex gap-2 transition-all duration-500 ease-in-out absolute z-50 bg-slate-100 mt-2 py-2 px-3 rounded-md shadow-sm ${
            sortOption
              ? "max-h-40 opacity-100 transform scale-100"
              : "max-h-0 opacity-0 transform scale-90 "
          }`}
        >
          <div
            className={`flex gap-2 transition-all duration-500 ease-in-out mt-2  ${
              sortOption
                ? "transform scale-100 opacity-100"
                : "transform scale-95 opacity-0 h-0"
            }`}
          >
            <div>
              <select
                disabled={!sortOption}
                title="Year"
                value={searchYear}
                onChange={(e: any) => setSearchYear(e.target.value)}
                className={`w-40 rounded-md px-2 py-1 text-sm border `}
              >
                <option value="">- Selete Year -</option>
                {getYearTimeOff.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <p className="text-center py-2  text-sm font-bold">
                {searchYear}
              </p>
            </div>

            <div>
              <select
                disabled={!searchYear || !sortOption}
                title="Month"
                value={searchMonth}
                onChange={(e: any) => setSearchMonth(e.target.value)}
                className={`w-40 rounded-md px-2 py-1 text-sm  border `}
              >
                <option value="">- Selete Month -</option>
                {getMonthTimeOff.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <p className="text-center py-2  text-sm font-bold">
                {searchMonth}
              </p>
            </div>

            <div>
              <select
                disabled={!sortOption}
                title="status"
                value={searchStatus}
                onChange={(e: any) => setSearchStatus(e.target.value)}
                className={`w-40 rounded-md px-2 py-1 text-sm border`}
              >
                <option value="">- Selete Status -</option>
                {getStatusTimeOff.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <p className="text-center py-2  text-sm font-bold">
                {searchStatus}
              </p>
            </div>

            {/* <div>
              <select
                disabled={!sortOption}
                title="sortName"
                value={sortName}
                onChange={(e: any) => setSortName(e.target.value)}
                className={`w-40 rounded-md px-2 py-1 text-sm border`}
              >
                <option value="">- Lastet request -</option>
                <option value="ase">ASC A-Z</option>
                <option value="desc">DESC Z-A</option>
              </select>
              {sortName === "ase" ? (
                <p className="flex justify-center items-center gap-1 text-center py-2 text-sm font-bold">
                  <BsSortAlphaDown /> A-Z
                </p>
              ) : sortName === "desc" ? (
                <p className="flex justify-center items-center gap-1 text-center py-2 text-sm font-bold">
                  <BsSortAlphaUpAlt /> Z-A
                </p>
              ) : null}
            </div> */}

            {
              searchYear || searchMonth || searchStatus || sortName ? (
                <div className="flex place-items-end">
                  <button
                  disabled={!sortOption}
                  onClick={handleClear}
                  className="bg-blue-600 text-white rounded-md px-2 py-1 text-sm hover:bg-blue-700 transition-all hover:shadow-md">
                    Clear
                  </button>
                </div>
              ) : null
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default SortTimeoff;
