"use client";
import React, { useState, useEffect } from "react";

import { useSession } from "next-auth/react";
import Profile from "../../components/Profile";
import HeaderContent from "@/app/components/HeaderContent";
import { FiCommand } from "react-icons/fi";
import { useUser } from "@/app/services/queries";
import Loading from "@/app/loading";
import ContainerAdmin from "@/app/admin/components/ContainerAdmin";
function ViewUserPage({ params }) {
  const { data: session } = useSession();

  const { id } = params;

  const { data: getUser, isLoading, isValidating, error } = useUser(id);
  const userData = getUser?.user;

  if(isLoading) return <Loading />
  

  return (
    <main>
      <ContainerAdmin session={session}>
        <HeaderContent
          textHeader={`TIMER Admin`}
          textContent={`TIMER`}
          textContentSub={`Profile view`}
          hrefContent={`/admin/timerAdmin`}
        />
        <Profile user={userData} />
      </ContainerAdmin>
    </main>
  );
}

export default ViewUserPage;
