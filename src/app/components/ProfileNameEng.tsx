import React, { useEffect, useMemo } from "react";
import Image from "next/image";

import Avatar from "../../../public/avataricon.png";
import { useUsers } from "../services/queries";
import { UsersType } from "@/interfaces/User";

type ProfileNameTitleType = {
  employeeId: string;
};

const ProfileNameEng: React.FC<ProfileNameTitleType> = ({
  employeeId
}) => {
  const {data: getUesrs, mutate } = useUsers();
  const users: UsersType[] = getUesrs?.totalUsers;
  const user: UsersType | undefined = users?.find((item) => item._id === employeeId)
  
  const profile = user?.employeeProfile;
  const name = user?.nameEng;

  useEffect(() => {
    if (user) {
      localStorage.setItem("userProfile", JSON.stringify(user));
    }
  }, [user]);

  return (
    <div className="group flex md:inline-flex items-center gap-2 ">
      <div>
        {profile ? (
          <Image
            src={profile}
            width={50}
            height={0}
            className="rounded-full h-10 w-10 ring-2  ring-white object-cover"
            alt="avatar"
          />
        ) : (
          <Image
            src={Avatar}
            width={50}
            height={0}
            className="rounded-full h-10 w-10 ring-2 ring-white object-cover"
            alt="avatar"
          />
        )}
      </div>
      <div className="truncate min-w-32 max-w-52">
        <a
          href={`/users/timer/view/${employeeId}`}
          className="text-sm text-blue-500 font-medium"
        >
          {name}
        </a>
      </div>
    </div>
  );
};


export default ProfileNameEng;
