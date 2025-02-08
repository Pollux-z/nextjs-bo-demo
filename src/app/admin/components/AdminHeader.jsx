import React from "react";
import { signIn, signOut } from "next-auth/react";
import Image from 'next/image'
import { RxHamburgerMenu } from "react-icons/rx";

function AdminHeader({ session, handleClick}) {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <RxHamburgerMenu
            size="1.5rem"
            className="mx-3 cursor-pointer"
            onClick={handleClick}
          />
          <input
            type="text"
            placeholder="Search.."
            className="mx-10 my-2 h-[38px] w-[388px] bg-[#F5F6FA] px-5 rounded-2xl"
          />
        </div>
        <div className="flex my-3 mx-5">
          <Image
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            width={50}
            height={50}
            className="rounded-full h-10 w-10 ring-2  ring-white object-cover"
            alt={session?.user?.nameEng}
          />
          <div className="mx-5">
            <p className=" font-light text-md">{session?.user?.nameEng}</p>
            <p className="text-xs text-slate-400">{session?.user?.role}</p>
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
              <a
                onClick={() => signOut()}
                className="bg-gray-200 py-2 px-3 rounded-md shadow-md"
              >
                Log out
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminHeader;
