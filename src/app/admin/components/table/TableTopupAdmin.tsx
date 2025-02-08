"use client";

import { useTimeOffJoinUsers, useTopUps, useTopUpsJoinEmployees } from "@/app/services/queries";
import React from "react";
import { TopUpType } from "@/interfaces/TopUp";
import Loading from "@/app/loading";

import { FaAnglesUp, FaAnglesDown } from "react-icons/fa6";
import ProfileTitleName from "@/app/components/ProfileTitleName";
import { TimeOff } from "@/interfaces/TimeOff";
import CalculateTopupVacationLeave from "../../topupAdmin/components/CalculateTopupVacation";

const TableTopupAdmin = () => {
  const { data: getTopup } = useTopUpsJoinEmployees();
  const topups: TopUpType[] = getTopup?.topups;

  const { data: getTimeOffs, isLoading, error } = useTimeOffJoinUsers();
  const TimeOffs: TimeOff[] = getTimeOffs?.timeOff;

  if (isLoading) return <Loading />;
  if (error) return <div>error</div>

  return (
    <>
      <table className="table-auto w-full text-left mt-5 ">
        <thead className="border-b">
          <tr className="*:py-3 *:px-3 *:font-bold text-sm">
            <th className="rounded-s-md w-1/12">ID</th>
            <th className="w-4/12">Name / Title</th>
            <th className="w-2/12 text-center">Type</th>
            <th className="w-1/12 text-center">Topup Date</th>
            <th className="w-1/12 text-center">Vacation Balance</th>
            <th className="text-center ">Remark</th>
          </tr>
        </thead>
        <tbody className="">
          {topups?.map((topup , index: number) => (
            <tr
              key={index}
              className="odd:bg-white even:bg-slate-50 *:px-3 text-xs *:h-16"
            >
              <td className="min-w-24 max-w-32">{topup.id}</td>
              <td className="max-w-80">
                <ProfileTitleName 
                employeeId={topup.employee_info._id}
                profile={topup.employee_info.employeeProfile}
                name={topup.employee_info.nameEng}
                title={topup.employee_info.employeeTitle}
                />
              </td>
              <td>
                {topup.type === "increase" ? (
                  <div className="flex items-center gap-2 bg-green-600 justify-center p-1 text-center rounded-md shadow-md text-white">
                    <FaAnglesUp />
                    <p>Increase</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 bg-red-600 justify-center p-1 text-center rounded-md shadow-md text-white">
                    <FaAnglesDown />
                    <p>
                      Decrease
                    </p>
                  </div>
                )}
              </td>
              <td className="text-center">{topup.topUpDay}</td>
              <td className="text-center text-red-600">
                <CalculateTopupVacationLeave
                  userId={topup.employee}
                  sortType="Vacation"
                  seletedYear={2025}
                />
              </td>
              <td className="text-center">{topup.remark}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TableTopupAdmin;
