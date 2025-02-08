"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { useUsers } from "@/app/services/queries";
import Loading from "@/app/loading";

import Pagination from "@/app/components/Pagination";
import { paginate } from "@/app/helpers/paginate";

import Avatar from "../../../../../public/avataricon.png";
import TableTimer from "@/app/components/table/TimerTable";
import { GoSearch } from "react-icons/go";

import ProfileMale from "../../../../../public/Charactor-11-09.png";
import ProfileFemale from "../../../../../public/Charactor-11-10.png";
import Error from "@/app/Error";

const TimersContent = () => {
  const { data, isLoading, isValidating, error } = useUsers();
  const users = data?.totalUsers;

  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) return <Loading />;
  if(error) return <Error />
  
  return (
    <>
      <div>
        <div className="">
          <div className="flex justify-between items-center">
            <div className="flex items-center  w-[250px] justify-between ">
              <div className="flex -space-x-8 overflow-hidden">
                <Image
                  src={ProfileMale}
                  className="h-24 w-auto inline-block"
                  alt="ProfileMale"
                />
                <Image 
                src={ProfileFemale} 
                className="h-24 w-auto" 
                alt="ProfileFemale"
                />
                
              </div>
              <div className="text-right px-3">
                <p className="text-sm font-semibold">{`TIMER`}</p>
                <p className="text-xs">{`${users?.length} Users`}</p>
              </div>
            </div>
            <div className="relative mt-2 rounded-md shadow-sm">
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
          
        </div>
      </div>
    </>
  );
}

export default TimersContent;
