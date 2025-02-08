"use client";

import React from "react";
import Header from "@/app/components/Header";
import NavbarAdmin from "../components/NavbarAdmin";
import Content from "./components/Content";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function HowToAdminPage() {
  const { data: session } = useSession();

  return (
    <main>
      <div className="flex w-full">
        <div className="w-[244px] mx-3">
          <NavbarAdmin />
        </div>
        <div className="w-full px-2">
          <div className="">
            <Header session={session} />
          </div>
          <div className="py-5 px-10 bg-gray-100 h-full">
            <Content />
          </div>
        </div>
      </div>
    </main>
  );
}

export default HowToAdminPage;
