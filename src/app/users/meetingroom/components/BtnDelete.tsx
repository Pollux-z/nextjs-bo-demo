import { axiosInstance } from "@/app/services/fetcher";
import { useDeleteMeetingRoom } from "@/app/services/mutations";
import React from "react";
import { CiTrash } from "react-icons/ci";

const BtnDelete: React.FC<{ id: string, btnText: string }> = ({ id, btnText }) => {
  const { trigger: deleteMeeting } = useDeleteMeetingRoom(id);
  const handleDelete = async () => {
    const confrim = confirm("Are your sure delete ?");
    if (confrim) {
      deleteMeeting();
    }
  };
  return (
    <>
      <a className="rounded-md text-sm cursor-pointer flex gap-1" onClick={handleDelete}>
        <p className="text-red-500">{btnText ? btnText : null}</p>
        <CiTrash size={18} className=" text-red-500" />
      </a>
    </>
  );
}

export default BtnDelete;



