"use client";

import React, { useState } from "react";
import ContainerAdmin from "../../components/ContainerAdmin";
import HeaderContent from "@/app/components/HeaderContent";
import TableReportTimeOff from "../../components/table/TableReportTimeOff";
import TableReportTimeOff2025 from "../../components/table/TableReportTimeOff2025";

function Page(): React.ReactNode {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<number>(currentYear);

  return (
    <ContainerAdmin>
      <HeaderContent
        textHeader={`Report Time-Off`}
        textContent={``}
        textContentSub={``}
        hrefContent={``}
      />
      <div className="my-5 bg-white py-3 px-2 rounded-md shadow-md">
        <div className="mb-4">
          <div className="flex space-x-4 justify-end w-full">
            <div className="w-1/4">
              <label htmlFor="yearSelect" className="block text-sm font-medium text-gray-700 mb-1">
                Select Year
              </label>
              <select
                id="yearSelect"
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value))}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
              >
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
            </div>
          </div>
        </div>
        {year === 2024 ? (
          <TableReportTimeOff sortYear={year}/>
        ) : year === 2025 ? (
          <TableReportTimeOff2025 sortYear={year} />
        ) : null}
      </div>
    </ContainerAdmin>
  );
}

export default Page;
