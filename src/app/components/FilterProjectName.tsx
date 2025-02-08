'use client'

import React from "react";
import { useProjects} from "../services/queries";
import { ProjectType } from "@/interfaces/Project";

const FilterProjectName: React.FC<{ projectData: string }> = ({ projectData }) => {
  const {data : project} = useProjects();
  const projectDatas = project?.totalProject;
  const filterProject = projectDatas?.find((project: ProjectType) => project?._id === projectData);
  return filterProject?.projectEng ? filterProject?.projectEng : projectData ;
}

export default FilterProjectName;
