import { useTimeOffs } from "@/app/services/queries";
import React from "react";

function FilterTotalHistory({ id, sortType}) {
  const { data: getTimeOffs } = useTimeOffs();
  const timeoffs = getTimeOffs?.totalTimeOff;
  const filterUser = timeoffs?.filter(
    (val) => val?.employee === id && val?.status === "Complete" && val?.type === sortType
  );
  const queryDate = [];
  for (let index = 0; index < filterUser?.length; index++) {
    const elementIssueDate = filterUser[index].issueDate;
    for (let index = 0; index < elementIssueDate?.length; index++) {
      const element = elementIssueDate[index];
      queryDate.push(element);
    }
  }

  return queryDate?.length > 0 ? (
    <p className=" rounded-sm bg-purple-200 text-purple-600">
      {queryDate?.length}
    </p>
  ) : null;
}

export default FilterTotalHistory;
