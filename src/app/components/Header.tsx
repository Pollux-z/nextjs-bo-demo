"use client";

import React, { useState } from "react";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdNotifications } from "react-icons/io";

import Link from "next/link";

import Avatar from "../../../public/avataricon.png";
import DropdownHeader from "./DropdownHeader";

import { IoNotificationsCircle } from "react-icons/io5";
import { useGetNotificationByUserId } from "../services/queries";
import NotificationAlert from "./NotificationAlert";

type MyComponentProps = {
  handleClick: (e: React.MouseEvent<HTMLButtonElement | SVGElement>) => void;
};

const Header: React.FC<MyComponentProps> = ({ handleClick }) => {
  const { data: session } = useSession();
  const idSession = session?.user?.id;
  const sessionRole = session?.user?.role;

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <RxHamburgerMenu
          size="1.5rem"
          className="mx-3 cursor-pointer lg:hidden"
          onClick={handleClick}
        />
      </div>

      <div className="flex my-3 mx-5 items-center space-x-3">
        {/* <div className="hidden md:block">
          <Link
            href="/document"
            className="text-sm bg-blue-50 text-blue-500 py-2 px-3 rounded-md"
          >
            คู่มือการใช้งาน
          </Link>
        </div> */}

        <div className="relative">
          {/* <NotificationAlert
          userId={idSession || ""}
          /> */}
        </div>

        <Image
          src={
            session?.user?.employeeProfile
              ? session?.user?.employeeProfile
              : Avatar
          }
          width={50}
          height={50}
          className="rounded-full h-10 w-10 ring-2  ring-white object-cover"
          alt="avatar"
        />
        <div className="mx-5">
          <p className=" font-light text-md">{session?.user?.nameEng}</p>
          <p className="text-xs text-slate-400">
            {session?.user?.employeeTitle}
          </p>
        </div>
        {!session && (
          <div className="flex items-center">
            <a
              onClick={() => signIn()}
              className="bg-green-400 text-white py-2 px-3 rounded-md shadow-md"
            >
              Sign in
            </a>
          </div>
        )}

        {session && (
          <div className="flex items-center">
            <DropdownHeader idSession={idSession} sessionRole={sessionRole} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
