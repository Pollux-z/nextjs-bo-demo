"use client";

import React, { useState } from "react";
import Link from "next/link";
import BtnEdit from "./BtnEdit";

// Pagination function
import Pagination from "@/app/components/Pagination";
import { paginate } from "@/app/helpers/paginate";
import { GetDateProject } from "./GetDateStartProject";
import { ProjectType } from "@/interfaces/Project";
import UserNameEng from "@/app/components/UserNameEng";
import { Status } from "@/app/db/option";
import InputSearch from "@/app/components/InputSearch";
import AlertNoneData from "@/app/components/AlertNoneData";

type TableProjectType = {
  projectData: ProjectType[];
};

interface FilterProjectProps {
  filterStatus: string;
  searchQuery: string;
  handleFilter: (status: string) => void;
  setSearchQuery: (query: string) => void;
}

const NavBillability = () => {
  return (
    <Link
    href={`/admin/projectAdmin/billability`}
    className="bg-violet-500 text-white rounded-md px-3 py-2  hover:bg-violet-600 transition-all "
    >
      Billability
    </Link>
  )
}

const FilterProject = ({
  filterStatus,
  handleFilter,
  searchQuery,
  setSearchQuery,
}: FilterProjectProps) => {
  return (
    <div className="">
      <div className="flex justify-between items-center ">
        <h3 className="text-lg font-semibold">Project</h3>
      </div>
      <div className="mt-3 flex flex-col md:flex-row justify-between">
        <div>
          <ul className="flex gap-1 bg-gray-100 rounded-md p-2 justify-center items-center font-semibold">
            {Status.map((status, index: number) => (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => handleFilter(status)}
                  className={`text-xs py-2 px-2 min-w-16 max-w-20 hover:bg-white hover:rounded-md hover:shadow-sm ${
                    filterStatus === status
                      ? "bg-white rounded-md shadow-md"
                      : ""
                  } transition-all`}
                >
                  {status}
                </button>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => handleFilter("All")}
                className={`text-xs py-2 px-2 min-w-16 max-w-20 hover:bg-white hover:rounded-md hover:shadow-sm ${
                  filterStatus === "All" ? "bg-white rounded-md shadow-md" : ""
                } transition-all`}
              >
                All
              </button>
            </li>
          </ul>
        </div>
        <div className="mt-3 md:mt-0">
          <InputSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
      </div>
    </div>
  );
};

const TableProject: React.FC<TableProjectType> = ({ projectData }) => {
  // Filter project by status
  const [filterStatus, setFilterStatus] = useState("Proposal");
  const [searchQuery, setSearchQuery] = useState("");

  const filterProject =
    filterStatus === "All"
      ? projectData
      : projectData?.filter(
          (project) =>
            project?.status?.toLowerCase() === filterStatus.toLowerCase()
        );

  const serachProject = filterProject?.filter(
    (project) =>
      project?.projectEng?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project?.projectTh?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFilter = (status: string) => {
    setFilterStatus(status);
  };

  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 50;

  const onPageChange = (page: number) => {
    setPageIndex(page);
  };

  const paginatedProject = paginate(serachProject, pageIndex, pageSize);

  return (
    <>
      <div className="w-full rounded-md py-7 px-5">
        <div className="">
          <FilterProject
            filterStatus={filterStatus}
            handleFilter={handleFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          {serachProject.length <= 0 ? (
            <AlertNoneData />
          ) : (
            <>
              <div className="flex justify-end mt-3">
                <Pagination
                  items={serachProject?.length}
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
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {paginatedProject?.map(
                      (project: ProjectType, index: number) => (
                        <tr
                          key={index}
                          className="odd:bg-white even:bg-slate-50 *:px-3 text-xs *:h-16"
                        >
                          <td className="">TIME-{project?.projectCode}</td>
                          <td className="">
                            <Link
                              href={`/admin/projectAdmin/edit/${project._id}`}
                              className="text-sm text-blue-500"
                            >
                              {project?.projectEng}
                            </Link>
                            <p className="text-gray-400">
                              {project?.projectTh}
                            </p>
                          </td>
                          <td className="">
                            {!project?.projectManager ? (
                              <>None</>
                            ) : (
                              <UserNameEng
                                employeeId={project?.projectManager}
                              />
                            )}
                          </td>
                          <td className="">
                            {!project?.contactCode ? (
                              <>None</>
                            ) : (
                              project?.contactCode
                            )}
                          </td>
                          <td className="">
                            {!project?.startDateContact ? (
                              <>None</>
                            ) : (
                              <GetDateProject
                                dataDate={project?.startDateContact}
                              />
                            )}
                          </td>
                          <td className="">
                            {!project?.endDateContact ? (
                              <>None</>
                            ) : (
                              <GetDateProject
                                dataDate={project?.endDateContact}
                              />
                            )}
                          </td>
                          <td className="text-center flex justify-center items-center">
                            <BtnEdit id={project?._id} />
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end mt-3">
                <Pagination
                  items={serachProject?.length}
                  pageIndex={pageIndex}
                  pageSize={pageSize}
                  onPageChange={onPageChange}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TableProject;
