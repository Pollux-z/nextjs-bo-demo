import React, { useState } from "react";
import FilterUserCreate from "@/app/components/FilterUserCreate";
import FormatDate from "@/app/components/FormatDate";
import FormatDateSimple from "@/app/components/FormatDateSimple";
import FilterUserTitle from "@/app/components/FilterUserTitle";
import StyleStatus from "@/app/components/StyleStatus";
import { useTopUps } from "@/app/services/queries";
import UserRowTopUp from "./UserRowTopUp";
import Link from "next/link";
import BtnCreate from "@/app/components/button/BtnCreate";

import { RiExpandUpDownLine } from "react-icons/ri";
import Loading from "@/app/loading";
import Error from "@/app/Error";


type SortConfig = {
  key: any; // Replace 'data' with the name of your actual dataset
  direction: "asc" | "desc" | string; // Restrict direction to "asc" or "desc"
};

const TableTopUp = ({ data }: { data: any[] }) => { 

  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "asc" });
  const [searchQuery, setSearchQuery] = useState("");

  if (sortConfig.key) {
    data.sort((a: any,  b: any) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }

  const requestSort = (key: any) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <>
      <table className="table-auto w-full text-left">
        <thead className="border-b">
          <tr className="*:py-3 *:px-3 *:font-normal text-sm">
            <th className="">
              <p className="flex items-center gap-1">
                User Request{" "}
                <RiExpandUpDownLine
                  onClick={() => requestSort("employee")}
                  className=" cursor-pointer"
                />
              </p>
            </th>
            <th className="">
              <p className="flex items-center gap-1 justify-center">
                Type{" "}
                <RiExpandUpDownLine
                  onClick={() => requestSort("type")}
                  className=" cursor-pointer"
                />
              </p>
            </th>
            <th className="">
              <p className="flex items-center gap-1">
                Top-up (Days){" "}
                <RiExpandUpDownLine
                  onClick={() => requestSort("topUpDay")}
                  className=" cursor-pointer"
                />
              </p>
            </th>
            <th className="">Remark</th>
            <th className=" text-center">Vacation balance</th>
            <th className="text-center" onClick={() => requestSort("createAt")}>
              Create date
            </th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {data?.map((val, index) => (
            <tr
              key={index}
              className="odd:bg-white even:bg-slate-50 *:px-3 text-xs *:h-16"
            >
              <UserRowTopUp data={val} />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TableTopUp;
