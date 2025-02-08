import React from "react";
import { CiSquareAlert } from "react-icons/ci";

const AvailableForReserve: React.FC = () => {
  return (
    <>
      <div className="flex justify-center items-center bg-green-100 p-2  border-l-4 border-green-400 gap-4 min-h-20">
        <CiSquareAlert size={25} className="text-green-500" />
        <h3 className=" text-green-800 font-bold">Available For Reserve</h3>
      </div>
    </>
  );
}

export default AvailableForReserve;
