import React from "react";
import Image from "next/image";
import IconSeach from "../../../public/Not Found Icon.png";
// import IconSeach from "../../../../public/Not Found Icon.png";
export default function SearchNotFound() {
  return (
    <div className="grid justify-center min-h-full">
      <Image src={IconSeach} width={50} height={50} className="mx-auto" alt="Data not found"/>
      <p className="mt-2 text-sm">Sorry, Data not found</p>
    </div>
  );
}
