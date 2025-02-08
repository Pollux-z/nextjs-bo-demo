import { useUser } from "@/app/services/queries";
import Image from "next/image";
import React from "react";
import Skeleton from "react-loading-skeleton";
import Avatar from "../../../../../public/avataricon.png";

type ProfileAndNameSwapDateType = {
  data: string
}

const ProfileAndNameSwapDate: React.FC<ProfileAndNameSwapDateType> = ({ data }) => {
  const { data: getUser, isLoading, isValidating } = useUser(data);
  const user = getUser?.user;

  if (isLoading) return <Skeleton height={20} />;

  return (
    <>
      <div className="flex items-center gap-2">
        <Image
          src={user?.employeeProfile ? user?.employeeProfile : Avatar}
          width={50}
          height={50}
          alt={`${user?.nameEng}`}
          className="w-6 h-6 border-2 border-white rounded-full object-cover"
        />
        <div>
          <p className="text-xs truncate ... w-36">{user?.nameEng}</p>
        </div>
      </div>
    </>
  );
}
 
export default ProfileAndNameSwapDate
