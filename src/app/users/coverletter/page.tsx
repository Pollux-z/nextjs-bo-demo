"use client";
import React, { useState } from "react";

import TableCoverletter from "./components/TableCoverletter";
import { useSession } from "next-auth/react";
import ContainerUser from "../../components/ContainerUser";
import HeaderContent from "../../components/HeaderContent";
import BtnCreate from "@/app/components/button/BtnCreate";
import BtnDirection from "@/app/components/button/BtnDirection";
import InputSearch from "@/app/components/InputSearch";

function Page(): React.ReactElement {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ContainerUser>
      <HeaderContent
        textHeader={`Cover Letter`}
        textContent={``}
        textContentSub={``}
        hrefContent={``}
      />
      <div className="bg-white w-full rounded-md py-7 px-5 mt-5 ">
        <div className="flex justify-between items-end flex-col md:flex-row gap-5">
          <div className="">
            <div>
              <h5 className="text-sm font-bold border-l-2 px-2  border-blue-600">
                Download form
              </h5>
            </div>
            <div className="flex gap-3 mt-2">
              <BtnDirection
                href={`https://timeconsultings.sharepoint.com/:w:/s/TIMEConsulting/EcDFWxknG0JLowgAYA1IUT4BoCiworrdbx0bWIbRotaGiA?e=em3CNm`}
                btnText={`TIME Consulting`}
              />
              <BtnDirection
                href={`https://timeconsultings.sharepoint.com/:w:/s/TIMEConsulting/EYgM8xKho_1IiuP1jQQGYkIBw0LSqBPGssN5tB8vs4TFbg?e=6cDUm8`}
                btnText={`TIME Digital`}
              />
              <BtnDirection
                href={`https://timeconsultings.sharepoint.com/:w:/s/TIMEConsulting/EXECgXD-Ki1Jg3cyMbFdlX8BkXANaplAXksLynjhfsFLNw?e=xYCn8D`}
                btnText={`Disrupttech`}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 items-end"  >
            <BtnCreate href="/users/coverletter/create" btnText="Create post" />
            <InputSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
        </div>
        <div>
          <TableCoverletter searchQuery={searchQuery}/>
        </div>
      </div>
    </ContainerUser>
  );
}

export default Page;
