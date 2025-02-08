"use client";

import React, { ReactElement, useState } from "react";
import ContainerUser from "@/app/components/ContainerUser";
import HeaderContent from "@/app/components/HeaderContent";
import FilterKnowledge from "./components/FilterKnowledge";
import Image from "next/image";
import BtnDirection from "@/app/components/button/BtnDirection";
import BtnView from "./components/BtnView";
import CardKnowledge from "./components/CardKnowledge";
import TableDocumentation from "../documentation/components/TableDocumentation";
import TableKnowleageSharing from "./components/TableKnowleageSharing";

function Page(): React.ReactElement {
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("All");

  const handleSearch = (search: string) => {
    setSearch(search);
  };

  const handleFilter = (category: string) => {
    setFilter(category);
  };

  return (
    <ContainerUser>
      <HeaderContent
        textHeader="Knowledge Sharing"
        textContent=""
        hrefContent=""
        textContentSub=""
      />
      <div className="mt-3">
        <FilterKnowledge
          handleSearch={handleSearch}
          handleFilter={handleFilter}
        />
      </div>
      <div className="mt-3">
        <TableKnowleageSharing searchQuery={search} filter={filter} />
      </div>
    </ContainerUser>
  );
}

export default Page;
