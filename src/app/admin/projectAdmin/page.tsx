"use client";

import React, { useState, useEffect } from "react";
import TableProject from "./components/TableProject";
import HeaderContent from "../../components/HeaderContent";
import BtnCreate from "../components/button/BtnCreate";
import { useSession } from "next-auth/react";
import Loading from "@/app/loading";
import ContainerAdmin from "../components/ContainerAdmin";
import { useProjects } from "@/app/services/queries";
import Error from "@/app/Error";
import { ProjectType } from "@/interfaces/Project";
import CardProject from "./components/CardProject";

function ProjectAdminPage() {
  const { data: getProjects, isLoading, isValidating, error } = useProjects();
  const projects: ProjectType[] = getProjects?.totalProject;

  if (isLoading) return <Loading />;
  if (error) return <Error />;
  return (
    <ContainerAdmin>
      <div>
        <HeaderContent
          textHeader={`Project Admin`}
          textContent={``}
          textContentSub={``}
          hrefContent={``}
        />
      </div>
      <div className="mt-3">
        <div className="">
          <CardProject projectData={projects} />
        </div>
        <div className="bg-white rounded-md shadow-md mt-2">
          <div className="flex justify-end mx-3 pt-3">
            <BtnCreate btnText="Create" href="/admin/projectAdmin/create" />
          </div>
          <div className="">
            <TableProject projectData={projects} />
          </div>
        </div>
      </div>
    </ContainerAdmin>
  );
}

export default ProjectAdminPage;
