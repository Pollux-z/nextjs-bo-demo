"use client";
import React, { useState } from "react";
import NavbarAdmin from "../components/NavbarAdmin";
import Header from "@/app/components/Header";

import { useSession } from "next-auth/react";
import HeaderContent from "../../components/HeaderContent";
import FilterAgeEmployee from "./components/FilterAgeEmployee";
import AdminFormCreateTimeOff from "./create/page";
import AdminTableTimeOff from "./components/AdminTableTimeOff";
import BtnCreate from "../components/button/BtnCreate";
import ContainerAdmin from "../components/ContainerAdmin";
import InputSearch from "./components/InputSearch";

import { GoSearch } from "react-icons/go";
import BtnNavigation from "../components/button/BtnNavigation";
import { Months } from "@/app/db/date";
import { StatusApproveTimeOff } from "@/app/db/option";
import DropdownSortHomePage from "../components/DropdownSortHomePage";
import CardFilterTimeOff from "./components/CardFilterTimeOff";
import SortTimeoff from "./components/SortTimeoff";

function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMonth, setSearchMonth] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [sortName, setSortName] = useState("");

  return (
    <ContainerAdmin>
      <HeaderContent
        textHeader={`TIME Off Admin`}
        textContent={``}
        textContentSub={``}
        hrefContent={``}
      />

      <div className="mt-5 bg-white p-2 rounded-md">
        <div className="">
          <CardFilterTimeOff sortName={sortName} setSortName={setSortName} />
        </div>

        <div className="flex justify-end items-center gap-2 mt-3">
          <div className="">
            <BtnCreate href={`/admin/timeoffAdmin/create`} btnText={`Create`} />
          </div>
          <div>
            <BtnNavigation
              href={`/admin/timeoffAdmin/report`}
              btnText={`Report`}
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-3">
          <div className="flex gap-2">
            <div>
              <select
                title="Month"
                value={searchMonth}
                onChange={(e: any) => setSearchMonth(e.target.value)}
                className={`w-40 rounded-md px-2 py-1 text-sm  border `}
              >
                <option value="">- Selete Month -</option>
                {Months.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                title="status"
                value={searchStatus}
                onChange={(e: any) => setSearchStatus(e.target.value)}
                className={`w-40 rounded-md px-2 py-1 text-sm border`}
              >
                <option value="">- Selete Status -</option>
                {StatusApproveTimeOff.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </select>
        
            </div>
          </div>
          <InputSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        <div className="mt-2 bg-gray-100">
        </div>

        <div>
          <AdminTableTimeOff
            searchQuery={searchQuery}
            searchMonth={searchMonth}
            searchStatus={searchStatus}
            // searchYear={searchYear}
          />
        </div>
      </div>
    </ContainerAdmin>
  );
}

export default Page;
