'use client'

import React from "react";
import MonthlyFilter from "./MonthlyFilter";
import ContainerUser from "./ContainerUser";
import { useSession } from "next-auth/react";

function Content() {
  const { data: session} = useSession()
  return (
    <>
      
    </>
  );
}

export default Content;
