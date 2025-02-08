"use client";

import { useUser, useUsers } from "@/app/services/queries";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

import Pagination from "@/app/components/Pagination";
import { paginate } from "@/app/helpers/paginate";

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

function ApprovalUser({ data }) {
  return (
    <>
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
              href={`/users/timer/view/${data?._id}`}
              className="text-sm text-blue-500 font-medium"
            >
              <FilterUserCreate userData={data.userCreate} />
            </a>
            <p className="text-xs text-gray-400 ">
              <FilterUserTitle userData={data.userCreate} />
            </p>
          </div>
        </div>
      </td>
      <td className="">{data.type}</td>
      <td className="">{data.reason}</td>
      <td>
        {data.issueDate.map((val, index) => (
          <p key={index}>
            <FormatDateTimeOff dateData={val} />
          </p>
        ))}
      </td>
      <td>
        <StyleStatus data={data?.status} />
      </td>
      <td className="flex justify-center items-center gap-1">
        <StatusApprove idUser={data?.employee} idTimeOff={data._id} />
        <StatusReject idUser={data?.employee} idTimeOff={data._id} />
        <StatusCancel idUser={data?.employee} idTimeOff={data._id} />
      </td>
    </>
  );
}

export default ApprovalUser;
