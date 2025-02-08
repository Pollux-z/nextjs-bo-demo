"use client";

import InputStyle from "@/app/components/InputStyle";
import SeleteInputStyle from "@/app/components/SeleteInputStyle";
import { MeetingRoom, Time } from "@/app/db/option";
import Error from "@/app/Error";
import Loading from "@/app/loading";
import { useEditReserveAdmin } from "@/app/services/mutations";
import { useReserve } from "@/app/services/queries";
import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";

function FormEditMeetingRoomAdmin({ id }) {
  const {
    data: getReserve,
    isLoading,
    isValidating,
    error,
    mutate,
  } = useReserve(id);
  const reserve = getReserve?.reserve;
  console.log("🚀 ~ FormEditMeetingRoomAdmin ~ reserve:", reserve);

  const [editCategory, setEditCategory] = useState(reserve?.category);
  const [editSubject, setEditSubject] = useState("");
  const [editStartDate, setEditStartDate] = useState("");
  const [editStartTime, setEditStartTime] = useState("");
  const [editEndTime, setEditEndTime] = useState("");
  const [editRemark, setEditRemark] = useState("");

  const { trigger: editReserve, isMutating } = useEditReserveAdmin(id);

  const convertDate = new Date(editStartDate);
  console.log("🚀 ~ FormEditMeetingRoomAdmin ~ convertDate:", convertDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    editReserve({
      category: editCategory,
      subject: editSubject,
      startDate: editStartDate,
      startTime: editStartTime,
      endTime: editEndTime,
      remark: editRemark,
    });
  };

  useEffect(() => {
    if (reserve) {
      setEditCategory(reserve?.category);
      setEditSubject(reserve?.subject);
      setEditStartDate(reserve?.startDate);
      setEditStartTime(reserve?.startTime);
      setEditEndTime(reserve?.endTime);
      setEditRemark(reserve?.remark);
    }
  }, [reserve]);

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <form action="" onSubmit={handleSubmit} className="grid gap-3">
        <div>
          <InputStyle
            lableText={`Subject`}
            value={editSubject}
            setValue={(e) => setEditSubject(e.target.value)}
            inputType={`text`}
            inputName={`subject`}
          />
        </div>
        <div className="max-w-52">
          <SeleteInputStyle
            data={MeetingRoom}
            lableText={`Meeting Room`}
            value={editCategory}
            setValue={(e) => setEditCategory(e.target.value)}
            inputName={`category`}
            firstSeleteText={`- Selete Meeting Room -`}
          />
        </div>
        <div className="max-w-52">
          <InputStyle
            lableText={`Start Date`}
            value={editStartDate}
            setValue={(e) => setEditStartDate(e.target.value)}
            inputType={`date`}
            inputName={`startDate`}
          />
        </div>
        <div className="flex gap-3">
          <SeleteInputStyle
            data={Time}
            lableText={`Start Time`}
            value={editStartTime}
            setValue={(e) => setEditStartTime(e.target.value)}
            inputName={`startTime`}
          />
          <SeleteInputStyle
            data={Time}
            lableText={`End Time`}
            value={editEndTime}
            setValue={(e) => setEditEndTime(e.target.value)}
            inputName={`endTime`}
          />
        </div>
        <div>
          <InputStyle
            lableText={`Remark`}
            value={editRemark}
            setValue={(e) => setEditRemark(e.target.value)}
            inputType={`text`}
            inputName={`remark`}
          />
        </div>
        <div>
          <button
            disabled={isMutating}
            type="submit"
            className={
              isMutating
                ? "bg-gray-500 w-36 text-white py-2 rounded-lg shadow-md mt-5 font-extralight"
                : "bg-green-500 w-36 text-white py-2 rounded-lg shadow-md mt-5 font-extralight"
            }
          >
            {isMutating ? "Creating..." : "Save"}
          </button>
        </div>
      </form>
    </>
  );
}

export default FormEditMeetingRoomAdmin;
