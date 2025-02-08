import React from "react";
import Image from "next/image";
import BtnView from "./BtnView";

function CardKnowledge() {
  return (
    <div className="grid grid-cols-2 min-w-[200px] max-w-[380px] bg-gray-50 rounded-md shadow-md">
      <div className="">
        <p className="absolute bg-green-600 text-white px-3 text-xs">BAR</p>
        <Image
          className="w-64 h-72 object-fill rounded-l-md"
          width={100}
          height={100}
          src={`https://images.unsplash.com/photo-1720048169970-9c651cf17ccd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8`}
        />
      </div>
      <div className="p-2 flex flex-col justify-between max-h-40">
        <div>
          <h5 className="font-bold line-clamp-2">Subject</h5>
          <p className="text-xs max-h-20 line-clamp-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla
            earum beatae possimus deleniti optio quasi omnis illum sit dicta
            officia sapiente Lorem ipsum dolor sit amet consectetur, adipisicing
            elit. Nulla earum beatae possimus deleniti optio quasi omnis illum
            sit dicta officia sapiente
          </p>
        </div>
        <div className="">
          <BtnView href={`#`} btnText={`View`} />
        </div>
      </div>
    </div>
  );
}

export default CardKnowledge;
