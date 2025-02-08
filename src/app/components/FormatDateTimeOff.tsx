import React from "react";
import { format } from "date-fns";

type FormatDateTimeOffType = {
  dateData: string
}

const FormatDateTimeOff = ({ dateData }: FormatDateTimeOffType) => {
  const resultTime = format(new Date(dateData), "MMM dd yyyy");
  return resultTime;
}

export default FormatDateTimeOff;
