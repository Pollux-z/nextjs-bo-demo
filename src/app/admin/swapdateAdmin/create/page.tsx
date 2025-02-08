import React from "react";
import ContainerAdmin from "../../components/ContainerAdmin";
import HeaderContent from "@/app/components/HeaderContent";
import FormCreateSwapDate from "@/app/users/swapdate/components/FormCreateSwapDate";
import FormAdminCreateSwapDate from "../components/FormAdminCreateSwapDate";

function Page(): React.ReactElement {
  return (
    <ContainerAdmin>
      <HeaderContent
        textHeader={`Create Swap date`}
        textContent={``}
        textContentSub={``}
        hrefContent={``}
      />
      <div className="bg-white py-5 px-10 w-full mt-5 rounded-sm shadow-sm">
        <FormAdminCreateSwapDate />
      </div>
    </ContainerAdmin>
  );
}

export default Page;
