import React from "react";
import Link from "next/link";
import Image from "next/image";
import Avatar from "../../../../../public/avataricon.png";
import { UsersType } from "@/interfaces/User";

const ProfileLeader: React.FC<{ data: UsersType | undefined }> = ({ data }) => {
  return (
    <>
      {data ? (
        <div className="flex justify-between gap-x-6 py-1 items-center">
          <div className="flex min-w-0 gap-x-4">
            <Image
              src={data?.employeeProfile ? data?.employeeProfile : Avatar}
              width={30}
              height={30}
              className="rounded-full h-8 w-8 object-cover flex-none"
              alt="avatar"
            />
            <div className="flex-auto">
              <p className="text-sm font-semibold">{data?.nameTh}</p>
              <p className="text-xs text-gray-500">{data?.employeeEmail}</p>
            </div>
          </div>
          <div>
            <Link
              href={`/users/timer/view/${data?._id}`}
              className="text-xs bg-gray-100 font-medium py-1 px-2 rounded-md shadow-sm"
            >
              Contact
            </Link>
          </div>
        </div>
      ) : <p className="text-sm text-center">None data</p>}
    </>
  );
}

export default ProfileLeader;
