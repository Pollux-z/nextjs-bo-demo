import React from "react";
import { axiosInstance } from "@/app/services/fetcher";
import { useReserves } from "@/app/services/queries";

function BtnDelete({ data }) {
  const { data: getReserve, mutate } = useReserves();
  const handleDelete = async (e) => {
    e.preventDefault();
    const confirmApprove = confirm(`Are your sure delete ?`);
    if (confirmApprove) {
      await axiosInstance
        .delete(`/api/deleteReverse?id=${data}`)
        .then((response) => {
            mutate()
          console.log(response);
        });
    }
  };
  return (
    <div>
      <a
        className="block px-4 py-2 text-sm text-red-700 data-[focus]:bg-red-100 data-[focus]:text-red-900 w-full text-left cursor-pointer hover:bg-red-200"
        onClick={handleDelete}
      >
        Delete
      </a>
    </div>
  );
}

export default BtnDelete;
