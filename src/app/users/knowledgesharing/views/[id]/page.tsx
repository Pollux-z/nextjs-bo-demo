"use client";

import React, { useState } from "react";
import ContainerUser from "@/app/components/ContainerUser";
import HeaderContent from "@/app/components/HeaderContent";
import Image from "next/image";

import { CiFileOn } from "react-icons/ci";
import { useGetKnowledgeById } from "@/app/services/queries";
import Loading from "@/app/loading";
import Error from "@/app/Error";

type ParamsType = {
  params: {
    id: string;
  };
};

function Page({ params }: ParamsType): React.ReactElement {
  const { id } = params;
  const {
    data: getKnowledge,
    isLoading,
    isValidating,
    error,
  } = useGetKnowledgeById(id);
  const knowledge = getKnowledge?.knowledge;

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <ContainerUser>
      <HeaderContent
        textHeader={`Knowledge Sharing`}
        textContent={``}
        textContentSub={``}
        hrefContent={``}
      />
      <div className="grid grid-cols-2 gap-2 mt-3 w-full justify-center px-10 py-5 min-h-72 max-h-80">
        <div className="mx-auto">
          <Image
            alt="image"
            src={knowledge?.imgUrl}
            width={300}
            height={200}
            className="object-fill rounded-md min-h-72 max-h-80"
          />
        </div>
        <div className=" px-3 py-2 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold">{knowledge?.title}</h2>
            <div className="mt-3 text-md">
              <p>รายละเอียด: </p>
              <p className="text-sm">{knowledge?.description}</p>
            </div>
          </div> 
          <a
          target="_blank"
          href={knowledge?.fileUrl}
          className="text-xs py-2 px-3 bg-violet-100 text-violet-600 rounded-md shadow-md  flex justify-center items-center gap-2 mt-3 hover:bg-violet-600 hover:text-white"
          >
          <CiFileOn size={20} />
          <p>View File</p>
          </a>
        </div>
      </div>
    </ContainerUser>
  );
}

export default Page;
