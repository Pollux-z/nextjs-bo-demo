"use client";

import FormatDate from "@/app/components/FormatDate";
import { useSwapDates, useTimeOffs } from "@/app/services/queries";
import React, { useState } from "react";
import ProfileAndNameTimeoff from "../../timeoff/components/ProfileAndNameTimeoff";
import ProfileAndNameSwapDate from "./ProfileAndNameSwapDate";
import FormatDateSimple from "@/app/components/FormatDateSimple";
import { SwapDateType } from "@/interfaces/SwapDate";

const CardFilterSwapDate: React.FC = () => {
  const { data: getSwapDate, isLoading, isValidating, error } = useSwapDates();
  const swapDateData = getSwapDate?.totalSwapDate;

  const todayStart = new Date();
  const haveSwapDate = swapDateData?.filter(
    (swapDate: SwapDateType) => swapDate?.swapDate
  );

  const filterSwapDate = haveSwapDate?.filter((swapDate: SwapDateType) =>
    swapDate?.swapDate.some(
      (someSwapDate) =>
        new Date(someSwapDate).setHours(0, 0, 0, 0) >=
        todayStart.setHours(0, 0, 0, 0)
    )
  );

  let uniqueDate: number[] = [];
  filterSwapDate?.forEach((swapDate: SwapDateType) => {
    swapDate?.swapDate.map((addSwapDate, index) => {
      const currentDate = new Date(addSwapDate).setHours(0, 0, 0, 0);
      if (!uniqueDate.some((k) => k === currentDate)) {
        uniqueDate.push(currentDate);
      }
    });
  });

  const sortUniqueDate = uniqueDate.sort((a, b) => a - b);

  return (
    <div className="grid grid-cols-5 gap-3">
      {sortUniqueDate.slice(0, 5).map((date, index: number) => {
        const filterUser = haveSwapDate?.filter((swapDate: SwapDateType) =>
          swapDate.swapDate.some(
            (someSwapDate) =>
              new Date(someSwapDate).setHours(0, 0, 0, 0) === date
          )
        );
        return (
          <div
            key={date}
            className="mt-3 px-3 py-2 bg-white rounded-md shadow-sm max-w-80"
          >
            <div>
              <h3 className="text-sm border-l-2 px-2 border-indigo-300 font-semibold">
                <FormatDateSimple dateData={date} />
              </h3>
            </div>
            <div className="mt-1">
              {filterUser?.map((swapDate: SwapDateType, index: number) => (
                <div key={swapDate.employee}>
                  <ProfileAndNameSwapDate data={swapDate.employee} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardFilterSwapDate;
