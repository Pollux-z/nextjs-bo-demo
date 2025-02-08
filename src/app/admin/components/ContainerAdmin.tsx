'use client'

import React, {useState} from "react";
import NavbarAdmin from "./NavbarAdmin";
import AdminHeader from "./AdminHeader";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

type ContainerAdminType = {
  children: React.ReactNode
}

const ContainerAdmin: React.FC<ContainerAdminType> = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <main>
      <div className="flex h-full">
        <div className={`w-[244px] px-3 bg-white-200 shadow-md ${toggle ? 'block' : 'hidden'} lg:block absolute lg:static bg-white`}>
          <NavbarAdmin />
        </div>
        <div className="w-full px-2 h-full">
          <div>
            <Header handleClick={handleToggle}/>
          </div>
          <div className="py-5 px-5 bg-gray-50">{children}</div>
          <div className="bg-white py-2 rounded-md shadow-lg">
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}

export default ContainerAdmin;
