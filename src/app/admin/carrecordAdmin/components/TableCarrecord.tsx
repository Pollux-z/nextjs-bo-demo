"use client";

import React, { useState } from "react";

import BtnEdit from "./BtnEdit";
import BtnDelete from "./BtnDelete";
import FilterUser from "@/app/components/FilterUser";
import { useCarrecord } from "@/app/services/queries";
import AlertNoneData from "@/app/components/AlertNoneData";
import Loading from "@/app/loading";
import Error from "@/app/Error";

// Pagination function
import Pagination from "@/app/components/Pagination";
import { paginate } from "@/app/helpers/paginate";
import { CarrecordType } from "@/interfaces/Carrecord";

const TableCarrecord: React.FC = () => {
  const { data: getCarrecord, isLoading, isValidating, error } = useCarrecord();
  const carrecord = getCarrecord?.totalCarrecord;

  const [pageIndex, setPageIndex] = useState<number>(1);
  const pageSize: number = 10;

  const onPageChange = (page: any) => {
    setPageIndex(page);
  };

  const paginatedCarrecord = paginate(carrecord, pageIndex, pageSize);

  if (isLoading) return <Loading />;
  if (error) return <Error />;
  return (
    <>
      {paginatedCarrecord && paginatedCarrecord.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left mt-5">
            <thead className="border-b">
              <tr className="*:py-3 *:px-3 *:font-normal text-sm">
                <th className=" rounded-s-md">ID</th>
                <th className="">Destination / Recorder</th>
                <th className="">Remark</th>
                <th className="text-center">ODO(Mile)</th>
                {/* <th className="text-center">Status</th> */}
                <th className="text-center ">Action</th>
              </tr>
            </thead>
            <tbody className="">
              {paginatedCarrecord.map((val: CarrecordType, index: number) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-slate-50 *:px-3 text-xs *:h-20"
                >
                  <td className="">2024/0{index + 1}</td>

                  <td className="">
                    <p className="">{val?.destination}</p>
                    <p className="text-gray-400">
                      <FilterUser userData={val?.userCreate} />
                    </p>
                  </td>
                  <td className="">{val?.remark}</td>
                  <td className="*:text-[0.7rem]  *:font-medium *:text-center *:rounded-md *:py-1 *:px-2 space-y-1">
                    <p className="bg-blue-200 text-blue-700 ">10000 KM</p>
                    <p className="bg-orange-200 text-orange-700">2 KM</p>
                  </td>
                  {/* <td className="">
                    {(() => {
                      switch (val?.status) {
                        case "Reserve":
                          return (
                            <p className=" bg-purple-200 text-center text-purple-500 font-light py-1 px-2 rounded-md">
                              {val?.status}
                            </p>
                          );
                        case "Success":
                          return (
                            <p className=" bg-green-200 text-center text-green-500 font-light py-1 px-2 rounded-md">
                              {val?.status}
                            </p>
                          );
                        case "Cancel":
                          return (
                            <p className=" bg-red-200 text-center text-red-500 font-light py-1 px-2 rounded-md">
                              {val?.status}
                            </p>
                          );
                        default:
                          return null;
                      }
                    })()}
                  </td> */}
                  <td className="">
                    <div className="group grid gap-1">
                      <BtnEdit id={val?._id} />
                      <BtnDelete id={val?._id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end py-2">
            <Pagination
              items={carrecord?.length}
              pageIndex={pageIndex}
              pageSize={pageSize}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      ) : (
        <>
          <AlertNoneData />
        </>
      )}
    </>
  );
};

export default TableCarrecord;
