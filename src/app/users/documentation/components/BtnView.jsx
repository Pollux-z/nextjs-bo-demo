import React from "react";
import Link from "next/link";

function BtnView({ href, btnText }) {
  return (
    <div>
      <Link
        href={href}
        className="bg-gray-600 text-white py-2 px-4 rounded-lg shadow-lg  gap-2 text-xs font-semibold hover:bg-gray-100 hover:text-gray-600 hover:border"
      >
        {" "}
        {btnText}
      </Link>
    </div>
  );
}

export default BtnView;
