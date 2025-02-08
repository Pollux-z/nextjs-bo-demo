import React from "react";
import Link from "next/link";
import { IoCreateOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";

type BtnCreateType = {
  href: string
  btnText: string
}

const BtnCreate: React.FC<BtnCreateType> = ({ href, btnText }) => {
  return (
    <>
      <Link
        href={href}
        className="bg-[#845BDF] text-white py-2 px-5 rounded-lg shadow-lg flex items-center gap-2 text-xs font-semibold max-w-32"
      >
        <FaPlus size={8} className="text-white" />
        {btnText}
      </Link>
    </>
  );
}

export default BtnCreate;
