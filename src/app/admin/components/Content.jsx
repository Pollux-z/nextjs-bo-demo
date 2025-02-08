import React from "react";

import AdminHerder from "./CardHerder";
import TableAnnouncement from "../announcementAdmin/components/TableAnnouncement";
import TableProject from "../projectAdmin/components/TableProject";

import CurrentProjectCard from "./CurrentProjectCard";
import ProjectLostCard from "./ProjectLostCard";

function Content() {
  return (
    <div>
      <div>
        <AdminHerder />
      </div>
      <div className="grid grid-rows-4 grid-flow-col mt-5 gap-4">
        <div className="row-span-4 col-span-2 max-h-[700px] min-w-[500px]">
          <TableProject />
        </div>
        <div className="row-span-2">
          <CurrentProjectCard />
        </div>
        <div className="row-span-2 ">
          <ProjectLostCard />
          </div>
      </div>
    </div>
  );
}

export default Content;
