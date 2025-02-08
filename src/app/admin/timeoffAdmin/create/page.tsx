"use client";

import React, { useState } from "react";
import HeaderContent from "@/app/components/HeaderContent";

import ContainerAdmin from "../../components/ContainerAdmin";
import AdminFormCreateTimeOff from "../components/AdminFormCreateTimeOff";

function Page(): React.ReactElement {
  return (
    <>
      <ContainerAdmin>
        <HeaderContent
          textHeader={`TIME Off Create`}
          textContent={``}
          textContentSub={``}
          hrefContent={``}
        />
        <div>
          <AdminFormCreateTimeOff />
        </div>
      </ContainerAdmin>
    </>
  );
}

export default Page;
