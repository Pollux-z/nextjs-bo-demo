"use client";

import React, { useState } from "react";
import ContainerUser from "@/app/components/ContainerUser";
import HeaderContent from "@/app/components/HeaderContent";
import FilterKnowledge from "./components/FilterKnowledge";
import Image from "next/image";
import BtnDirection from "@/app/components/button/BtnDirection";
import BtnView from "./components/BtnView";
import CardKnowledge from "./components/CardKnowledge";
import TableDocumentation from "./components/TableDocumentation";
import SearchFilter from "@/app/admin/swapdateAdmin/components/SearchFilter";


import { CiFileOn } from "react-icons/ci";
import { FaRegFilePdf } from "react-icons/fa6";

import { FaFilePowerpoint, FaFileWord, FaFileExcel } from "react-icons/fa";
import { useGetDocumentations } from "@/app/services/queries";
import { IDocumentation } from "@/interfaces/Documentation";
import Error from "@/app/Error";
import Loading from "@/app/loading";

function Page() {
  const [sortCategory, setSortCategory] = useState("");
  const { data: getDocumentations, isLoading, error } = useGetDocumentations();
  const documentations: IDocumentation[] =
    getDocumentations?.totalDocumentations;

  if (isLoading) return <Loading />;
  if (error) return <Error />

  return (
    <ContainerUser>
      <HeaderContent
        textHeader={`Documents template`}
        textContent={``}
        textContentSub={``}
        hrefContent={``}
      />
      <div className="flex justify-end"></div>

      <div className="grid sm:grid-cols-3 lg:grid-cols-5 mt-5 gap-3 ">
        {documentations?.map((documentation, index) => (
          <article
            key={index}
            className="bg-white rounded-md shadow-md gap-3  flex flex-col justify-center p-5"
          >
            <div className="mx-auto">
              {documentation?.fileTypes === "PDF" ? (
                <FaRegFilePdf size={50} className="text-red-600" />
              ) : documentation?.fileTypes === "DOC" ? (
                <FaFileWord size={50} className="text-blue-600" />
              ) : documentation?.fileTypes === "PPT" ? (
                <FaFilePowerpoint size={50} className="text-orange-600" />
              ) : documentation?.fileTypes === "EXCEL" ? (
                <FaFileExcel size={50} className="text-orange-600" />
              ) : <CiFileOn size={50} className="text-black" />}
            </div>
            <article className="text-wrap">
              <p className=" text-sm line-clamp-1 text-center font-semibold">
                {documentation?.title}
              </p>
              <p className=" text-xs line-clamp-1 text-center ">
                TIME Consulting
              </p>
            </article>
            <div className="mx-auto">
              <a href={documentation?.url} className="text-xs p-2 bg-violet-50 text-violet-600 rounded-md" target="blank">
                View
              </a>
            </div>
          </article>
        ))}
      </div>
    </ContainerUser>
  );
}

export default Page;
