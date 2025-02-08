import FilterUserCreate from "@/app/components/FilterUserCreate";
import FilterUserTitle from "@/app/components/FilterUserTitle";
import FormatDateSimple from "@/app/components/FormatDateSimple";

import { useUser } from "@/app/services/queries";
import React from "react";

const UserRowTopUp = ({ data }: { data: any }) => {
  const { data: getUser } = useUser(data?.employee);
  const user = getUser?.user;
  const vacationBalance = user?.vacationLeave;

  const createdAt = new Date(data?.createdAt).toISOString().split("T")[0];

  return (
    <>
      <td className="p-2">
        <p>
          <FilterUserCreate userData={data?.employee} />
        </p>
        <p className="text-xs text-gray-500">
          <FilterUserTitle userData={data?.employee} />
        </p>
      </td>
      <td>
        <p
          className={
            data?.type === "increase"
              ? "bg-purple-100 text-purple-500 font-semibold text-center p-1 rounded-lg"
              : "bg-orange-100 text-orange-500 font-semibold text-center p-1 rounded-lg"
          }
        >
          {data?.type === "increase" ? "Increase" : "Decrease"}
        </p>
      </td>
      <td className="text-center">{data?.topUpDay}</td>
      <td>{data?.remark}</td>
      <td className="">
        <p className="bg-green-100 w-10 p-1 rounded-lg text-green-600 font-semibold mx-auto text-center">
          {data?.vacationBalance}
        </p>
      </td>
      <td className="text-center">
        <FormatDateSimple dateData={createdAt} />
      </td>
    </>
  );
}

export default UserRowTopUp;
