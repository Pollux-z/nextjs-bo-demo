import React from "react";
import { CiMail, CiPhone } from "react-icons/ci";
import Image from "next/image";
import Avatar from "../../../../../public/avataricon.png";
import { useUsers } from "@/app/services/queries";
import ProfileTeams from "./ProfileTeams";
import ProfileLeader from "./ProfileLeader";
import { UsersType } from "@/interfaces/User";

const ProfileDetail: React.FC<{ user: UsersType}> = ({ user }) => {
  const { data: getUsers } = useUsers();
  const users: UsersType[] = getUsers?.totalUsers;
  const leaderUser = users?.find((val) => val?._id === user?.teamLeader);

  const usersTeam = users?.filter(
    (val) =>
      val?.employeeTeams === user?.employeeTeams &&
      val?._id != user?._id &&
      val?._id != leaderUser?._id
  );

  return (
    <>
      <div className="rounded-md">
        <div className="grid">
          <div className="h-52 text-md  p-10 flex items-center gap-5 rounded-md  bg-gradient-to-r from-violet-300 to-fuchsia-300">
            <Image
              src={user?.employeeProfile ? user?.employeeProfile : Avatar}
              width={100}
              height={100}
              className="rounded-full h-32 w-32 object-cover"
              alt={user?.nameTh}
            />
            <div>
              <p className="text-md font-semibold">{user?.nameTh}</p>
              <p className="text-xs truncate ... max-w-44">{user?.employeeTitle}</p>
              <p className="text-xs ">{user?.employeeTeams}</p>
            </div>
          </div>
          <div className="py-5 px-10">
            <h3 className="text-sm">Contact Infomation :</h3>
            <div className="grid gap-3 mt-2">
              <p className="text-xs text-gray-500 flex items-center space-x-2">
                <CiMail
                  size={30}
                  className="bg-gray-200 text-gray-600 rounded-full p-1"
                />{" "}
                <span>{user?.employeeEmail}</span>
              </p>
              <p className="text-xs text-gray-500 flex space-x-2 items-center">
                <CiPhone
                  size={30}
                  className="bg-gray-200 text-gray-600 rounded-full p-1"
                />
                <span>{user?.employeeTel}</span>
              </p>
            </div>
          </div>
          <hr className="my-5" />

          <div className="max-w-full px-5 border-l-4 border-indigo-500">
            <h3 className="text-sm">Leader</h3>
            <ProfileLeader data={leaderUser} />
          </div>
          <div className="max-w-full px-5 mt-3">
            <h3 className="text-sm">Teams</h3>
            <ProfileTeams data={usersTeam} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileDetail;
