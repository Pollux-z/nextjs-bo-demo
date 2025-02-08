import { TimeOff } from "@/interfaces/TimeOff";
import { UsersType } from "@/interfaces/User";
import React from "react";

interface IGetTimeoffByMonth {
  timeOffRecord: any;
  seletedMonth: number;
  seletedYear: number;
  seletedType: string;
}

const GetTimeoffByMonth: React.FC<IGetTimeoffByMonth> = ({
  timeOffRecord,
  seletedMonth,
  seletedYear,
  seletedType
}) => {
  const totalTimeOffByMonth: any[] = [];
  const halfDayTimeOffByMonth: any[] = [];

  timeOffRecord?.forEach((timeOff: TimeOff) => {
    const issueDate = timeOff?.issueDate;
    issueDate?.forEach((element: string) => {
      const convertIssueDate = new Date(element);
      const getYear = convertIssueDate.getFullYear();
      const getMonth = convertIssueDate.getMonth() + 1;
      if (
        getMonth === seletedMonth &&
        getYear === seletedYear &&
        timeOff?.type === seletedType &&
        timeOff?.status === "Complete" &&
        timeOff?.halfDay === "FullDay"
      ) {
        totalTimeOffByMonth.push(element);
      } else if (
        getMonth === seletedMonth &&
        getYear === seletedYear &&
        timeOff?.type === seletedType &&
        timeOff?.status === "Complete" &&
        timeOff?.halfDay !== "FullDay"
      ) {
        halfDayTimeOffByMonth.push(element);
      }
    })
  }
  );
    
  const calculateHalfDay = halfDayTimeOffByMonth.length * 0.5 || 0;
  const calculateTimeOffByMonth = totalTimeOffByMonth.length + calculateHalfDay;

  return totalTimeOffByMonth.length > 0 ? calculateTimeOffByMonth : null;
};

export default GetTimeoffByMonth;
