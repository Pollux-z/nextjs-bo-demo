"use client";

import { useCreateTimeOff } from "@/app/services/mutations";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TableTimeOff from "./TableTimeOff";
import BtnCreate from "@/app/components/button/BtnCreate";
import Link from "next/link";
import { useTimeOffs, useUsers } from "@/app/services/queries";

import { CiViewList } from "react-icons/ci";
import TableUser from "./TableUser";
import Loading from "@/app/loading";
import Error from "@/app/Error";

function Content() {
  const { data: session } = useSession();
  const idSession = session?.user?.id;

  return (
    <>
      <div></div>
    </>
  );
}

export default Content;
