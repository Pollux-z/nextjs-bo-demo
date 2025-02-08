"use client";

import React, { ReactElement } from "react";
import Header from "@/app/components/Header";
import NavbarAdmin from "../components/NavbarAdmin";
import AnnouncementContent from "./components/AnnouncementContent";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import ContainerAdmin from "../components/ContainerAdmin";
import HeaderContent from "@/app/components/HeaderContent";

function Page(): ReactElement {
  return (
    <ContainerAdmin>
      <HeaderContent
        textHeader="Announcement Admin"
        textContent=""
        hrefContent=""
        textContentSub=""
      />
      <div>
        <AnnouncementContent />
      </div>
    </ContainerAdmin>
  );
}

export default Page;
