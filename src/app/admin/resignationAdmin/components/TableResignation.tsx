"use client";

import Loading from "@/app/loading";
import { useResignations } from "@/app/services/queries";
// import OptionActionTableResignation from "@/app/admin/resignationAdmin/components/OptionActionTableResignation";
import { ResignationType } from "@/interfaces/Resignation";
import React from "react";
import AlertNoneData from "@/app/components/AlertNoneData";
import ProfileTitleName from "@/app/components/ProfileTitleName";

import DropdownSelete from "./ResignDropdownSelete";

function TableResignation() {
  const { data: resignations, isLoading, error } = useResignations();

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return resignations?.length > 0 ? (
    <div className="overflow-x-auto">
      <table className="table-auto border-separate border-spacing-y-2 w-full text-sm">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">User</th>
            <th scope="col">Reason</th>
            <th scope="col">End Date</th>
            <th scope="col">Status</th>
            <th scope="col">{}</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {resignations?.map((resignation: ResignationType, index: number) => (
            <tr
              key={index}
              className="bg-white even:bg-gray-50 odd:bg-white h-12 text-center"
            >
              <td className="rounded-l-lg">{index + 1}</td>
              <td className="">
                <ProfileTitleName
                  employeeId={resignation?.userRequestResign?.id}
                  profile={resignation.userRequestResign?.employeeProfile}
                  name={resignation.userRequestResign?.nameEng}
                  title={resignation.userRequestResign?.employeeTitle}
                />
              </td>
              <td className="truncate max-w-40 min-w-32">
                {resignation?.note}
              </td>
              <td>
                {new Date(resignation?.effectiveDate).toLocaleDateString()}
              </td>

              <td className={``}>
                <p
                  className={`${
                    resignation?.status === "Approved"
                      ? "text-green-500 bg-green-100"
                      : resignation?.status === "Rejected"
                      ? "text-red-500 bg-red-100"
                      : "text-yellow-500 bg-yellow-100"
                  } rounded-lg text-xs font-semibold rounded-r-lg px-2 py-1`}
                >
                  {resignation?.status}
                </p>
              </td>
              <td className="">
                <DropdownSelete resignation={resignation} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <AlertNoneData />
  );
}

export default TableResignation;
