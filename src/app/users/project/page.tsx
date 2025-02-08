"use client";

import React, { useState, useEffect } from "react";
import TableProject from "./components/TableProject";

import ContainerUser from "@/app/components/ContainerUser";
import HeaderContent from "@/app/components/HeaderContent";
import BtnCreate from "@/app/components/button/BtnCreate";
import { useSession } from "next-auth/react";
import Loading from "@/app/loading";
import { useProjects } from "@/app/services/queries";
import Error from "@/app/Error";

import { GoSearch } from "react-icons/go";
import InputSearch from "@/app/components/InputSearch";

function Page(): React.ReactElement {
  const { data: session } = useSession();
  const sessionRole = session?.user?.role;
  const { data: projects, isLoading, isValidating, error } = useProjects();
  const getProjects = projects?.totalProject;

  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <ContainerUser>
      <HeaderContent
        textHeader={`Project TIME`}
        textContent={``}
        textContentSub={``}
        hrefContent={`/users/project`}
      />
      <div className="bg-white w-full rounded-md py-7 px-5 shadow-md mt-5">
        <div className="flex flex-col md:flex-row md:justify-between gap-3">
          <div className="place-self-end">
            {sessionRole === "Admin" ||
            sessionRole === "Co-Admin" ||
            sessionRole === "Co-Project" ? (
              <BtnCreate btnText={`Create`} href="/users/project/create" />
            ) : null}
          </div>
          <div className="">
            <InputSearch 
            searchQuery={searchQuery}
             setSearchQuery={setSearchQuery}
            />
          </div>
        </div>
        <TableProject searchQuery={searchQuery} projectData={getProjects} />
      </div>
    </ContainerUser>
  );
}

export default Page;
