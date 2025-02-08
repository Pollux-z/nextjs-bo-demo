import { useTimeOffs } from "@/app/services/queries";
import React from "react";

function FilterHistoryMonth({ id, filterMonth, sortType }) {
  const { data: getTimeOffs } = useTimeOffs();
  const timeoffs = getTimeOffs?.totalTimeOff;
  const filterUser = timeoffs?.filter((val) => val?.employee === id && val?.status === "Complete" && val?.type === sortType);
  const queryDate = [];
  for (let index = 0; index < filterUser?.length; index++) {
    const elementIssueDate = filterUser[index].issueDate;
    for (let index = 0; index < elementIssueDate?.length; index++) {
      const element = elementIssueDate[index];
      queryDate.push(element);
    }
  }
  const queryMonth = queryDate?.filter(
    (val) => new Date(val).getMonth() + 1 === filterMonth
  );
  return queryMonth?.length > 0 ? <p className=" rounded-sm bg-green-200 text-green-600">{queryMonth?.length}</p> : null;
}

export default FilterHistoryMonth;
