import React from "react";
import { UsersType } from "@/interfaces/User";

interface CalculateSickLeaveProps {
  user: UsersType;
  seletedYear: number;
  sortType: string;
}

const CalculateSickLeave = (args: CalculateSickLeaveProps) => {
  const { user, seletedYear, sortType } = args;

  const sickLeave = user?.year2025Leave.sickLeave;

  const totalSickLeave = user?.timeOffRecords.filter((timeOff) => {
    const sortTypeLeave = timeOff.type === "Sick Leave";
    const sortStatus = timeOff.status === "Complete";
    return sortTypeLeave && sortStatus;
  });

  const dateSickLeave: string[] = [];
  const haftDaySickLeave: string[] = [];

  totalSickLeave?.forEach((timeOff) => {
    const sickIssueDate = timeOff.issueDate;
    const sickHalfDay = timeOff.halfDay;
    sickIssueDate?.forEach((issueDate: string) => {
      const date = new Date(issueDate);
      if (
        issueDate &&
        sickHalfDay === "FullDay" &&
        date.getFullYear() === seletedYear &&
        !dateSickLeave.includes(issueDate)
      ) {
        dateSickLeave.push(issueDate);
      } else if (
        issueDate &&
        sickHalfDay !== "FullDay" &&
        date.getFullYear() === seletedYear
      ) {
        haftDaySickLeave.push(issueDate);
      } else {
        return;
      }
    });
  }
);

  const calculateHaftDay = (haftDaySickLeave.length ?? 0 )/ 2;

  return sickLeave - dateSickLeave.length - calculateHaftDay;
};

export default CalculateSickLeave;
