"use client";
import React, { useState } from "react";
import ContainerAdmin from "../components/ContainerAdmin";
import HeaderContent from "@/app/components/HeaderContent";
import TableSwapdateAdmin from "./components/TableSwapdateAdmin";
import CardFilterSwapDate from "@/app/users/swapdate/components/CardFilterSwapDate";
import BtnCreate from "@/app/components/button/BtnCreate";
import InputSearch from "@/app/components/InputSearch";
import SearchFilter from "./components/SearchFilter";
import { Months } from "@/app/db/date";

function Page(): React.ReactElement {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMonth, setSearchMonth] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  return (
    <ContainerAdmin>
      <HeaderContent
        textHeader="Swap Date Admin"
        textContent={``}
        textContentSub={``}
        hrefContent={``}
      />
      <div>
        <CardFilterSwapDate />
      </div>
      <div className="bg-white p-2 mt-3 rounded-md shadow-md">
        <div className="flex justify-end mt-3">
          <div className="grid px-2 py-2">
            <label htmlFor="month" className="text-xs">
              Month
            </label>
            <select
              value={searchMonth}
              onChange={(e) => setSearchMonth(e.target.value)}
              name="month"
              id="month"
              className="pr-8 py-2.5 pl-2 border rounded-md placeholder:text-sm text-xs "
            >
              <option value="">All</option>
              {Months.map((i, index) => (
                <option value={index + 1} key={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
          {/* <BtnCreate href="/admin/swapdateAdmin/create" btnText={`Create`} /> */}
        </div>
        <div className="flex justify-end">
          <InputSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        <div className="mt-3">
          <TableSwapdateAdmin
            searchQuery={searchQuery}
            searchMonth={searchMonth}
          />
        </div>
      </div>
    </ContainerAdmin>
  );
}

export default Page;
