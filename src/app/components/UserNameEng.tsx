import React, { useEffect, useMemo } from "react";
import Image from "next/image";

import Avatar from "../../../public/avataricon.png";
import { useUsers } from "../services/queries";
import { UsersType } from "@/interfaces/User";

type ProfileNameTitleType = {
  employeeId: string;
};

const UserNameEng: React.FC<ProfileNameTitleType> = ({ employeeId }) => {
  const { data: getUesrs, mutate } = useUsers();
  const users: UsersType[] = getUesrs?.totalUsers;
  const user: UsersType | undefined = users?.find(
    (item) => item._id === employeeId
  );

  const profile = user?.employeeProfile;
  const name = user?.nameEng;

  useEffect(() => {
    if (user) {
      localStorage.setItem("userProfile", JSON.stringify(user));
    }
  }, [user]);

  return (
    <div className="group flex md:inline-flex items-center gap-2 ">
      <div className="rounded-full w-6 h-6 overflow-hidden">
        <Image
          src={profile || Avatar}
          alt="avatar"
          width={24}
          height={24}
          className="rounded-full min-w-6 min-h-6 "
        />
      </div>

      <div className="truncate ...">
        <a
          href={`/users/timer/view/${employeeId}`}
          className="text-xs text-blue-500 "
        >
          {name}
        </a>
      </div>
    </div>
  );
};

export default UserNameEng;
