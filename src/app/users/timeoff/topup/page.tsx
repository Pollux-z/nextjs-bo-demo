"use client";

import React from "react";
import TableTeamLead from "../components/TableTeamLead";
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
import { redirect } from "next/navigation";

function Page(): React.ReactElement {
  const { data: session } = useSession();
  if(session?.user?.role === "User") redirect('/users/timeoff')

  return (
    <ContainerUser>
      <HeaderContent
        textHeader={`Amount Date`}
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
