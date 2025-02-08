import React,{useState} from "react";
import Pagination from "@/app/components/Pagination";
import { paginate } from "@/app/helpers/paginate";

import { useUsers } from "@/app/services/queries";

import Image from "next/image";
import Avatar from "../../../../public/avataricon.png";


function TimerTable() {
const { data, isLoading, isValidating, error } = useUsers();
  const users = data?.totalUsers;
  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 10;

  const paginatedUsers = paginate(users, pageIndex, pageSize);

  const onPageChange = (page) => {
    setPageIndex(page);
  };
  return (
    <>
      <table className=" table-auto text-left mt-5 min-w-full md:table-fixed">
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
          {paginatedUsers.map((val, index) => (
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
                      src={Avatar}
                      width={50}
                      height={0}
                      className="rounded-full h-10 w-10 ring-2  ring-white object-cover"
                      alt="avatar"
                    />
                  </div>
                  <div className="truncate ...">
                    <a
                      href={`/users/timer/view/${val?._id}`}
                      className="text-sm text-blue-500 font-medium"
                    >
                      {val?.nameEng}
                    </a>
                    <p className="text-xs text-gray-400 ">
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
          {/* {users?.map((val, index) => (
                  
                ))} */}
        </tbody>
      </table>
      <div className="flex justify-end mt-5">
        <Pagination
          items={users.length}
          pageIndex={pageIndex}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
}

export default TimerTable;
