"use client";

import React from "react";
import { useSession } from "next-auth/react";

import { CiFileOn, CiFileOff } from "react-icons/ci";
import { Announcement } from "@/interfaces/Announcement";

function TableAnnouncement({
  announcementData,
}: {
  announcementData: Array<Announcement>;
}) {
  const { data: session } = useSession();
  const roleSession = session?.user?.role;

  const announcementId = (createDate: string, idAnnouncement: number) => {
    const yearId = createDate.slice(0, 4);
    const fontId = idAnnouncement.toString().padStart(2, "0");
    return <p>{`TIME-${yearId}/${fontId}`}</p>;
  };
  
  return (
    <>
      <div className="bg-white w-full rounded-md py-7 px-5 mt-5 shadow-md">
        <div className="">
          <div className="flex justify-between">
            <h3 className="text-lg font-bold">Announcement details</h3>
          </div>
          {announcementData && announcementData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left mt-5">
                <thead className="border-b">
                  <tr className="*:py-3 *:px-3 *:font-normal text-sm">
                    <th className="rounded-s-md min-w-28">ID</th>
                    <th className="min-w-28">Date</th>
                    <th className="">Subject</th>
                    <th className="">By</th>
                    <th>File</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {announcementData.map(
                    (announcement: Announcement, index: number) => (
                      <tr
                        key={index}
                        className="text-xs odd:bg-white even:bg-slate-50 *:h-14 *:px-3"
                      >
                        <td className="">
                          {announcementId(
                            announcement.createdAt,
                            announcement.id
                          )}
                        </td>
                        <td className="">{announcement?.issueDate}</td>
                        <td className="">{announcement?.subject}</td>
                        <td className="">{announcement?.userCreate}</td>
                        <td className="">
                          <a
                            href={announcement?.attachFile}
                            target="blank"
                            className={
                              !announcement?.attachFile
                                ? "pointer-events-none"
                                : undefined
                            }
                          >
                            {announcement?.attachFile ? ( 
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
                          <td className="text-center flex justify-center items-center"></td>
                        )}
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
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
