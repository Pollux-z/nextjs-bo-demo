"use client";

import React, { useState } from "react";
import ContainerUser from "@/app/components/ContainerUser";
import HeaderContent from "@/app/components/HeaderContent";
import Image from "next/image";

import { FcDocument, FcDownload } from "react-icons/fc";
import { CiFileOn } from "react-icons/ci";

function Page() {
  return (
    <ContainerUser>
      <HeaderContent
        textHeader={`Knowledge Sharing`}
        textContent={``}
        textContentSub={``}
        hrefContent={``}
      />
      <div className="grid grid-cols-2 gap-2 mt-3 w-full justify-center px-10 py-5 min-h-72 max-h-80">
        <div className="mx-auto">
          <Image
            src={`https://images.unsplash.com/photo-1719937206255-cc337bccfc7d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
            width={300}
            height={200}
            className="object-fill rounded-md min-h-72 max-h-80"
          />
        </div>
        <div className=" px-3 py-2 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold">Subject</h2>
            <p className="text-sm mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
              officiis reiciendis, vero magni quibusdam adipisci quis vitae
              eaque, perspiciatis minima rem quaerat possimus praesentium
              tenetur consectetur fugit blanditiis hic asperiores!
            </p>
          </div>
          <button className="text-xs py-2 px-3 bg-violet-100 text-violet-600 rounded-md shadow-md  flex justify-center items-center gap-2 mt-3 hover:bg-violet-600 hover:text-white">
            <CiFileOn size={20} />
            <p>DOWNLOAD FILE</p>
          </button>
        </div>
      </div>
    </ContainerUser>
  );
}

export default Page;
