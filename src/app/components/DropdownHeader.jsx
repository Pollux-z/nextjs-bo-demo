import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";

import { useRouter } from "next/navigation";

export default function DropdownHeader({ idSession, sessionRole }) {
  const router = useRouter();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900   hover:bg-gray-50">
          <BsThreeDotsVertical size={18} />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href={`/users/timer/view/${idSession}`}
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 w-full text-left"
            >
              Profile
            </a>
          </MenuItem>
          {sessionRole != "User" && (
            <MenuItem>
              <a
                href={`/admin`}
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 w-full text-left"
              >
                Admin
              </a>
            </MenuItem>
          )}

          <MenuItem>
            <Link
              href="/document"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 w-full text-left"
            >
              คู่มือการใช้งาน
            </Link>
          </MenuItem>

          <MenuItem>
            <button
              onClick={() => {
                signOut();
              }}
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 w-full text-left"
            >
              Sign out
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
