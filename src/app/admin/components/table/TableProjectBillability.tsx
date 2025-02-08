import AlertNoneData from "@/app/components/AlertNoneData";
import Pagination from "@/app/components/Pagination";
import UserNameEng from "@/app/components/UserNameEng";
import { paginate } from "@/app/helpers/paginate";
import { useProjects } from "@/app/services/queries";
import { BillabilityProjectType, ProjectType } from "@/interfaces/Project";
import Link from "next/link";
import React, { useState } from "react";
import { GetDateProject } from "../../projectAdmin/components/GetDateStartProject";
import BtnEdit from "../../projectAdmin/components/BtnEdit";
import { Status } from "@/app/db/option";
import InputSearch from "@/app/components/InputSearch";
import { UserBillability } from "@/interfaces/User";

interface FilterProjectProps {
  filterStatus: string;
  searchQuery: string;
  handleFilter: (status: string) => void;
  setSearchQuery: (query: string) => void;
}

interface ICalculateProjectManDay {
  userId: string;
  userWithBillability: BillabilityProjectType[];
}

const TextboxReportProject = ({
  userWithBillability,
  userId,
}: ICalculateProjectManDay) => {
  const { data: getProjects } = useProjects();
  const projects: ProjectType[] = getProjects?.totalProject;

  // const filterBillabilityProject = userWithBillability?.filter((project) =>
  //   project.billabilityProject?.some(
  //     (billability) => billability.userId === userId
  //   )
  // );

  return (
    <>
      <div
        className={`${
          userWithBillability?.length > 0 ? "block" : "hidden"
        } p-2 min-w-full w-72 bg-white rounded-md shadow-md`}
      >
        <p className="font-bold underline">Project member</p>
        <ul className="mt-1">
          {userWithBillability?.map((project, index) => (
            <li key={index} className="flex justify-between items-center mt-1">
              {project?._id} <UserNameEng employeeId={project?.userId} />{" "}
              {project?.manDay} MD
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

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

export const TableProjectBillability = () => {
  const { data: getProjects } = useProjects();
  const projects: ProjectType[] = getProjects?.totalProject;
  // Filter project by status
  const [filterStatus, setFilterStatus] = useState("Proposal");
  const [searchQuery, setSearchQuery] = useState("");

  const [showManDay, setShowManDay] = useState<number | null>(null);

  const calculateBillability = projects?.map((project) => {
    const totalBillability = project?.billabilityProject?.reduce(
      (sum, project) => sum + project.manDay,
      0
    );
    return { ...project, totalBillability };
  });

  const filterProject =
    filterStatus === "All"
      ? calculateBillability
      : calculateBillability?.filter(
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

          {serachProject?.length <= 0 ? (
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
              <div className="overflow-x-auto overflow-y-auto max-h-96 mt-3">
                <table className="table-auto w-full text-left mt-5">
                  <thead className="border-b">
                    <tr className="*:py-3 *:px-3 *:font-normal text-sm">
                      <th className="rounded-s-md">ID</th>
                      <th className="">Project Name</th>
                      <th className="">PM</th>
                      <th className="text-center">Member</th>
                      <th className="text-center">Total Manday</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {paginatedProject?.map(
                      (project: ProjectType, index: number) => (
                        <tr
                          key={index}
                          className=" *:px-3 text-xs *:h-16 hover:bg-gray-100 cursor-pointer odd:bg-white even:bg-slate-50 border-b"
                        >
                          <td className="">TIME-{project?.projectCode}</td>
                          <td>{project?.projectEng}</td>
                          <td>
                            <UserNameEng
                              employeeId={project?.projectManager ?? ""}
                            />
                          </td>
                          <td className="text-center">
                            <div className=" group relative  rounded-md px-2 py-1 max-w-10 mx-auto">
                              <p className={`${(project?.billabilityProject?.length ?? 0) > 0 ? "text-blue-500 bg-blue-100 p-1 rounded-full" : ""} max-w-10 mx-auto `}>
                                {project?.billabilityProject?.length}
                                </p>

                              <div className="hidden group-hover:block absolute z-50 -left-36 ">
                                <TextboxReportProject
                                  userId={project._id}
                                  userWithBillability={
                                    project?.billabilityProject || []
                                  }
                                />
                              </div>
                            </div>
                            {/* {project?.billabilityProject?.length} */}
                          </td>
                          <td className="text-center">
                            {project?.totalBillability} MD
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

export default TableProjectBillability;
