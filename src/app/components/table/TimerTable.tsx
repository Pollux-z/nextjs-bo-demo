import React, { useState } from "react";
import Pagination from "@/app/components/Pagination";
import { paginate } from "@/app/helpers/paginate";

import { useUsers } from "@/app/services/queries";

import Image from "next/image";
import Avatar from "../../../../public/avataricon.png";
import { UsersType } from "@/interfaces/User";
import Loading from "@/app/loading";

type TableTimerProps = {
  searchQuery: string;
  searchQueryTeam: string;
  searchQueryTitle: string;
};

const TableTimer: React.FC<TableTimerProps> = ({
  searchQuery,
  searchQueryTeam,
  searchQueryTitle,
}) => {
  const { data: getUsers, isLoading, isValidating, error } = useUsers();
  const users: UsersType[] = getUsers?.totalUsers;
  const searchInput = searchQuery.toLowerCase();
  const filterUser = users?.filter((user) => {
    const isValueMatchNameEng = user?.nameEng
      .toLowerCase()
      .includes(searchInput);

    const isValueMatchNameTh = user?.nameTh.toLowerCase().includes(searchInput);

    const isValueMatchNickNameTh = user?.nickNameTh
      .toLowerCase()
      .includes(searchInput);

    const isValueMatchTeam = user?.employeeTeams
      ?.toLowerCase()
      .includes(searchQueryTeam.toLowerCase());

      const isValueMatchTitle = user?.employeeTitle
      ?.toLowerCase() == searchQueryTitle.toLowerCase();
      
    if (!searchQuery && !searchQueryTeam && !searchQueryTitle) return user;

    if (searchQuery && !searchQueryTeam && !searchQueryTitle)
      return (
        isValueMatchNameEng || isValueMatchNameTh || isValueMatchNickNameTh
      );
      
    if (!searchQuery && searchQueryTeam && !searchQueryTitle) return isValueMatchTeam;

    if (!searchQuery && !searchQueryTeam && searchQueryTitle) return isValueMatchTitle;

    if (!searchQuery && searchQueryTeam && searchQueryTitle) return isValueMatchTeam && isValueMatchTitle;

    return (
      (isValueMatchNameEng || isValueMatchNameTh || isValueMatchNickNameTh) &&
      (isValueMatchTeam && isValueMatchTitle)
    );
  });

  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 20;

  const paginatedUsers: UsersType[] = paginate(filterUser, pageIndex, pageSize);

  const onPageChange = (page: number) => {
    setPageIndex(page);
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error</div>;

  return (
    <>
      <div className="">
        <table className="table-auto text-left mt-5 w-full">
          <thead className="border-b">
            <tr className="*:py-3 *:px-3 *:font-normal text-sm">
              <th className="rounded-s-md">ID</th>
              <th className="">Name / Title</th>
              <th className="">Email</th>
              <th className="">Tel</th>
              <th className="">Team</th>
            </tr>
          </thead>
          <tbody className="">
            {paginatedUsers?.map((val, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-slate-50 *:px-3 text-xs *:h-16"
              >
                <td className="">
                  {val?.userCode < 10
                    ? `TIME00${val?.userCode}`
                    : val?.userCode < 100
                    ? `TIME0${val?.userCode}`
                    : `TIME${val?.userCode}`}
                </td>
                <td className="">
                  <div className="group flex md:inline-flex items-center gap-2 ">
                    <div>
                      <Image
                        src={
                          val?.employeeProfile ? val?.employeeProfile : Avatar
                        }
                        width={50}
                        height={0}
                        className="rounded-full h-10 w-10 ring-2  ring-white object-cover"
                        alt="avatar"
                      />
                    </div>
                    <div className="truncate ...">
                      <a
                        href={`/users/timer/view/${val?._id}`}
                        className="text-sm text-blue-500 "
                      >
                        {val?.nameEng} ({val?.nickNameTh})
                      </a>
                      <p className="text-xs text-gray-400 truncate ... max-w-80">
                        {val?.employeeTitle}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="">
                  <p className="truncate ...">{val?.employeeEmail}</p>
                </td>
                <td className="">{val?.employeeTel}</td>
                <td>{val?.employeeTeams}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
};

export default TableTimer;
