import React, { Dispatch, SetStateAction } from "react";
import { UsersType } from "@/interfaces/User";

import { useTimeOffJoinUsers, useTopUps } from "@/app/services/queries";
import { TimeOff } from "@/interfaces/TimeOff";
import GetCalculateBalanceTimeOff from "./GetCalculateBalanceTimeOff";

type GetTotalLeave = {
  sortType: string;
  users: UsersType;
  sortYear: number;
};

const GetTotalLeave: React.FC<GetTotalLeave> = (args) => {
  const { sortType, users, sortYear } = args;
  const { data: getTimeOffs } = useTimeOffJoinUsers();
  const timeOffs: TimeOff[] = getTimeOffs?.timeOff;

  const {data: getTopUps, isLoading: loadingTopUp} = useTopUps();
  const topups = getTopUps?.totalTopUp;

  const vacaltionLeave2023 = users?.year2023Leave
    ? users?.year2023Leave.vacationLeave
    : 0;
  const totalVacationLeave =
    users?.year2024Leave?.vacationLeave + vacaltionLeave2023;
  const totalPersonalLeave = users?.year2024Leave?.personalLeave;
  const totalSickLeave = users?.year2024Leave?.sickLeave;

  const totalLeave2025 = users?.year2025Leave?.vacationLeave;
  const getBalanceTimeOff = GetCalculateBalanceTimeOff({sortType: sortType, timeOffs: timeOffs , users: users, sortYear: 2024, topups}) as number | undefined;
  const getTotalLeave = totalLeave2025 + getBalanceTimeOff;
  

  const totalLeave =
    sortType === "Vacation" && sortYear === 2024
      ? totalVacationLeave
      : sortType === "Personal Leave" && sortYear === 2024
      ? totalPersonalLeave
      : totalSickLeave;

      const getTotalLeave2025 =
      sortType === "Vacation" && sortYear === 2025
        ? getTotalLeave
        : sortType === "Personal Leave" && sortYear === 2025
        ? totalPersonalLeave
        : totalSickLeave;

  const totalLeaveQuery = getTotalLeave2025 > 24 && sortType === "Vacation" ? <p className="text-red-200 bg-red-600 rounded-md">{getTotalLeave2025}</p> : getTotalLeave2025;

  return sortYear === 2025 ? totalLeaveQuery : totalLeave;
};

export default GetTotalLeave;
