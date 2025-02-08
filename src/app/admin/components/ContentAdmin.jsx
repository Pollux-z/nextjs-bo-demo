import React from "react";
import Header from "@/app/components/Header";
import NavbarAdmin from "./NavbarAdmin";

function ContentAdmin({ children, session }) {
  return (
    <main>
      <div className="flex w-full h-full ">
        <div className="w-[244px] mx-3">
          <NavbarAdmin />
        </div>
        <div className="w-full px-2 h-full ">
          <div className="">
            <Header session={session} />
          </div>
          <div className="py-5 px-5 bg-gray-50 min-h-screen flex justify-center items-center">{children}</div>
        </div>
      </div>
    </main>
  );
}

export default ContentAdmin;
