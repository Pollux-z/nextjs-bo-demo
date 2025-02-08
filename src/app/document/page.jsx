"use client";

import React from "react";
import ContainerUser from "../components/ContainerUser";
import HeaderContent from "../components/HeaderContent";
import { useSession } from "next-auth/react";
import DocCarrecord from "./components/DocCarrecord";
import DocMeetingRoom from "./components/DocMeetingRoom";
import DocCoverletter from "./components/DocCoverletter";
import DocTimers from "./components/DocTimers";
import DocTimeOff from "./components/DocTimeOff";
import DocProject from "./components/DocProject";

function Page() {
  const { data: session } = useSession();
  const sessionRole = session?.user?.role
  return (
    <>
      <ContainerUser session={session}>
        <HeaderContent
          textHeader={`คู่มือการใช้งาน Website`}
          textContent={``}
          textContentSub={``}
          hrefContent={``}
        />
        <div>
          <DocCarrecord />
          <DocMeetingRoom />
          <DocCoverletter />
          {/* <DocTimers /> */}
          <DocTimeOff />
          {/* {sessionRole != "User" &&  <DocProject /> } */}
        </div>
      </ContainerUser>
    </>
  );
}

export default Page;
