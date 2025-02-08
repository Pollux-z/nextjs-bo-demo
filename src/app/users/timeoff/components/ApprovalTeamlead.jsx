"use client";

import { useUser, useUsers } from "@/app/services/queries";
import { useSession } from "next-auth/react";
import React, { useMemo, useState } from "react";

import Pagination from "@/app/components/Pagination";
import { paginate } from "@/app/helpers/paginate";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import Image from "next/image";
import Avatar from "../../../../../public/avataricon.png";
import FilterUserCreate from "@/app/components/FilterUserCreate";

import { CiSquareCheck, CiSquareRemove, CiSquareMore } from "react-icons/ci";
import StyleStatus from "./StyleStatus";
import StatusApprove from "./StatusApprove";
import StatusReject from "./StatusReject";
import StatusCancel from "./StatusCancel";
import FilterUserTitle from "@/app/components/FilterUserTitle";
import FormatDateTimeOff from "@/app/components/FormatDateTimeOff";
import StatusComplete from "./StatusComplete";
import DropdownOption from "./DropdownOption";
import ProfileNameTitle from "@/app/components/ProfileNameTitle";

function ApprovalTeamlead({ data }) {
  const { data: session } = useSession();
  const sessionId = session?.user?.id;
  const sessionRole = session?.user?.role;
  const employeeId = data?.employee;
  const { data: getUsers } = useUsers();
  const users = getUsers?.totalUsers;
  const user = users?.find((i) => i._id === employeeId);
  const userLeader = user?.teamLeader;

  // const { data: getUser, isLoading } = useUser(employeeId);
  // const user = useMemo(() => {
  //   return getUser?.user;
  // },[])
  // const user = getUser?.user;
  // const userLeader = user?.teamLeader;

  return (
    <>
      {sessionId === userLeader || sessionRole != "User" ? (
        <>
          <td>{data.id}</td>
          <td className="">
            <ProfileNameTitle data={employeeId} />
          </td>
          <td>
            <p className="bg-gray-100 text-center rounded-md shadow-sm p-0.5 ">
              <FormatDateTimeOff dateData={data?.createdAt.split("T")[0]} />
            </p>
          </td>
          <td className="">
            <p>{data?.type}</p>
            <p className="text-gray-400 font-light">
              {data?.halfDay === "haftMorning"
                ? "Half-day morning"
                : data?.halfDay === "haftAfternoon"
                ? "Half-day afternoon"
                : "Full day"}
            </p>
          </td>
          <td className="">{data?.reason}</td>
          <td>
            {data?.issueDate?.map((val, index) => (
              <p key={index} className="text-center">
                <FormatDateTimeOff dateData={val} />
              </p>
            ))}
          </td>

          <td>
            <StyleStatus data={data?.status} />
            <p></p>
          </td>
          <td className="flex justify-center items-center gap-0.5">
            <StatusApprove idUser={data?.employee} idTimeOff={data._id} />
            <StatusReject idUser={data?.employee} idTimeOff={data._id} />
            <StatusComplete idUser={data?.employee} idTimeOff={data._id} />
          </td>
        </>
      ) : null}
    </>
  );
}

export default ApprovalTeamlead;
