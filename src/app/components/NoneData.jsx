import React from "react";
import { CiSquareAlert } from "react-icons/ci";

function NoneData() {
  return (
    <>
      <div className="flex justify-center items-center bg-orange-100 p-2  border-l-4 border-orange-400 gap-4 min-h-20">
        <CiSquareAlert size={25} className="text-orange-500"/>
        <h3 className=" text-orange-800 font-bold">
          No record
        </h3>
      </div>
    </>
  );
}

export default NoneData;
