import React from "react";
import Link from "next/link";

function BtnEdit({ id }) {
  return (
    <>
      <Link href={`/admin/timerAdmin/edit/${id}`} className="">
        Edit
      </Link>
    </>
  );
}

export default BtnEdit;
