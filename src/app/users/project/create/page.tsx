'use client'

import React from "react";
import HeaderContent from "@/app/components/HeaderContent";
import ContainerUser from "@/app/components/ContainerUser";
import FormCreateProject from "./components/FormCreateProject";
import { useSession } from "next-auth/react";
import ContainerAdmin from "@/app/admin/components/ContainerAdmin";
function CreateProjectAdminPage() {
  const {data: session} = useSession();

  return (
    <ContainerUser>
      <HeaderContent
        textHeader="Create project"
        textContent="Project"
        hrefContent="/users/project"
        textContentSub="Create Post"
      />
      <FormCreateProject />
    </ContainerUser>
  );
}

export default CreateProjectAdminPage;
