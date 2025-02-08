import React from "react";
import { UsersType } from "@/interfaces/User";
import { TimeOff } from "@/interfaces/TimeOff";
import { TopUpType } from "@/interfaces/TopUp";
import { useUser } from "@/app/services/queries";

interface CalculateVacationLeaveProps {
  user: UsersType;
  seletedYear: number;
  sortType: string;
}
interface CalculateTopupVacationLeave {
  userId: string;
  seletedYear: number;
  sortType: string;
}

const CalculateTopupVacationLeave: React.FC<CalculateTopupVacationLeave> = (args) => {
  const { userId, seletedYear, sortType } = args;
  const { data: getUser} = useUser(userId);
  const user: UsersType = getUser?.user;

  const calculateVacationLeaveCurrenYear =
    CalculateVacationLeaveCurrentYear({
      user,
      seletedYear,
      sortType,
    }) ?? 0;

  const carryOverLastYear = Number(
    CalculateCarryOver({ user, seletedYear, sortType }) ?? 0
  );

  const topUpThisYear = CalculateTopup({
    topupRecords: user?.topupRecords,
    seletedYear: 2025,
  }) ?? 0;

  return calculateVacationLeaveCurrenYear + carryOverLastYear + topUpThisYear;
};

export const CalculateCarryOver: React.FC<CalculateVacationLeaveProps> = ({
  user,
  seletedYear,
  sortType,
}) => {
  const vacationLeaveLastYear = CalculateVacationLeaveLastYear({ user });

  const topupLastYear = CalculateTopup({
    topupRecords: user?.topupRecords,
    seletedYear: 2024,
  });

  return vacationLeaveLastYear + topupLastYear;
};

const CalculateTopup = ({
  topupRecords,
  seletedYear,
}: {
  topupRecords: TopUpType[];
  seletedYear: number;
}) => {
  return (
    topupRecords?.reduce((acc, topup) => {
      const getYear = new Date(topup.createdAt).getFullYear();
      if (topup.type === "reduce" && getYear === seletedYear) {
        return acc - Number(topup?.topUpDay);
      } else if (topup.type === "increase" && getYear === seletedYear) {
        return acc + Number(topup?.topUpDay);
      }
      return acc;
    }, 0) ?? 0
  );
};

const CalculateVacationLeaveLastYear = ({ user }: { user: UsersType }) => {
  const totalVacationLeave = user?.timeOffRecords?.filter((timeOff) => {
    const sortTypeLeave = timeOff.type === "Vacation";
    const sortStatus =
      timeOff.status === "Approve" || timeOff.status === "Complete";
    return sortTypeLeave && sortStatus;
  });

  const lastYearVacationLeave = user?.year2024Leave.vacationLeave;
  const vacationLeave2023 = user?.year2023Leave?.vacationLeave ?? 0;
  const maxVacationLeave = 12;

  const dateVacationLeaveLastYear: string[] = [];
  const haftDaySVacationLeaveLastYear: string[] = [];

  for (let index = 0; index < (totalVacationLeave?.length ?? 0); index++) {
    const vacationDate = totalVacationLeave?.[index].issueDate;
    const vacaitonHalfDay = totalVacationLeave?.[index].halfDay;
    for (let index = 0; index < (vacationDate?.length ?? 0); index++) {
      const issueDate = vacationDate?.[index];
      const lastYear = new Date().getFullYear() - 1;
      const date = new Date(issueDate);

      if (
        issueDate &&
        vacaitonHalfDay === "FullDay" &&
        date.getFullYear() === lastYear &&
        !dateVacationLeaveLastYear.includes(issueDate)
      ) {
        dateVacationLeaveLastYear.push(issueDate);
      } else if (
        issueDate &&
        vacaitonHalfDay !== "FullDay" &&
        date.getFullYear() === lastYear
      ) {
        haftDaySVacationLeaveLastYear.push(issueDate);
      } else {
        continue;
      }
    }
  }
  const calculateHaftDayLastYear = haftDaySVacationLeaveLastYear.length / 2;

  const calculateVacationLeaveLastYear =
    lastYearVacationLeave -
    dateVacationLeaveLastYear.length -
    calculateHaftDayLastYear +
    vacationLeave2023;

  return calculateVacationLeaveLastYear > maxVacationLeave
    ? maxVacationLeave
    : calculateVacationLeaveLastYear;
};

const CalculateVacationLeaveCurrentYear = ({
  user,
  seletedYear,
  sortType,
}: CalculateVacationLeaveProps) => {
  const vacationLeave = user?.year2025Leave.vacationLeave;

  const totalVacationLeave = user?.timeOffRecords?.filter((timeOff) => {
    const sortTypeLeave = timeOff.type === sortType;
    const sortStatus =
      timeOff.status === "Approve" || timeOff.status === "Complete";
    return sortTypeLeave && sortStatus;
  });

  const dateVacationLeave: string[] = [];
  const haftDaySVacationLeave: string[] = [];

  for (let index = 0; index < (totalVacationLeave?.length ?? 0); index++) {
    const vacationDate = totalVacationLeave?.[index]?.issueDate;
    const vacaitonHalfDay = totalVacationLeave?.[index]?.halfDay;
    for (let index = 0; index < (vacationDate?.length ?? 0); index++) {
      const issueDate = vacationDate?.[index];
      const date = new Date(issueDate);
      if (
        issueDate &&
        vacaitonHalfDay === "FullDay" &&
        date.getFullYear() === seletedYear &&
        !dateVacationLeave.includes(issueDate)
      ) {
        dateVacationLeave.push(issueDate);
      } else if (
        issueDate &&
        vacaitonHalfDay !== "FullDay" &&
        date.getFullYear() === seletedYear
      ) {
        haftDaySVacationLeave.push(issueDate);
      } else {
        continue;
      }
    }
  }
  const calculateHaftDay = haftDaySVacationLeave.length / 2;

  const calculateVacationLeave =
    vacationLeave - dateVacationLeave.length - calculateHaftDay;


  return calculateVacationLeave;
};

export default CalculateTopupVacationLeave;
