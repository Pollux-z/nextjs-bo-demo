"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

function Profile({ user }) {
  const [isShow, setIsShow] = useState("Project");

  return (
    <>
      <div className="grid grid-rows-4 grid-flow-col gap-3 mt-5">
        <div className="bg-white rounded-md shadow-md py-6 row-span-4 grid justify-center items-start ">
          <div className="flex justify-center">
            <Image
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width={80}
              height={80}
              className="h-[120px] w-[120px] rounded-full"
              alt={user?.nameEng}
            />
          </div>
          <div className="">
            <h3 className="text-lg text-center mt-3">{user?.nameEng}</h3>
            <h4 className="text-xs font-medium bg-[#c0ede6] text-[#00B69B] rounded-md text-center py-1 mt-2">
              {user?.employeeTitle ? user?.employeeTitle : "No data"}
            </h4>
            <h5 className="text-xs font-medium bg-purple-100 text-purple-500 rounded-md text-center py-1 mt-1">
              {user?.employeeTeams ? user?.employeeTeams : "No data"}
            </h5>
          </div>
           <div className="text-center bg-blue-400 text-white rounded-lg shadow-md text-xs py-2">
            <Link href={`/admin/timerAdmin/edit/${user?._id}`} className="">Edit profile</Link>
          </div>
          <div>
            <div className=" bg-slate-50 rounded-md px-4 py-2 mt-3 w-[200px]">
              <p className="text-xs text-slate-600">TIME ID</p>
              <p className="text-xs font-medium">
                TIME002
              </p>
            </div>
            <div className=" bg-slate-50 rounded-md px-4 py-2 mt-3 w-[200px]">
              <p className="text-xs text-slate-600">Email</p>
              <p className="text-xs  font-medium">
                {user?.employeeEmail ? user?.employeeEmail : "No data"}
              </p>
            </div>
            <div className=" bg-slate-50 rounded-md px-4 py-2 mt-3 w-[200px]">
              <p className="text-xs text-slate-600">Telephone number</p>
              <p className="text-xs  font-medium">
                {user?.employeeTel ? user?.employeeTel : "No data"}
              </p>
            </div>
            <div className=" bg-slate-50 rounded-md px-4 py-2 mt-3 w-[200px]">
              <p className="text-xs text-slate-600">Nick name</p>
              <p className="text-xs  font-medium">
                {user?.nickNameTh ? user?.nickNameTh : "No data"}
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-2">
          <div className="grid grid-cols-3 gap-1 h-full *:group *:grid *:items-center">
            <div className=" bg-white py-3 px-5 rounded-md shadow-md">
              <h3 className="text-2xl text-blue-600">{user?.vacationLeave}</h3>
              <p className="text-xs text-slate-500">Vacation</p>
            </div>
            <div className="bg-white py-3 px-5 rounded-md shadow-md">
              <h3 className="text-2xl text-purple-600">{user?.sickLeave}</h3>
              <p className="text-xs text-slate-500">Sick leave</p>
            </div>
            <div className="bg-white py-3 px-5 rounded-md shadow-md">
              <h3 className="text-2xl text-orange-600">{user?.personalLeave}</h3>
              <p className="text-xs text-slate-500">Personal leave</p>
            </div>
          </div>
        </div>

        <div className="bg-white row-span-3 col-span-2 rounded-md shadow-md py-5 px-5">
          <ul className="flex gap-3 text-xs font-medium border-b pb-2">
            <li>
              <a
                className="hover:text-gray-200 hover:bg-black font-bold px-1 py-1 hover:rounded-md hover:shadow-md cursor-pointer"
                onClick={() => setIsShow("Project")}
              >
                Project
              </a>
            </li>

            <li>
              <a
                className="hover:text-gray-200 hover:bg-black font-bold px-1 py-1 hover:rounded-md hover:shadow-md focus:bg-red-200 cursor-pointer"
                onClick={() => setIsShow("Teams")}
              >
                TEAMS
              </a>
            </li>
          </ul>
          {(() => {
            switch (isShow) {
              case "Project":
                return (
                  <table className="w-full table-auto text-left mt-3">
                    <thead>
                      <tr className="text-xs *:py-2">
                        <th>Project ID</th>
                        <th>Project Name</th>
                        <th>Project PM</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr className="text-xs odd:bg-white even:bg-slate-50 *:py-2">
                          <td>TIME202410</td>
                          <td>ThaiHealth Data Quality</td>
                          <td>Tony Stack</td>
                        </tr>
                        <tr className="text-xs odd:bg-white even:bg-slate-50 *:py-2">
                          <td>TIME202410</td>
                          <td>ThaiHealth Data Quality</td>
                          <td>Tony Stack</td>
                        </tr>
                    </tbody>
                  </table>
                );
              case "Teams":
                return (
                  <table className="w-full table-auto text-left mt-3">
                    <thead>
                      <tr className="text-xs *:py-2">
                        <th>Full name</th>
                        <th>Title</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr className="text-xs odd:bg-white even:bg-slate-50 *:py-2">
                          <td>Terry Medhurst</td>
                          <td>Manager</td>
                          <td>terry@gmail.com</td>
                        </tr>
                        <tr className="text-xs odd:bg-white even:bg-slate-50 *:py-2">
                          <td>Sheldon Quigley</td>
                          <td>Consultant</td>
                          <td>Sheldon@gmail.com</td>
                        </tr>
                    </tbody>
                  </table>
                );
            }
          })()}
        </div>
      </div>
    </>
  );
}

export default Profile;
