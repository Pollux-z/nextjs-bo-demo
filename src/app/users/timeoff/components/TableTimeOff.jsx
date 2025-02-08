import React, { useState } from "react";
import {
  useTimeOffs,
  useTimeOffUser,
  useUser,
  useUsers,
} from "@/app/services/queries";

import { useSession } from "next-auth/react";
import TableUser from "./TableUser";
import CardFilterTimeOff from "./CardFilterTimeOff";

function TableTimeOff() {
  const { data: session } = useSession();

  return (
    <>
      <TableUser />
    </>
  );
}

export default TableTimeOff;
