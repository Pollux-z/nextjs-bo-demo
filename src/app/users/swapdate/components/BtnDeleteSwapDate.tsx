import React from "react";
import { CiTrash } from "react-icons/ci";
import { axiosInstance } from "@/app/services/fetcher";
import { useSwapDates } from "@/app/services/queries";

const BtnDeleteSwapDate: React.FC<{ id: string }> = ({ id }) => {
  const { mutate } = useSwapDates();
  const handleDelete = async () => {
    const confrim = confirm("Are your sure delete ?");
    if (confrim) {
      await axiosInstance
        .delete(`/api/deleteSwapDate?id=${id}`)
        .then((response) => {
          mutate();
          console.log(response);
        });
    }
  };
  return (
    <>
      <a
        className="rounded-md shadow-sm text-sm cursor-pointer"
        onClick={handleDelete}
      >
        <CiTrash
          size={18}
          className="p-0.5 bg-red-100 text-red-600 rounded-full"
        />
      </a>
    </>
  );
};

export default BtnDeleteSwapDate;
