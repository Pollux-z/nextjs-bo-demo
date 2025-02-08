"use client";

import React from "react";

import { useSession } from "next-auth/react";
import ContainerUser from "@/app/components/ContainerUser";
import HeaderContent from "@/app/components/HeaderContent";
import Loading from "@/app/loading";
import Error from "@/app/Error";
import TableTopUp from "./components/TableTopUp";
import { useTopUps } from "@/app/services/queries";

import BtnCreate from "@/app/components/button/BtnCreate";
import AlertNoneData from "@/app/components/AlertNoneData";

function Page() {
  const { data: session } = useSession();
  const { data: getTopUp, isLoading, isValidating, error } = useTopUps();
  const topUps = getTopUp?.totalTopUp;

  if(isLoading) return <Loading />
  if(error) return <Error />

  return (
    <ContainerUser>
      <HeaderContent
        textHeader={`Amount Employee`}
        textContent={``}
        textContentSub={``}
        hrefContent={``}
      />
      <div className="w-full bg-white mt-5 py-5 px-3 rounded-md shadow-sm">
        <div>
          <div className="flex justify-end">
            <BtnCreate btnText="Create" href="/users/topup/create" />
          </div>
        </div>
        {topUps && topUps?.length > 0 ? <TableTopUp data={topUps}/> : <AlertNoneData />}
      </div>
    </ContainerUser>
  );
}

export default Page;
