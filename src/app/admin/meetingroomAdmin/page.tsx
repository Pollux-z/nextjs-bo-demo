import React, { ReactElement } from "react";
import ContainerAdmin from "../components/ContainerAdmin";
import HeaderContent from "@/app/components/HeaderContent";
import TableMeetingRoomAdmin from "../components/table/TableMeetingRoomAdmin";

function Page(): ReactElement {
  return (
    <ContainerAdmin>
      <HeaderContent
        textHeader="Meeting Room Admin"
        textContent=""
        hrefContent=""
        textContentSub=""
      />
      <div>
        <TableMeetingRoomAdmin />
      </div>
    </ContainerAdmin>
  );
}

export default Page;
