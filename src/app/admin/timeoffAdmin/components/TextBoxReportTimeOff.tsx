import { TimeOff } from "@/interfaces/TimeOff";
import React from "react";
import { format } from "date-fns";

type AgumentType = {
    id: string;
    month: number;
    sortType: string;
    sortYear: number;
    timeoffs: TimeOff[];
}

const TextBoxReportTimeOff: React.FC<AgumentType> = (arg) => {
  const { id, timeoffs, month, sortType, sortYear } = arg;

  const filterTimeOff: TimeOff[] = timeoffs?.filter(
    (timeOff: TimeOff) => timeOff.employee === id && timeOff.status === "Complete" && timeOff?.type === sortType
  );

  const getMonthName = format(new Date(sortYear, month - 1, 1), "MMMM yyyy");
  

  const queryDate: any[] = [];
  for (let index = 0; index < filterTimeOff?.length; index++) {
    const dateTotal: TimeOff = filterTimeOff[index];
    const issueDateTotal = dateTotal.issueDate;
    for (let index = 0; index < issueDateTotal?.length; index++) {
      const element = issueDateTotal[index];
      const convertIssueDate = new Date(element);
      const getYear = convertIssueDate.getFullYear();
      const getMonth = convertIssueDate.getMonth() + 1;
      const getDay = format(convertIssueDate, "dd-MMM-yyyy");
      if (getMonth === month && getYear === sortYear && !queryDate.includes(getDay)) {
        queryDate.push(getDay);
      }
    }
  }

  return (
      <>
      <p>{sortType} {getMonthName}</p>
      {queryDate?.map((date, index) => (
       <p key={index}>{date} </p>
      ))}
      </>
  )
};

export default TextBoxReportTimeOff;
