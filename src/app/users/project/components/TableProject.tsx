"use client";

import React, { useState } from "react";
import Link from "next/link";
import BtnEdit from "./BtnEdit";

// Pagination function
import Pagination from "@/app/components/Pagination";
import { paginate } from "@/app/helpers/paginate";
import { useSession } from "next-auth/react";
import { ProjectType } from "@/interfaces/Project";
import UserNameEng from "@/app/components/UserNameEng";

type TableProjectType = {
  searchQuery: string;
  projectData: any;
};

const TableProject: React.FC<TableProjectType> = ({
  searchQuery,
  projectData,
}) => {
  const { data: session } = useSession();
  const sessionRole = session?.user?.role;
  const sessionEmployeeId = session?.user?.id;
  const data: ProjectType[] = projectData;
  const searchInput = searchQuery.toLowerCase();

  const filterProject = data?.filter(
    (project) =>
      project?.projectCode?.toString().includes(searchInput) ||
      project?.projectEng?.toLowerCase().includes(searchInput) ||
      project?.projectTh?.toLowerCase().includes(searchInput)
  );

  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 50;

  const onPageChange = (page: number) => {
    setPageIndex(page);
  };

  const paginatedProject: ProjectType[] = paginate(
    filterProject,
    pageIndex,
    pageSize
  );

  return (
    <>
      <div className="flex justify-end mt-3">
        <Pagination
          items={filterProject.length}
          pageIndex={pageIndex}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left mt-5">
          <thead className="border-b">
            <tr className="*:py-3 *:px-3 *:font-normal text-sm">
              <th className="rounded-s-md">ID</th>
              <th className="">Project Name</th>
              <th className="">PM</th>
              <th className="">Contact Number</th>
              <th className="">Start Date</th>
              <th className="">End Date</th>
            </tr>
          </thead>
          <tbody className="">
            {paginatedProject?.map((project, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-slate-50 *:px-3 text-xs *:h-16"
              >
                <td className="">TIME-{project?.projectCode}</td>
                <td className=" max-w-80">
                  {sessionRole === "Admin" ||
                  sessionRole === "Co-Admin" ||
                  sessionRole === "Co-Project" ||
                  sessionEmployeeId === project?.projectManager ||
                  sessionEmployeeId === project?.projectOwner ? (
                    <>
                      <Link
                        className="text-blue-500"
                        href={`/users/project/edit/${project?._id}`}
                      >
                        {project.projectEng}
                      </Link>
                    </>
                  ) : (
                    <p>{project.projectEng}</p>
                  )}
                  <p className="text-gray-400 truncate ...">
                    {project?.projectTh}
                  </p>
                </td>
                <td className="">
                  {!project?.projectManager ? (
                    <>None</>
                  ) : (
                    <UserNameEng employeeId={project?.projectManager} />
                  )}
                </td>
                <td className="">
                  {!project?.contactCode ? <>None</> : project?.contactCode}
                </td>
                <td className="">
                  {!project?.startDateContact ? (
                    <>None</>
                  ) : (
                    project?.startDateContact
                  )}
                </td>
                <td className="">
                  {!project?.endDateContact ? (
                    <>None</>
                  ) : (
                    project?.endDateContact
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-3">
        <Pagination
          items={filterProject.length}
          pageIndex={pageIndex}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};

export default TableProject;
