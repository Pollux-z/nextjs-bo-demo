import { UsersType } from "@/interfaces/User";
import { TimeOff } from "@/interfaces/TimeOff";
import React from "react";
import { useTimeOffJoinUsers, useTopUps } from "@/app/services/queries";
import { get } from "http";
import Skeleton from "react-loading-skeleton";
import Loading from "@/app/loading";
import { TopUpType } from "@/interfaces/TopUp";

type CalculateLeaveType = {
  sortType: string;
  timeOffs: TimeOff[];
  users: UsersType;
  sortYear: number;
  topups: TopUpType[];
};

function GetCalculateBalanceTimeOff(args: CalculateLeaveType) {

  const { sortType, timeOffs, users, sortYear, topups } = args;

  const topupByEmployee = topups?.filter((i: any) => i.employee === users._id);

  // // Calculate topup day : If type increase add topup day, if type reduce minus topup day
  const queryTopUp = [];
  for (let index = 0; index < topupByEmployee?.length; index++) {
    const sortTopup = topupByEmployee[index];
    const checkTypeTopup = sortTopup?.type === "increase" ? sortTopup?.topUpDay : sortTopup?.type === "reduce" ? -sortTopup?.topUpDay : 0
    queryTopUp.push(checkTypeTopup)
  }

  const calulateTopup = queryTopUp.reduce((a: any, b: any) => a + b, 0)

  const vacaltionLeave2023 = users?.year2023Leave
    ? users?.year2023Leave.vacationLeave
    : 0;
  const totalVacationLeave =
    users?.year2024Leave.vacationLeave + vacaltionLeave2023 + calulateTopup;

  const totalPersonalLeave = users?.year2025Leave.personalLeave;
  const totalSickLeave = users?.year2025Leave.sickLeave;

  const totalLeave2025 = users?.year2025Leave.vacationLeave;

  const totalLeave =
  sortType === "Vacation" 
    ? totalVacationLeave
    : sortType === "Personal Leave"
    ? totalPersonalLeave
    : totalSickLeave;

  const filterTimeOff = timeOffs?.filter(
    (i: TimeOff) =>
      i.employee === users._id &&
      i.status === "Complete" &&
      i?.type === sortType
  );

  // Calculate timeoff day
  const queryDate = [];
  for (let index = 0; index < filterTimeOff?.length; index++) {
    const issueDateTotal = filterTimeOff[index].issueDate;
    for (let index = 0; index < issueDateTotal?.length; index++) {
      const date = issueDateTotal[index];
      const convertDate = new Date(date);
      const getYear = convertDate.getFullYear();
      if (getYear === sortYear) {
        queryDate.push(date);
      }
    }
  }
  
  const getTotalLeave2025 =
    sortType === "Vacation"
      ? totalLeave2025
      : sortType === "Personal Leave"
      ? totalPersonalLeave
      : totalSickLeave;

  const filterHaftDay = filterTimeOff?.filter(
    (i: TimeOff) => i?.halfDay != "FullDay"
  );

  // Calculate halfday: if halfday is not equal to FullDay add 0.5
  const queryHalfDay = [];
  for (let index = 0; index < filterHaftDay?.length; index++) {
    const halfDayTotal = filterHaftDay[index].issueDate;
    for (let index = 0; index < halfDayTotal?.length; index++) {
      const date = halfDayTotal[index];
      const convertDate = new Date(date);
      const getYear = convertDate.getFullYear();
      if (getYear === sortYear) {
        queryHalfDay.push(date);
      }
    }
  }

  const calulateHalfDay = queryHalfDay?.length * 0.5;

  // Calculate result timeoff day: TotalLeave plus topup minus timeoff day
  const resultTimeoffs =
    sortYear === 2024
      ? totalLeave - queryDate.length + calulateHalfDay
      : getTotalLeave2025 - queryDate.length + calulateHalfDay;

  const testResult = 0

  return resultTimeoffs;
};

export default GetCalculateBalanceTimeOff;
