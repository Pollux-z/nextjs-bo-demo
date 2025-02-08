"use client";
import React, { useEffect, useState } from "react";

import TableTimer from "./TableTimer";
import BtnCreate from "./BtnCreate";

import { useUsers } from "@/app/services/queries";
import Loading from "@/app/loading";

import { GoSearch } from "react-icons/go";
import BtnDirection from "@/app/components/button/BtnDirection";
import InputSearch from "@/app/components/InputSearch";

const Content: React.FC = () => {
  const { data, isLoading, isValidating, error } = useUsers();
  const usersData = data?.totalUsers;

  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="p-2">
        <div className="flex flex-col md:flex-row justify-between gap-3">
          <div>
            <BtnCreate />
          </div>
          <div className="flex gap-2">
            <InputSearch
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <BtnDirection
              href={`/admin/timerAdmin/allUsers`}
              btnText={`All users`}
            />
          </div>
        </div>
        <div>
          <TableTimer usersData={usersData} searchQuery={searchQuery} />
        </div>
      </div>
    </>
  );
};

export default Content;
