import React from "react";
import { CiTrash } from "react-icons/ci";
import { axiosInstance } from "@/app/services/fetcher";
import { useTimeOff, useUser } from "@/app/services/queries";
import {
  useAdminUpdateTimerTimeOff,
  useUpdateTimeOff,
} from "@/app/services/mutations";

function BtnDeleteAdminTimeOff({ data }) {
  const { data: getTimeOff } = useTimeOff(data);
  const timeOff = getTimeOff?.timeOff;
  const lengthDate = timeOff?.issueDate.length;
  const statusReq = timeOff?.status;
  const idUser = timeOff?.employee;

  const { data: getUser, isLoading, isValidating, error } = useUser(idUser);
  const userData = getUser?.user;
  const userName = userData?.nameEng

  const { trigger: updateUser, isMutating } =
    useAdminUpdateTimerTimeOff(idUser);

  const haftDay = timeOff?.halfDay != "FullDay" ? 0.5 : 0;
  const calculateDateLeave = lengthDate - haftDay

  const requestType =
    timeOff?.type === "Vacation"
      ? "vacationLeave"
      : timeOff?.type === "Sick Leave"
      ? "sickLeave"
      : timeOff?.type === "Personal Leave"
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

  const handleDelete = async () => {
    const confirmApprove = confirm(`Are you sure you want to delete the Time-off request ${userName} ${statusReq === "Complete" ? `and return ${calculateDateLeave} ${calculateDateLeave > 1 ? "days" : "day"} to your ${timeOff?.type} balance?` : "?"}`);
    if (confirmApprove & (statusReq === "Complete")) {
      updateUser({
        ...userData,
        [requestType]: typeData + calculateDateLeave,
      });
      await axiosInstance
        .delete(`/api/deleteTimeOff?id=${data}`)
        .then((response) => {
          window.location.reload();
          console.log(response);
        });
    }
    if (confirmApprove) {
      await axiosInstance
        .delete(`/api/deleteTimeOff?id=${data}`)
        .then((response) => {
          window.location.reload();
          console.log(response);
        });
    }
  };

  return (
    <>
      <a
        className={isLoading ? "block px-4 py-2 text-sm text-red-700 data-[focus]:bg-red-100 data-[focus]:text-red-900 w-full text-left hover:bg-red-200 pointer-events-none" : "block px-4 py-2 text-sm text-red-700 data-[focus]:bg-red-100 data-[focus]:text-red-900 w-full text-left cursor-pointer hover:bg-red-200"}
        onClick={handleDelete}
      >
        Delete
      </a>
    </>
  );
}

export default BtnDeleteAdminTimeOff;
