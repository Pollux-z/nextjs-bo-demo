"use client";

import React from "react";
import {
  useTimeOff,
  useTimeOffs,
  useUser,
  useUsers,
} from "@/app/services/queries";
import { useSession } from "next-auth/react";
import ContainerUser from "@/app/components/ContainerUser";
import HeaderContent from "@/app/components/HeaderContent";
import Loading from "@/app/loading";
import Error from "@/app/Error";
import FormCreateTopUp from "../components/FormCreateTopUp";

function Page() {
  
  return (
    <ContainerUser>
      <HeaderContent
        textHeader={`Top Up employee`}
        textContent={`Time-Off`}
        textContentSub={`Top Up employee`}
        hrefContent={`/users/timeoff`}
      />
      <div className="w-full bg-white mt-5 py-5 px-3 rounded-md shadow-sm">
        <FormCreateTopUp />
      </div>
    </ContainerUser>
  );
}

export default Page;
