"use client";

import React, { useState } from "react";
import FilterHistory from "./FilterHistory";
import { StatusRequestTimeOff } from "@/app/db/option";
import { GoSearch } from "react-icons/go";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Dropdown from "@/app/components/Dropdown";
import { useUsers } from "@/app/services/queries";
import Loading from "@/app/loading";
import Error from "@/app/Error";

function TableHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("Vacation");
  const { isLoading, error} = useUsers();

  if(isLoading) return <Loading />
  if(error) return <Error />
  return (
    <>
      <div className="flex justify-end items-center space-x-3">
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
        <div>
          <Dropdown setSortType={setSortType} dataSort={StatusRequestTimeOff}/>
        </div>
      </div>

      <div className="mt-5">
        <table className="w-full table-auto">
          <thead>
            <tr className="*:border *:font-semibold ">
              <th className="min-w-lg max-w-xl text-left px-3 py-1">Users</th>
              <th className="w-14">Left</th>
              <th className="w-14">Total</th>
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
            </tr>
          </thead>
          <tbody>
            <FilterHistory searchQuery={searchQuery} sortType={sortType} />
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TableHistory;
