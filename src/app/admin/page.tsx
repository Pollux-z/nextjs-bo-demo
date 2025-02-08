'use client'

import React from "react";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import AlertNoneData from "../components/AlertNoneData";
import ContainerAdmin from "./components/ContainerAdmin";


function AdminPage() {

  return (
    <ContainerAdmin>
      <div>
        <AlertNoneData />
      </div>
    </ContainerAdmin>
  );
}

export default AdminPage;
