"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import HeaderContent from "@/app/components/HeaderContent";
import ContainerAdmin from "../../components/ContainerAdmin";
import TableTimerAll from "../../components/table/TableTimerAll";

import { GoSearch } from "react-icons/go";

function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <ContainerAdmin>
      <HeaderContent
        textHeader={`TIMER Admin`}
        textContent={``}
        textContentSub={``}
        hrefContent={``}
      />
      <div className="bg-white  rounded-md w-full mt-3 px-2 py-3">
        <div className="flex justify-end">
          <div className="relative  rounded-md shadow-sm max-w-80">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:text-xs"
            />
            <div className=" bg-[#845BDF] absolute inset-y-0 right-0 flex items-center px-3 rounded-e-md">
              <GoSearch className="text-white" size={13} />
            </div>
          </div>
        </div>
        <TableTimerAll searchQuery={searchQuery}/>
      </div>
    </ContainerAdmin>
  );
}

export default Page;
