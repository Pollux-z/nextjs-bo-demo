import React, { useMemo } from "react";
import Image from "next/image";
import { useUser, useUsers } from "../services/queries";

import FilterUserCreate from "./FilterUserCreate";
import FilterUserTitle from "./FilterUserTitle";

import Skeleton from "react-loading-skeleton";

function ProfileNameTitle({ data }) {
  const { data: getUsers, isLoading, isValidating, error } = useUsers();
  const users = useMemo(() => {
    return getUsers?.totalUsers;
  }, [getUsers])
  // const users = getUsers?.totalUsers;
  const filterUser = users?.find((i) => i._id === data);

  // if (isLoading) return <Skeleton height={20} />;
  return (
    <div className="group flex md:inline-flex items-center gap-2 ">
      <div>
        {isLoading ? (
          <Skeleton height={20} />
        ) : (
          <Image
            src={filterUser?.employeeProfile}
            width={50}
            height={0}
            className="rounded-full h-10 w-10 ring-2  ring-white object-cover"
            alt="avatar"
          />
        )}
      </div>
      <div className="truncate ... max-w-48">
        <a
          href={`/users/timer/view/${data}`}
          className="text-sm text-blue-500 font-medium"
        >
          <FilterUserCreate userData={data} />
        </a>
        <p className="text-xs text-gray-400 truncate ...">
          <FilterUserTitle userData={data} />
        </p>
      </div>
    </div>
  );
}

export default ProfileNameTitle;
