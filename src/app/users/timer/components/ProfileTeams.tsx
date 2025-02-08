import React from "react";
import Link from "next/link";
import Image from "next/image";
import Avatar from "../../../../../public/avataricon.png";
import { UsersType } from "@/interfaces/User";

const ProfileTeams: React.FC<{ data: UsersType[] }> = ({ data }) => {
  return (
    <>
      <ul className="divide-y divide-gray-100 pb-3">
        {data?.map((val, index) => (
          <li className="flex justify-between gap-x-6 py-2 items-center" key={index}>
            <div className="flex min-w-0 gap-x-4">
              <Image
                src={val?.employeeProfile ? val?.employeeProfile : Avatar}
                width={30}
                height={30}
                className="rounded-full h-8 w-8 object-cover flex-none"
                alt="avatar"
              />
              <div className="flex-auto">
                <p className="text-sm font-semibold">{val?.nameTh}</p>
                <p className="text-xs text-gray-500">{val?.employeeEmail}</p>
              </div>
            </div>
            <div>
              <Link
                href={`/users/timer/view/${val?._id}`}
                className="text-xs bg-gray-100 font-medium py-1 px-2 rounded-md shadow-sm"
              >
                Contact
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ProfileTeams;
