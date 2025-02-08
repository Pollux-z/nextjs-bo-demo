'use client'

import React from "react";
import ContentCarRedcord from "./components/ContentCarRedcord";
import ContainerUser from "../../components/ContainerUser";
import HeaderContent from "../../components/HeaderContent";
import { useSession } from "next-auth/react";

function CarRecordPage() {

  return (
    <ContainerUser>
      <HeaderContent
          textHeader={`Vehicle Log`}
          textContent={``}
          textContentSub={``}
          hrefContent={``}
        />
      <ContentCarRedcord />
    </ContainerUser>
  );
}

export default CarRecordPage;
