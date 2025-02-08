"use client";

import Image from "next/image";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Content from "./components/Content";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { redirect } from "next/navigation";
import ContainerUser from "./components/ContainerUser";
import HeaderContent from "./components/HeaderContent";

import Sun from "../../public/Sun.png";
import Chink from "../../public/chick.png";
import Moon from "../../public/moon.png";
import { CiCircleInfo } from "react-icons/ci";
import { useAnnouncements } from "./services/queries";
import TableAnnouncement from "./components/table/TableAnnouncement";
import Loading from "./loading";

export default function Home() {
  const { data: session } = useSession();

  const { data: announcement, isLoading, error } = useAnnouncements();
  const announcementData = announcement?.totalAnnouncement;

  const date = new Date();
  const getHours = date.getHours();

  if(isLoading) return <Loading />
  if(error) return <p>Error....</p>

  return (
    <main className="">
      <ContainerUser>
        {getHours && getHours < 12 ? (
          <div className="bg-blue-100 px-10 rounded-lg flex justify-between items-center max-h-40  min-h-28">
            <div className="">
              <h1 className="text-2xl text-blue-600">
                Good Mornings, {session?.user?.nameEng}
              </h1>
            </div>
            <div className="overflow-hidden">
              <Image
                src={Chink}
                width={110}
                height={80}
                className="-mb-6 h-32 w-32"
                alt="picheadercontent"
                priority={true}
              />
            </div>
          </div>
        ) : getHours && getHours < 18 ? (
          <div className="bg-orange-100 px-10 rounded-lg flex justify-between items-center max-h-40  min-h-28">
            <div className="">
              <h1 className="text-2xl text-orange-600">
                Good Afternoon, {session?.user?.nameEng}
              </h1>
            </div>
            <div className="overflow-hidden">
              <Image
                src={Sun}
                width={110}
                height={80}
                className="-mb-6 h-32 w-32"
                alt="picheadercontent"
                priority={true}
              />
            </div>
          </div>
        ) : (
          <div className=" bg-slate-600 px-10 rounded-lg flex justify-between items-center max-h-40  min-h-28">
            <div className="">
              <h1 className="text-2xl text-slate-100">
                Good Night, {session?.user?.nameEng}
              </h1>
            </div>
            <div className="overflow-hidden">
              <Image
                src={Moon}
                width={120}
                height={80}
                className="-mb-10 h-40 w-40"
                alt="picheadercontent"
                priority={true}
              />
            </div>
          </div>
        )}
        <div>
          <TableAnnouncement announcementData={announcementData} />
        </div>
      </ContainerUser>
    </main>
  );
}
