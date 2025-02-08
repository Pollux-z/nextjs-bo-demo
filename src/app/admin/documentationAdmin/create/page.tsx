import React from "react";
import ContainerAdmin from "../../components/ContainerAdmin";
import HeaderContent from "@/app/components/HeaderContent";
import FormCreateDocumentation from "../components/FormCreateDocumentation";

function page() {
  return (
    <ContainerAdmin>
      <HeaderContent
        textHeader="Create Documentation"
        textContent=""
        hrefContent=""
        textContentSub=""
      />
      <div className="bg-white p-3 mt-3">
        <FormCreateDocumentation />
      </div>
    </ContainerAdmin>
  );
}

export default page;
