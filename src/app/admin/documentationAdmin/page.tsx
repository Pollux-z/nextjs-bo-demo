import React from "react";
import ContainerAdmin from "../components/ContainerAdmin";
import HeaderContent from "@/app/components/HeaderContent";
import TableDocumentation from "../components/table/TableDocumentation";
import BtnFormCreate from "@/app/components/button/BtnFormCreate";
import BtnCreate from "../components/button/BtnCreate";
import BtnNavigation from "../components/button/BtnNavigation";

function page(): React.ReactElement {
  return (
    <ContainerAdmin>
      <HeaderContent
        textHeader="Documentation Admin"
        textContent=""
        hrefContent=""
        textContentSub=""
      />
      <div className="mt-5 bg-white p-3 rounded-md">
        <div className="flex justify-end">
          <BtnNavigation href={"/admin/documentationAdmin/create"} btnText={"Create"} />
        </div>
        <div>
          <TableDocumentation />
        </div>
      </div>
    </ContainerAdmin>
  );
}

export default page;
