"use client";

import { useCreateTimeOff } from "@/app/services/mutations";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import ContainerUser from "@/app/components/ContainerUser";
import HeaderContent from "@/app/components/HeaderContent";
import { useTimeOff, useTimeOffLast, useUser } from "@/app/services/queries";
import Loading from "@/app/loading";
import Error from "@/app/Error";
import FormEditTimeOff from "../../components/FormEditTimeOff";

type PageType = {
  params: {
    id: string;
  };
};

function Page({ params }: PageType){
  const { id } = params;
  const { data: session } = useSession();
  const employee = session?.user?.id;
  const { data: getTimeOff, isLoading, isValidating, error} = useTimeOff(id);
  const timeOff = getTimeOff?.timeOff
   
  return (
    <ContainerUser>
      <HeaderContent
        textHeader={`Edit TIME OFF`}
        textContent={``}
        textContentSub={``}
        hrefContent={``}
      />
      <div>
        <FormEditTimeOff id={id}/>
      </div>
    </ContainerUser>
  );
}

export default Page;
