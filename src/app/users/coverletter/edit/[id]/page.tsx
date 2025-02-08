"use client";

import React, { useCallback, useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import Header from "@/app/components/Header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCoverLetter } from "@/app/services/queries";
import { axiosInstance } from "@/app/services/fetcher";
import ContainerUser from "@/app/components/ContainerUser";
import HeaderContent from "@/app/components/HeaderContent";
import FormEditCoverLetter from "../../components/FormEditCoverLetter";

type PageProps = {
  params: {
    id: string;
  };
};

function Page({ params }: PageProps): React.ReactElement {
  const { id } = params;

  return (
    <ContainerUser>
      <HeaderContent
        textHeader={`Create Cover`}
        textContent={``}
        textContentSub={``}
        hrefContent={``}
      />
      <div>
        <FormEditCoverLetter id={id} />
      </div>
    </ContainerUser>

    //
  );
}

export default Page;
