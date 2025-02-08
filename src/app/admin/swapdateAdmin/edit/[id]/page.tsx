import ContainerAdmin from "@/app/admin/components/ContainerAdmin";
import HeaderContent from "@/app/components/HeaderContent";
import React from "react";
import FormAdminEditSwapDate from "../../components/FormAdminEditSwapDate";

type Params = {
  id: string
}

function Page({ params }: {params: Params}) {
  const { id } = params;
  return (
    <ContainerAdmin>
      <HeaderContent
        textHeader={`Edit SwapDate`}
        textContent={``}
        textContentSub={``}
        hrefContent={``}
      />
      <div className="bg-white py-5 px-10 w-full mt-5">
        <FormAdminEditSwapDate id={id} />
      </div>
    </ContainerAdmin>
  );
}

export default Page;
