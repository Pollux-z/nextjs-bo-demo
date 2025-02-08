"use client";

import React, { ReactNode, useEffect, useState } from "react";
import BtnDelete from "./BtnDelete";
import BtnEdit from "./BtnEdit";
import { useSession } from "next-auth/react";

import { CiFileOn, CiFileOff } from "react-icons/ci";
import { Announcement } from "@/interfaces/Announcement";

type TableAnnouncementType = {
  btnCreate: ReactNode
  announcementData: Array<Announcement>
}

const TableAnnouncement: React.FC<TableAnnouncementType> = ({ btnCreate, announcementData }) => {
  const { data: session } = useSession();
  const roleSession = session?.user?.role;

  console.log(announcementData)

  return (
    <>
      <div className="bg-white w-full rounded-md py-7 px-5 mt-5 shadow-md">
        <div className="">
          <div className="flex justify-between">
            <h3 className="text-lg font-bold">Announcement details</h3>
            {btnCreate ? btnCreate : undefined}
          </div>
          {announcementData && announcementData.length > 0 ? (
            <table className="table-auto w-full text-left mt-5">
              <thead className="border-b">
                <tr className="*:py-3 *:px-3 *:font-normal text-sm">
                  <th className="rounded-s-md">ID</th>
                  <th className="">Date</th>
                  <th className="">Subject</th>
                  <th className="">By</th>
                  <th>File</th>
                  {roleSession != "User" && (
                    <th className="rounded-e-md text-center">Status</th>
                  )}
                </tr>
              </thead>
              <tbody className="text-sm">
                {announcementData.map((val, index) => (
                  <tr
                    key={index}
                    className="text-xs odd:bg-white even:bg-slate-50 *:h-14 *:px-3"
                  >
                    <td className="">TIME-2024/{val?.id}</td>
                    <td className="">{val?.issueDate}</td>
                    <td className="">{val?.subject}</td>
                    <td className="">{val?.userCreate}</td>
                    <td className="" >
                      <a
                        href={val?.attachFile}
                        target="blank"
                        className={!val?.attachFile ? "pointer-events-none" : undefined}
                      >
                        {val?.attachFile ? (
                          <CiFileOn
                            size={28}
                            className="p-1 bg-blue-100 text-blue-600 rounded-full"
                          /> 
                        ) : (
                          <CiFileOff
                            size={28}
                            className="p-1 bg-gray-200 text-gray-600 rounded-full"
                          />
                        )}
                      </a>
                    </td>
                    {roleSession != "User" && (
                      <td className="text-center flex justify-center items-center">
                        <BtnEdit id={val?._id} />
                        <BtnDelete id={val?._id} />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <>
              <p>No data</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default TableAnnouncement;
