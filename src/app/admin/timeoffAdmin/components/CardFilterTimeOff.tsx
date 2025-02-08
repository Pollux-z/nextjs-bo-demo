import FormatDate from "@/app/components/FormatDate";
import FormatDateSimple from "@/app/components/FormatDateSimple";
import { useTimeOffJoinUsers, useTimeOffs } from "@/app/services/queries";
import React, { useReducer, useState } from "react";
import ProfileAndNameTimeoff from "@/app/users/timeoff/components/ProfileAndNameTimeoff";
import { TimeOff } from "@/interfaces/TimeOff";

import { BsSortAlphaDown } from "react-icons/bs";
import { BsSortAlphaDownAlt } from "react-icons/bs";
import Loading from "@/app/loading";

interface CardFilterTimeOffProps {
  sortName: string;
  setSortName: (query: string) => void;
}

const CardFilterTimeOff: React.FC<CardFilterTimeOffProps> = ({ sortName, setSortName }) => {

  const { data: getTimeOffs, isLoading, error } = useTimeOffJoinUsers();
  const timeOffs: TimeOff[] = getTimeOffs?.timeOff;
  const filterStatusReject = timeOffs?.filter(
    (timeOff) => timeOff.status != "Reject"
  );

  const todayStart = new Date().setHours(0, 0, 0, 0);

  let uniqueDate: any[] = [];

  filterStatusReject?.forEach((timeOff) => {
    timeOff.issueDate.forEach((date) => {
      const issueDate = new Date(date).setHours(0, 0, 0, 0);
      if (issueDate >= todayStart && !uniqueDate.includes(issueDate)) {
        uniqueDate.push(issueDate);
      }
    });
  }
  );

  const [index, setIndex] = useState({ indexStart: 0, indexEnd: 5 });

  const handleIncrement = () => {
    setIndex({
      indexStart: index.indexStart + 5,
      indexEnd: index.indexEnd + 5,
    });
  };

  const handleDecrement = () => {
    setIndex({
      indexStart: index.indexStart - 5,
      indexEnd: index.indexEnd - 5,
    });
  };

  const sortUniqueDate = uniqueDate.sort((a, b) => a - b);

  const [showMoreThanTen, setShowMoreThanTen] = useState(false);

  const handleShowMore = () => {
    setShowMoreThanTen((prev) => !prev);
  };

  if(isLoading) return <Loading />
  if(error) return <div>Error</div>

  const resulteData = sortUniqueDate
    .slice(index.indexStart, index.indexEnd)
    .map((date, index) => {
      const filterUser = filterStatusReject?.filter((userNoneReject) =>
        userNoneReject.issueDate.some(
          (issueDate) => new Date(issueDate).setHours(0, 0, 0, 0) === date
        )
      );
      const sortUser =
        sortName === "ase"
          ? filterUser?.sort((a, b) =>
              a.employee_info.nameEng.localeCompare(b.employee_info.nameEng)
            )
          : filterUser?.sort((a, b) =>
              b.employee_info.nameEng.localeCompare(a.employee_info.nameEng)
            );
      return (
        <div
          key={date}
          className={`mt-3 px-3 py-2 bg-gray-50 rounded-md shadow-sm  
        
      `}
        >
          <div>
            <div className="flex justify-between items-center">
              <h3 className="text-sm border-l-2 px-2 border-indigo-300 font-semibold">
                <FormatDateSimple dateData={date} />
              </h3>
              <button
              type="button"
              onClick={() =>
                setSortName(sortName === "ase" ? "desc" : "ase")
              }
              className="bg-gray-200 p-1 rounded-md shadow-sm hover:bg-gray-300 transition-all duration-700"
              >
              {sortName === "ase" ? (
                <BsSortAlphaDown  />
              ) : (
                <BsSortAlphaDownAlt  /> 
              )}
              </button>
            </div>
            <h5
              className={`mt-1 text-xs  ${
                filterUser.length >= 10
                  ? "bg-red-100 text-red-500"
                  : "bg-sky-100 text-sky-500"
              } px-2 py-1 rounded-lg shadow-sm`}
            >
              <span className="font-bold">{filterUser?.length}</span>{" "}
              {filterUser?.length > 1 ? "requests" : "request"}
            </h5>
          </div>
          <div className="mt-1">
            {sortUser
              ?.slice(0, !showMoreThanTen ? 10 : filterUser.length)
              ?.map((user, index) => (
                <div key={user._id}>
                  <ProfileAndNameTimeoff data={user} />
                </div>
              ))}
          </div>
          <div className="flex justify-center mt-1">
            {filterUser.length > 10 && (
              <button
                onClick={handleShowMore}
                className="text-xs text-blue-500 rounded-sm shadow-sm hover:bg-blue-500 hover:text-white  text-center bg-blue-100 py-1 px-2 transition-all"
              >
                {!showMoreThanTen ? `Show more` : `Hide this`}
              </button>
            )}
          </div>
        </div>
      );
    });

  return (
    <>
      <div className="mt-3 flex justify-between px-5">
        <button
          type="button"
          disabled={index.indexStart === 0}
          className="min-w-20 max-w-24 bg-emerald-100 text-emerald-600 py-2 px-3 rounded-md shadow-sm text-sm hover:bg-emerald-700 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-emerald-100 disabled:text-emerald-600"
          onClick={handleDecrement}
        >
          Prev
        </button>
        <button
          type="button"
          disabled={index.indexEnd >= uniqueDate.length}
          className="min-w-20 max-w-24 bg-emerald-100 text-emerald-600 py-2 px-3 rounded-md shadow-sm text-sm hover:bg-emerald-700 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-emerald-100 disabled:text-emerald-600"
          onClick={handleIncrement}
        >
          Next
        </button>
      </div>
      <div
        className={`grid grid-cols-1 md:max-xl:grid-cols-1 md:grid-cols-5 gap-3 
        `}
      >
        {resulteData}
      </div>
    </>
  );
};

export default CardFilterTimeOff;
