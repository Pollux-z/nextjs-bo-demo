import FormatDateSimple from "@/app/components/FormatDateSimple";
import React from "react";
import { format } from "date-fns";
import { UsersType } from "@/interfaces/User";
import { useProjects } from "@/app/services/queries";
import { ProjectType } from "@/interfaces/Project";
import NoneData from "@/app/components/NoneData";
import Loading from "@/app/loading";
import ProfileNameEng from "@/app/components/ProfileNameEng";

const ProfileProject: React.FC<{ data: UsersType }> = ({ data }) => {
  const {data: getProject, isLoading, error} = useProjects()
  const projects: ProjectType[] = getProject?.totalProject;

  const billabilityProject = (() => {
    const filterBillability = projects?.filter((project) => project.billabilityProject?.some((billability) => billability.userId === data._id))
    const totalManDay = filterBillability?.reduce((total, project) => {
      const manDay = project.billabilityProject?.find((billability) => billability.userId === data._id)?.manDay || 0;
      return total + manDay;
    }, 0);

    if(isLoading) return <Loading />

    return (
      <>
      {filterBillability?.length === 0 ? <NoneData /> : (
        <div className="overflow-x-auto">
        <table className="table-auto text-left mt-5 min-w-full md:table-fixed">
          <thead className="border-b">
            <tr className="*:py-3 *:px-3 *:font-normal text-sm">
              <th className="text-left">Project ID</th>
              <th className="text-left">Project Name</th>
              <th className="text-left">PM</th>
              <th className="text-center">Role</th>
              <th className="text-center">Man day</th>
            </tr>
          </thead>
          <tbody>
            {filterBillability?.map((project) => (
              <tr key={project._id} className="odd:bg-white even:bg-slate-50 *:px-3 text-xs *:h-16">
                <td>TIME-{project.projectCode}</td>
                <td>
                <p>{project.projectEng}</p>
                </td>
                <td>
                  <p>{project.projectManager 
                  ? <>
                  <ProfileNameEng  employeeId={project.projectManager}/>
                    </> : "not data"}</p>
                </td>
                <td className="flex justify-center items-center">
                  <p className="bg-blue-200 text-blue-600 rounded-md py-1 px-2 text-center min-w-24">
                    {
                    project.projectManager === data?._id && project.projectOwner === data?._id
                    ? "Project Director"
                    : project.projectManager === data?._id 
                    ? "Project Manager"
                    : project.projectOwner === data?._id
                    ? "Project Director"
                    : "Team Member"
                    }
                    </p>
                </td>
                <td className="text-center">
                  <p>{project.billabilityProject?.find((billability) => billability.userId === data._id)?.manDay}</p>
                </td>
              </tr>
            ))}
            <td></td>
            <td></td>
            <td></td>
            <td className="text-sm font-bold text-center">Total</td>
            <td className="text-center font-bold text-sm">{totalManDay}</td>
          </tbody>
        </table>
      </div>
      )}
      
      </>
    )
  }
  )

  return (
    <>
      <div className="bg-white rounded-md mt-5 h-full py-5">
        <div className="p-2">
          <h5 className="text-sm font-semibold border-l-4 p-2 border-purple-600 ">
            Project
          </h5>
        </div>

        <hr className="my-3" />
        
        <div>
          {billabilityProject()}
        </div>
      </div>
    </>
  );
};

export default ProfileProject;
