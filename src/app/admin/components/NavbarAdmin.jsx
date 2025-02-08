"use client";

import React from "react";
import Link from "next/link";
import { NavAadmin, StatusApprove } from "@/app/db/option";

function NavbarAdmin() {
  return (
    <>
      <nav className="px-2">
        <div className="">
          <div className="flex justify-center">
            <h1 className="text-xl p-5">Admin</h1>
          </div>

          <div className="">
            <h3 className="">Home</h3>
            <ul className="text-sm *:px-2 mt-3">
              {NavAadmin?.Home?.map((navHome) => (
                <div key={navHome.value}>
                  <li className="hover:bg-blue-50 hover:rounded-md hover:shadow-md hover:text-blue-500 py-3 px-2">
                    <Link
                      href={navHome.href}
                      className="flex gap-3 items-center"
                    >
                      {React.createElement(navHome.icon, { size: 20 })}
                      <p>{navHome.value}</p>
                    </Link>
                  </li>
                </div>
              ))}
            </ul>
          </div>

          <hr className="my-5" />

          <div>
            <h3 className="">Admin</h3>
            <ul className="text-sm *:px-2 mt-3">
              {NavAadmin?.Admin?.map((navAdmin) => (
                <div key={navAdmin.value}>
                  <li className="hover:bg-blue-50 hover:rounded-md hover:shadow-md hover:text-blue-500 py-3 px-2">
                    <Link
                      href={navAdmin.href}
                      className="flex gap-3 items-center"
                    >
                      {React.createElement(navAdmin.icon, { size: 20 })}
                      <p>{navAdmin.value}</p>
                    </Link>
                  </li>
                </div>
              ))}
            </ul>
          </div>


          <hr className="my-5" />

          <div>
            <h3 className="">Timer</h3>
            <ul className="text-sm *:px-2 mt-3">
              {NavAadmin?.Timer?.map((navTimer) => (
                <div key={navTimer.value}>
                  <li className="hover:bg-blue-50 hover:rounded-md hover:shadow-md hover:text-blue-500 py-3 px-2">
                    <Link
                      href={navTimer.href}
                      className="flex gap-3 items-center"
                    >
                      {React.createElement(navTimer.icon, { size: 20 })}
                      <p>{navTimer.value}</p>
                    </Link>
                  </li>
                </div>
              ))}
            </ul>
          </div>

          <hr className="my-5" />

          <div>
            <h3 className="">Project</h3>
            <ul className="text-sm *:px-2 mt-3">
              {NavAadmin?.Project?.map((navProject) => (
                <div key={navProject.value}>
                  <li className="hover:bg-blue-50 hover:rounded-md hover:shadow-md hover:text-blue-500 py-3 px-2">
                    <Link
                      href={navProject.href}
                      className="flex gap-3 items-center"
                    >
                      {React.createElement(navProject.icon, { size: 20 })}
                      <p>{navProject.value}</p>
                    </Link>
                  </li>
                </div>
              ))}
            </ul>
          </div>

        </div>
      </nav>
    </>
  );
}

export default NavbarAdmin;
