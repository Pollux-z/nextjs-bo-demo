import React, { useMemo } from "react";
import Image from "next/image";

import Avatar from "../../../public/avataricon.png";

type ProfileNameTitleType = {
  employeeId: string;
  profile: string;
  name: string;
  title: string;
};

const ProfileTitleName: React.FC<ProfileNameTitleType> = ({
  employeeId,
  profile,
  name,
  title,
}) => {
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
      <div className="truncate ...">
        <a
          href={`/users/timer/view/${employeeId}`}
          className="text-sm text-blue-500 font-medium"
        >
          {name}
        </a>
        <p className="text-xs text-gray-400 min-w-48  truncate ...">{title}</p>
      </div>
    </div>
  );
};

export default ProfileTitleName;
