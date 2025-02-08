"use client";

import React, { useState } from "react";
import FormatDateTimeOff from "@/app/components/FormatDateTimeOff";
import { useTimeOffJoinUsers, useTimeOffUser } from "@/app/services/queries";
import { useSession } from "next-auth/react";

import StyleStatus from "./StyleStatus";

import Pagination from "@/app/components/Pagination";
import { paginate } from "@/app/helpers/paginate";

import Loading from "@/app/loading";
import Error from "@/app/Error";
import AlertNoneData from "@/app/components/AlertNoneData";
import ProfileTitleName from "@/app/components/ProfileTitleName";
import { TimeOff } from "@/interfaces/TimeOff";

const TableTimeOffUser: React.FC = () => {
  const { data: session } = useSession();
  const idSession = session?.user?.id;

  const {
    data: getTimeoffs,
    isLoading,
    isValidating,
    error,
  } = useTimeOffJoinUsers();
  const timeOffs: TimeOff[] = getTimeoffs?.timeOff;

  const userTimeOffs = timeOffs?.filter(
    (timeOff) => timeOff.employee === idSession
  );

  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 10;

  const paginatedUserProve: TimeOff[] = paginate(
    userTimeOffs,
    pageIndex,
    pageSize
  );

  const onPageChange = (page: number) => {
    setPageIndex(page);
  };

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      {userTimeOffs?.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="table-auto text-left mt-5 min-w-full ">
              <thead className="border-b bg-gray-50">
                <tr className="*:py-3 *:px-3 *:font-normal text-xs">
                  <th className="">Name / Title</th>
                  <th className="">Type</th>
                  <th className="">Reason</th>
                  <th className="">Date request</th>
                  <th className="text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUserProve?.map((user, index) => (
                  <tr
                    key={index}
                    className="odd:bg-white even:bg-slate-50 *:px-3 text-xs *:h-16"
                  >
                    <td>
                      <ProfileTitleName
                        profile={user?.employee_info.employeeProfile}
                        name={user?.employee_info.nameEng}
                        title={user?.employee_info.employeeTitle}
                        employeeId={user?.employee_info._id}
                      />
                    </td>
                    <td>{user?.type}</td>
                    <td>{user?.reason}</td>
                    <td>
                      {user?.issueDate?.map((date, index) => (
                        <p key={index}>
                          <FormatDateTimeOff dateData={date} />
                        </p>
                      ))}
                    </td>
                    <td>
                      <StyleStatus data={user?.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mt-5">
            <Pagination
              items={userTimeOffs?.length}
              pageIndex={pageIndex}
              pageSize={pageSize}
              onPageChange={onPageChange}
            />
          </div>
        </>
      ) : (
        <AlertNoneData />
      )}
    </>
  );
};

export default TableTimeOffUser;
