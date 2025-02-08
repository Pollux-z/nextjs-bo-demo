"use client";

import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import {
  useTimeOffJoinUsers,
  useTopUps,
  useUser,
  useUsers,
  useUsersJoinTimeOff,
} from "@/app/services/queries";
import Loading from "@/app/loading";
import Error from "@/app/Error";
import GetMonthTimeOff from "../../timeoffAdmin/components/GetMonthTimeOff";
import { UsersType } from "@/interfaces/User";
import GetTotalTimeOff from "../../timeoffAdmin/components/GetTotalTimeOff";
import GetCalculateBalanceTimeOff from "../../timeoffAdmin/components/GetCalculateBalanceTimeOff";
import GetLeave2025 from "../../timeoffAdmin/components/GetLeave2025";
import TextBoxReportTimeOff from "../../timeoffAdmin/components/TextBoxReportTimeOff";
import CalculateVacationLeave, {
  CalculateTotalLeave,
} from "@/app/users/timeoff/components/CalculateVacationLeave";

import CalculatePersonalLeave from "@/app/users/timeoff/components/CalculatePersonalLeave";
import CalculateSickLeave from "@/app/users/timeoff/components/CalculateSickLeave";
import ExportExcelTimeoffReport from "../ExportExcelTimeoffReport";
import GetTimeoffByMonth from "../../timeoffAdmin/components/GetTimeoffByMonth";

