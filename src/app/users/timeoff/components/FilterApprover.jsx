"use client";

import { useUser, useUsers } from "@/app/services/queries";
import { useSession } from "next-auth/react";
import React from "react";

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
import ApprovalUser from "./ApprovalUser";
import ApprovalTeamlead from "./ApprovalTeamlead";

function FilterApprover({ data }) {
  const { data: session } = useSession();
  const userId = data?.employee;
  const { data: user } = useUser(userId);
  const userData = user?.user;
  const leaderUser = userData?.teamLeader;

  return (
    <>
      {session?.user?.id === leaderUser ? (
        <>
          <ApprovalTeamlead data={data} />
        </>
      ) : session?.user?.id === data?.employee ? (
        <>
          <ApprovalUser data={data} />
        </>
      ) : null}
    </>
  );
}

export default FilterApprover;
