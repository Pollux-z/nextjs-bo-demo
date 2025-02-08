"use client";

import React from "react";
import FormatDate from "./FormatDate";
import FilterUserCreate from "./FilterUserCreate";
import { useSession } from "next-auth/react";
import BtnDelete from "../users/meetingroom/components/BtnDelete";

const FilterDays: React.FC<{ data: Array<any>; coutDate: number }> = ({
  data,
  coutDate,
}) => {

  const { data: session } = useSession();
  const userSession = session?.user?.id;
  const roleSession = session?.user?.role;

  const uniqueDate: Array<string> = [];

  data?.forEach((element) => {
    const currentDate = new Date().setHours(0, 0, 0, 0);
    const date = new Date(element.startDate).setHours(0, 0, 0, 0);
    if (!uniqueDate.includes(element.startDate) && date >= currentDate) {
      uniqueDate.push(element.startDate);
    }
  });

  uniqueDate.slice(0, 5);

  const filterSortDate = uniqueDate?.map((val, index) => (
    <div key={index} className="mb-2">
      <FormatDate dateData={val} />
      {data
        ?.filter((element) => element.startDate === val)
        .map((val, index) => (
          <div className="mb-2 flex justify-between items-center  max-w-72 lg:max-w-full" key={index}>
            <div className="flex flex-col w-full">
              <p className="font-medium">
                {val.startTime} - {val.endTime}
              </p>
              <p className="truncate text-sm ">{val.subject}</p>
              <p className="text-xs">Owner: {val.employee_info?.nameEng}</p>
            </div>
            <div>
              {val.userCreate === userSession || roleSession === "Admin" ? (
                <BtnDelete id={val._id} btnText={``} />
              ) : null}
            </div>
          </div>
        ))}
    </div>
  ));

  return (
    <>
      {uniqueDate?.length === 0 ? <p className="text-center bg-orange-100 text-orange-500 py-2 rounded-md shadow-sm border-l-4 border-orange-500">No Reserve</p> : filterSortDate }
    </>
  );
};

export default FilterDays;
