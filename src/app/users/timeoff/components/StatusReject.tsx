"use client";

import {
  useUpdateTimeOff,
  useUpdateTimerAdmin,
  useUpdateTimerWithOther,
  useSendEmail,
} from "@/app/services/mutations";
import {
  useTimeOff,
  useUser,
  useUsers,
  useTimeOffs,
} from "@/app/services/queries";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { CiSquareRemove } from "react-icons/ci";
import { TimeOff } from "@/interfaces/TimeOff";

const StatusReject =  ({ timeOffData }:{ timeOffData: TimeOff }) => {
  const { data: session } = useSession();
  const sessionId = session?.user?.id;
  const sessionRole = session?.user?.role;

  const idTimeOff = timeOffData?._id
  const userLeader = timeOffData?.employee_info.teamLeader;
  const userEmail = timeOffData?.employee_info.employeeEmail;
  const userName = timeOffData?.employee_info.nameEng;

  const { trigger: updateTimeOff, isMutating } = useUpdateTimeOff(idTimeOff);

  const status = "Reject"

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

  const toEmail = userEmail
  const subject = "You have a notification response the leave request";

  const handleSubmit = () => {
    const confirmApprove = confirm(`Are you sure reject request ?`);
    if (confirmApprove) {
      updateTimeOff({
        ...timeOffData,
        status: status,
      });
      sendEmail({
        to: toEmail,
        subject: subject,
        textEmail: textEmail,
      })
    }
  };
  return (
    <>
      {sessionId === userLeader || sessionRole != "User" ? (
        <button
        type="button"
          title="Reject"
          onClick={handleSubmit}
          className={
            timeOffData?.status === "Complete" ||
            timeOffData?.status === "Reject"
              ? "text-black bg-gray-100 rounded-full p-1"
              : "text-red-500 bg-red-100 rounded-full p-1"
          }
          disabled={
            timeOffData?.status === "Complete" ||
            timeOffData?.status === "Reject"
          }
        >
          <CiSquareRemove size={22} />
        </button>
      ) : null}
    </>
  );
}

export default StatusReject;
