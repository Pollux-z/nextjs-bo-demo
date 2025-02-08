"use client";

import {
  useSendEmail,
  useUpdateTimeOff,
  useUpdateTimerAdmin,
  useUpdateTimerWithOther,
} from "@/app/services/mutations";
import {
  useTimeOff,
  useTimeOffs,
  useUser,
  useUsers,
} from "@/app/services/queries";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { CiSquareCheck } from "react-icons/ci";
import { TimeOff } from "@/interfaces/TimeOff";

const StatusComplete = ({ timeOffData }: { timeOffData: TimeOff }) => {
  const { data: session } = useSession();
  const idSession = session?.user?.id;

  const idTimeOff = timeOffData?._id;

  const user = timeOffData?.employee_info;
  const userId = timeOffData?.employee_info._id;
  const userEmail = timeOffData?.employee_info.employeeEmail;
  const userName = timeOffData?.employee_info.nameEng;

  const status = "Complete";

  const idComplete = ["6673f979a31b878cbd1968c3", "6673e82da31b878cbd196897"];
  const findComplete = idComplete.find((val) => val === idSession);

  const { trigger: updateUser } = useUpdateTimerWithOther(userId);
  const { trigger: updateTimeOff, isMutating } = useUpdateTimeOff(idTimeOff);

  const haftDay = timeOffData?.halfDay != "FullDay" ? 0.5 : 0;
        
  const requestType: any =
    timeOffData?.type === "Vacation"
      ? "vacationLeave"
      : timeOffData?.type === "Sick Leave"
      ? "sickLeave"
      : timeOffData?.type === "Personal Leave"
      ? "personalLeave"
      : null;

  const typeData: any =
    requestType === "vacationLeave"
      ? timeOffData?.employee_info.vacationLeave
      : requestType === "sickLeave"
      ? timeOffData?.employee_info.sickLeave
      : requestType === "personalLeave"
      ? timeOffData?.employee_info.personalLeave
      : null;

  const lengthTotalTimeOff = timeOffData?.issueDate.length;

// *Send email to teamleader user request
const { trigger: sendEmail } = useSendEmail();
const textEmail = `
<h3>Dear ${userName}</h3>
<p>You have a notification return response "${status}".</p>
<p>Please click this link.</p>
<p>Link : <a href="https://bo.timeconsulting.co.th/users/timeoff/">Website BO</a></p>
<hr />
<p>Webiste Bussiness Operation</p>
`;

// const adminEmail = `kodchakorn.m@timeconsulting.co.th`;
const toEmail = `${userEmail}`;
const subject = "You have a notification response the leave request";


  const handleSubmit = () => {
    const confirmApprove = confirm(
      `Are you sure confirm ${user?.nameTh} request ?`
    );
    if (confirmApprove) {
      updateUser({
        ...user,
        [requestType]: typeData - (lengthTotalTimeOff - haftDay),
      });
      updateTimeOff({
      ...timeOffData,
        status: "Complete",
    });
    sendEmail({
      to: toEmail,
      subject: subject,
      textEmail: textEmail,
    });
    }
  };
  return (
    <>
      {findComplete ? (
        <button
          title="Complete"
          onClick={handleSubmit}
          className={
            timeOffData?.status != "Approve"
              ? "text-black bg-gray-100 rounded-full p-1"
              : "text-green-500 bg-green-100 rounded-full p-1"
          }
          disabled={timeOffData?.status != "Approve"}
        >
          <CiSquareCheck size={22} />
        </button>
      ) : null}
    </>
  );
}

export default StatusComplete;
