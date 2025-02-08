"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ContainerUser from "@/app/components/ContainerUser";
import HeaderContent from "@/app/components/HeaderContent";

import { Time } from "@/app/db/option";
import { useReserveCategory, useReserves } from "@/app/services/queries";
import { useReserveCarrecord } from "@/app/services/mutations";
import Loading from "@/app/loading";
import InputFunction from "../components/InputFunction";
import FilterStartTime from "../../meetingroom/components/FilterStartTime";
import { ReserveType } from "@/interfaces/Reserve";
import { format, getHours, setHours } from "date-fns";
import FilterEndTime from "../../meetingroom/components/FilterEndTime";

// const InputFunction = ({ labelText, value, onChange, type, placeholder, name }) => {
//   return (
//     <>
//       <label htmlFor={name} className="text-sm">
//         {labelText ? labelText : null}
//       </label>
//       <input
//         value={value}
//         onChange={onChange}
//         type={type ? type : "text"}
//         placeholder={placeholder ? placeholder : null}
//         name={name}
//         className="bg-[#F5F6FA] py-5 px-5 w-full rounded-md  mt-1 text-xs"
//       />
//     </>
//   );
// };

function CreateCarReocrdPage() {
  const { data: session } = useSession();

  const userCreate = session?.user?.id;

  const { data: reserve, isLoading, isValidating } = useReserves();
  const reserves: any = reserve?.totalReserve.findLast(
    (reserve: any) => reserve.id > 0
  );

  const { data: getCategory } = useReserveCategory();
  const caregoryData: ReserveType[] = getCategory?.category;

  const { trigger, isMutating } = useReserveCarrecord();

  const idLastIndex = reserves?.id ? reserves?.id : 0;
  const id = idLastIndex + 1;

  const category = "carrecord";

  const currentDate = new Date();
  const nowDate = format(currentDate, "yyyy-MM-dd");
  const dateStartTime = format(currentDate, "HH:00");
  const dateEndTime = format(
    setHours(currentDate, getHours(currentDate) + 1),
    "HH:00"
  );
  // const hours = dates.getHours();
  // const nowDate = `${year}-0${month}-${date < 10 ? `0${date}` : date}`;
  // const nowTime = `${hours}:00`;
  // const lastTime = `${hours + 1}:00`;

  const [subject, setsSubject] = useState("");
  const [startDate, setStartDate] = useState(nowDate);
  const [endDate, setEndDate] = useState(nowDate);
  const [startTime, setStartTime] = useState(dateStartTime);
  const [endTime, setEndTime] = useState(dateEndTime);
  const [remark, setRemark] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const filterDate = caregoryData?.filter(
    (element) => element?.startDate === startDate
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!subject || !startDate || !endDate || !startTime || !endTime) {
      setError("Please input all data!");
      return;
    }

    trigger({
      category: category,
      subject: subject,
      startDate: startDate,
      endDate: endDate,
      startTime: startTime,
      endTime: endTime,
      userCreate: userCreate,
      remark: remark,
    });
  };

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  if (isLoading) return <Loading />;

  return (
    <ContainerUser>
      <HeaderContent
        textHeader={`Car Record reserve`}
        textContent={`Car reacrd`}
        hrefContent={`/users/carrecord`}
        textContentSub={`Reserve`}
      />
      <div className="bg-white py-5 px-10 w-full mt-5">
        <div className="my-10">
            {error && (
            <p className="bg-red-100 text-red-500 text-sm font-light py-2 px-3 border-[0.5px] border-red-500  rounded-md my-5 transition duration-300 ease-in-out transform shadow-sm">
              {error}
            </p>
            )}
          <form onSubmit={handleSubmit} className="grid gap-2">
            <InputFunction
              disabled={false}
              labelText={`Destination`}
              value={subject}
              onChange={(e: any) => setsSubject(e.target.value)}
              type={`text`}
              placeholder={`Destination`}
              name={`subject`}
            />

            <div className="flex items-center gap-4 mt-3">
              <div>
                <InputFunction
                  placeholder=""
                  disabled={false}
                  labelText={`Start Date`}
                  value={startDate}
                  onChange={(e: any) => setStartDate(e.target.value)}
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
                  disabled={startDate === ""}
                  dataFilter={filterDate}
                  name="startTime"
                  value={startTime}
                  onChange={(e: any) => setStartTime(e.target.value)}
                />

                {/* <select
                  title="Select Start Time"
                  name="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="border border-gray-300 py-5 px-5 w-full rounded-md  mt-1 text-xs"
                >
                  {Time.map((val) => (
                    <option value={val} key={val}>
                      {val}
                    </option>
                  ))}
                </select> */}
              </div>
              <div>
                <label htmlFor="time" className="text-sm">
                  End Time
                </label>
                <FilterEndTime
                  disabled={startDate === ""}
                  dataFilter={filterDate}
                  name="endTime"
                  value={endTime}
                  onChange={(e: any) => setEndTime(e.target.value)}
                />
                
                {/* <select
                  title="Select End Time"
                  name="endTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="border border-gray-300 py-5 px-5 w-full rounded-md  mt-1 text-xs"
                >
                  {Time.map((val) => (
                    <option value={val} key={val}>
                      {val}
                    </option>
                  ))}
                </select> */}
              </div>
            </div>

            <label htmlFor="remark" className="text-sm">
              Remark:
            </label>
            <input
              onChange={(e) => setRemark(e.target.value)}
              type="text"
              placeholder="Remark"
              className="border border-gray-300 py-5 px-5 w-full rounded-md  mt-1 text-xs"
              name="remark"
            />

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

export default CreateCarReocrdPage;
