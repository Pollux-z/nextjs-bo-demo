import ContainerUser from "@/app/components/ContainerUser";
import HeaderContent from "@/app/components/HeaderContent";
import React from "react";
import FormEditSwapDate from "../../components/FormEditSwapDate";

function Page({ params }) {
  const { id } = params;
  
  
  return (
    <ContainerUser>
      <HeaderContent
        textHeader={`Edit SwapDate`}
        textContent={``}
        textContentSub={``}
        hrefContent={``}
      />
      <div className="bg-white py-5 px-10 w-full mt-5">
        <FormEditSwapDate id={id} />
      </div>
    </ContainerUser>
  );
}

export default Page;
