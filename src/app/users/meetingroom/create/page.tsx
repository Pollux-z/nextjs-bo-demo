"use client";
import React, { useState } from "react";
import ContainerUser from "@/app/components/ContainerUser";
import HeaderContent from "@/app/components/HeaderContent";
import { useSession } from "next-auth/react";
import InputFunction from "@/app/users/carrecord/components/InputFunction";
import { NameMeetingRoom } from "@/app/db/option";
import { format, setHours } from "date-fns";

import { useReserveCategory, useReserveLastId } from "@/app/services/queries";

import { useCreateMeetingRoom } from "@/app/services/mutations";
import Loading from "@/app/loading";
import Error from "@/app/Error";

import FilterStartTime from "../components/FilterStartTime";
import FilterEndTime from "../components/FilterEndTime";
import { ReserveType } from "@/interfaces/Reserve";
import { getHours } from "date-fns";

function Page(): React.ReactElement {
  const { data: session } = useSession();

  const { trigger, isMutating } = useCreateMeetingRoom();

  // Fetch last id reserve
  const {
    data: lastReserve,
    isLoading,
    isValidating,
    error,
  } = useReserveLastId();


  const nowDate = format(new Date(), "yyyy-MM-dd");
  const nowTime = format(new Date(), "HH:00");
  const lastTime = format(
    setHours(new Date(), getHours(new Date()) + 1),
    "HH:00"
  );

  const userCreate = session?.user?.id;

  const [showAlert, setShowAlert] = useState("");

  const [inputData, setInputData] = useState({
    category: "",
    subject: "",
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: nowDate,
    startTime: nowTime,
    endTime: lastTime,
    remark: "",
  });

  const startDateData = inputData?.startDate;
  const categoryData = inputData?.category;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      inputData.category === "" ||
      inputData.subject === "" ||
      inputData.startDate === "" ||
      inputData.startTime === "" ||
      inputData.endTime === ""
    ) {
      setShowAlert("Please fill in all the information.");
      return;
    }

    trigger({
      category: inputData.category,
      subject: inputData.subject,
      startDate: inputData.startDate,
      endDate: inputData.endDate,
      startTime: inputData.startTime,
      endTime: inputData.endTime,
      remark: inputData.remark,
      userCreate,
    });
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  // Fetch meeting room reserve
  const { data: category } = useReserveCategory(inputData.category);
  const caregoryData: ReserveType[] = category?.category;

  const filterDate = caregoryData?.filter(
    (element) => element?.startDate === inputData.startDate
  );

  React.useEffect(() => {
    if (showAlert) {
      const timeout = setTimeout(() => setShowAlert(""), 3000);
      return () => clearTimeout(timeout);
    }
  }, [showAlert]);

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <ContainerUser>
      <HeaderContent
        textHeader={`Reserve meeting Room`}
        textContent={`Meeting room`}
        hrefContent={`/users/meetingroom`}
        textContentSub={`Reserve meeting room`}
      />
      <div className="bg-white py-5 px-10 w-full mt-5">
        <div className="grid gap-2 mt-3">
          {showAlert && (
            <div className="bg-red-500 text-white p-4 rounded-md mb-4">
              {showAlert}
            </div>
          )}
          <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-2">
            <div>
              <InputFunction
                disabled={false}
                labelText={`Subject`}
                value={inputData.subject}
                onChange={handleChange}
                type={`text`}
                placeholder={`Enter subject...`}
                name="subject"
              />
            </div>
            <div>
              <label htmlFor="category" className="text-sm">
                Meeting Room
              </label>
              <select
                title="Select meeting room"
                name="category"
                value={inputData.category}
                onChange={handleChange}
                id=""
                className="border border-gray-300 py-5 px-5 w-full rounded-md  mt-1 text-xs"
              >
                <option value="">- Selete meeting room -</option>
                {NameMeetingRoom.map((nameRoom, index) => (
                  <option value={nameRoom.value} key={index}>
                    {nameRoom.nameEng} ({nameRoom.value})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-4 mt-3">
              <div>
                <InputFunction
                  placeholder=""
                  disabled={false}
                  labelText={`Use Date`}
                  value={inputData.startDate}
                  onChange={handleChange}
                  type={`date`}
                  name={`startDate`}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 mt-3">
              <div>
                <label htmlFor="time" className="text-sm">
                  Start Time
                </label>
                <FilterStartTime
                  disabled={categoryData === "" || startDateData === ""}
                  dataFilter={filterDate}
                  name="startTime"
                  value={inputData.startTime}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="time" className="text-sm">
                  End Time
                </label>
                <FilterEndTime
                  disabled={categoryData === "" || startDateData === ""}
                  dataFilter={filterDate}
                  name="endTime"
                  value={inputData.endTime}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              disabled={isMutating || isValidating}
              type="submit"
              className={
                isMutating || isValidating
                  ? "bg-gray-500 w-36 text-white py-2 rounded-lg shadow-md mt-5"
                  : "bg-green-500 w-36 text-white py-2 rounded-lg shadow-md mt-5"
              }
            >
              {isMutating || isValidating ? "Creating..." : "Save"}
            </button>
          </form>
        </div>
      </div>
    </ContainerUser>
  );
}

export default Page;
