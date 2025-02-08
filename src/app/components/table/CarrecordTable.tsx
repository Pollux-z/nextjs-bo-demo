"use client";
import React, { useState } from "react";
import { useCarrecord, useUsers } from "@/app/services/queries";

// Pagination function
import Pagination from "@/app/components/Pagination";
import { paginate } from "@/app/helpers/paginate";

import NoneData from "../NoneData";
import Loading from "@/app/loading";
import { CarrecordType } from "@/interfaces/Carrecord";

const CarrecordTable: React.FC = () => {
  const { data: carrecord, isLoading, isValidating, error } = useCarrecord();
  const carrecordData: Array<CarrecordType> = carrecord?.totalCarrecord;

  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 10;

  const onPageChange = (page: number) => {
    setPageIndex(page);
  };

  const paginatedCarrecord: Array<CarrecordType> = paginate(carrecordData, pageIndex, pageSize);

  if(isLoading) return <Loading />
  return (
    <>
      {carrecordData?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left">
            <thead className="border-b">
              <tr className="*:py-3 *:px-3 *:font-normal text-sm">
                <th className="p-2">ID</th>
                <th className="p-2">Destination / User</th>
                <th className="p-2">Remark</th>
                <th className="text-center p-2  w-36">Total</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {paginatedCarrecord?.map((carrecord, index) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-slate-50 *:px-3 text-xs *:h-16"
                >
                  <td className="p-2">TIME-{carrecord?.code}</td>
                  <td className="p-2">
                    <p className="text-sm">{carrecord?.destination}</p>
                    <p className="text-gray-500">
                      {carrecord?.employee_info?.nameEng}
                    </p>
                  </td>
                  <td className="p-2">{carrecord?.remark}</td>
                  <td className="grid items-center ">
                    <p className="bg-purple-200 text-center text-purple-500 font-simibold py-1 rounded-md">
                      {carrecord?.endDistance === 0
                        ? `In use`
                        : `Miles: ${carrecord?.endDistance}`}
                    </p>
                    <p className="bg-green-200 text-center text-green-500 font-simibold py-1 rounded-md">
                      {carrecord?.endDistance - carrecord?.startDistance > 0
                        ? `total: ${carrecord?.endDistance - carrecord?.startDistance} KM`
                        : "In use"}{" "}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end py-2">
            <Pagination
              items={carrecordData?.length}
              pageIndex={pageIndex}
              pageSize={pageSize}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      ) : (
        <NoneData />
      )}
    </>
  );
}

export default CarrecordTable;
