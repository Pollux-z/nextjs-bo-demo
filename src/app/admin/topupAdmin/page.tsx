import React from "react";
import ContainerAdmin from "../components/ContainerAdmin";
import HeaderContent from "@/app/components/HeaderContent";
import TableTopupAdmin from "../components/table/TableTopupAdmin";
import BtnNavigation from "../components/button/BtnNavigation";

const TopupAdmin = () => {
  return (
    <ContainerAdmin>
      <HeaderContent
        textHeader="Top-Up"
        textContent=""
        hrefContent=""
        textContentSub=""
      />
      <div className="mt-5 bg-white p-3 rounded-md">
        <div className="flex justify-end">
          <BtnNavigation href="/admin/topupAdmin/create" btnText="Create" />
        </div>
        <div>
          <TableTopupAdmin />
        </div>
      </div>
    </ContainerAdmin>
  );
};

export default TopupAdmin;
