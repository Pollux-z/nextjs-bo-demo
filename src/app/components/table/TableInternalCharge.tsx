"use client";

import Loading from "@/app/loading";
import { useInternalCharges, useUsers } from "@/app/services/queries";
import OptionActionTableInternalCharge from "@/app/users/internalCharge/components/OptionActionTableInternalCharge";
import { InternalChargeType } from "@/interfaces/InternalCharge";
import React from "react";
import AlertNoneData from "../AlertNoneData";

function TableInternalCharge() {
  const { data: internalCharges, isLoading, error } = useInternalCharges();
  console.log(internalCharges?.length)
  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  return (
    internalCharges?.length > 0 ?
    <div className="overflow-x-auto">
      <table className="table-auto border-separate border-spacing-y-2  w-full text-sm">
      <thead>
        <tr className="">
          <th scope="col">No</th>
          <th scope="col">Title</th>
          <th scope="col">Buyer</th>
          <th scope="col">Seller</th>
          <th scope="col">Date</th>
          <th scope="col">Project</th>
          <th scope="col">Status</th>
          <th scope="col">{}</th>
        </tr>
      </thead>
      <tbody className="text-sm">
        {internalCharges?.map(
          (internalCharge: InternalChargeType, index: number) => (
            <tr
              key={index}
              className="bg-white even:bg-gray-50 odd:bg-white h-12 text-center "
            >
              <td className=" rounded-l-lg">{index + 1}</td>
              <td className="truncate max-w-40 min-w-32">{internalCharge?.title}</td>
              <td className="truncate max-w-40 min-w-32">{internalCharge?.buyerUser?.nameEng}</td>
              <td className="truncate max-w-40 min-w-48">{internalCharge?.sellerTeam}</td>
              <td>
                {internalCharge?.createdAt
                  ? new Date(internalCharge.createdAt).toLocaleDateString()
                  : "N/A"}
              </td>
              <td className="truncate max-w-40 min-w-32">
                TIME-{internalCharge?.projectInternalCharge?.projectCode}{" "}
                {internalCharge?.projectInternalCharge?.projectEng}{" "}
              </td>
              <td className={``}>
                <p
                  className={`${
                    internalCharge?.status === "Approved"
                      ? "text-green-500 bg-green-100"
                      : internalCharge?.status === "Rejected"
                      ? "text-red-500"
                      : "text-yellow-500 bg-yellow-100"
                  } rounded-lg text-xs font-semibold rounded-r-lg px-2 py-1`}
                >
                  {internalCharge?.status}
                </p>
              </td>
              <td>
                <OptionActionTableInternalCharge 
                id={internalCharge.id}
                />
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
    </div>
    : <AlertNoneData />
  );
}

export default TableInternalCharge;
