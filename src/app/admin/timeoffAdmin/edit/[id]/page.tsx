import HeaderContent from "@/app/components/HeaderContent";
import React from "react";
import AdminFormEditTimeOff from "../../components/AdminFormEditTimeOff";
import ContainerAdmin from "@/app/admin/components/ContainerAdmin";

type Params = {
  params: {
    id: string;
  };
};

function Page({ params }: Params) {
  const { id } = params;
  return (
    <ContainerAdmin>
      <HeaderContent
        textHeader={`Edit TIME-Off Admin`}
        textContent={``}
        textContentSub={``}
        hrefContent={``}
      />
      <div>
        <AdminFormEditTimeOff id={id}/>
      </div>
    </ContainerAdmin>
  );
}

export default Page;
