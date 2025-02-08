import React, { useState } from "react";
import Image from "next/image";

import Pagination from "@/app/components/Pagination";
import { paginate } from "@/app/helpers/paginate";

import BtnView from "./BtnView";
import BtnDelete from "./BtnDelete";
import ProfileNameTitle from "@/app/components/ProfileNameTitle";
import ProfileTitleName from "@/app/components/ProfileTitleName";
import Link from "next/link";
import { useUsers } from "@/app/services/queries";
import { UsersType } from "@/interfaces/User";

type TableTimerType = {
  searchQuery: string;
  usersData: Array<UsersType>;
};

const TableTimer: React.FC<TableTimerType> = ({ usersData, searchQuery }) => {
  const { data, isLoading, isValidating, error } = useUsers();
  const users = data?.totalUsers;

  const searchInput = searchQuery.toLowerCase();
  const filterUser = users?.filter(
    (user: UsersType) =>
      user?.nameEng.toLowerCase().includes(searchInput) ||
      user?.nameTh.toLowerCase().includes(searchInput) ||
      user?.nickNameTh.toLowerCase().includes(searchInput) ||
      user?.employeeTitle.toLowerCase().includes(searchInput)
  );

  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 20;

  const paginatedUsers = paginate(filterUser, pageIndex, pageSize);

  const onPageChange = (page: any) => {
    setPageIndex(page);
  };

  return (
    <>
      <div className="bg-white w-full rounded-md py-5 px-5 mt-5">
        <div className="flex justify-between items-center">
          <div>
            <h3>Detail</h3>
          </div>
        </div>
        {usersData && usersData.length > 0 ? (
          <>
          <div className="overflow-x-auto">
          <table className="table-auto w-full text-left mt-5">
              <thead className="border-b">
                <tr className="*:py-3 *:px-3 *:font-normal text-sm">
                  <th className="rounded-s-md">ID</th>
                  <th className="">Name / Title</th>
                  <th className="">Email</th>
                  <th className="">Tel</th>
                  <th className="">Team</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody className="">
                {paginatedUsers.map((val: UsersType, index: number) => (
                  <tr
                    key={index}
                    className="odd:bg-white even:bg-slate-50 *:px-3 text-xs *:h-16"
                  >
                    <td className="min-w-24 max-w-32">
                      TIME-
                      {val?.userCode < 10
                        ? `00${val?.userCode}`
                        : val?.userCode < 100
                        ? `0${val?.userCode}`
                        : val?.userCode}
                    </td>
                    <td className="max-w-80">
                      <ProfileTitleName
                        employeeId={val?._id}
                        profile={val?.employeeProfile}
                        name={val?.nameEng}
                        title={val?.employeeTitle}
                      />
                    </td>
                    <td className="">{val?.employeeEmail}</td>
                    <td className="">{val?.employeeTel}</td>
                    <td>{val?.employeeTeams}</td>
                    <td className="text-center">
                      <div className="group flex justify-center items-center">
                        {/* <BtnView id={val?._id} /> */}
                        <Link
                          className="bg-green-500 text-white px-2 py-1 rounded-md shadow-md  text-xs"
                          href={`/admin/timerAdmin/edit/${val?._id}`}
                        >
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
            
            <div className="flex justify-end mt-3">
              <Pagination
                items={filterUser.length}
                pageIndex={pageIndex}
                pageSize={pageSize}
                onPageChange={onPageChange}
              />
            </div>
          </>
        ) : (
          <p>No data</p>
        )}
      </div>
    </>
  );
};

export default TableTimer;
