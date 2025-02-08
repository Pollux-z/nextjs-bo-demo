import React from "react";

function FilterCarRecord() {
  return (
    <div className="grid grid-cols-5 py-5">
      <div className="border-r flex justify-center items-center ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
          />
        </svg>
      </div>
      <div className="border-r flex justify-center items-center">
        <h5 className="text-sm font-medium">Filter By</h5>
      </div>
      <div className="border-r flex justify-center items-center px-2">
        <select name="" id="" className="font-medium">
          <option value="all">All</option>
          <option value="today">Today</option>
          <option value="thisweek">This Week</option>
          <option value="thismonth">This Month</option>
          <option value="lastweek">Last Week</option>
          <option value="lastmonth">Last Month</option>
        </select>
      </div>
      <div className="border-r flex justify-center items-center">
        <select name="" id="" className="font-medium">
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="reserve">Reserve</option>
          <option value="cancel">Cancel</option>
        </select>
      </div>
      <div className="flex justify-center items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>

        <h4>Reset</h4>
      </div>
    </div>
  );
}

export default FilterCarRecord;
