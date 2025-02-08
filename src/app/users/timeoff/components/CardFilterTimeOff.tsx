import FormatDate from "@/app/components/FormatDate";
import FormatDateSimple from "@/app/components/FormatDateSimple";
import { useTimeOffJoinUsers, useTimeOffs } from "@/app/services/queries";
import React, { useReducer, useState } from "react";
import ProfileAndNameTimeoff from "./ProfileAndNameTimeoff";
import { TimeOff } from "@/interfaces/TimeOff";

const CardFilterTimeOff = () => {
  const { data: getTimeOffs } = useTimeOffJoinUsers();
  const timeOffs: TimeOff[] = getTimeOffs?.timeOff;
  const filterStatusReject = timeOffs?.filter(
    (timeOff) => timeOff.status != "Reject"
  );

  const todayStart = new Date().setHours(0, 0, 0, 0);

  let uniqueDate: any[] = [];
  for (let index = 0; index < filterStatusReject?.length; index++) {
    const elementTimeOff = filterStatusReject[index].issueDate;
    for (let index = 0; index < elementTimeOff.length; index++) {
      const elementIssueDate = elementTimeOff[index];
      const issueDate = new Date(elementIssueDate).setHours(0, 0, 0, 0);
      if (issueDate >= todayStart && !uniqueDate.includes(issueDate)) {
        uniqueDate.push(issueDate);
      }
    }
  }

  const sortUniqueDate = uniqueDate.sort((a, b) => a - b);

  const resulteData = sortUniqueDate.slice(0, 5).map((date, index) => {
    const filterUser = filterStatusReject?.filter((userNoneReject) =>
      userNoneReject.issueDate.some(
        (issueDate) => new Date(issueDate).setHours(0, 0, 0, 0) === date
      )
    );
    return (
      <div
        key={index}
        className="col-span-5 lg:col-span-1 rounded-md shadow-sm bg-white p-3 max-w-full"
      >
        <div>
          <h3 className="text-sm border-l-2 px-2 border-indigo-300 font-semibold ">
            <FormatDateSimple dateData={date} />
          </h3>
        </div>
        <div className="mt-1">
          {filterUser?.map((user, index) => (
            <div key={user._id}>
              <ProfileAndNameTimeoff data={user} />
            </div>
          ))}
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="grid grid-cols-5 gap-3">{resulteData}</div>
    </>
  );
};

export default CardFilterTimeOff;
