"use client";

import React, { useEffect, useState } from "react";
import HeaderContent from "@/app/components/HeaderContent";


import { useSession } from "next-auth/react";
import Loading from "@/app/loading";
import ContainerAdmin from "@/app/admin/components/ContainerAdmin";
import { useProject } from "@/app/services/queries";
// import FormEditProjectAdmin from "../../components/FormEditProjectAdmin";
import FormEditProjectAdmin from "../../edit/components/FormEditProjectAdmin";
import FormCreateProjectAdmin from "../../create/components/FormCreateProjectAdmin";
import FormEdit from "../components/FormEdit";

type Params = {
  id: string;
};

function Page({ params }: { params: Params }) {
  // const { data: session } = useSession();
  const { id } = params;
  const { data: getProject } = useProject(id);
  const project = getProject?.post

  return (
    <div>
      <ContainerAdmin>
        <HeaderContent
          textHeader={`Project Admin`}
          textContent={`Project`}
          textContentSub={`Project View`}
          hrefContent={`/admin/projectAdmin`}
        />
       
        <div>

        <FormEditProjectAdmin id={id} />
        </div>
        {/* <FormCreateProjectAdmin /> */}
      </ContainerAdmin>
    </div>
  );
}

export default Page;
