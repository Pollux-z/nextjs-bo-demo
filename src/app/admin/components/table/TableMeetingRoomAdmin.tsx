"use client";

import { useMeetingRoomJoinEmployees, useReserves } from "@/app/services/queries";
import React, { useState } from "react";

// Pagination function
import Pagination from "@/app/components/Pagination";
import { paginate } from "@/app/helpers/paginate";
import AlertNoneData from "@/app/components/AlertNoneData";
import FormatDateSimple from "@/app/components/FormatDateSimple";
import ProfileNameTitle from "@/app/components/ProfileNameTitle";
import Loading from "@/app/loading";
import Error from "@/app/Error";
import StyleStatus from "@/app/components/StyleStatus";
import DropdownOption from "../DropdownOption";



const TableMeetingRoomAdmin = () => {
  const { data: getReserve, isLoading, isValidating, error } = useMeetingRoomJoinEmployees('All')
  const reserves = getReserve?.reserves;

  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 50;

  const onPageChange = (page: any) => {
    setPageIndex(page);
  };

  const paginatedMeetingRoom = paginate(reserves, pageIndex, pageSize);

  if (isLoading) return <Loading />;
  if (error) return <Error />;
  return (
    <>
      {paginatedMeetingRoom && paginatedMeetingRoom.length > 0 ? (
        <div className="bg-white w-full rounded-md py-5 px-5 mt-5 overflow-x-auto">
          <table className="table-auto text-left mt-5 min-w-full">
            <thead className="border-b bg-gray-50">
              <tr className="*:py-3 *:px-3 *:font-normal text-xs">
                <th>ID</th>
                <th className="">User</th>
                <th className="">Date use</th>
                <th className="">Time start</th>
                <th className="">Time end</th>
                <th className="">category</th>

                <th className="text-center "></th>
              </tr>
            </thead>
            <tbody>
              {paginatedMeetingRoom?.map((reserve: any, index: number) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-slate-50 *:px-3 text-xs *:h-16"
                >
                  <td>{reserve.id}</td>
                  <td className="max-w-72 truncate ...">
                    <ProfileNameTitle data={reserve.userCreate} />
                  </td>
                  <td>
                    <FormatDateSimple dateData={reserve.startDate} />
                  </td>
                  <td>{reserve.startTime}</td>
                  <td>{reserve.endTime}</td>
                  <td>{reserve.category}</td>
                  <td>
                    <DropdownOption
                      id={reserve._id}
                      hrefEdit={`/admin/meetingroomAdmin/edit/${reserve?._id}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-3">
            <Pagination
              items={reserves?.length}
              pageIndex={pageIndex}
              pageSize={pageSize}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      ) : (
        <AlertNoneData />
      )}
    </>
  );
}

export default TableMeetingRoomAdmin;
