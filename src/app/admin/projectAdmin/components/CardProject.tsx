import { ProjectType } from "@/interfaces/Project";
import React from "react";
import Image from "next/image";

import ProposalImg from "../../../../../public/proposalProject.png";
import ActiveImg from "../../../../../public/activeProject.png";
import LostImg from "../../../../../public/lostProject.png";
import DoneProject from "../../../../../public/doneProject.png";




type IProjectType = {
  projectData: ProjectType[];
};

const getCountProject = (projectData: ProjectType[]) => {
  const countProjectPropsal = projectData?.filter((project) => {
    return (
      project?.status?.toLowerCase() === "proposal" &&
      project?.projectCode?.substring(0, 4) === "2024"
    );
  }).length;

  const countProjectActive = projectData?.filter(
    (project) =>
      project?.status?.toLowerCase() === "active" &&
      project?.projectCode?.substring(0, 4) === "2024"
  ).length;

  const countProjectLost = projectData?.filter(
    (project) =>
      project?.status?.toLowerCase() === "lost" &&
      project?.projectCode?.substring(0, 4) === "2024"
  ).length;

  const countProjectFinished = projectData?.filter(
    (project) =>
      project?.status?.toLowerCase() === "finished" &&
      project?.projectCode?.substring(0, 4) === "2024"
  ).length;

  const resultProject = [
    { name: "Proposol" ,data: countProjectPropsal, img: ProposalImg },
    { name: "Active" ,data: countProjectActive, img: ActiveImg },
    { name: "Lost" ,data: countProjectLost, img: LostImg },
    { name: "Finished" ,data: countProjectFinished, img: DoneProject },
  ];

  return resultProject;
};

const CardProject: React.FC<IProjectType> = ({ projectData }) => {

  const resultProject = getCountProject(projectData);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {resultProject.map((project, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6">
            <div className="">
              <div className="flex justify-between items-center">
                <div className="font-semibold text-4xl">
                  {project.data} <span className="text-base">Projects</span>
                </div>
                <div>
                  <Image src={project?.img} alt="Proposal" width={50} height={50} />
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-gray-600 text-sm">
                  {index === 0 ? "Proposal" : index === 1 ? "Active" : index === 2 ? "Lost" : "Finished"}
                </div>
              </div>
            </div>
          </div>
        )  
        )}
      </div>
    </>
  );
};

export default CardProject;
