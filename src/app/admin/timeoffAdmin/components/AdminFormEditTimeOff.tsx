"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useUpdateTimeOff } from "@/app/services/mutations";
import { useTimeOff } from "@/app/services/queries";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { StatusApproveTimeOff } from "@/app/db/option";
import Loading from "@/app/loading";
import Error from "@/app/Error";

type AdminFormEditTimeOffType = {
  id: string;
};

const AdminFormEditTimeOff: React.FC<AdminFormEditTimeOffType> = ({ id }) => {
  const { data: getTimeOff, isLoading, isValidating, error } = useTimeOff(id);
  const timeOff = getTimeOff?.timeOff;

  const format = "MM/DD/YYYY";
  const [showError, setShowError] = useState();
  const { trigger: updateTimeOff, isMutating } = useUpdateTimeOff(id);

  const [editEmployee, setEditEmployee] = useState("");
  const [editType, setEditType] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editReason, setEditReason] = useState("");
  const [editIssueDate, setEditIssueDate] = useState<number[]>([]);
  const [editHaftDay, setEditHalfDay] = useState("");

  const handleDateChange = (dates: DateObject[]) => {
    const convertUnix: number[] = dates?.map((date: any) => date.unix * 1000);
    setEditIssueDate(convertUnix);
  };

  const handleSubmit = () => {
    updateTimeOff({
      employee: editEmployee,
      type: editType,
      reason: editReason,
      issueDate: editIssueDate,
      status: editStatus,
      halfDay: editHaftDay,
    });
  };

  useEffect(() => {
    if (timeOff) {
      setEditEmployee(timeOff?.employee);
      setEditType(timeOff?.type);
      setEditReason(timeOff?.reason);
      setEditStatus(timeOff?.status);
      setEditIssueDate(timeOff?.issueDate);
      setEditHalfDay(timeOff?.halfDay);
    }
  }, [timeOff]);

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <div className="grid gap-2 bg-white py-5 px-10 w-full mt-5 rounded-md shadow-sm">
        {showError ? (
          <p className="bg-red-400 text-white py-2 px-3 rounded-md shadow-lg my-5 font-extralight">
            {showError}
          </p>
        ) : null}
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-2">
          <div>
            <label htmlFor="type" className="text-sm">
              Type of Leave
            </label>
            <select
              name="type"
              id="type"
              onChange={(e) => setEditType(e.target.value)}
              value={editType}
              className="border py-5 px-5 w-full rounded-md  mt-1 text-xs border-gray-300 text-gray-900 block"
            >
              <option value="null">- Selete type request -</option>
              <option value="Vacation">Vacation</option>
              <option value="Personal Leave">Personal Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Leave with out pay">Leave with out pay</option>
            </select>
          </div>
          <div>
            <label htmlFor="reason" className="text-sm">
              Reason for leave
            </label>
            <input
              onChange={(e) => setEditReason(e.target.value)}
              name="reason"
              type="text"
              value={editReason}
              aria-label="reason"
              placeholder="Please enter reason..."
              className="border py-5 px-5 w-full rounded-md  mt-1 text-xs border-gray-300 text-gray-900 block"
            />
          </div>
          <div className="grid">
            <label htmlFor="issueDate" className="text-sm">
              Issue Date
            </label>
            <div className=" ">
              <DatePicker
                style={{
                  width: "100%",
                  border: "solid 0.5px rgb(156 163 175)",
                  padding: "28px",
                  fontSize: "12px",
                  backgroundColor: "#FFFFFF",
                }}
                containerStyle={{
                  width: "100%",
                }}
                name="issueDate"
                calendarPosition="bottom-center"
                sort
                multiple
                value={editIssueDate}
                format={format}
                onChange={handleDateChange}
                placeholder="Please selete date..."
              />

              <div className="flex gap-5 mt-3">
                <div className="flex items-center gap-1">
                  <input
                    id="FullDay"
                    type="radio"
                    value="FullDay"
                    name="halfDay"
                    onChange={(e) => setEditHalfDay(e.target.value)}
                  />
                  <label className="text-sm" htmlFor="FullDay">
                    {" "}
                    เต็มวัน
                  </label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    id="haftMorning"
                    type="radio"
                    value="haftMorning"
                    name="halfDay"
                    onChange={(e) => setEditHalfDay(e.target.value)}
                  />
                  <label className="text-sm" htmlFor="haftMorning">
                    {" "}
                    ครึ่งวันเช้า
                  </label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    id="haftAfternoon"
                    type="radio"
                    value="haftAfternoon"
                    name="halfDay"
                    onChange={(e) => setEditHalfDay(e.target.value)}
                  />
                  <label className="text-sm" htmlFor="haftAfternoon">
                    {" "}
                    ครึ่งวันบ่าย
                  </label>
                </div>
              </div>
              <div className="mt-3">
                <label htmlFor="reason" className="text-sm">
                  Status
                </label>
                <select
                  title="status"
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  name="status"
                  id="status"
                  className="border py-5 px-5 w-full rounded-md  mt-1 text-xs border-gray-300 text-gray-900 block"
                >
                  {StatusApproveTimeOff.map((val) => (
                    <option value={val} key={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div></div>
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
      </div>
    </>
  );
};

export default AdminFormEditTimeOff;
