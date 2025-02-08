import { TimeOff } from "@/interfaces/TimeOff";
import React from "react";

type AgumentType = {
  id: string;
  month: number;
  data: any;
  sortType: string;
  sortYear: number;
};

const GetMonthTimeOff: React.FC<AgumentType> = (arg) => {
  const { id, month, data, sortType, sortYear } = arg;

  const filterTimeOff: TimeOff[] = data?.filter(
    (timeOff: TimeOff) =>
      timeOff.employee === id &&
      timeOff.status === "Complete" &&
      timeOff?.type === sortType
  );

  // *Filter halfDay and push data on queryHalfDate
  const queryHalfDate: string[] = [];
  const filterHaftDay = filterTimeOff?.filter(
    (timeOff: TimeOff) => timeOff?.halfDay != "FullDay"
  );

  for (let index = 0; index < filterHaftDay?.length; index++) {
    const halfDate = filterHaftDay[index];
    const issueDateHaftDate = halfDate?.issueDate;
    for (let index = 0; index < issueDateHaftDate?.length; index++) {
      const issueDate = issueDateHaftDate[index];
      const convertIssueDate = new Date(issueDate);
      const getYear = convertIssueDate.getFullYear();
      const getMonth = convertIssueDate.getMonth() + 1;
      if (getMonth === month && getYear === sortYear) {
        queryHalfDate.push(issueDate);
      }
    }
  }

  const queryDate: string[] = [];
  for (let index = 0; index < filterTimeOff?.length; index++) {
    const dateTotal = filterTimeOff[index];
    const issueDateTotal = dateTotal.issueDate;
    for (let index = 0; index < issueDateTotal?.length; index++) {
      const element = issueDateTotal[index];
      const convertIssueDate = new Date(element);
      const getYear = convertIssueDate.getFullYear();
      const getMonth = convertIssueDate.getMonth() + 1;
      if (getMonth === month && getYear === sortYear) {
        queryDate.push(element);
      }
    }
  }

  const lengthHaftDate = queryHalfDate?.length;
  const lengthDate = queryDate?.length;
  const calulateHalfDay = lengthHaftDate * 0.5;
  const calulateDate = lengthDate - calulateHalfDay;

  return queryDate.length > 0 ? calulateDate : null;
};

export default GetMonthTimeOff;
