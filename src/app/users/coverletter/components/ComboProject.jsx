import React, { useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useProjects } from "@/app/services/queries";

function ComboProject() {
  const { data: getProjects } = useProjects();
  const projects = getProjects?.totalProject;
  const [selectedProject, setSelectedProject] = useState();
  const [query, setQuery] = useState("");

  const filteredProject =
    query === ""
      ? projects
      : projects?.filter((project) => {
          return project.projectCode.toLowerCase().includes(query.toLowerCase()) ||
           project.projectEng.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      value={selectedProject}
      onChange={setSelectedProject}
      onClose={() => setQuery("")}
    >
      <ComboboxInput
        aria-label="Assignee"
        displayValue={(projects) => `TIME-${projects?.projectCode} ${projects?.projectEng}`}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-[#F5F6FA] py-5 px-5 w-full rounded-md mt-1 text-xs"
        placeholder="Enter name project..."
      />
      <ComboboxOptions anchor="bottom" className="border bg-white px-2 py-1 text-sm rounded-md max-w-96">
        {filteredProject?.map((project) => (
          <ComboboxOption
            key={project?._id}
            value={project}
            className=" hover:bg-gray-200 cursor-pointer py-0.5 px-1 rounded-md"
          >
           TIME-{project?.projectCode} {project?.projectEng}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
}

export default ComboProject;


