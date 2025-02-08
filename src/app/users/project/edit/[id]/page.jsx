"use client";

import React, { useEffect, useState } from "react";
import ContainerUser from "@/app/components/ContainerUser";
import HeaderContent from "@/app/components/HeaderContent";
import FormEditProject from "../../components/FormEditProject";

import { useSession } from "next-auth/react";
import Loading from "@/app/loading";
import { useProject } from "@/app/services/queries";
import Error from "@/app/Error";

function Page({ params }) {
  const { id } = params;
  const { data: session } = useSession();

  const { data: project, isLoading, isValidating, error } = useProject(id);
  
  if (isLoading) return <Loading />;
  if (error) return <Error />;
  return (
    <div>
      <ContainerUser>
        <HeaderContent
          textHeader={`Project Admin`}
          textContent={`Project`}
          textContentSub={`Project View`}
          hrefContent={`/users/project`}
        />
        <FormEditProject id={id} />
      </ContainerUser>
    </div>
  );
}

export default Page;
