import React from "react";
import { Months } from "../db/date";

function MonthlyFilter() {
  return (
    <div>
      
      <select className="border px-2 rounded-md text-gray-400 text-xs py-2">
        <option value="all">All</option>
      {Months.map((val, index) => (
        <option key={index} value={val} >{val}</option>
      ))}
      </select>
    </div>
  );
}

export default MonthlyFilter;
