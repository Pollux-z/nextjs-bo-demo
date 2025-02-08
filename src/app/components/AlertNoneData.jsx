import React from "react";
import Image from "next/image";
import EmptyData from "../../../public/55024593_9264820.svg";

function AlertNoneData() {
  return (
    <>
      <div className="rounded-md grid justify-center items-center w-full h-auto py-2">
        <Image src={EmptyData} size={0} className="h-80 w-auto" alt="emtryDataimg"/>
        <div className="text-center">
          <h3 className="text-xl">Empty Data?</h3>
          <p className="text-gray-500 text-sm">This alert to just show becouse none data. Please create some data for show</p>
        </div>
      </div>
    </>
  );
}

export default AlertNoneData;
