"use client";
import React, { useEffect, useState } from "react";
import MonthlyFilter from "@/app/components/MonthlyFilter";
import { useSession } from "next-auth/react";
import BtnCreate from "@/app/components/button/BtnCreate";
import BtnEdit from "./BtnEdit";
import { redirect } from "next/navigation";
import { useCoverLetters, useProjects } from "@/app/services/queries";

// Pagination function
import Pagination from "@/app/components/Pagination";
import { paginate } from "@/app/helpers/paginate";

import { CiFileOn } from "react-icons/ci";
import Loading from "@/app/loading";
import FilterProjectName from "@/app/components/FilterProjectName";
import FilterYearID from "../../../components/FilterYearID";
import { CoverletterType } from "@/interfaces/Coverletter";

type TableCoverletterType = {
  searchQuery: string;
};

const TableCoverletter: React.FC<TableCoverletterType> = ({ searchQuery }) => {

  // TODO: Mactch to user for fast render and can edit when user create it item.
  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 50;

  const onPageChange = (page: number) => {
    setPageIndex(page);
  };

  const {
    data: getCoverletter,
    isLoading,
    isValidating,
    error,
  } = useCoverLetters();
  const coverletters: CoverletterType[] = getCoverletter?.totalCoverletter;

  const searchQueryCoverLetter = coverletters?.filter((coverletter) => 
    coverletter.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coverletter.id.toString().includes(searchQuery.toLowerCase()) ||
    coverletter.userCreate.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const paginateCoverLetter: CoverletterType[] = paginate(
    searchQueryCoverLetter,
    pageIndex,
    pageSize
  );

  if (isLoading) return <Loading />;
  if (error)
    return (
      <>
        <p>Error loading....</p>
      </>
    );

  return (
    <>
      <div className="overflow-x-auto">
        {paginateCoverLetter && paginateCoverLetter.length > 0 ? (
          <>
            <table className="table-auto w-full text-left">
              <thead className="border-b">
                <tr className="*:py-3 *:px-3 *:font-normal text-sm">
                  <th className="">ID</th>
                  <th className="">Date</th>
                  <th className="">Title</th>
                  <th className="">File</th>
                  <th className="text-center">By</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {paginateCoverLetter.map((coverletter, index) => (
                  <tr
                    className="odd:bg-white even:bg-slate-50 *:px-3 text-xs *:h-16"
                    key={index}
                  >
                    <td className="py-5 px-3 ">
                      TIME
                      <FilterYearID
                        issueDate={coverletter?.issueDate}
                        idCreate={Number(coverletter?.id)}
                      />
                    </td>
                    <td className="px-3 max-w-14">{coverletter?.issueDate}</td>
                    <td className="px-3 truncate ... max-w-80">
                      <p>{coverletter?.subject}</p>
                      {/* <BtnEdit id={val?._id} name={val?.subject} /> */}
                      <p className="text-gray-600">
                        Project:{" "}
                        <FilterProjectName projectData={coverletter?.project} />
                      </p>
                    </td>
                    <td className="px-3 w-20">
                      <CiFileOn size={20} />
                    </td>
                    <td className="w-20">
                      <p className="bg-green-500 text-white p-1 rounded-lg shadow-md text-center text-[10px]">
                        {coverletter?.userCreate}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-5">
              <Pagination
                items={coverletters?.length}
                pageIndex={pageIndex}
                pageSize={pageSize}
                onPageChange={onPageChange}
              />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default TableCoverletter;
