import React from "react";
import {
  useReserves,
  useReserveCategory,
  useMeetingRoomJoinEmployees,
} from "@/app/services/queries";

import { format } from "date-fns";
import Loading from "@/app/loading";
import Error from "@/app/Error";
import { useSession } from "next-auth/react";
import BtnDelete from "./BtnDelete";
import { MeetingRoomType } from "@/interfaces/MeetingRoom";

type FilterMeetingRoomsType = {
  sortCategory: string;
};

const FilterMeetingRooms: React.FC<FilterMeetingRoomsType> = ({
  sortCategory,
}) => {
  const { data: session } = useSession();
  const sessionId = session?.user?.id;

  const {
    data: getMeetingRoom,
    isLoading,
    isValidating,
    error,
  } = useMeetingRoomJoinEmployees("Current");
  const meetingRoom: MeetingRoomType[] = getMeetingRoom?.reserves;

  const filterMeetingRoom = meetingRoom?.filter(
    (room) => room?.category === sortCategory
  );

  const queryDate: any[] = [];

  filterMeetingRoom?.forEach((meetingroom) => {
    if (!queryDate.includes(meetingroom.startDate)) {
      queryDate.push(meetingroom.startDate);
    }
  });

  const formatDate = (date: Date) => {
    return format(date, "dd MMM yyyy");
  };

  const currentDate = format(new Date(), "yyyy-MM-dd");

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-2">
        {queryDate?.slice(0, 5).map((dateUse, index) => (
          <div key={index}>
            <p
              className={`text-sm font-semibold  py-1 px-1 rounded-md shadow-sm  my-2 ${
                dateUse === currentDate
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {formatDate(dateUse)}
            </p>
            {filterMeetingRoom
              ?.filter((meetingRoom) => meetingRoom?.startDate === dateUse)
              ?.map((value, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-bold">
                      {value?.startTime} - {value?.endTime}
                    </p>
                    {value?.userCreate === sessionId ? (
                      <BtnDelete id={value?._id} btnText={``} />
                    ) : null}
                  </div>
                  <p className="text-sm truncate ... max-w-40">
                    {value?.employee_info?.nameEng}
                  </p>
                </div>
              ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default FilterMeetingRooms;
