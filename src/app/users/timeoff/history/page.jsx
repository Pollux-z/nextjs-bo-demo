import React from "react";

import ContainerUser from "@/app/components/ContainerUser";
import HeaderContent from "@/app/components/HeaderContent";
import TableHistory from "../components/TableHistory";

function Page() {
  return (
    <ContainerUser>
      <HeaderContent
        textHeader={`History Time-Off`}
        textContent={`Time-Off`}
        textContentSub={``}
        hrefContent={`/users/timeoff`}
      />
      <div></div>
      <div className="my-5 bg-white py-3 px-2 rounded-md shadow-md">
        <TableHistory />
      </div>
    </ContainerUser>
  );
}

export default Page;
