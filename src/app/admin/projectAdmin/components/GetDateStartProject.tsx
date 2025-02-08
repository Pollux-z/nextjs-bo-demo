import React from "react";
import { format, addYears, getYear } from "date-fns";

export function GetDateProject({ dataDate }: { dataDate: string }) {
  if (dataDate === "0000-00-00") return "None";

  const currentDate = new Date();
  const currentYear = getYear(currentDate);
  const startDateProject = new Date(dataDate);
  const getYearStartDate = getYear(startDateProject);
  const futureDate = format(addYears(currentDate, 300), "dd-MM-yyyy");
  const getfutureYear = getYear(futureDate);
  const buddhishDate = format(addYears(startDateProject, -543), "dd-MM-yyyy");
  const christianDate = format(startDateProject, "dd-MM-yyyy");
  const conditionYear =
    getYearStartDate > currentYear && getYearStartDate > getfutureYear
      ? buddhishDate
      : christianDate;
  return conditionYear;
}
