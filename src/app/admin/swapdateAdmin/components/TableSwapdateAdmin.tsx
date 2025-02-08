"use client";

import AlertNoneData from "@/app/components/AlertNoneData";
import FormatDateSimple from "@/app/components/FormatDateSimple";
import ProfileNameTitle from "@/app/components/ProfileNameTitle";
import StyleStatus from "@/app/components/StyleStatus";
import Error from "@/app/Error";
import Loading from "@/app/loading";
import { useSwapDateJoinEmployee, useSwapDates } from "@/app/services/queries";
import BtnDeleteSwapDate from "@/app/users/swapdate/components/BtnDeleteSwapDate";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";

import Pagination from "@/app/components/Pagination";
import { paginate } from "@/app/helpers/paginate";
import SearchNotFound from "@/app/components/SearchNotFound";

import { RiExpandUpDownLine } from "react-icons/ri";
import ProfileTitleName from "@/app/components/ProfileTitleName";
import { SwapDateType } from "@/interfaces/SwapDate";

type SortConfig = {
  key: any; // Replace 'data' with the name of your actual dataset
  direction: "asc" | "desc" | string; // Restrict direction to "asc" or "desc"
};

type TableSwapdateAdminType = {
  searchQuery: string;
  searchMonth: string;
};

const TableSwapdateAdmin: React.FC<TableSwapdateAdminType> = ({
  searchQuery,
  searchMonth,
}) => {
  const {
    data: getSwapDates,
    isLoading,
    isValidating,
    error,
  } = useSwapDateJoinEmployee();

  const swapDates = getSwapDates?.swapdate;

  const targetMonth = Number(searchMonth);

  const QuerySerach = swapDates?.filter((swapDate: SwapDateType) => {
    const isIssueDate = swapDate?.swapDate?.some((dateIssue) => {
      const date = new Date(dateIssue);
      return date.getMonth() + 1 === targetMonth;
    });

    const isValueMatchNameEng = swapDate?.employee_info?.nameEng
      .toLowerCase()
      .includes(searchQuery);

    const isValueMatchNameTh = swapDate?.employee_info?.nameTh
      .toLowerCase()
      .includes(searchQuery);

    const isValueMatchNickNameTh = swapDate?.employee_info?.nickNameTh
      .toLowerCase()
      .includes(searchQuery);

    const isValueMatchTitle = swapDate?.employee_info?.employeeTitle
      .toLowerCase()
      .includes(searchQuery);

    if (!searchMonth) {
      return (
        isValueMatchNameEng ||
        isValueMatchNameTh ||
        isValueMatchNickNameTh ||
        isValueMatchTitle
      );
    }

    return (
      isIssueDate &&
      (isValueMatchNameEng ||
        isValueMatchNameTh ||
        isValueMatchNickNameTh ||
        isValueMatchTitle)
    );
  });

  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 50;

  const paginatedSwapDate = paginate(QuerySerach, pageIndex, pageSize);

  const onPageChange = (page: number) => {
    setPageIndex(page);
  };

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });

  if (sortConfig.key) {
    swapDates?.sort((a: any, b: any) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }

  const requestSort = (key: any) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  if (isLoading) return <Loading />;
  if (error) return <Error />;
  return (
    <div>
      {QuerySerach.length > 0 ? (
        <>
          <table className="table-auto w-full text-left">
            <thead className="border-b">
              <tr className="*:py-3 *:px-3 *:font-normal text-xs">
                <th>
                  <p className="flex items-center gap-1">
                    ID
                    <RiExpandUpDownLine
                      onClick={() => requestSort("id")}
                      className=" cursor-pointer"
                    />
                  </p>
                </th>
                <th className="p-2">
                  <p className="flex items-center gap-1">
                    User Request
                    <RiExpandUpDownLine
                      onClick={() => requestSort("employee_info.nameEng")}
                      className=" cursor-pointer"
                    />
                  </p>
                </th>
                <th className="p-2">
                  <p className="flex items-center gap-1">
                    Project
                    <RiExpandUpDownLine
                      onClick={() => requestSort("projectAction")}
                      className=" cursor-pointer"
                    />
                  </p>
                </th>
                <th className="p-2">Action Date</th>
                <th className="p-2">Swap Date</th>
                <th className="p-2 text-center">
                  <p>Status</p>
                </th>
                <th className="p-2 text-center">Remake</th>
                <th className="p-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {paginatedSwapDate?.map((swapDate: SwapDateType, index: number) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-slate-50 *:px-2 text-xs *:h-14"
                >
                  <td>{swapDate.id}</td>
                  <td className="max-w-72">
                    <ProfileTitleName
                      employeeId={swapDate?.employee_info?._id}
                      profile={swapDate?.employee_info?.employeeProfile}
                      name={swapDate?.employee_info?.nameEng}
                      title={swapDate?.employee_info?.employeeTitle}
                    />
                    {/* <ProfileNameTitle data={i?.employee} /> */}
                  </td>
                  <td>TIME-{swapDate?.projectAction}</td>
                  <td>
                    {swapDate?.actionDate?.map((action, index) => (
                      <p key={index}>
                        <FormatDateSimple dateData={action} />
                      </p>
                    ))}
                  </td>
                  <td>
                    {swapDate?.swapDate && swapDate?.swapDate.length > 0 ? (
                      swapDate?.swapDate.map((swapDate, index) => (
                        <p key={index}>
                          {swapDate && <FormatDateSimple dateData={swapDate} />}
                        </p>
                      ))
                    ) : (
                      <>
                        <p className="text-red-600 bg-red-100 w-20 text-center p-1 rounded-md shadow-sm">
                          Tentative
                        </p>
                      </>
                    )}
                  </td>
                  <td>
                    <StyleStatus data={swapDate?.status} />
                  </td>
                  <td className="p-2">
                    <p className="text-center">{swapDate?.remark}</p>
                  </td>
                  <td className="flex justify-center items-center gap-1">
                    <a 
                    title="swapdateLink"
                    href={`/admin/swapdateAdmin/edit/${swapDate?._id}`}>
                      <CiEdit
                        size={18}
                        className="p-0.5 bg-blue-100 text-blue-600 rounded-full"
                      />
                    </a>
                    <BtnDeleteSwapDate id={swapDate?._id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-5">
            <Pagination
              items={QuerySerach?.length}
              pageIndex={pageIndex}
              pageSize={pageSize}
              onPageChange={onPageChange}
            />
          </div>
        </>
      ) : (
        <SearchNotFound />
      )}
    </div>
  );
};

export default TableSwapdateAdmin;
