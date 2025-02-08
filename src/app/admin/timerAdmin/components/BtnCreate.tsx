import React from "react";
import Link from "next/link";

const BtnCreate: React.FC = () =>  {
  return (
    <>
      <Link
        href="/admin/timerAdmin/create"
        className="bg-blue-500 text-white py-2 px-10 rounded-md shadow-md text-xs"
      >
        Create new user +
      </Link>
    </>
  );
}

export default BtnCreate;
