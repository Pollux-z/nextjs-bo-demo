"use client";

import React, { useState } from "react";
import ApprovalTeamlead from "./ApprovalTeamlead";

import Pagination from "@/app/components/Pagination";
import { paginate } from "@/app/helpers/paginate";
import { useTimeOffJoinUsers } from "@/app/services/queries";
import { useSession } from "next-auth/react";
import ProfileTitleName from "@/app/components/ProfileTitleName";
import FormatDateTimeOff from "@/app/components/FormatDateTimeOff";
import StyleStatus from "./StyleStatus";
import StatusApprove from "./StatusApprove";
import StatusReject from "./StatusReject";
import StatusComplete from "./StatusComplete";
import Loading from "@/app/loading";
import Error from "@/app/Error";
import { TimeOff } from "@/interfaces/TimeOff";

const TableAdmin = ({ searchQuery }: { searchQuery: string }) => {
  const { data: session } = useSession();
  const sessionId = session?.user?.id;

  const {
    data: getTimeOffs,
    isLoading,
    isValidating,
    error,
  } = useTimeOffJoinUsers();
  const timeOffs: TimeOff[] = getTimeOffs?.timeOff;

  const QuerySerach = timeOffs?.filter(
    (query) =>
      query?.employee_info?.nameEng.toLowerCase().includes(searchQuery) ||
      query?.employee_info?.nameTh.toLowerCase().includes(searchQuery) ||
      query?.employee_info?.nickNameTh.toLowerCase().includes(searchQuery) ||
      query?.employee_info?.employeeTitle.toLowerCase().includes(searchQuery)
  );

  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 100;

  const paginatedTeamLeader: TimeOff[] = paginate(QuerySerach, pageIndex, pageSize);

  const onPageChange = (page: number) => {
    setPageIndex(page);
  };

  if (isLoading) return <Loading />;
  if (error) return <Error />;
  return (
    <>
      <>
        <table className="table-auto text-left mt-5 min-w-full md:table-fixed">
          <thead className="border-b">
            <tr className="*:py-3 *:px-3 *:font-normal text-xs">
              <th className="">ID</th>
              <th className="">Name / Title</th>
              <th className="text-center">Create date</th>
              <th className="">Type</th>
              <th className="">Reason</th>
              <th className="text-center">Leave date</th>
              <th className="text-center">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTeamLeader?.map((teamLeader, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-slate-50 *:px-3 text-xs *:h-16"
              >
                <td>{teamLeader?.id}</td>
                <td>
                  <ProfileTitleName
                    profile={teamLeader?.employee_info.employeeProfile}
                    name={teamLeader?.employee_info.nameEng}
                    title={teamLeader?.employee_info.employeeTitle}
                    employeeId={teamLeader?.employee_info._id}
                  />
                </td>
                <td>
                  <p className="bg-gray-100 text-center rounded-md shadow-sm p-0.5">
                    <FormatDateTimeOff dateData={teamLeader?.createdAt.split("T")[0]} />
                  </p>
                </td>
                <td>
                  <p>{teamLeader?.type}</p>
                  <p className="text-gray-400 font-light">
                    {teamLeader?.halfDay === "haftMorning"
                      ? "Half-day morning"
                      : teamLeader?.halfDay === "haftAfternoon"
                      ? "Half-day afternoon"
                      : "Full day"}
                  </p>
                </td>
                <td>{teamLeader?.reason}</td>
                <td>
                  {teamLeader?.issueDate?.map((val, index) => (
                    <p key={index} className="text-center">
                      <FormatDateTimeOff dateData={val} />
                    </p>
                  ))}
                </td>
                <td>
                  <StyleStatus data={teamLeader?.status} />
                </td>
                <td className="flex justify-center items-center gap-0.5">
                  <StatusApprove timeOffData={teamLeader} />
                  <StatusReject timeOffData={teamLeader} />
                  <StatusComplete timeOffData={teamLeader} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-5">
          <Pagination
            items={QuerySerach?.length}
            pageIndex={pageIndex}
            pageSize={pageSize}
            onPageChange={onPageChange}
          />
        </div>
      </>
    </>
  );
};
export default TableAdmin;
