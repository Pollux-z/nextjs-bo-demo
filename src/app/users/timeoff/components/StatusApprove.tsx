"use client";

import {
  useUpdateTimeOff,
  useSendEmail,
} from "@/app/services/mutations";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import {  CiCircleCheck } from "react-icons/ci";
import { TimeOff } from "@/interfaces/TimeOff";

const StatusApprove: React.FC<{ timeOffData: TimeOff }> = ({ timeOffData }) => {
  const { data: session } = useSession();
  const sessionRole = session?.user?.role;

  const idTimeOff = timeOffData?._id;
  const userLeader = timeOffData?.employee_info.teamLeader;
  const userEmail = timeOffData?.employee_info.employeeEmail;
  const userName = timeOffData?.employee_info.nameEng;

  const { trigger: updateTimeOff, isMutating } = useUpdateTimeOff(idTimeOff);

  const status = "Approve";

  // *Send email to teamleader user request
  const { trigger: sendEmail } = useSendEmail();
  const textEmail = `
  <h3>Dear Admin</h3>
  <p>You have a notification return response "${status}" to "${userName}".</p>
  <p>Please click this link.</p>
  <p>Link : <a href="https://bo.timeconsulting.co.th/users/timeoff/">Website BO</a></p>
  <hr />
  <p>Webiste Bussiness Operation</p>
  `;
  const adminEmail = `kodchakorn.m@timeconsulting.co.th`;
  const toEmail = `${adminEmail}`;
  const subject = "You have a notification response the leave request";

  const handleSubmit = () => {
    const confirmApprove = confirm(
      `Are you sure approve ${timeOffData?.employee_info.nameTh} leave ?`
    );
    if (confirmApprove) {
      updateTimeOff({
        ...timeOffData,
        status: status,
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
      {session?.user?.id === userLeader || sessionRole != "User" ? (
        <button
          type="button"
          title="Approve"
          onClick={handleSubmit}
          className={
            timeOffData?.status != "Pending"
              ? "text-black bg-gray-100 rounded-full p-1"
              : "text-blue-500 bg-blue-100 rounded-full p-1"
          }
          disabled={timeOffData?.status != "Pending"}
        >
          <CiCircleCheck size={22} />
        </button>
      ) : null}
    </>
  );
};

export default StatusApprove;
