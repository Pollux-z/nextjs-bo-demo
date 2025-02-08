import React from "react";
import { FiCommand } from "react-icons/fi";
import ClipLoader from "react-spinners/ClipLoader";

function Loading() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen gap-5">
        <ClipLoader color="#36d7b7" />
        <p className="text-sm">Almost ready!</p>
      </div>
    </>
  );
}

export default Loading;
