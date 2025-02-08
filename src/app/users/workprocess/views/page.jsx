"use client";

import React, { useState } from "react";
import ContainerUser from "@/app/components/ContainerUser";
import HeaderContent from "@/app/components/HeaderContent";
import Image from "next/image";

import { FcDocument, FcDownload } from "react-icons/fc";
import { CiFileOn } from "react-icons/ci";

import { CiPenpot, CiPlane, CiUnread, CiUnlock } from "react-icons/ci";
import ExpenseRequest from "../components/ExpenseRequest";
import Swapdate from "../components/Swapdate";

function Page() {
  const [sortData, setSortData] = useState('')

  return (
    <ContainerUser>
      <HeaderContent
        textHeader={`Work Process > Business Operation`}
        textContent={``}
        textContentSub={``}
        hrefContent={``}
      />
      <div className="bg-white mt-5">
        <div className="flex justify-center py-5">
          <ul className="flex gap-3">
            <li>
              <button
              onClick={() => setSortData("expenserequest")}
              className="py-1 px-2 bg-blue-50 text-blue-600 rounded-lg text-md hover:bg-blue-600 hover:text-white transition">
                เบิกจ่าย
              </button>
            </li>
            <li>
              <button 
              onClick={() => setSortData("swapdate")}
              className="py-1 px-2 bg-blue-50 text-blue-600 rounded-lg text-md hover:bg-blue-600 hover:text-white transition">
                Swap-date
              </button>
            </li>
          </ul>
        </div>

        <div className="flex py-4 items-center justify-center px-6 ">
          {sortData === "expenserequest" 
          ? <ExpenseRequest />
          : sortData === "swapdate"
          ? <Swapdate />
          : null
          }
         
        </div>
      </div>
    </ContainerUser>
  );
}

export default Page;
