"use client";

import React, { useState } from "react";
import TableTeamLead from "../components/TableTeamLead";
import {
  useTimeOff,
  useTimeOffs,
  useUser,
  useUsers,
} from "@/app/services/queries";
import ContainerUser from "@/app/components/ContainerUser";
import HeaderContent from "@/app/components/HeaderContent";
import BtnDirection from "@/app/components/button/BtnDirection";
import { useSession } from "next-auth/react";
import InputSearch from "@/app/components/InputSearch";

function Page(): React.ReactElement {
  const { data: session } = useSession();
  const sessionRole = session?.user?.role;

  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <ContainerUser>
      <HeaderContent
        textHeader={`Approve Time-Off`}
        textContent={`Time-Off`}
        textContentSub={`Approve Time-Off`}
        hrefContent={`/users/timeoff`}
      />
      {sessionRole != "User" && (
        <div className="flex justify-end mt-3">
          <BtnDirection
            href={`/users/timeoff/request/all`}
            btnText={`All Request`}
          />
        </div>
      )}

      <div className="flex justify-end mt-3">
        <InputSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      <div>
        <TableTeamLead searchQuery={searchQuery} />
      </div>
    </ContainerUser>
  );
}

export default Page;
