"use client";

import React from "react";
import FilterUserCreate from "@/app/components/FilterUserCreate";
import FormatDate from "@/app/components/FormatDate";
import FormatDateSimple from "@/app/components/FormatDateSimple";
import FilterUserTitle from "@/app/components/FilterUserTitle";
import StyleStatus from "@/app/components/StyleStatus";
import { useSession } from "next-auth/react";

import Image from "next/image";
import Avatar from "../../../../../public/avataricon.png";
import { useUser } from "@/app/services/queries";

function UserRowSwapDate({ data }) {
  const { data: session } = useSession();
  const sessionId = session?.user?.id;
  const userRequest = data?.employee;
  const { data: getUser } = useUser(userRequest);
  const user = getUser?.user;

  return (
    <>
      {sessionId === data?.employee && (
        <>
          <td>{data?.id}</td>
          <td className="flex items-center gap-2">
            <div>
              <Image
                src={user?.employeeProfile ? user?.employeeProfile : Avatar}
                width={50}
                height={0}
                className="rounded-full h-10 w-10 ring-2  ring-white object-cover"
                alt="avatar"
              />
            </div>
            <div className="truncate ...">
              <p className="">
                <FilterUserCreate userData={data?.employee} />
              </p>
              <p className="text-xs text-gray-500">
                <FilterUserTitle userData={data?.employee} />
              </p>
            </div>
          </td>
          <td>TIME-{data?.projectAction}</td>
          <td className="w-40 text-center">
            {data?.actionDate?.map((val, index) => (
              <p key={index}>
                <FormatDateSimple dateData={val} />
              </p>
            ))}
          </td>
          <td className="w-40 text-center">
          {data?.swapDate && data?.swapDate.length > 0 ? (
              data?.swapDate.map((val, index) => (
                <p key={index}>
                  {val && <FormatDateSimple dateData={val} /> }
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
            <StyleStatus data={data?.status} />
          </td>
          <td className="p-2">
            <p className="text-center">{data?.remark}</p>
          </td>
        </>
      )}
    </>
  );
}

export default UserRowSwapDate;
