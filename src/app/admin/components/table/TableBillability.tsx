import AlertNoneData from "@/app/components/AlertNoneData";
import ProfileNameEng from "@/app/components/ProfileNameEng";
import ProfileNameTitle from "@/app/components/ProfileNameTitle";
import ProfileTitleName from "@/app/components/ProfileTitleName";
import Loading from "@/app/loading";
import {
  useProjects,
  useUsers,
  useUsersJoinBillabilityProject,
} from "@/app/services/queries";
import { ProjectType } from "@/interfaces/Project";
import { UserBillability, UsersType } from "@/interfaces/User";
import React from "react";

interface ITableBillability {
  searchQuery: string;
  searchTeam: string;
  serachManday: string;
}

interface ICalculateProjectManDay {
  userId: string;
  userWithBillability: UserBillability[];
}

const TextboxReportProject = ({
  userWithBillability,
  userId,
}: ICalculateProjectManDay) => {
  // const { data: getProjects } = useProjects();
  // const projects: ProjectType[] = getProjects?.totalProject;

  const filterBillabilityProject = userWithBillability?.filter((project) =>
    project.billabilityProject?.some(
      (billability) => billability.userId === userId
    )
  );

  return (
    <>
      <div
        className={`${
          filterBillabilityProject?.length > 0 ? "block" : "hidden"
        } p-2 min-w-full w-72 bg-gray-100 rounded-md shadow-md`}
      >
        <p className="font-bold underline">Project active</p>
        <ul className="list-disc list-inside mt-1">
          {filterBillabilityProject?.map((project, index) => (
            <li key={index} className="text-xs">
              TIME-{project.projectCode} {project.projectEng}{" "}
              {project.billabilityProject?.find(
                (billability) => billability.userId === userId
              )?.manDay || "N/A"}{" "}
              MD
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const CalculateTotalProject = ({
  userWithBillability,
  userId,
}: ICalculateProjectManDay) => {
  const filterBillability = userWithBillability?.filter((project) =>
    project.billabilityProject?.some(
      (billability) => billability.userId === userId
    )
  );
  const totalProject = filterBillability?.length;

  return (
    <p
      className={`text-white bg-blue-400 rounded-full p-2 text-center min-w-fit w-8 h-8 `}
    >
      {totalProject}
    </p>
  );
};

const TableBillability = ({
  searchQuery,
  searchTeam,
  serachManday,
}: ITableBillability) => {
  const {
    data: getUsersJoinBillability,
    isLoading,
    isValidating,
    error,
  } = useUsersJoinBillabilityProject();

  const usersJoinBillability: UsersType[] = getUsersJoinBillability?.users;

  const filteredUsersJoinBillability = usersJoinBillability
    // ?.filter((user) => user.userBillability && user.userBillability.length > 0)
    ?.map((user) => {
      // Calculate total Man Day for each user
      const totalManday =
        user.userBillability?.reduce((sum, project) => {
          const userManday = project.billabilityProject?.reduce(
            (projectSum, billability) =>
              billability.userId === user._id
                ? projectSum + billability.manDay
                : projectSum,
            0
          );
          return sum + (userManday || 0);
        }, 0) || 0;

      return { ...user, totalManday }; // Add totalManday property
    });

  const filteredUsers = filteredUsersJoinBillability
    ?.filter((user) => {
      const isUserTeam = user.employeeTeams
        ?.toLowerCase()
        .includes(searchTeam.toLowerCase());
      const isUserNameEng = user.nameEng
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

      if (searchTeam === "" && searchQuery === "") return user;

      return isUserTeam && isUserNameEng;
    })
    ?.sort((a, b) =>
      serachManday === "Most"
        ? b.totalManday - a.totalManday
        : a.totalManday - b.totalManday
    ); // Sort by totalManday descending

  const checkSearch =
    searchQuery === "" && searchTeam === "" && serachManday == ""
      ? filteredUsersJoinBillability
      : filteredUsers;

  if (isLoading) return <Loading />;
  if (error) return <div>failed to load</div>;

  return (
    <div className="mt-5 p-2">
      {!filteredUsers || filteredUsers?.length === 0 ? (
        <AlertNoneData />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-left">
              <thead className="border-b">
                <tr className="*:py-3 *:px-3 *:font-normal text-sm">
                  <th className="px-4 py-2 border-b">ID</th>
                  <th className="px-4 py-2 border-b">Name</th>
                  <th className="px-4 py-2 border-b">Team</th>
                  <th className="px-4 py-2 border-b text-center">Project</th>
                  <th className="px-4 py-2 border-b text-center">
                    Total Manday
                  </th>
                </tr>
              </thead>
              <tbody>
                {checkSearch?.map((user) => (
                  <tr
                    key={user._id}
                    className="odd:bg-white even:bg-slate-50 *:px-3 text-xs *:h-10"
                  >
                    <td className="px-4 py-2 border-b">TIME-{user.userCode}</td>
                    <td className="px-4 py-2 border-b">
                      <ProfileTitleName
                        employeeId={user?._id}
                        profile={user?.employeeProfile}
                        name={user.nameEng}
                        title={user.employeeTitle}
                      />
                    </td>
                    <td className="px-4 py-2 border-b">{user.employeeTeams}</td>

                    <td className="border-b">
                      <div className=" group relative  rounded-md px-2 py-1 max-w-10 mx-auto">
                        <p className="max-w-10 mx-auto ">
                          <CalculateTotalProject
                            userId={user._id}
                            userWithBillability={user.userBillability}
                          />
                        </p>

                        <div className="hidden  group-hover:block absolute z-50 -left-40 ">
                          <TextboxReportProject
                            userId={user._id}
                            userWithBillability={user.userBillability}
                          />
                        </div>

                      </div>
                    </td>

                    <td className="px-4 py-2 border-b  text-center">
                      <p
                        className={`${
                          user.totalManday > 70 ? "bg-green-400" : "bg-red-400"
                        } w-8 h-8 min-w-fit  mx-auto rounded-full p-2 text-center text-white`}
                      >
                        {user.totalManday}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default TableBillability;
