"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  useCoverLetters,
  useLastCoverLetters,
  useProjects,
} from "@/app/services/queries";

import ContainerUser from "@/app/components/ContainerUser";
import HeaderContent from "@/app/components/HeaderContent";

import Loading from "@/app/loading";
import { useCreateCoverletter } from "@/app/services/mutations";
import { FormCreateCoverletter } from "../components/FormCreateCoverletter";

function Page(): React.ReactElement {
  const {
    data: idCoverletter,
    isLoading,
    isValidating,
    error,
  } = useLastCoverLetters();
  const lastCoverletterData = idCoverletter?.lastCoverletter;
  const idLastCoverletter = lastCoverletterData?.id;
  const id = idLastCoverletter ? idLastCoverletter + 1 : 1;

  const dates = new Date();
  const date = dates.getDate();
  const month = dates.getMonth();
  const year = dates.getFullYear();
  const nowDate = `${year}-0${month + 1}-${date < 10 ? `0${date}` : date}`;

  return (
    <main>
      <ContainerUser>
        <HeaderContent
          textHeader={`Create Cover`}
          textContent={``}
          textContentSub={``}
          hrefContent={``}
        />
        <div className="">
          <div className="bg-white py-5 px-10 w-full mt-5">
            <div className="my-5">
              <p className="font-bold border-l-4 border-violet-600  pl-2">
                Cover Letter: TIME-{year}/{id}
              </p>
              <div className="mt-5">
                <FormCreateCoverletter />
              </div>
            </div>
          </div>
        </div>
      </ContainerUser>
    </main>
  );
}

export default Page;
