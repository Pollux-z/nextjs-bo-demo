"use client";

import React, { useState } from "react";
import Header from "@/app/components/Header";
import Navbar from "./Navbar";
import Footer from "./Footer";


import { CiBank } from "react-icons/ci";

type MyComponentProp = {
  children: React.ReactNode;
}

const ContainerUser: React.FC<MyComponentProp> = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <main className="">
      <div className="flex min-h-screen">
        <div className={`w-[244px] px-3 bg-white absolute lg:static z-50 ${toggle ? 'block ' : 'hidden'} lg:block `}>
          <Navbar handleToggle={handleToggle} handleClick={handleToggle} />
        </div>
        
        <div className="w-full px-2 ">
          <div className="">
            <Header handleClick={handleToggle} />
          </div>
          <div className="py-5 px-5 bg-gray-50 w-full ">{children}</div>
          <div className="bg-white py-2 rounded-md shadow-lg">
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}

export default ContainerUser;
