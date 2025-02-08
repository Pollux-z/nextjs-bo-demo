import React from "react";
import Link from "next/link";
import { IoCreateOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";

type BtnDirectionType = {
  href: string;
  btnText: string;
};

const BtnDirection: React.FC<BtnDirectionType> = ({ href, btnText }) => {
  return (
    <>
      <Link
        href={href}
        className="bg-orange-500 text-white py-2 px-2 rounded-lg shadow-lg flex items-center gap-2 text-xs font-semibold"
      >
        {" "}
        <CiViewList size={17} />
        {btnText}
      </Link>
    </>
  );
};

export default BtnDirection;
