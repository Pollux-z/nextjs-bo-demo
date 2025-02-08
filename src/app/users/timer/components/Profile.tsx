"use client";
import Link from "next/link";
import React from "react";
import { CiMail, CiPhone } from "react-icons/ci";
import ProfileDetail from "./ProfileDetail";
import ProfileInfo from "./ProfileInfo";
import { useUser } from "@/app/services/queries";
import Loading from "@/app/loading";
import Error from "@/app/Error";


const Profile: React.FC<{ id: string }> = ({ id }) => {
  const { data: getUsers, isLoading, isValidating, error } = useUser(id);
  const user = getUsers?.user;

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <div className="grid lg:grid-flow-col  lg:auto-cols-auto gap-5">
        <div className="bg-white rounded-md ">
          <ProfileDetail user={user} />
        </div>
        <div className="p-5 rounded-md lg:col-span-12 lg:mt-0  shadow-sm bg-white">
          <ProfileInfo user={user} />
        </div>
      </div>
    </>
  );
};

export default Profile;
