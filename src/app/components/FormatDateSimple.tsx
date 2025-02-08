import { format } from "date-fns";
import React from "react";

type FormatDateSimpleType = {
  dateData: string | number
}

const FormatDateSimple: React.FC<FormatDateSimpleType> = ({ dateData }) => {
  const resultTime = format(new Date(dateData), "MMM dd yyyy");
  return resultTime;
}

export default FormatDateSimple;
