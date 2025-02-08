import { useUsers } from "@/app/services/queries";
import Image from "next/image";
import React from "react";
import Avatar from "../../../../../public/avataricon.png";
import Link from "next/link";
import Loading from "@/app/loading";
import Error from "@/app/Error";
import { UsersType } from "@/interfaces/User";

const FilterAgeEmployee = () => {
  const { data: getUsers, isLoading, isValidating, error } = useUsers();
  const users: UsersType[] = getUsers?.totalUsers;
  const usersBirthDateYear = users?.map((val) =>
    val.employeeBirthDay.split("-")
  );

  const uniYear: any = [];
  usersBirthDateYear?.forEach((element) => {
    if (!uniYear.includes(element[0])) {
      uniYear.push(element[0]);
    }
  });

  const sortUniYear = uniYear.sort((a: any, b: any) => a - b);

  if(isLoading) return <Loading />
  if(error) return <Error />
  return (
    <>
      <div className="grid gap-1 divide-y divide-dashed ">
        {sortUniYear?.map((i: any, index: number) => {
          const filterYear: UsersType[] = users?.filter(
            (j) => j?.employeeBirthDay.split("-")[0] === i
          );
          const countPerAge = filterYear?.length;
          return (
            <>
              <div className="flex items-center gap-2 py-1" key={index}>
                <div>
                  <div>
                    <p className="text-xs">Age </p>
                    <p className="text-sm font-bold">
                      {new Date().getFullYear() - i}
                    </p>
                    <p className="text-xs">Total: {countPerAge}</p>
                  </div>
                </div>
                <div className="flex -space-x-3">
                  {filterYear.map((j, index) => (
                    <div key={index} className="">
                      <div className="">
                        <Link
                          href={`/users/timer/${j?._id}`}
                          title={j?.nameEng}
                        >
                          <Image
                            alt={j?.nameEng}
                            src={
                              j?.employeeProfile ? j?.employeeProfile : Avatar
                            }
                            width={50}
                            height={50}
                            className="w-8 h-8 border-2 border-white rounded-full object-cover"
                          />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default FilterAgeEmployee;
