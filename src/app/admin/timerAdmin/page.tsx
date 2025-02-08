"use client";
import React, { ReactElement } from "react";
import NavbarAdmin from "../components/NavbarAdmin";
import Header from "@/app/components/Header";
import Content from "./components/Content";
import { useSession } from "next-auth/react";
import HeaderContent from "../../components/HeaderContent";
import ContainerAdmin from "../components/ContainerAdmin";

function Page(): ReactElement {
  return (
    <ContainerAdmin>
      <HeaderContent
        textHeader={`TIMER Admin`}
        textContent={``}
        textContentSub={``}
        hrefContent={``}
      />
      <div className="bg-white  rounded-md w-full mt-3">
        <Content />
      </div>
    </ContainerAdmin>
  );
}

export default Page;
