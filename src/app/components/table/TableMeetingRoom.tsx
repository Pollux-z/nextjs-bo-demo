"use client";

import { useMeetingRoomJoinEmployees } from "@/app/services/queries";
import React, { useState } from "react";
import ProfileTitleName from "../ProfileTitleName";
import { NameMeetingRoom } from "@/app/db/option";

import Pagination from "@/app/components/Pagination";
import { paginate } from "@/app/helpers/paginate";
import Loading from "@/app/loading";
import Error from "@/app/Error";
import DropdownOption from "@/app/users/meetingroom/components/DropdownOption";
import { useSession } from "next-auth/react";
import { type } from "os";
import { MeetingRoomType } from "@/interfaces/MeetingRoom";

type TableMeetingRoomType = {
  data: Array<MeetingRoomType>;
  sortType: string;
  sortDateUse: string;
  searchQuery: string;
};

const TableMeetingRoom: React.FC<TableMeetingRoomType> = ({
  data,
  sortType,
  sortDateUse,
  searchQuery,
}) => {
  const { data: session } = useSession();
  const sessionId = session?.user?.id;
  const sessionRole = session?.user?.role;

  const queryMeetingRoom = data?.filter((meetingRoomValue) => {
    const sortUseDate = new Date(sortDateUse).setHours(0, 0, 0, 0);
    const meetingDate = new Date(meetingRoomValue.startDate).setHours(
      0,
      0,
      0,
      0
    );
    const isValueNameEmployee = meetingRoomValue?.employee_info.nameEng
      .toLowerCase()
      .includes(searchQuery);

    const isValueNickName = meetingRoomValue?.employee_info.nickNameTh
      .toLowerCase()
      .includes(searchQuery);

    const isValueMatchDate = sortUseDate === meetingDate;

    const isValueMatchRoomName = meetingRoomValue?.category.includes(sortType);

    if (searchQuery) {
      return isValueNameEmployee || isValueNickName;
    }

    if (!sortType && !sortDateUse) {
      return isValueMatchRoomName;
    }

    if (sortType && !sortDateUse) {
      return isValueMatchRoomName;
    }

    if (sortDateUse && !sortType) {
      return isValueMatchDate;
    }

    // return isValueMatchDate && isValueMatchRoomName;
    return (
      (isValueNameEmployee || isValueNickName) &&
      isValueMatchRoomName &&
      isValueMatchDate
    );
  });

  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 50;

  const paginatedUsers: MeetingRoomType[] = paginate(
    queryMeetingRoom,
    pageIndex,
    pageSize
  );

  const onPageChange = (page: number) => {
    setPageIndex(page);
  };

  // if(isLoading) return <Loading />
  // if(isValidating) return <Error />

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left">
          <thead className="border-b">
            <tr className="*:py-3 *:px-3 *:font-normal text-sm">
              <th className="p-2">ID</th>
              <th className="p-2">User</th>
              <th className="p-2">Subject</th>
              <th className="p-2">Meeting room</th>
              <th className="p-2">Issue date</th>
              <th className="p-2 text-center">Time use</th>
              <th className="p-2">Remark</th>
              <th className=""></th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers?.map((reserve, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-slate-50 *:px-3 text-xs *:h-16"
              >
                <td>{reserve?.id}</td>
                <td>
                  <ProfileTitleName
                    employeeId={reserve?.employee_info?._id}
                    profile={reserve?.employee_info?.employeeProfile}
                    name={reserve?.employee_info?.nameEng}
                    title={reserve?.employee_info?.employeeTitle}
                  />
                </td>
                <td>{reserve?.subject}</td>
                <td>
                  {
                    NameMeetingRoom.find(
                      (nameRoom) => nameRoom.value === reserve?.category
                    )?.nameEng
                  }
                </td>
                <td>{reserve?.startDate}</td>
                <td className="text-center">
                  <div>
                    <p>{reserve?.startTime}</p>
                    <p>{reserve?.endTime}</p>
                  </div>
                </td>
                <td>{reserve?.remark}</td>
                <td>
                  {sessionId === reserve?.employee_info?._id ||
                  sessionRole === "Admin" ? (
                    <DropdownOption id={reserve._id} />
                  ) : undefined}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-3">
        <Pagination
          items={queryMeetingRoom?.length}
          pageIndex={pageIndex}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};
export default TableMeetingRoom;
