import React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  CiViewBoard,
  CiBullhorn,
  CiDeliveryTruck,
  CiBoxList,
  CiMonitor,
  CiViewTable,
  CiUser,
  CiCalendarDate,
  CiAlignTop,
  CiViewList,
  CiMinimize1,
  CiCalendar,
  CiRepeat,
  CiFileOn,
  CiGlobe,
  CiCircleInfo,
  CiShuffle,
} from "react-icons/ci";
import { useSession } from "next-auth/react";

function Navbar({ handleToggle, handleClick }) {
  const { data: session } = useSession();
  const sessionRole = session?.user?.role;

  const conditionInternalCharge =
    sessionRole === "Admin" || sessionRole === "Project Manager";

  return (
    <nav className="">
      <div className="">
        <div className="flex justify-end mt-5 mx-5">
          <CiMinimize1
            size={30}
            className=" cursor-pointer block lg:hidden"
            onClick={handleToggle}
          />
        </div>
        <div className="flex justify-center border-b mb-5 p-5">
          <Image
            src="https://static.wixstatic.com/media/0ada91_e7c0014506db4d69ae0b820ff9297285~mv2.png/v1/fill/w_208,h_100,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/TIME-Consuting-Logo-Official-2019-V4-1.png"
            width={200}
            height={0}
            className="w-32"
            alt="timelogo"
          />
        </div>
        <div className="">
          <h3 className="">Home</h3>
          <ul className="text-sm *:px-2 mt-3">
            <li className="hover:bg-blue-50 hover:rounded-md hover:shadow-md hover:text-blue-500 ">
              <Link
                href="/"
                className="flex gap-3 items-center py-3"
                onClick={handleClick}
              >
                <CiBullhorn size={20} />
                <p>Announcement</p>
              </Link>
            </li>
          </ul>
        </div>

        <hr className="my-5" />

        <div className="">
          <h3 className="">Admin</h3>
          <ul className="text-sm *:px-2 mt-5">
            <li className="hover:bg-blue-50 hover:rounded-md hover:shadow-md hover:text-blue-500 ">
              <Link
                href="/users/carrecord"
                className="flex gap-3 items-center py-3"
                onClick={handleClick}
              >
                <CiDeliveryTruck size={20} />
                <p>Car Record</p>
              </Link>
            </li>
            <li className="hover:bg-blue-50 hover:rounded-md hover:shadow-md hover:text-blue-500 ">
              <Link
                href="/users/meetingroom"
                className="flex gap-3 items-center py-3"
              >
                <CiBoxList size={20} />

                <p>Meeting Room</p>
              </Link>
            </li>

            <li className="hover:bg-blue-50 hover:rounded-md hover:shadow-md hover:text-blue-500 ">
              <Link
                href="/users/coverletter"
                className="flex gap-3 items-center py-3"
              >
                <CiViewTable size={20} />
                <p>Cover letter</p>
              </Link>
            </li>
          </ul>
        </div>

        <hr className="my-5" />

        <div className="">
          <h3 className="">TIMER</h3>
          <ul className="text-sm mt-3">
            <li className="hover:bg-blue-50 hover:rounded-md hover:shadow-md hover:text-blue-500  ">
              <Link
                href="/users/timer"
                className="flex items-center gap-3 px-2 py-3"
              >
                <CiUser size={20} />
                <p>TIMER</p>
              </Link>
            </li>
            <li className="">
              <Link
                href="/users/timeoff"
                className="flex items-center gap-3 hover:bg-blue-50 hover:rounded-md hover:shadow-md hover:text-blue-500 py-3 px-2"
              >
                <CiCalendarDate size={20} />
                <p>TIME-OFF</p>
              </Link>
              <ul className="text-xs px-5 space-y-2 *:py-3 *:px-1 ">
                <li className="hover:rounded-md hover:shadow-md hover:text-blue-500 hover:bg-blue-50">
                  <Link
                    href="/users/swapdate"
                    className="flex items-center gap-3"
                    ß
                  >
                    <CiRepeat size={17} />
                    SWAP-Date
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <hr className="my-5" />

        <div className="">
          <h3 className="">Project</h3>
          <ul className="text-sm *:px-2 mt-3">
            <li className="hover:bg-blue-50 hover:rounded-md hover:shadow-md hover:text-blue-500 ">
              <Link
                href="/users/project"
                className="flex items-center gap-3 py-3"
              >
                <CiAlignTop size={20} />
                <p>Project</p>
              </Link>
            </li>

            {conditionInternalCharge && (
              <li className="hover:bg-blue-50 hover:rounded-md hover:shadow-md hover:text-blue-500 ">
                <Link
                  href="/users/internalCharge"
                  className="flex items-center gap-3 py-3"
                >
                  <CiShuffle size={20} />
                  <p>Internal Charge</p>
                </Link>
              </li>
            )}
            
          </ul>
        </div>

        <hr className="my-5" />

        <div className="">
          <h3 className="">KM</h3>
          <ul className="text-sm *:px-2 mt-3">
            <li className=" hover:bg-blue-50 hover:rounded-md hover:shadow-md hover:text-blue-500 ">
              <Link
                href="/users/knowledgesharing"
                className="flex items-center gap-3 py-3"
              >
                <CiGlobe size={20} />
                <p>Knowledge Sharing</p>
              </Link>
            </li>
            <li className="hover:bg-blue-50 hover:rounded-md hover:shadow-md hover:text-blue-500 ">
              <Link
                href="/users/documentation"
                className="flex items-center gap-3 py-3"
              >
                <CiFileOn size={20} />
                <p>Document Template</p>
              </Link>
            </li>
            <li className="hover:bg-blue-50 hover:rounded-md hover:shadow-md hover:text-blue-500 ">
              <Link
                href="/users/workprocess"
                className="flex items-center gap-3 py-3"
              >
                <CiCircleInfo size={20} />
                <p>Work Process</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
