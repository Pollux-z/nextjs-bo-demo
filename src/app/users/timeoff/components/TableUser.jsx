"use client";

import FormatDateTimeOff from "@/app/components/FormatDateTimeOff";
import { useTimeOffUser } from "@/app/services/queries";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

import StyleStatus from "./StyleStatus";

import Pagination from "@/app/components/Pagination";
import { paginate } from "@/app/helpers/paginate";

import Image from "next/image";
import Avatar from "../../../../../public/avataricon.png";
import Loading from "@/app/loading";
import Error from "@/app/Error";
import AlertNoneData from "@/app/components/AlertNoneData";
import ProfileNameTitle from "@/app/components/ProfileNameTitle";

function TableUser() {
  const { data: session } = useSession();
  const idSession = session?.user?.id;
  const {
    data: timeOffUser,
    isLoading,
    isValidating,
    error,
  } = useTimeOffUser(idSession);
  const getTimeOffUser = timeOffUser?.userTimeOff;

  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 10;

  const paginatedUserProve = paginate(getTimeOffUser, pageIndex, pageSize);

  const onPageChange = (page) => {
    setPageIndex(page);
  };

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      {getTimeOffUser?.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="table-auto text-left mt-5 min-w-full md:table-fixed">
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
                {paginatedUserProve?.map((val, index) => (
                  <tr
                    key={index}
                    className="odd:bg-white even:bg-slate-50 *:px-3 text-xs *:h-16"
                  >
                    <td>
                      <ProfileNameTitle data={val?.employee} />
                    </td>
                    <td>{val?.type}</td>
                    <td>{val?.reason}</td>
                    <td>
                      {val?.issueDate?.map((val, index) => (
                        <p key={index}>
                          <FormatDateTimeOff dateData={val} />
                        </p>
                      ))}
                    </td>
                    <td>
                      <StyleStatus data={val?.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mt-5">
            <Pagination
              items={getTimeOffUser?.length}
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
}

export default TableUser;
