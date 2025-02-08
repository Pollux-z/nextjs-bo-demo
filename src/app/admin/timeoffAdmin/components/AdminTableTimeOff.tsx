import { useTimeOffJoinUsers, useTimeOffs } from "@/app/services/queries";
import React, { useState } from "react";

import Pagination from "@/app/components/Pagination";
import { paginate } from "@/app/helpers/paginate";

import ProfileNameTitle from "@/app/components/ProfileNameTitle";
import FormatDateTimeOff from "@/app/components/FormatDateTimeOff";
import StyleStatus from "@/app/components/StyleStatus";
import DropdownOption from "./DropdownOption";
import Loading from "@/app/loading";
import Error from "@/app/Error";
import SearchNotFound from "../../components/SearchNotFound";
import ProfileTitleName from "@/app/components/ProfileTitleName";
import { format } from "date-fns";
import { TimeOff } from "@/interfaces/TimeOff";

type AdminTableTimeOffType = {
  searchQuery: string;
  searchMonth: string;
  searchStatus: string;
  // searchYear: string;
};

const AdminTableTimeOff = ({
  searchQuery,
  searchMonth,
  searchStatus,
  // searchYear,
}: AdminTableTimeOffType) => {
  const {
    data: getTimeOffs,
    isLoading,
    isValidating,
    error,
  } = useTimeOffJoinUsers();
  const timeOffs = getTimeOffs?.timeOff;

  const QuerySerach = timeOffs?.filter((timeOff: TimeOff) => {
    // const isIssueYear = timeOff.issueDate.find((dateIssue) => {
    //   const date = new Date(dateIssue);
    //   const formateDate = format(date, "yyyy");
    //   return formateDate === searchYear;
    // });

    const isIssueDate = timeOff.issueDate.some((dateIssue) => {
      const date = new Date(dateIssue);
      const formateDate = format(date, "MMMM");
      return formateDate === searchMonth;
    });

    const isValueMatchIssueDate = timeOff.issueDate.some((dateIssue) => {
      const date = new Date(dateIssue);
      const formattedDate = format(date, "ddMMyyyy");
      return formattedDate.includes(searchQuery);
    });

    const isValueMatchNameEng = timeOff?.employee_info?.nameEng
      .toLowerCase()
      .includes(searchQuery);

    const isValueMatchNameTh = timeOff?.employee_info?.nameTh
      .toLowerCase()
      .includes(searchQuery);

    const isValueMatchNickNameTh = timeOff?.employee_info?.nickNameTh
      .toLowerCase()
      .includes(searchQuery);

    const isValueMatchTitle = timeOff?.employee_info?.employeeTitle
      .toLowerCase()
      .includes(searchQuery);

    const isValueMatchStatus = timeOff?.status.includes(searchStatus);

    if (!searchMonth && !searchStatus) {
      return (
        isValueMatchNameEng ||
        isValueMatchNameTh ||
        isValueMatchNickNameTh ||
        isValueMatchTitle ||
        isValueMatchIssueDate
      );
    }

    if (searchStatus && !searchMonth) {
      return (
        (isValueMatchNameEng ||
          isValueMatchNameTh ||
          isValueMatchNickNameTh ||
          isValueMatchTitle ||
          isValueMatchIssueDate) &&
        isValueMatchStatus
      );
    }

    return (
      isValueMatchStatus &&
      isIssueDate &&
      (isValueMatchNameEng ||
        isValueMatchNameTh ||
        isValueMatchNickNameTh ||
        isValueMatchTitle ||
        isValueMatchIssueDate)
    );
  });

  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 50;

  const paginatedTimeOff = paginate(QuerySerach, pageIndex, pageSize);

  const onPageChange = (page: number) => {
    setPageIndex(page);
  };

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      {QuerySerach.length > 0 ? (
        <div className="mt-5">
          <div className="text-sm flex justify-end"></div>
          <div className="flex justify-between mt-3">
            <p className="bg-gray-500 text-gray-100 px-2 py-2 rounded-md opacity-70 text-sm">
              Total {QuerySerach?.length} Records
            </p>
            <Pagination
              items={QuerySerach?.length}
              pageIndex={pageIndex}
              pageSize={pageSize}
              onPageChange={onPageChange}
            />
          </div>
          <div className="overflow-x-auto mt-5">
            <table className="table-auto text-left min-w-full md:table-fixed">
              <thead className="border-b">
                <tr className="*:py-3 *:px-3 *:font-normal text-xs">
                  <th className="">ID</th>
                  <th className="">Name / Title</th>
                  <th className="text-center">Create date</th>
                  <th className="">Type</th>
                  <th className="">Reason</th>
                  <th className="text-center">Leave date</th>
                  <th className="text-center">Status</th>
                  <th className="text-center"></th>
                </tr>
              </thead>
              <tbody>
                {paginatedTimeOff?.map((i: TimeOff, index: number) => (
                  <tr
                    key={index}
                    className="odd:bg-white even:bg-slate-50 *:px-3 text-xs *:h-16"
                  >
                    <td>{i.id}</td>
                    <td className="">
                      <ProfileTitleName
                        employeeId={i?.employee_info._id}
                        profile={i?.employee_info.employeeProfile}
                        name={i?.employee_info.nameEng}
                        title={i?.employee_info.employeeTitle}
                      />
                      {/* <ProfileNameTitle data={i.employee_info._id} /> */}
                    </td>
                    <td className="min-w-28 max-w-36">
                      <p className="bg-gray-100 text-center rounded-md shadow-sm p-0.5 ">
                        <FormatDateTimeOff
                          dateData={i?.createdAt.split("T")[0]}
                        />
                      </p>
                    </td>
                    <td>
                      <p>{i?.type}</p>
                      <p className="text-gray-400 font-light">
                        {i?.halfDay === "haftMorning"
                          ? "Half-day morning"
                          : i?.halfDay === "haftAfternoon"
                          ? "Half-day afternoon"
                          : "Full day"}
                      </p>
                    </td>
                    <td>{i?.reason}</td>
                    <td className="w-28">
                      {i?.issueDate?.map((j, index) => (
                        <p key={index} className="text-center">
                          <FormatDateTimeOff dateData={j} />
                        </p>
                      ))}
                    </td>

                    <td>
                      <StyleStatus data={i?.status} />
                    </td>
                    <td>
                      <DropdownOption id={i?._id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mt-5">
            <Pagination
              items={QuerySerach?.length}
              pageIndex={pageIndex}
              pageSize={pageSize}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      ) : undefined}
    </>
  );
};

export default AdminTableTimeOff;
