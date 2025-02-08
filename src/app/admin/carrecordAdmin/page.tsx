"use client";

import React, { ReactDOM, ReactElement } from "react";
import ContainerAdmin from "../components/ContainerAdmin";
import HeaderContent from "@/app/components/HeaderContent";
import TableCarrecord from "./components/TableCarrecord";

function Page(): ReactElement {

  return (
    <ContainerAdmin>
      <HeaderContent
        textHeader="Car Record Admin"
        textContent=""
        hrefContent=""
        textContentSub=""
      />
      <div className="mt-5 bg-white shadow-md rounded-lg p-6">
        <TableCarrecord />
      </div>
    </ContainerAdmin>
  );
}

export default Page;
