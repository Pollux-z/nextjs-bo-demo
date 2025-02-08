"use client";

import { useCreateTimeOff, useSendEmail } from "@/app/services/mutations";
import { useSession } from "next-auth/react";
import React, { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { useTimeOffLast, useUser, useUsersJoinTeamlead } from "@/app/services/queries";
import Loading from "@/app/loading";
import Error from "@/app/Error";
import { UsersType } from "@/interfaces/User";

const FormCreateTimeOff = () => {
  const { data: session } = useSession();
  const userCreate = session?.user?.id;
  const employee = session?.user?.id;
  const { trigger, isMutating } = useCreateTimeOff();
  const { data: lastTimeOff } = useTimeOffLast();
  const lastTimeOffData = lastTimeOff?.lastTimeOff;
  const id = lastTimeOffData?.id + 1;

  const currentDate = new Date().setHours(0,0,0,0)
  const format = "MM/DD/YYYY";
  const [issueDate, setIssueDate] = useState<DateObject[] | number[]>([]);
  console.log(issueDate)
  const [inputData, setInputData] = useState({
    type: "",
    reason: "",
    halfDay: "",
  });
  const [showError, setShowError] = useState("");


  // *Fetch user get data id teamleader for send email request
  const {data: getUsers, isLoading, error} = useUsersJoinTeamlead()
  const users: UsersType[] = getUsers?.user
  const filterUser = users?.find((user) => user._id === employee)
  const emailTeamlead = filterUser?.teamLeader_info.employeeEmail
  const nameTeamlead = filterUser?.teamLeader_info.nameEng
  const nameUser = filterUser?.nameEng

  // *Send email to teamleader user request
  const { trigger: sendEmail } = useSendEmail();
  const textEmail = `
  <h3>Dear ${nameTeamlead}</h3>
  <p>You have a notification regarding the leave approval of ${nameUser} on ${issueDate}.</p>
  <p>Please click this link to confirm the approval request.</p>
  <p>URl : <a href="https://bo.timeconsulting.co.th/users/timeoff/request">Website BO</a></p>
  <hr />
  <p>Webiste Bussiness Operation</p>
  `;

  const toEmail = emailTeamlead
  const subject = "You have a notification regarding the leave approval";

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!inputData.type || !issueDate || !inputData.halfDay) {
      setShowError("Please input data...");
      return;
    }

    if (inputData.halfDay != "FullDay" && issueDate.length > 1) {
      setShowError("หากต้องการลาครึ่งวันเลือกลาได้ครั้งละ 1 วันเท่านั้น");
      return;
    }

    trigger({
      id,
      employee,
      type: inputData.type,
      reason: inputData.reason,
      issueDate: issueDate,
      halfDay: inputData.halfDay,
      userCreate,
    });

    sendEmail({
      to: toEmail,
      subject: subject,
      textEmail: textEmail,
    })
  };

  if(isLoading) return <Loading />
  if(error) return <Error />
  
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
              onChange={handleChange}
              value={inputData.type}
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
                onChange={setIssueDate}
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
}

export default FormCreateTimeOff;
