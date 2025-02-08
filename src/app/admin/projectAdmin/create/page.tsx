import React from "react";
import HeaderContent from "../../../components/HeaderContent";
import FormCreateProjectAdmin from "./components/FormCreateProjectAdmin";
import ContainerAdmin from "../../components/ContainerAdmin";

function Page(): React.ReactElement {
  return (
    <ContainerAdmin>
      <HeaderContent
        textHeader="Create project"
        textContent="Project"
        hrefContent="/admin/projectAdmin"
        textContentSub="Create Post"
      />
      <FormCreateProjectAdmin />
    </ContainerAdmin>
  );
}

export default Page;
