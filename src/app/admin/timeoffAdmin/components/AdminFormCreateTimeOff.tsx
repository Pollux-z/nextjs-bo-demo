"use client";

import {
  useAdminCreateTimeOff,
  useCreateNotification,
  useCreateTimeOff,
} from "@/app/services/mutations";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { useTimeOffLast, useUsers } from "@/app/services/queries";
import { StatusApproveTimeOff } from "@/app/db/option";
import { UsersType } from "@/interfaces/User";

const AdminFormCreateTimeOff: React.FC = () => {
  const { data: session } = useSession();
  const userCreate = session?.user?.id;

  const { trigger, isMutating } = useAdminCreateTimeOff();
  const { trigger: createNotification} = useCreateNotification();

  // const { data: lastTimeOff } = useTimeOffLast();
  // const lastTimeOffData = lastTimeOff?.lastTimeOff;
  // const lastId = lastTimeOffData?.id + 1;

  const { data: getUsers } = useUsers();
  const users = getUsers?.totalUsers;


  const format = "MM/DD/YYYY";
  const [issueDate, setIssueDate] = useState<number[]>([]);
  const [inputData, setInputData] = useState({
    id: 0,
    employee: "",
    type: "",
    reason: "",
    halfDay: "",
    status: "",
  });
  const [showError, setShowError] = useState("");

  const handleDateChange = (dates: DateObject[]) => {
    const convertUnix: number[] = dates?.map((date: any) => date.unix * 1000);
    setIssueDate(convertUnix);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputData.type || !issueDate) {
      setShowError("Please input data...");
      return;
    }

    if (inputData.halfDay != "FullDay" && issueDate?.length > 1) {
      setShowError("หากต้องการลาครึ่งวันเลือกลาได้ครั้งละ 1 วันเท่านั้น");
      return;
    }

    createNotification({
      title: "TIME OFF",
      userRequest: inputData.employee,
      userReceive: inputData.employee,
      typeRequest: "timeoff",
      message: `TIME OFF request from ${inputData.employee}`,
    });

    trigger({
      id: inputData.id,
      employee: inputData.employee,
      type: inputData.type,
      reason: inputData.reason,
      issueDate: issueDate,
      halfDay: inputData.halfDay,
      status: inputData.status,
      userCreate,
    });
  };

  return (
    <>
      <div className="grid gap-2 bg-white py-5 px-10 w-full mt-5 rounded-md shadow-sm">
        {showError ? (
          <p className="bg-red-400 text-white py-2 px-3 rounded-md shadow-lg my-5 font-extralight">
            {showError}
          </p>
        ) : undefined}
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-2">
          <div>
            <label htmlFor="employee">ID</label>
            <input
              aria-label="id"
              name="id"
              value={inputData.id }
              onChange={handleChange}
              type="text"
              className="border py-5 px-5 w-full rounded-md  mt-1 text-xs border-gray-300 text-gray-900 block"
            />
          </div>
          <div>
            <label htmlFor="employee">Employee request</label>
            <select
              name="employee"
              id="employee"
              onChange={handleChange}
              value={inputData.employee}
              className="border py-5 px-5 w-full rounded-md  mt-1 text-xs border-gray-300 text-gray-900 block"
            >
              <option value="">- Selete employee request -</option>
              {users?.map((i: UsersType, index: number) => (
                <option value={i?._id} key={i?.nameEng}>
                  TIME-{i.userCode} {i.nameTh} ({i.nickNameTh})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="type" className="text-sm">
              Type of Leave
            </label>
            <select
              name="type"
              id="type"
              onChange={handleChange}
              value={inputData.type}
              className="border py-5 px-5 w-full rounded-md  mt-1 text-xs border-gray-300 text-gray-900 block"
            >
              <option value="">- Selete type request -</option>
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
              onChange={handleChange}
              name="reason"
              type="text"
              value={inputData.reason}
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
                value={issueDate}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                  value={inputData.status}
                  onChange={handleChange}
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

export default AdminFormCreateTimeOff;
