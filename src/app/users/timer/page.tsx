"use client";
import React, { useState } from "react";
import TimersContent from "./components/TimersContent";
import ContainerUser from "../../components/ContainerUser";
import HeaderContent from "@/app/components/HeaderContent";
import { useSession } from "next-auth/react";

import FilterAgeEmployee from "@/app/admin/timeoffAdmin/components/FilterAgeEmployee";
import TableTimer from "@/app/components/table/TimerTable";
import InputSearch from "@/app/components/InputSearch";
import OptionSearchTimer from "./components/OptionSeacrhTimer";

function Page() {
  const { data: session } = useSession();
  const sessionRole = session?.user?.role;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryTeam, setSearchQueryTeam] = useState("");
  const [searchQueryTitle, setSearchQueryTitle] = useState("");

  return (
    <ContainerUser>
      <HeaderContent
        textHeader={`TIMERS`}
        textContent={``}
        textContentSub={``}
        hrefContent={``}
      />
      <div className="flex flex-col md:flex-row gap-3 justify-between items-top mt-5 rounded-md py-5 px-5 w-full bg-white">
        <div className="z-10">
          <OptionSearchTimer
            searchQueryTeam={searchQueryTeam}
            setSearchQueryTeam={setSearchQueryTeam}
            searchQueryTitle={searchQueryTitle}
            setSearchQueryTitle={setSearchQueryTitle}
          />
        </div>
        <div>
          <InputSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
      </div>
      <div className="grid lg:grid-cols-5 gap-2 overflow-x-auto">
        <div
          className={
            sessionRole != "User"
              ? "col-span-4 bg-white  rounded-md py-5 px-5 mt-5 w-full"
              : "col-span-5 bg-white  rounded-md py-5 px-5 mt-5 w-full"
          }
        >
          <TableTimer
            searchQuery={searchQuery}
            searchQueryTeam={searchQueryTeam}
            searchQueryTitle={searchQueryTitle}
          />
        </div>
        {sessionRole != "User" ? (
          <div className="bg-white rounded-md py-5 px-5 mt-5 w-full hidden lg:block">
            <FilterAgeEmployee />
          </div>
        ) : null}
      </div>
    </ContainerUser>
  );
}

export default Page;