const TableReportTimeOff2025: React.FC<{ sortYear: number }> = (args) => {
  const { sortYear } = args;
  const { data: getUsersJoinTimeOff } = useUsersJoinTimeOff();
  const usersJoinTimeOff: UsersType[] = getUsersJoinTimeOff?.user;

  const { data: getTimeOffWithUser } = useTimeOffJoinUsers();
  const timeOffs = getTimeOffWithUser?.timeOff;

  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("Vacation");
  const { isLoading, error } = useUsers();

  const numberMonth: number[] = [];

  for (let index = 0; index < 12; index++) {
    numberMonth.push(index + 1);
  }

  const queryUsers = usersJoinTimeOff?.filter(
    (userValue: UsersType) =>
      userValue?.nameEng.toLowerCase().includes(searchQuery) ||
      userValue?.nameTh.toLowerCase().includes(searchQuery) ||
      userValue?.nickNameTh.toLowerCase().includes(searchQuery) ||
      userValue?.employeeTitle.toLowerCase().includes(searchQuery)
  );

  const vacationExportToExcel = usersJoinTimeOff?.map((user) => {
    return {
      เลขที่พนักงาน: user?.userCode,
      ชื่อ: user?.nameTh,
      ชื่อเล่น: user?.nickNameTh,
      ทีม: user?.employeeTeams,
      "วันลาในปี 67": user?.year2025Leave?.vacationLeave,
      วันลาสะสม: CalculateTotalLeave({ user, seletedYear: 2025, sortType }),
      "ม.ค. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 1,
        seletedYear: 2025,
        seletedType: "Vacation",
      }),
      "ก.พ. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 2,
        seletedYear: 2025,
        seletedType: "Vacation",
      }),
      "มี.ค. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 3,
        seletedYear: 2025,
        seletedType: "Vacation",
      }),
      "เม.ย. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 4,
        seletedYear: 2025,
        seletedType: "Vacation",
      }),
      "พ.ค. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 5,
        seletedYear: 2025,
        seletedType: "Vacation",
      }),
      "มิ.ย. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 6,
        seletedYear: 2025,
        seletedType: "Vacation",
      }),
      "ก.ค. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 7,
        seletedYear: 2025,
        seletedType: "Vacation",
      }),
      "ส.ค. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 8,
        seletedYear: 2025,
        seletedType: "Vacation",
      }),
      "ก.ย. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 9,
        seletedYear: 2025,
        seletedType: "Vacation",
      }),
      "ต.ค. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 10,
        seletedYear: 2025,
        seletedType: "Vacation",
      }),
      "พ.ย. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 11,
        seletedYear: 2025,
        seletedType: "Vacation",
      }),
      "ธ.ค. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 12,
        seletedYear: 2025,
        seletedType: "Vacation",
      }),
      จำนวนวันลาที่ใช้ไปแล้ว: GetTotalTimeOff({
        users: user,
        data: timeOffs,
        sortType: "Vacation",
        sortYear: 2025,
      }),
      จำนวนวันลาคงเหลือ: CalculateVacationLeave({
        user: user,
        seletedYear: 2025,
        sortType: "Vacation",
      }),
    };
  });

  const personalExportToExcel = usersJoinTimeOff?.map((user) => {
    return {
      เลขที่พนักงาน: user?.userCode,
      ชื่อ: user?.nameTh,
      ชื่อเล่น: user?.nickNameTh,
      ทีม: user?.employeeTeams,
      "วันลาในปี 67": user?.year2025Leave?.personalLeave,
      "ม.ค. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 1,
        seletedYear: 2025,
        seletedType: "Personal Leave",
      }),
      "ก.พ. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 2,
        seletedYear: 2025,
        seletedType: "Personal Leave",
      }),
      "มี.ค. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 3,
        seletedYear: 2025,
        seletedType: "Personal Leave",
      }),
      "เม.ย. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 4,
        seletedYear: 2025,
        seletedType: "Personal Leave",
      }),
      "พ.ค. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 5,
        seletedYear: 2025,
        seletedType: "Personal Leave",
      }),
      "มิ.ย. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 6,
        seletedYear: 2025,
        seletedType: "Personal Leave",
      }),
      "ก.ค. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 7,
        seletedYear: 2025,
        seletedType: "Personal Leave",
      }),
      "ส.ค. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 8,
        seletedYear: 2025,
        seletedType: "Personal Leave",
      }),
      "ก.ย. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 9,
        seletedYear: 2025,
        seletedType: "Personal Leave",
      }),
      "ต.ค. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 10,
        seletedYear: 2025,
        seletedType: "Personal Leave",
      }),
      "พ.ย. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 11,
        seletedYear: 2025,
        seletedType: "Personal Leave",
      }),
      "ธ.ค. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 12,
        seletedYear: 2025,
        seletedType: "Personal Leave",
      }),
      จำนวนวันลาที่ใช้ไปแล้ว: GetTotalTimeOff({
        users: user,
        data: timeOffs,
        sortType: "Personal Leave",
        sortYear: 2025,
      }),
      จำนวนวันลาคงเหลือ: CalculatePersonalLeave({
        user: user,
        seletedYear: 2025,
        sortType: "Personal Leave",
      }),
    };
  });

  const sickExportToExcel = usersJoinTimeOff?.map((user) => {
    return {
      เลขที่พนักงาน: user?.userCode,
      ชื่อ: user?.nameTh,
      ชื่อเล่น: user?.nickNameTh,
      ทีม: user?.employeeTeams,
      "วันลาในปี 68": user?.year2025Leave?.sickLeave,
      "ม.ค. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 1,
        seletedYear: 2025,
        seletedType: "Sick Leave",
      }),
      "ก.พ. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 2,
        seletedYear: 2025,
        seletedType: "Sick Leave",
      }),
      "มี.ค. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 3,
        seletedYear: 2025,
        seletedType: "Sick Leave",
      }),
      "เม.ย. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 4,
        seletedYear: 2025,
        seletedType: "Sick Leave",
      }),
      "พ.ค. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 5,
        seletedYear: 2025,
        seletedType: "Sick Leave",
      }),
      "มิ.ย. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 6,
        seletedYear: 2025,
        seletedType: "Sick Leave",
      }),
      "ก.ค. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 7,
        seletedYear: 2025,
        seletedType: "Sick Leave",
      }),
      "ส.ค. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 8,
        seletedYear: 2025,
        seletedType: "Sick Leave",
      }),
      "ก.ย. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 9,
        seletedYear: 2025,
        seletedType: "Sick Leave",
      }),
      "ต.ค. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 10,
        seletedYear: 2025,
        seletedType: "Sick Leave",
      }),
      "พ.ย. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 11,
        seletedYear: 2025,
        seletedType: "Sick Leave",
      }),
      "ธ.ค. 68": GetTimeoffByMonth({
        timeOffRecord: user?.timeOffRecords || [],
        seletedMonth: 12,
        seletedYear: 2025,
        seletedType: "Sick Leave",
      }),
      จำนวนวันลาที่ใช้ไปแล้ว: GetTotalTimeOff({
        users: user,
        data: timeOffs,
        sortType: "Sick Leave",
        sortYear: 2025,
      }),
      จำนวนวันลาคงเหลือ: CalculateSickLeave({
        user: user,
        seletedYear: 2025,
        sortType: "Sick Leave",
      }),
    };
  });

  const handleExportExcel = () => {
    const sheets = [
      {
        sheetName: "Timeoff_Report_Vacation",
        data: vacationExportToExcel,
      },
      {
        sheetName: "Timeoff_Report_PersonalLeave",
        data: personalExportToExcel,
      },
      {
        sheetName: "Timeoff_Report_SickLeave",
        data: sickExportToExcel,
      },
    ];


    ExportExcelTimeoffReport(sheets, "Timeoff_Report");
  };

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <div className="flex justify-end items-center space-x-3">
        <button
          type="button"
          className="bg-green-100 text-green-600 hover:bg-green-600 hover:text-white py-2 px-2 rounded-lg shadow-sm flex items-center gap-2 text-sm font-normal"
          onClick={() => setSortType("Vacation")}
        >
          Vacation
        </button>
        <button
          type="button"
          className="bg-orange-100 text-orange-600 hover:bg-orange-600 hover:text-white py-2 px-2 rounded-lg shadow-sm flex items-center gap-2 text-sm font-normal"
          onClick={() => setSortType("Personal Leave")}
        >
          Personal Leave
        </button>
        <button
          type="button"
          className="bg-yellow-100 text-yellow-600 hover:bg-yellow-600 hover:text-white py-2 px-2 rounded-lg shadow-sm flex items-center gap-2 text-sm font-normal"
          onClick={() => setSortType("Sick Leave")}
        >
          Sick Leave
        </button>
      </div>
      <div className="flex justify-end items-center space-x-3 mt-3">
        <div className="relative rounded-md shadow-sm">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:text-xs a"
          />
          <div className=" bg-[#845BDF] absolute inset-y-0 right-0 flex items-center px-3 rounded-e-md">
            <GoSearch className="text-white" size={13} />
          </div>
        </div>
        <div>
          <button
            onClick={handleExportExcel}
            className="bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white py-2 px-2 rounded-lg shadow-sm flex items-center gap-2 text-sm font-normal transition-all"
          >
            Excel Report
          </button>
        </div>
      </div>

      <div className="mt-5">
        <div className="px-2">
          <h5 className="text-xl font-semibold">{sortType}</h5>
          <p className="text-sm text-gray-500">2025</p>
        </div>
        <table className="w-full table-auto mt-3">
          <thead>
            <tr className="*:border *:font-light text-xs">
              <th className="min-w-lg max-w-xl text-left px-3 py-1">Users</th>
              {sortType === "Vacation" ? (
                <th className="w-14">2025 Leave</th>
              ) : null}
              <th className="w-14">{sortType} totals</th>
              <th className="w-14">Jan</th>
              <th className="w-14">Feb</th>
              <th className="w-14">Mar</th>
              <th className="w-14">Apr</th>
              <th className="w-14">May</th>
              <th className="w-14">June</th>
              <th className="w-14">July</th>
              <th className="w-14">Aug</th>
              <th className="w-14">Sep</th>
              <th className="w-14">Oct</th>
              <th className="w-14">Nov</th>
              <th className="w-14">Dec</th>
              <th className="w-14">{sortType} use</th>
              <th className="w-14">{sortType} balance</th>
            </tr>
          </thead>
          <tbody>
            {queryUsers?.map((user: UsersType, index: number) => (
              <tr key={index} className="text-center *:border *:text-xs">
                <td className="text-left px-3 py-1 w-60 ">{user?.nameEng}</td>
                {sortType === "Vacation" ? (
                  <td>
                    <GetLeave2025 users={user} sortType={sortType} />
                  </td>
                ) : null}
                <td className="px-3 py-1">
                  {sortType === "Vacation" ? (
                    <CalculateTotalLeave
                      sortType={sortType}
                      user={user}
                      seletedYear={2025}
                    />
                  ) : sortType === "Personal Leave" ? (
                    user?.year2025Leave?.personalLeave
                  ) : sortType === "Sick Leave" ? (
                    user?.year2025Leave?.sickLeave
                  ) : null}
                </td>
                {numberMonth.map((month, index) => (
                  <td key={index} className="px-3 py-1">
                    <div className="relative group">
                      <p
                        className={`
                            ${
                              sortType === "Vacation"
                                ? "bg-green-100 text-green-600"
                                : sortType === "Personal Leave"
                                ? "bg-orange-100 text-orange-600"
                                : sortType === "Sick Leave"
                                ? "bg-yellow-100 text-yellow-600"
                                : ""
                            } 
                            rounded-md
                          `}
                      >
                        <GetMonthTimeOff
                          id={user?._id}
                          month={month}
                          data={timeOffs}
                          sortType={sortType}
                          sortYear={sortYear}
                        />
                      </p>
                      <div className="absolute z-10 invisible group-hover:visible bg-gray-800 text-white text-xs rounded p-2 -mt-2 -ml-2 min-w-[200px]">
                        <TextBoxReportTimeOff
                          id={user?._id}
                          month={month}
                          sortType={sortType}
                          sortYear={sortYear}
                          timeoffs={timeOffs}
                        />
                      </div>
                    </div>
                  </td>
                ))}
                <td className="px-3 py-1">
                  <p className="bg-violet-100 text-violet-600 rounded-md">
                    <GetTotalTimeOff
                      sortType={sortType}
                      data={timeOffs}
                      users={user}
                      sortYear={sortYear}
                    />
                  </p>
                </td>
                <td className="px-3 py-1">
                  <p className="bg-cyan-100 text-cyan-600 rounded-md">
                    {sortType === "Vacation" ? (
                      <CalculateVacationLeave
                        sortType={sortType}
                        user={user}
                        seletedYear={sortYear}
                      />
                    ) : sortType === "Personal Leave" ? (
                      <CalculatePersonalLeave
                        sortType={sortType}
                        user={user}
                        seletedYear={sortYear}
                      />
                    ) : sortType === "Sick Leave" ? (
                      <CalculateSickLeave
                        sortType={sortType}
                        user={user}
                        seletedYear={sortYear}
                      />
                    ) : null}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableReportTimeOff2025;
