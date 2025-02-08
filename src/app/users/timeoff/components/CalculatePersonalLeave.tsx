import { useUsersJoinTimeOff } from "@/app/services/queries";
import { TimeOff } from "@/interfaces/TimeOff";
import { UsersType } from "@/interfaces/User";
import React from "react";

interface CalculatePersonalLeaveProps {
  user: UsersType;
  seletedYear: number;
  sortType: string;
}

const CalculatePersonalLeave = (args: CalculatePersonalLeaveProps) => {
  const { user, seletedYear, sortType } = args;

  const personalLeave = user?.year2025Leave.personalLeave;

  const totalPersonalLeave = user?.timeOffRecords.filter((timeOff) => {
    const sortTypeLeave = timeOff.type === "Personal Leave";
    const sortStatus = timeOff.status === "Complete";
    return sortTypeLeave && sortStatus;
  });

  const datePersonalLeave: string[] = [];
  const haftDaySPersonalLeave: string[] = [];

  totalPersonalLeave?.forEach((timeOff: TimeOff) => {
    const personalLeaveDate = timeOff.issueDate;
    const personalLeaveHalfDay = timeOff.halfDay;
    personalLeaveDate?.forEach((issueDate: string) => {
      const date = new Date(issueDate);
      if (
        issueDate &&
        personalLeaveHalfDay === "FullDay" &&
        date.getFullYear() === seletedYear &&
        !datePersonalLeave.includes(issueDate)
      ) {
        datePersonalLeave.push(issueDate);
      } else if (
        issueDate &&
        personalLeaveHalfDay !== "FullDay" &&
        date.getFullYear() === seletedYear
      ) {
        haftDaySPersonalLeave.push(issueDate);
      } else {
        return;
      }
    });
  }
);



  const calculateHaftDay = (haftDaySPersonalLeave.length ?? 0) / 2;

  return personalLeave - datePersonalLeave.length - calculateHaftDay;
};

export default CalculatePersonalLeave;
