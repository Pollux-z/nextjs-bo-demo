"use client";

import {
  useUpdateTimeOff,
  useUpdateTimerAdmin,
  useUpdateTimerWithOther,
} from "@/app/services/mutations";
import { useTimeOff, useUser } from "@/app/services/queries";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { CiNoWaitingSign } from "react-icons/ci";

function StatusCancel({ idUser, idTimeOff }) {
  const { data: session } = useSession();
  const {
    data: user,
    isLoading,
    isValidating,
    error,
    mutate,
  } = useUser(idUser);
  const userData = user?.user;

  const { data: timeOff } = useTimeOff(idTimeOff);
  const timeOffData = timeOff?.timeOff;

  const { trigger: updateUser } = useUpdateTimerWithOther(idUser);
  const { trigger: updateTimeOff, isMutating } = useUpdateTimeOff(idTimeOff);

  const requestType =
    timeOffData?.type === "Vacation"
      ? "vacationLeave"
      : timeOffData?.type === "Sick Leave"
      ? "sickLeave"
      : timeOffData?.type === "Personal Leave"
      ? "personalLeave"
      : null;

  const typeData =
    requestType === "vacationLeave"
      ? userData?.vacationLeave
      : requestType === "sickLeave"
      ? userData?.sickLeave
      : requestType === "personalLeave"
      ? userData?.personalLeave
      : null;

  const lengthTotalTimeOff = timeOffData?.issueDate.length;

  const handleSubmit = () => {
    const confirmApprove = confirm(`Are you sure cancel request ?`);
    if (confirmApprove) {
      // updateUser({
      //   ...userData,
      //   [requestType]: typeData - lengthTotalTimeOff,
      // });
      updateTimeOff({
        ...timeOffData,
        status: "Cancel",
      });
    }
  };
  return (
    <>
      {session?.user?.id === userData?._id ? (
        <button
          title="Cancel"
          onClick={handleSubmit}
          className=""
          disabled={timeOffData?.status != "Panding"}
        >
          <CiNoWaitingSign
            size={25}
            className={
              timeOffData?.status != "Panding"
                ? "text-black bg-gray-100 rounded-full p-1"
                : "text-orange-500 bg-orange-100 rounded-full p-1"
            }
          />
        </button>
      ) : null}
    </>
  );
}

export default StatusCancel;
