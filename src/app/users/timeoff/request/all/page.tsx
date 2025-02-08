"use client";

import React, { useState } from "react";
import ContainerUser from "@/app/components/ContainerUser";
import HeaderContent from "@/app/components/HeaderContent";
import TableAdmin from "../../components/TableAdmin";
import InputSearch from "@/app/components/InputSearch";

function Page(): React.ReactElement {
  
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ContainerUser>
      <HeaderContent
        textHeader={`All request Time-Off`}
        textContent={`Time-Off`}
        textContentSub={``}
        hrefContent={`/users/timeoff`}
      />
      <div className="flex justify-end mt-3">
        <InputSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
      <div>
        <TableAdmin searchQuery={searchQuery} />
      </div>
    </ContainerUser>
  );
}

export default Page;
