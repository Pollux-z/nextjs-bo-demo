"use client";


import { useSession } from "next-auth/react";
import React, { useState } from "react";
import ContainerUser from "@/app/components/ContainerUser";
import HeaderContent from "@/app/components/HeaderContent";
import { useTimeOffLast, useUser } from "@/app/services/queries";
import FormCreateTimeOff from "../components/FormCreateTimeOff";
import ProfileLeave from "../../timer/components/ProfileLeave";
import Loading from "@/app/loading";
import Error from "@/app/Error";

function Page() {
  const { data: session } = useSession();
  const employee = session?.user?.id;

  const { data: getUser, isLoading, isValidating, error} = useUser(employee);
  const users = getUser?.user

  if(isLoading) return <Loading />
  if(error) return <Error />

  return (
    <ContainerUser>
      <HeaderContent
        textHeader={`TIME OFF`}
        textContent={``}
        textContentSub={``}
        hrefContent={``}
      />
      <div className="mt-3">
        <ProfileLeave  user={users}/>
      </div>
      <div>
        <FormCreateTimeOff />
      </div>
    </ContainerUser>
  );
}

export default Page;
