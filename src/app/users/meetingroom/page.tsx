"use client";

import React, { useState } from "react";
import ContainerUser from "../../components/ContainerUser";
import HeaderContent from "../../components/HeaderContent";
import { useSession } from "next-auth/react";
import BtnCreate from "../../components/button/BtnCreate";
import {
  useMeetingRoomJoinEmployees,
  useReserves,
  useUsers,
} from "../../services/queries";
import FilterMeetingRooms from "./components/FilterMeetingRooms";
import TableMeetingRoom from "@/app/components/table/TableMeetingRoom";
import Image from "next/image";
import { NameMeetingRoom } from "@/app/db/option";
import { endOfMonth, format, startOfMonth } from "date-fns";
import Loading from "@/app/loading";
import InputSearch from "@/app/components/InputSearch";
import Error from "@/app/Error";

function Page(): React.ReactElement {
  const { data: session } = useSession();

  const {
    data: getMeetingRoom,
    isLoading,
    isValidating,
    error,
  } = useMeetingRoomJoinEmployees("Month");
  const meetingRoom = getMeetingRoom?.reserves;

  const [searchQuery, setSearchQuery] = useState("");
  const [sortDateUse, setSortDateUse] = useState("");
  const [sortType, setSortType] = useState("");

  const onChangeAll = () => {
    setSortDateUse("");
    setSortType("");
  };

  const currentDate = new Date();
  const dateStartMonth = format(startOfMonth(currentDate), "yyyy-MM-dd");
  const dateEndMonth = format(endOfMonth(currentDate), "yyyy-MM-dd");

  if (isLoading) return <Loading />;
  if (error) return <Error />;
  
  return (
    <ContainerUser>
      <HeaderContent
        textHeader={`Meeting Room`}
        textContent={``}
        textContentSub={``}
        hrefContent={``}
      />
      <div className="min-h-[100px] bg-white px-3 py-2 mt-3 rounded-md shadow-sm">
        <div className="flex justify-end mt-5 items-end space-x-3">
          <BtnCreate btnText="Reserve" href="/users/meetingroom/create" />
        </div>

        {NameMeetingRoom?.map((nameRoom, index) => (
          <div key={index} className="grid gap-3 mt-3">
            <div className=" bg-white rounded-md shadow-sm grid grid-cols-2 lg:grid-cols-8 py-2 ">
              <div className="col-span-2">
                <div className="grid justify-center items-center">
                  <div>
                    <Image
                      src={nameRoom?.imgRoom}
                      width={130}
                      height={100}
                      className="w-full rounded-md shadow-sm"
                      alt={nameRoom.nameEng}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-md mt-2 font-semibold">
                      {nameRoom?.nameEng}
                    </p>
                    <p className="text-xs">{nameRoom?.value}</p>
                  </div>
                </div>
              </div>
              <div className="col-span-6">
                <FilterMeetingRooms sortCategory={nameRoom?.value} />
              </div>
            </div>
          </div>
        ))}

        <div className="shadow-lg rounded-md mt-5  py-2 px-3 ">
          <div className="flex justify-end items-center space-x-3">
            <div>
              <button
                type="button"
                className="bg-purple-100 text-purple-600 hover:bg-purple-600 hover:text-white py-2 px-2 rounded-lg shadow-sm flex items-center gap-2 text-sm font-normal"
                onClick={onChangeAll}
              >
                All
              </button>
            </div>
            {NameMeetingRoom.map((nameRoom, index) => (
              <button
                type="button"
                key={index}
                className="bg-purple-100 text-purple-600 hover:bg-purple-600 hover:text-white py-2 px-2 rounded-lg shadow-sm flex items-center gap-2 text-sm font-normal"
                onClick={() => setSortType(nameRoom.value)}
              >
                {nameRoom.nameEng}
              </button>
            ))}
          </div>
          <div className="flex justify-end items-center mt-3 gap-2">
            <div className="">
              <input
                placeholder="yyyy-MM-dd"
                onChange={(e) => setSortDateUse(e.target.value)}
                value={sortDateUse}
                type="date"
                name="sortDate"
                id="sortDate"
                min={dateStartMonth}
                max={dateEndMonth}
                className="px-2 py-2 bg-gray-50 rounded-md text-gray-700 text-xs border"
              />
            </div>
            <div>
              <InputSearch
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
          </div>
          <TableMeetingRoom
            sortType={sortType}
            sortDateUse={sortDateUse}
            data={meetingRoom}
            searchQuery={searchQuery}
          />
        </div>
      </div>
    </ContainerUser>
  );
}

export default Page;
