import { useUser, useUsers } from "@/app/services/queries";
import Image from "next/image";
import React from "react";
import Skeleton from "react-loading-skeleton";
import Avatar from "../../../../../public/avataricon.png";

const ProfileAndNameTimeoff:React.FC<{data: any}> = ({ data }) => {
  const profileUser = data?.employee_info.employeeProfile;
  const nameEngUser = data?.employee_info.nameEng;
  const typeLeave = data?.type;
  const halfDayLeave = data?.halfDay;

  return (
    <>
      <div className="flex items-center gap-2">
        <Image
          src={profileUser ? profileUser : Avatar}
          width={50}
          height={50}
          alt={`${nameEngUser}`}
          className="w-6 h-6 border-2 border-white rounded-full object-cover"
        />
        <div>
          <p className="text-xs truncate  max-w-full lg:max-w-36">{nameEngUser}</p>
          <p className="text-[11px] truncate text-gray-500 max-w-full lg:max-w-36">
            {`${typeLeave} ${
              halfDayLeave === "haftAfternoon"
                ? "- ครึ่งบ่าย"
                : halfDayLeave === "haftMorning"
                ? "- ครึ่งเช้า"
                : ""
            }`}
          </p>
        </div>
      </div>
    </>
  );
}

export default ProfileAndNameTimeoff;
