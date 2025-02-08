"use client";

import React from "react";
import ContainerUser from "@/app/components/ContainerUser";
import { useSession } from "next-auth/react";
import HeaderContent from "@/app/components/HeaderContent";
import { useTimeOffs, useUsers } from "@/app/services/queries";
import BtnCreate from "@/app/components/button/BtnCreate";
import BtnApprove from "@/app/components/button/BtnApprove";
import DropdownTimeOff from "./components/DropdownTimeOff";
import CardFilterTimeOff from "./components/CardFilterTimeOff";
import TableTimeOffUser from "./components/TableTimeOffUser";
import { UsersType } from "@/interfaces/User";

function Page() {
  const { data: session } = useSession();
  const idSession = session?.user?.id;
  const roleSession = session?.user?.role;

  const { data: usersData } = useUsers();
  const getUsersData: UsersType[] = usersData?.totalUsers;
  const filterTeamLeader = getUsersData?.find(
    (teamLeader) => teamLeader?.teamLeader === idSession
  );

  return (
    <ContainerUser>
      <HeaderContent
        textHeader={`TIME OFF`}
        textContent={``}
        textContentSub={``}
        hrefContent={``}
      />
      <div className="mt-3">
        <CardFilterTimeOff />
      </div>
      <div className="bg-white px-2 py-1 mt-3 rounded-md shadow-sm h-full">
        <div className="flex justify-end mt-5 items-end space-x-3">
          {filterTeamLeader && (
            <BtnApprove btnText="Approve" href="/users/timeoff/request" />
          )}
          <BtnCreate btnText="Create" href="/users/timeoff/create" />
          {/* {roleSession != "User" && <DropdownTimeOff />} */}
        </div>
        <div>
          <TableTimeOffUser />
        </div>
      </div>
    </ContainerUser>
  );
}

export default Page;
