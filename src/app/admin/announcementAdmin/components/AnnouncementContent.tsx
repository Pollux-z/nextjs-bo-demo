"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import TableAnnouncement from "./TableAnnouncement";
import BtnCreate from "@/app/admin/components/button/BtnCreate";

import WalkFame from "../../../../../public/header-removebg.png";
import { useAnnouncements } from "@/app/services/queries";
import Loading from "@/app/loading";
import Error from "@/app/Error";

function AnnouncementContent() {
  const {
    data: getAnnouncement,
    isLoading,
    error,
  } = useAnnouncements();
  const announcement = getAnnouncement?.totalAnnouncement;

  if(isLoading) return <Loading />
  if(error) return <Error />

  return (
    <>
      <div>
        <TableAnnouncement
          btnCreate={
            <BtnCreate
              href="/admin/announcementAdmin/create"
              btnText="Create post"
            />
          }
          announcementData={announcement}
        />
      </div>
    </>
  );
}

export default AnnouncementContent;
