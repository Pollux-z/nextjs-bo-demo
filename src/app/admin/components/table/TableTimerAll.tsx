import React, { useState } from "react";
import Link from "next/link";

import Pagination from "@/app/components/Pagination";
import { paginate } from "@/app/helpers/paginate";

import { useUsers, useUsersAll } from "@/app/services/queries";
import ProfileTitleName from "@/app/components/ProfileTitleName";
import Image from "next/image";
import Avatar from "../../../../../public/avataricon.png";
import Loading from "@/app/loading";
import Error from "@/app/Error";
import { UsersType } from "@/interfaces/User";

type TableTimerAllType = {
  searchQuery: string
}

 const TableTimerAll: React.FC<TableTimerAllType> = ({ searchQuery }) => {
  const { data: getUsersAll, isLoading, isValidating, error } = useUsersAll();
  const users = getUsersAll?.totalUsers;

  const searchInput = searchQuery.toLowerCase();
  const filterUser = users?.filter(
    (val: UsersType) =>
      val?.nameEng.toLowerCase().includes(searchInput) ||
      val?.nameTh.toLowerCase().includes(searchInput) ||
      val?.nickNameTh.toLowerCase().includes(searchInput) ||
      val?.employeeTitle.toLowerCase().includes(searchInput)
  );

  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 50;

  const paginatedUsers = paginate(filterUser, pageIndex, pageSize);

  const onPageChange = (page: number) => {
    setPageIndex(page);
  };

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <table className="table-auto w-full text-left mt-5 ">
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
          {paginatedUsers?.map((val: UsersType, index: number) => (
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
                  {/* <BtnDelete /> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-3">
        <Pagination
          items={filterUser?.length}
          pageIndex={pageIndex}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
}

export default TableTimerAll