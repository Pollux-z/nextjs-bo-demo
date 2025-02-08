import BtnCreate from "@/app/admin/components/button/BtnCreate";
import BtnDirection from "@/app/components/button/BtnDirection";
import ContainerUser from "@/app/components/ContainerUser";
import HeaderContent from "@/app/components/HeaderContent";
import TableInternalCharge from "@/app/components/table/TableInternalCharge";
import React from "react";

function Page() {
  
  return (
    <ContainerUser>
      <HeaderContent
        textHeader="Internal Charge"
        textContent=""
        hrefContent=""
        textContentSub=""
      />
      <div className="flex justify-end my-3">
        <BtnCreate btnText="Request" href="/users/internalCharge/create" />
      </div>
      <div>
        <TableInternalCharge />
      </div>
    </ContainerUser>
  );
}

export default Page;
