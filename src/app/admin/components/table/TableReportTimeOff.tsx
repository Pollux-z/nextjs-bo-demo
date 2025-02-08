"use client";

import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import { useTimeOffJoinUsers, useTopUps, useUser, useUsers } from "@/app/services/queries";
import Loading from "@/app/loading";
import Error from "@/app/Error";
import ExportExcelTimeOff from "../ExportExcelTimeOff";
import GetMonthTimeOff from "../../timeoffAdmin/components/GetMonthTimeOff";
import { UsersType } from "@/interfaces/User";
import GetTotalLeave from "../../timeoffAdmin/components/GetTotalLeave";
import GetTotalTimeOff from "../../timeoffAdmin/components/GetTotalTimeOff";
import GetCalculateBalanceTimeOff from "../../timeoffAdmin/components/GetCalculateBalanceTimeOff";
import TextBoxReportTimeOff from "../../timeoffAdmin/components/TextBoxReportTimeOff";

const TableReportTimeOff: React.FC<{sortYear: number}> = (args) => {
  const {sortYear} = args;
  const { data: getUsers } = useUsers();
  const users = getUsers?.totalUsers;

  const { data: getTimeOffWithUser } = useTimeOffJoinUsers();
  const timeOffs = getTimeOffWithUser?.timeOff;

  const {data: getTopUps, isLoading: loadingTopUp} = useTopUps();
  const topups = getTopUps?.totalTopUp;

  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("Vacation");
  const { isLoading, error } = useUsers();

  const queryUsers = users?.filter(
    (userValue: UsersType) =>
      userValue?.nameEng.toLowerCase().includes(searchQuery) ||
      userValue?.nameTh.toLowerCase().includes(searchQuery) ||
      userValue?.nickNameTh.toLowerCase().includes(searchQuery) ||
      userValue?.employeeTitle.toLowerCase().includes(searchQuery)
  );

  const numberMonth: number[] = [];

  for (let index = 0; index < 12; index++) {
    numberMonth.push(index + 1);
  }

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <div className="flex justify-end items-center space-x-3">
        <button
          type="button"
          className="bg-green-100 text-green-600 hover:bg-green-600 hover:text-white py-2 px-2 rounded-lg shadow-sm flex items-center gap-2 text-sm font-normal"
          onClick={() => setSortType("Vacation")}
        >
          Vacation
        </button>
        <button
          type="button"
          className="bg-orange-100 text-orange-600 hover:bg-orange-600 hover:text-white py-2 px-2 rounded-lg shadow-sm flex items-center gap-2 text-sm font-normal"
          onClick={() => setSortType("Personal Leave")}
        >
          Personal Leave
        </button>
        <button
          type="button"
          className="bg-yellow-100 text-yellow-600 hover:bg-yellow-600 hover:text-white py-2 px-2 rounded-lg shadow-sm flex items-center gap-2 text-sm font-normal"
          onClick={() => setSortType("Sick Leave")}
        >
          Sick Leave
        </button>
      </div>
      <div className="flex justify-end items-center space-x-3 mt-3">
        <div className="relative rounded-md shadow-sm">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:text-xs a"
          />
          <div className=" bg-[#845BDF] absolute inset-y-0 right-0 flex items-center px-3 rounded-e-md">
            <GoSearch className="text-white" size={13} />
          </div>
        </div>

        {/* Export to exce */}
        <ExportExcelTimeOff
          users={users}
          timeOffs={timeOffs}
          sortType={sortType}
          fileName={`Report ${sortType} TimeOff`}
          sheetName={`TimeOffExport`}
          sortYear={2024}
          topups={topups}
        />
      </div>

      <div className="mt-5">
        <div>
          <h5 className="text-xl font-semibold px-2">{sortType}</h5>
        </div>
        <table className="w-full table-auto mt-3">
          <thead>
            <tr className="*:border *:font-light text-xs">
              <th className="min-w-lg max-w-xl text-left px-3 py-1">Users</th>

              <th className="w-14">{sortType} totals</th>
              <th className="w-14">Jan</th>
              <th className="w-14">Feb</th>
              <th className="w-14">Mar</th>
              <th className="w-14">Apr</th>
              <th className="w-14">May</th>
              <th className="w-14">June</th>
              <th className="w-14">July</th>
              <th className="w-14">Aug</th>
              <th className="w-14">Sep</th>
              <th className="w-14">Oct</th>
              <th className="w-14">Nov</th>
              <th className="w-14">Dec</th>
              <th className="w-14">{sortType} left</th>
              <th className="w-14">{sortType} balance</th>
            </tr>
          </thead>
          <tbody>
            {queryUsers
              ?.map((user: UsersType, index: number) => (
                <tr key={index} className="text-center *:border *:text-xs">
                  <td className="text-left px-3 py-1 w-60 ">{user?.nameEng}</td>
                  <td className="px-3 py-1"><GetTotalLeave sortType={sortType} users={user} sortYear={sortYear}/></td>
                  {numberMonth.map((month, index) => (
                    <td key={index} className="px-3 py-1">
                    <div className="relative group">
                      <p
                        className={`
                          ${
                            sortType === "Vacation"
                              ? "bg-green-100 text-green-600"
                              : sortType === "Personal Leave"
                              ? "bg-orange-100 text-orange-600"
                              : sortType === "Sick Leave"
                              ? "bg-yellow-100 text-yellow-600"
                              : ""
                          } 
                          rounded-md
                        `}
                      >
                        <GetMonthTimeOff
                          id={user?._id}
                          month={month}
                          data={timeOffs}
                          sortType={sortType}
                          sortYear={sortYear}
                        />
                      </p>
                      <div className="absolute z-10 invisible group-hover:visible bg-gray-800 text-white text-xs rounded p-2 -mt-1 -ml-2 min-w-[200px] max-w-[300px]">
                        <TextBoxReportTimeOff 
                        id={user?._id}
                        month={month}
                        sortType={sortType}
                        sortYear={sortYear}
                        timeoffs={timeOffs}
                        />
                        
                      </div>
                    </div>
                  </td>
                  ))}
                  <td className="px-3 py-1">
                    <p className="bg-violet-100 text-violet-600 rounded-md">
                      <GetTotalTimeOff 
                      sortType={sortType}
                      data={timeOffs}
                      users={user}
                      sortYear={sortYear}
                      />
                    </p>
                  </td>
                  <td className="px-3 py-1">
                    <p className="bg-cyan-100 text-cyan-600 rounded-md">
                      <GetCalculateBalanceTimeOff 
                      sortType={sortType}
                      timeOffs={timeOffs}
                      users={user}
                      sortYear={sortYear}
                      topups={topups}
                      />
                    </p>
                  </td>
                </tr>
              ))
              .reverse()}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableReportTimeOff;
