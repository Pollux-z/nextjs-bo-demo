"use client";

import React, { use, useState } from "react";
import {
  useProjects,
  useUsers,
  useUsersJoinBillabilityProject,
} from "@/app/services/queries";
import { UsersType } from "@/interfaces/User";
import ContainerAdmin from "../../components/ContainerAdmin";
import HeaderContent from "@/app/components/HeaderContent";
import TableBillability from "../../components/table/TableBillability";

import FilterBarBillability from "../components/FilterBarBillability";
import ExportExcelBilibility from "../components/ExportExcelBilibility";
import TableProjectBillability from "../../components/table/TableProjectBillability";
import ExportExcel from "../functions/ExportExcel";

const ProjectTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchTeam, setSearchTeam] = useState<string>("");
  const [serachManday, setSearchManday] = useState<string>("");

  const {
    data: getUsersJoinBillability,
    isLoading,
    isValidating,
    error,
  } = useUsersJoinBillabilityProject();

  const usersJoinBillability: UsersType[] = getUsersJoinBillability?.users;

  const manDayUsersJoinBillability = usersJoinBillability?.map((user) => {
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

    return { ...user, totalManday };
  });

  const filteredUsersJoinBillability = usersJoinBillability?.filter(
    (user) => user.userBillability && user.userBillability.length > 0
  );

  const queryTeam: string[] = [];

  filteredUsersJoinBillability?.forEach((user) => {
    if (user.employeeTeams && !queryTeam.includes(user.employeeTeams)) {
      queryTeam.push(user.employeeTeams);
    }
  });

  queryTeam.sort((a, b) => a.localeCompare(b));

  return (
    <ContainerAdmin>
      <HeaderContent
        textHeader={`Billability Admin`}
        textContent={``}
        textContentSub={``}
        hrefContent={``}
      />

      <div className="bg-white shadow-md rounded-md mt-3 py-3 px-2">
        <div className="flex justify-end py-2 px-3">
          <FilterBarBillability
            searchQuery={searchQuery}
            searchTeam={searchTeam}
            searchManday={serachManday}
            setSearchQuery={setSearchQuery}
            setSearchTeam={setSearchTeam}
            setSearchManday={setSearchManday}
          />
        </div>

        <div className="flex justify-end py-1 px-3">
          <ExportExcelBilibility
            data={manDayUsersJoinBillability}
            fileName={`Billability`}
          />
        </div>

        {/* <ExportExcel /> */}
        
        <div className="overflow-y-auto max-h-96 ">
          <TableBillability
            serachManday={serachManday}
            searchQuery={searchQuery}
            searchTeam={searchTeam}
          />
        </div>
      </div>
      <div className="mt-5 bg-white shadow-md rounded-md">
        <TableProjectBillability />
      </div>
    </ContainerAdmin>
  );
};

export default ProjectTable;
