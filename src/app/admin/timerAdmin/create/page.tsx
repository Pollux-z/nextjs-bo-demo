"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Teams } from "@/app/db/option";
import HeaderContent from "../../../components/HeaderContent";
import SeleteComponents from "../components/SeleteComponents";
import TeamSeleteInput from "../components/SeletionTeams";
import ContainerAdmin from "../../components/ContainerAdmin";
import { useUserLastId, useUsers } from "@/app/services/queries";
import { useCreateUser } from "@/app/services/mutations";
import { UsersType } from "@/interfaces/User";
import FormCreateUserAdmin from "../components/FormCreateUserAdmin";

function Page() {
  

  return (
    <main>
      <ContainerAdmin>
        <div className="">
          <HeaderContent
            textHeader={`TIMER Admin`}
            textContent={`TIMER`}
            hrefContent={`/admin/timerAdmin`}
            textContentSub={`Create user`}
          />
          <div className="">
            <FormCreateUserAdmin />
          </div>
        </div>
      </ContainerAdmin>
    </main>
  );
}

export default Page;
