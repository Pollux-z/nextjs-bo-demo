"use client";

import React, { useState} from "react";
import ContainerUser from "@/app/components/ContainerUser";
import HeaderContent from "@/app/components/HeaderContent";
import {
  FcBriefcase,
  FcRatings,
  FcVoicePresentation,
  FcPhotoReel,
  FcSelfServiceKiosk,
} from "react-icons/fc";
import { useGetWorkprocess } from "@/app/services/queries";
import { IWorkprocess } from "@/interfaces/Workprocess";
import TableWorkprocess from "./components/TableWorkprocess";
import Loading from "@/app/loading";

const teamOwner = [
  { code: "BO", name: "Business Operation", icon: FcBriefcase, isActive: true },
  {
    code: "BD",
    name: "Business Development",
    icon: FcRatings,
    isActive: false,
  },
  { code: "People", name: "People", icon: FcVoicePresentation, isActive: true },
  { code: "Graphic", name: "Graphic", icon: FcPhotoReel, isActive: false },
  { code: "IT", name: "IT", icon: FcSelfServiceKiosk, isActive: false },
];


function Page(): React.ReactElement {
  const { data: getWorkprocess, isLoading, isValidating, error } = useGetWorkprocess();
  const workprocess: IWorkprocess[] = getWorkprocess?.totalWorkprocess;

  const [sortCategory, setSortCategory] = useState("");

  const sortWorkprocess = workprocess?.filter(
    (work) => work.teamOwner === sortCategory
  );

  const resultWorkprocess = !sortCategory ? workprocess : sortWorkprocess;

  function handleSortCategory(e: React.MouseEvent<HTMLButtonElement>) {
    const target = e.currentTarget as HTMLButtonElement;
    setSortCategory((target as HTMLButtonElement).value);
  }

  if (isLoading || isValidating) return <Loading />;
  if (error) return <div>There was an error</div>;
  

  return (
    <ContainerUser>
      <HeaderContent
        textHeader={`Work Process`}
        textContent={``}
        textContentSub={``}
        hrefContent={``}
      />
      <div className="mt-5">
        <h1 className="text-center text-gray-500">
          Selete the section you are interested
        </h1>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 mt-5 gap-3 ">
        {teamOwner.map((team, index) => (
          <button
            key={index}
            type="button"
            value={team.name}
            onClick={handleSortCategory}
            className={`${
              !team.isActive && "pointer-events-none"
            } bg-white  rounded-md shadow-md gap-3 p-5 hover:bg-blue-600 hover:text-white  overflow-hidden transition `}
          >
            <div className="mx-auto">
              {React.createElement(team.icon, {
                size: 50,
                className: "mx-auto",
              })}
              <p className=" text-sm line-clamp-1  font-semibold">
                {team.name}
              </p>
            </div>
          </button>
        ))}
      </div>
      <TableWorkprocess workprocesses={resultWorkprocess}/>
    </ContainerUser>
  );
}

export default Page;
