import React from "react";

import FilterUserCreate from "@/app/components/FilterUserCreate";
import FormatDate from "@/app/components/FormatDate";
import FormatDateSimple from "@/app/components/FormatDateSimple";
import FilterUserTitle from "@/app/components/FilterUserTitle";
import StyleStatus from "@/app/components/StyleStatus";
import UserRowSwapDate from "./UserRowSwapDate";
import AdminRowSwapDate from "./AdminRowSwapDate";

function TableSwapDate({ data }) {
  return (
    <>
      <table className="table-auto w-full text-left">
        <thead className="border-b">
          <tr className="*:py-3 *:px-3 *:font-normal text-sm">
            <th className="p-2">ID</th>
            <th className="p-2">User Request</th>
            <th className="p-2">Project</th>
            <th className="p-2 text-center">Action Date</th>
            <th className="p-2 text-center">Swap Date</th>
            <th className="p-2 text-center">Status</th>
            <th className="p-2 text-center">Remark</th>
            {/* <th className="p-2 text-center">Action</th> */}
          </tr>
        </thead>
        <tbody className="text-xs">
          {data?.map((val, index) => (
            <tr
              key={index}
              className="odd:bg-white even:bg-slate-50 *:px-2 text-xs *:h-14  "
            >
              <UserRowSwapDate data={val} />
              <AdminRowSwapDate data={val} />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TableSwapDate;
